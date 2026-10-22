import { perfectMasonKnowledge } from './aiKnowledge.js';

// =========================================================================
// SYSTEM PROMPT BUILDER
// =========================================================================
export function buildSystemPrompt() {
  const { company, services, bangaloreBuildingNorms, pricingPhilosophy } = perfectMasonKnowledge;

  return `You are the **Perfect Mason AI Assistant**, an expert architectural, engineering, and turnkey construction consultant for Perfect Mason (NDL Engineers & Contractors) in Bengaluru, Karnataka, India.

### YOUR IDENTITY & TONE
- Name: Perfect Mason AI Assistant.
- Tone: Highly professional, consultative, articulate, knowledgeable, friendly, and honest.
- Do not claim to be a human employee. State clearly you are Perfect Mason's AI Project Consultant.
- Help customers explore services, calculate plot dimensions, understand the construction process, and assemble a structured project brief.

### VERIFIED COMPANY KNOWLEDGE
- Company: ${company.name} (${company.parentEntity})
- Studio & Registered Office: ${company.studioOffice.address}
- Landmark: ${company.studioOffice.landmark}
- Working Hours: ${company.studioOffice.workingHours}
- Phone & WhatsApp: ${company.studioOffice.phone}
- Email: ${company.studioOffice.email}
- Service Area: Across Bengaluru (Bangalore) including HSR Layout, Koramangala, Indiranagar, Whitefield, Sarjapur Road, Electronic City, Jayanagar, JP Nagar, etc.

### CORE SERVICES & SPECIFICATIONS
1. **Residential Construction** (Route: /residential):
   - Custom contemporary villas, duplexes, multi-storey residences (G+2, G+3, G+4), structural renovations.
   - Engineering: Soil testing, Fe550D TMT steel, RMC M25/M30 concrete, 5-layer terrace waterproofing, damp-proofing.

2. **Commercial Construction** (Route: /commercial):
   - Corporate offices, retail flagship showrooms, restaurants, hospitality, pre-engineered buildings (PEB).
   - Engineering: Post-tensioned column-free slabs, VRV/VRF HVAC ducting, NBC-compliant fire systems.

3. **Turnkey Project Execution** (Route: /turnkey-project-execution):
   - 5 Stages: 01 Consultation -> 02 Engineering & BOQ -> 03 Civil Construction -> 04 MEP & Quality Audits -> 05 Interiors & Handover.
   - Benefits: 5-Year structural warranty, itemized transparent BOQ, daily senior on-site civil supervision, zero hidden charges.

4. **Interior Architecture & Joinery** (Route: /interiors):
   - Bespoke living spaces, Italian marble, marine-ply modular kitchens with Blum hardware, custom walk-in wardrobes.

### BANGALORE PLOT & BUILT-UP SIZING RULES
- 30 × 40 ft = 1,200 sq.ft plot area. Typically allows ~2,400 to 3,600 sq.ft built-up area across G+2 / G+3 floors (subject to BBMP/BDA setbacks and road width).
- 30 × 50 ft = 1,500 sq.ft plot area. Typically allows ~3,000 to 4,500 sq.ft built-up area.
- 40 × 60 ft = 2,400 sq.ft plot area. Typically allows ~5,000 to 7,500 sq.ft built-up area across G+3 / G+4 floors.
- 50 × 80 ft = 4,000 sq.ft plot area. Typically allows 8,000 to 14,000 sq.ft luxury villa / commercial space.
- Always distinguish **plot area** (land footprint) from **built-up area** (total sum of floor slabs).

### PRICING & ESTIMATION GUIDANCE
- ${pricingPhilosophy.policy}
- ${pricingPhilosophy.guidance}
- Do not fabricate a flat price list or quote exact final prices without drawings. Explain that cost depends on soil conditions, structural spans, and custom finishes.
- Offer to collect project details for an itemized estimate prepared by our engineering team.

### CONSULTATIVE ENQUIRY INTAKE FLOW
When a visitor expresses project intent:
1. Ask one relevant question at a time.
2. Collect: Project Type (Villa / Commercial / Interior / Turnkey) -> Location in Bangalore -> Plot size / Built-up area -> Expected start timeline -> Approximate budget -> Client Name & Phone Number.
3. Once key details are shared, present a concise summary and invite the customer to confirm submission so our team can contact them.

### LANGUAGE
- Communicate primarily in English.
- If the user asks in Kannada or Hindi, respond fluently and politely in that language.`;
}

// =========================================================================
// CALL EXTERNAL LLM PROVIDERS (OpenAI, Gemini, Groq)
// =========================================================================
async function callExternalLlm(messages) {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  const systemPrompt = buildSystemPrompt();

  // 1. OPENAI API
  if (openaiKey) {
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const payload = {
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 800,
    };

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    return { content, provider: 'openai' };
  }

  // 2. GROQ API (OpenAI Compatible)
  if (groqKey) {
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    const payload = {
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 800,
    };

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Groq API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    return { content, provider: 'groq' };
  }

  // 3. GOOGLE GEMINI API
  if (geminiKey) {
    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      ...messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const content =
      data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return { content, provider: 'gemini' };
  }

  return null;
}

// =========================================================================
// INTELLIGENT BUILT-IN ARCHITECTURAL CONSULTANT ENGINE (FALLBACK / LOCAL)
// =========================================================================
function handleArchitecturalConsultant(messages) {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  const userText = lastUserMsg ? lastUserMsg.content.trim() : '';
  const lower = userText.toLowerCase();

  // Combine full conversation for memory
  const allUserText = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join(' ')
    .toLowerCase();

  // Quick action suggestions
  let suggestions = [
    { label: 'Residential Construction', query: 'Tell me about villa construction in Bangalore.' },
    { label: 'Turnkey Process', query: 'How does turnkey project execution work?' },
    { label: 'Estimate 30x40 Plot', query: 'I have a 30x40 plot. What can I build?' },
    { label: 'Visit Studio', query: 'Where is your studio located and how can I visit?' },
  ];

  // 1. PLOT DIMENSION & CALCULATIONS (e.g. 30x40, 30x50, 40x60, 50x80)
  if (lower.includes('30x40') || lower.includes('30 × 40') || lower.includes('30*40') || lower.includes('1200 sq')) {
    return {
      content: `A **30 × 40 ft** plot gives a total plot area of **1,200 sq. ft.**

In Bengaluru (following BBMP / BDA setback rules and road width considerations):
- **Typical Built-up Area:** Approximately **2,400 to 3,600 sq. ft.** across **G+2** or **G+3** floors.
- **Popular Typologies:** Contemporary Duplex Villa with double-height living, 3 to 4 bedrooms, home theater, and terrace garden.
- **Estimated Execution Timeline:** 10 to 14 months for complete turnkey civil construction and premium finishes.

Would you like to share your target locality in Bangalore or approximate budget so our architects can help plan your layout?`,
      suggestions: [
        { label: 'Estimate Approximate Cost', query: 'What is the preliminary cost for a 30x40 villa?' },
        { label: 'View Residential Villas', link: '/residential' },
        { label: 'Book Studio Consultation', query: 'I would like to book a studio visit to discuss my 30x40 plot.' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  if (lower.includes('30x50') || lower.includes('30 × 50') || lower.includes('1500 sq')) {
    return {
      content: `A **30 × 50 ft** plot yields **1,500 sq. ft.** of ground footprint.

- **Typical Permitted Built-up Area:** Approximately **3,000 to 4,500 sq. ft.** across **G+2 / G+3** levels.
- **Ideal Layout:** Spacious 4BHK luxury duplex with dedicated car parking, elevator provision, skylit courtyard, and solar rooftop.
- **Execution Timeline:** Turnkey execution typically spans 11 to 14 months with daily engineering oversight.

Which area in Bangalore is your plot located in?`,
      suggestions: [
        { label: 'View Villa Designs', link: '/residential' },
        { label: 'Turnkey Process Details', link: '/turnkey-project-execution' },
        { label: 'Contact Architects', query: 'I would like to speak with your senior architect.' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  if (lower.includes('40x60') || lower.includes('40 × 60') || lower.includes('2400 sq')) {
    return {
      content: `A **40 × 60 ft** site provides a generous **2,400 sq. ft.** plot area.

- **Typical Built-up Area:** Approximately **5,000 to 7,500 sq. ft.** across **G+3 or G+4** levels (or a grand G+2 luxury estate).
- **Architectural Scope:** Expansive 4–5 BHK luxury residence with private elevator, 2–3 car parking bays, private gym, landscaped deck, and integrated smart home automation.
- **Turnkey Handover:** 12 to 16 months with milestone-based inspection reports.

Are you looking for complete turnkey construction including interior millwork?`,
      suggestions: [
        { label: 'Explore Luxury Interiors', link: '/interiors' },
        { label: '5-Stage Turnkey Process', link: '/turnkey-project-execution' },
        { label: 'Schedule Studio Visit', query: 'Where is your studio office located?' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  // 2. PRICING & COST ESTIMATION
  if (lower.includes('cost') || lower.includes('price') || lower.includes('budget') || lower.includes('rate') || lower.includes('estimate') || lower.includes('sqft cost') || lower.includes('per sq')) {
    return {
      content: `At **Perfect Mason**, we prioritize engineering transparency and **itemized Bill of Quantities (BOQ)** billing over speculative flat rates.

**Why itemized BOQ protects you:**
- **Zero Hidden Costs:** You pay for verified material grades (Fe550D TMT steel, M25/M30 RMC concrete, Jaquar/Kohler fittings) and actual quantities.
- **No Mid-Project Price Escalation:** Transparent milestone payment schedules.
- **Bespoke Optimization:** Cost depends on soil load capacity, structural spans, floor height, facade design, and finish tier (Classic, Premium, Ultra-Luxury).

Would you like our engineering team to prepare a preliminary BOQ estimate for your project? If yes, please tell me your approximate **plot size**, **locality**, and **phone number**.`,
      suggestions: [
        { label: 'Provide Plot Details', query: 'I have a plot in Bangalore and want an estimate.' },
        { label: 'See Turnkey Guarantee', link: '/turnkey-project-execution' },
        { label: 'Call +91 98863 29424', query: 'Can I call your direct desk?' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  // 3. TURNKEY EXECUTION PROCESS
  if (lower.includes('turnkey') || lower.includes('process') || lower.includes('stage') || lower.includes('how it works') || lower.includes('timeline')) {
    return {
      content: `**Turnkey Project Execution** at Perfect Mason provides complete single-point accountability from architectural design to final key handover:

1. **Stage 01 — Consultation & Spatial Architecture:** Client brief, soil survey, 2D floor plans & photorealistic 3D elevations.
2. **Stage 02 — Engineering & Itemized BOQ:** Structural RCC calculations, electrical/plumbing drawings, and transparent cost breakdown.
3. **Stage 03 — Civil Construction:** Foundation, RCC frame, masonry, plastering, and waterproofing under daily senior supervision.
4. **Stage 04 — MEP & Quality Audits:** Concealed conduits, pressure-tested plumbing, and multi-layer waterproofing checks.
5. **Stage 05 — Interior Joinery & Handover:** Modular cabinetry, flooring, sanitization, and project handover with a **5-Year Structural Warranty**.

Would you like to explore our turnkey portfolio or discuss your project requirements?`,
      suggestions: [
        { label: 'Explore Turnkey Projects', link: '/turnkey-project-execution' },
        { label: 'View Project Gallery', link: '/gallery' },
        { label: 'Book In-Person Meeting', query: 'I want to schedule an in-person meeting.' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  // 4. COMMERCIAL CONSTRUCTION
  if (lower.includes('commercial') || lower.includes('office') || lower.includes('showroom') || lower.includes('retail') || lower.includes('warehouse')) {
    return {
      content: `Our **Commercial & Workspace Division** specializes in high-yield, architecturally commanding commercial developments across Bengaluru:

- **Commercial Complexes & Corporate Workspaces:** Multi-storey structures with large column-free spans and post-tensioned slabs.
- **Retail & Automobile Showrooms:** High-volume glazed facades, high-capacity flooring, and expansive ceiling heights.
- **Hospitality & Fine Dining:** Acoustic ceiling baffles, heavy-duty MEP, commercial kitchens, and custom woodwork.
- **Pre-Engineered Buildings (PEB) & Industrial Facilities:** Rapid structural erection with structural steel integrity.

What type of commercial facility are you planning to construct?`,
      suggestions: [
        { label: 'Commercial Portfolio', link: '/commercial' },
        { label: 'Corporate Office Design', query: 'Tell me about office interior and construction.' },
        { label: 'Consult with Director', query: 'Connect me with your commercial projects team.' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  // 5. INTERIORS & ARCHITECTURE
  if (lower.includes('interior') || lower.includes('kitchen') || lower.includes('wardrobe') || lower.includes('living room') || lower.includes('furniture')) {
    return {
      content: `**Perfect Mason Interior Architecture** blends European functional ergonomics with timeless Indian craftsmanship:

- **Living & Dining Lounges:** Italian marble flooring, bespoke acoustic wall paneling, architectural ambient lighting.
- **Modular Kitchens:** Marine-grade ply (IS 710 BWP), soft-close Blum/Hettich hardware, quartz or polished granite worktops.
- **Bedrooms & Suites:** Custom floor-to-ceiling walk-in wardrobes with sensor illumination and upholstered finishes.
- **Commercial Interiors:** Acoustic ceiling baffles, ergonomic workstations, and executive boardroom fit-outs.

Do you need interiors for a new construction project, or an existing property?`,
      suggestions: [
        { label: 'View Interior Gallery', link: '/interiors' },
        { label: 'Construction + Interiors', query: 'Can you handle both civil construction and interiors together?' },
        { label: 'Request Interior Catalog', query: 'How do I start an interior consultation?' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  // 6. STUDIO LOCATION & IN-PERSON VISIT
  if (lower.includes('location') || lower.includes('office') || lower.includes('address') || lower.includes('where') || lower.includes('visit') || lower.includes('studio') || lower.includes('contact')) {
    return {
      content: `You are warmly invited to visit the **Perfect Mason Design Studio**:

📍 **Studio Address:**  
No: 2041, 18th Cross, AECS Layout, A Block, Hosur Main Road, Bangalore - 560068 (Near Singasandra / Kudlu Gate)

⏰ **Office Timings:**  
Monday to Saturday: **9:00 AM – 6:00 PM** (Sunday by prior appointment)

📞 **Direct Contact:**  
Phone & WhatsApp: **+91 98863 29424**  
Email: **contact@perfectmason.com**

Our senior architects and structural engineers are available for in-person project discovery sessions. Would you like to schedule an appointment?`,
      suggestions: [
        { label: 'View Interactive Map', link: '/contact' },
        { label: 'Book Studio Visit', query: 'I want to book an in-person studio visit.' },
        { label: 'Chat on WhatsApp', link: 'https://wa.me/919886329424' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  // 7. MULTILINGUAL SUPPORT (KANNADA / HINDI)
  if (lower.includes('kannada') || lower.includes('namaskara') || lower.includes('hegidira') || lower.includes('mane') || lower.includes('bengaluru')) {
    return {
      content: `ನಮಸ್ಕಾರ! **ಪರ್ಫೆಕ್ಟ್ ಮೇಸನ್ (Perfect Mason)** ಗೆ ಸ್ವಾಗತ.

ನಾವು ಬೆಂಗಳೂರಿನಲ್ಲಿ ಗುಣಮಟ್ಟದ **ರೆಸಿಡೆನ್ಶಿಯಲ್ ವಿಲ್ಲಾ ನಿರ್ಮಾಣ, ಕಮರ್ಷಿಯಲ್ ಕಟ್ಟಡಗಳು, ಟರ್ನ್‌ಕೀ ಕನ್‌ಸ್ಟ್ರಕ್ಷನ್ ಮತ್ತು ಇಂಟೀರಿಯರ್ಸ್** ಸೇವೆಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.

ನಿಮ್ಮ ಪ್ರಾಜೆಕ್ಟ್ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳಿ:
- ನೀವು ಯಾವ ಸ್ಥಳದಲ್ಲಿ ಕಟ್ಟಡ ಕಟ್ಟಲು ಯೋಜಿಸುತ್ತಿದ್ದೀರಿ?
- ಸೈಟ್ ಅಳತೆ ಎಷ್ಟು (ಉದಾ: 30×40, 40×60)?

ನಾವು ನಿಮಗೆ ಸಂಪೂರ್ಣ ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಬಜೆಟ್ ವಿವರಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ. ನಮ್ಮ ತಂಡವನ್ನು ಭೇಟಿಯಾಗಲು ನೇರವಾಗಿ **+91 98863 29424** ಗೆ ಕರೆ ಮಾಡಬಹುದು.`,
      suggestions: [
        { label: 'ವಸತಿ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು', link: '/residential' },
        { label: 'ಕಚೇರಿ ವಿಳಾಸ', link: '/contact' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  if (lower.includes('hindi') || lower.includes('namaste') || lower.includes('ghar banana') || lower.includes('makaan')) {
    return {
      content: `नमस्ते! **Perfect Mason** में आपका स्वागत है।

हम बेंगलुरु में प्रीमियम **रेजिडेंशियल विला कंस्ट्रक्शन, कमर्शियल बिल्डिंग्स, टर्नकी प्रोजेक्ट एग्जीक्यूशन और इंटीरियर्स** के विशेषज्ञ हैं।

क्या आप अपने प्रोजेक्ट के बारे में कुछ विवरण साझा करना चाहेंगे? जैसे:
- आपका प्लॉट किस इलाके में है?
- प्लॉट का साइज क्या है (उदा: 30x40, 40x60)?
- आप कब निर्माण शुरू करने की योजना बना रहे हैं?

हम आपको विस्तृत BOQ और योजना प्रदान करेंगे। आप हमारे स्टूडियो पर आने के लिए **+91 98863 29424** पर कॉल या व्हाट्सएप भी कर सकते हैं।`,
      suggestions: [
        { label: 'Residential Projects', link: '/residential' },
        { label: 'Contact Us', link: '/contact' },
      ],
      provider: 'perfect-mason-architectural-engine',
    };
  }

  // 8. GENERAL GREETING / INQUIRY START
  return {
    content: `Hello! Welcome to **Perfect Mason**. I am your dedicated AI Project Consultant.

I can assist you with:
- **Residential Construction:** Luxury villas, independent duplexes, and multi-storey residences.
- **Commercial Projects:** Offices, retail showrooms, and hospitality spaces.
- **Turnkey Execution:** Single-point accountability from 3D blueprints to handover.
- **Interior Architecture:** Bespoke joinery, modular kitchens, and turnkey interiors.
- **Bengaluru Site Assessment:** Plot area calculations (30×40, 40×60, etc.) and setback considerations.

What are you planning to build, or how can I assist with your project today?`,
    suggestions: [
      { label: 'Villas & Duplex Homes', query: 'I want to build a residential villa in Bangalore.' },
      { label: 'Commercial Buildings', query: 'Tell me about commercial construction.' },
      { label: 'Turnkey Process', query: 'How does turnkey project execution work?' },
      { label: 'Studio Office Location', query: 'Where is your office located?' },
    ],
    provider: 'perfect-mason-architectural-engine',
  };
}

// =========================================================================
// MAIN ORCHESTRATION FUNCTION
// =========================================================================
export async function processAiChat(messages) {
  // Validate messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return {
      message: {
        role: 'assistant',
        content: 'Hello! Welcome to Perfect Mason. What type of project are you planning to build?',
      },
      actionSuggestions: [
        { label: 'Residential Construction', query: 'I want to build a residential house.' },
        { label: 'Commercial Workspaces', query: 'I need commercial construction.' },
      ],
      provider: 'system',
    };
  }

  // Cap message history to latest 12 messages for performance and context safety
  const safeMessages = messages.slice(-12).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, 1500),
  }));

  // Try external LLM provider first
  try {
    const llmResult = await callExternalLlm(safeMessages);
    if (llmResult && llmResult.content) {
      // Determine relevant action suggestions based on context
      const lastUser = [...safeMessages].reverse().find((m) => m.role === 'user')?.content.toLowerCase() || '';
      let suggestions = [];

      if (lastUser.includes('villa') || lastUser.includes('house') || lastUser.includes('home')) {
        suggestions = [
          { label: 'View Residential Portfolio', link: '/residential' },
          { label: 'Estimate 30x40 Plot', query: 'What can I build on a 30x40 plot?' },
          { label: 'Book Studio Visit', query: 'I would like to book an in-person studio visit.' },
        ];
      } else if (lastUser.includes('commercial') || lastUser.includes('office') || lastUser.includes('retail')) {
        suggestions = [
          { label: 'Commercial Works', link: '/commercial' },
          { label: 'Consult with Director', query: 'How do I speak with the commercial project director?' },
        ];
      } else if (lastUser.includes('turnkey')) {
        suggestions = [
          { label: '5-Stage Turnkey Process', link: '/turnkey-project-execution' },
          { label: 'Gallery Portfolio', link: '/gallery' },
        ];
      } else {
        suggestions = [
          { label: 'Explore Services', link: '/residential' },
          { label: 'Studio Location & Map', link: '/contact' },
          { label: 'Turnkey Execution', link: '/turnkey-project-execution' },
        ];
      }

      return {
        message: {
          role: 'assistant',
          content: llmResult.content,
        },
        actionSuggestions: suggestions,
        provider: llmResult.provider,
      };
    }
  } catch (err) {
    console.warn('External LLM call failed, falling back to Perfect Mason architectural engine:', err.message);
  }

  // Fallback to built-in Architectural Consultant Engine
  const localResult = handleArchitecturalConsultant(safeMessages);
  return {
    message: {
      role: 'assistant',
      content: localResult.content,
    },
    actionSuggestions: localResult.suggestions,
    provider: localResult.provider,
  };
}
