// Uses native global fetch and FormData available in Node 18+

const BASE_URL = 'http://localhost:5000/api';

async function runTestSuite() {
  console.log('🧪 Starting Full PostgreSQL Backend API & Storage Test Suite...\n');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`• Testing: ${name}... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log('❌ FAILED:', err.message);
      failed++;
    }
  }

  // 1. Health
  await test('Health Check Endpoint & DB connection', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ok' || data.database !== 'perfe392') throw new Error('Invalid health payload');
  });

  // 2. Direct Storage Bucket Upload
  let uploadedFileUrl = '';
  await test('Direct PostgreSQL Storage Image Upload (Bucket: gallery)', async () => {
    const form = new FormData();
    const pngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    const blob = new Blob([pngBuffer], { type: 'image/png' });
    form.append('file', blob, 'test_architecture.png');
    form.append('bucketId', 'gallery');

    const res = await fetch(`${BASE_URL}/storage/upload`, {
      method: 'POST',
      body: form,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.fileId) throw new Error('Upload response missing success/fileId');
    uploadedFileUrl = data.url;
  });

  // 3. Projects CRUD
  let testProjectId = '';
  await test('Create Project in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Emerald Luxury Heights Test Villa',
        category: 'Residential',
        location: 'Koramangala, Bengaluru',
        scope: 'RCC frame, Turnkey Architecture & Landscaping',
        description: 'Automated test luxury estate for PostgreSQL verification.',
        image: uploadedFileUrl || '/assets/portfolio_01_residence.jpg',
        featured: true,
        areaSqFt: '14,500 Sq.Ft',
        year: '2026',
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    testProjectId = data.id;
  });

  await test('Fetch Projects from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/projects`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const found = data.find((p) => p.id === testProjectId || p.title === 'Emerald Luxury Heights Test Villa');
    if (!found) throw new Error('Created project not found in PostgreSQL');
  });

  await test('Update Project in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/projects/${testProjectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Emerald Luxury Heights Test Villa (Verified)',
        status: 'Completed',
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });

  // 4. Commercial CRUD
  let testCommId = '';
  await test('Create Commercial Item in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/commercial`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Titan Commercial Tech Logistics Hub',
        category: 'Item Rate End to End Services',
        tagline: 'High-Span Industrial & Corporate Tech Center',
        description: 'Heavy RCC structural commercial construction.',
        heroImage: uploadedFileUrl || '/assets/commercial_hero.jpg',
        capabilities: ['Post-Tensioned Slabs', 'Structural Glazing'],
        scope: ['End to End EPC Execution'],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    testCommId = data.id;
  });

  await test('Fetch Commercial Items from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/commercial`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.length === 0) throw new Error('No commercial items found');
  });

  // 5. Residential CRUD
  let testResId = '';
  await test('Create Residential Item in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/residential`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Natura Sustainable Villa',
        category: 'Eco Friendly Homes',
        tagline: 'Wire-cut brick and solar integrated residence',
        description: 'High-performance eco villa.',
        heroImage: uploadedFileUrl || '/assets/residential_hero.jpg',
        features: ['100% Itemized BOQ', 'Exposed Brick'],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    testResId = data.id;
  });

  await test('Fetch Residential Items from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/residential`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.length === 0) throw new Error('No residential items found');
  });

  // 6. Turnkey & Interiors CRUD
  let testTurnkeyId = '';
  await test('Create Turnkey Item in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/turnkey`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Complete Industrial Turnkey Facility',
        category: 'Industrial',
        tagline: 'Precision engineered industrial turnkey solution',
        description: 'Turnkey industrial plant development.',
        heroImage: uploadedFileUrl || '/assets/turnkey_hero.jpg',
        stages: ['Stage 1: Foundation', 'Stage 2: Superstructure'],
        deliverables: ['Factory Shell', 'Occupancy Certification'],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    testTurnkeyId = data.id;
  });

  await test('Fetch Turnkey Items from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/turnkey`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.length === 0) throw new Error('No turnkey items found');
  });

  let testInteriorId = '';
  await test('Create Interior Item in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/interiors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Minimalist Penthouse Interior',
        category: 'Luxury Residential',
        spaceType: 'Residential',
        tagline: 'Italian marble and bespoke walnut cabinetry',
        description: 'Luxury penthouse interior execution.',
        heroImage: uploadedFileUrl || '/assets/interior_01_living.jpg',
        materials: ['Italian Botticino', 'Veneer Paneling'],
        features: ['Smart Lighting', 'Acoustic Ceiling'],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    testInteriorId = data.id;
  });

  await test('Fetch Interior Items from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/interiors`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.length === 0) throw new Error('No interior items found');
  });

  // Reorder test
  await test('Reorder Projects in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/projects/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ id: testProjectId, displayOrder: 99 }],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });

  // 7. Blogs CRUD
  let testBlogId = '';
  await test('Create Blog Article in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'The Future of Item-Rate BOQ Architecture',
        excerpt: 'Why locked itemized estimation protects developers.',
        content: 'Full article content for testing PostgreSQL blog storage.',
        category: 'Engineering',
        coverImage: uploadedFileUrl || '/assets/portfolio_04_interior.jpg',
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    testBlogId = data.id;
  });

  await test('Fetch Blogs from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/blogs`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.length === 0) throw new Error('No blogs found');
  });

  // 7. Enquiries / Quote Leads
  let testEnqId = '';
  await test('Create Customer Quote Enquiry in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Siddharth Rao',
        phone: '+91 98451 99999',
        email: 'siddharth@example.com',
        serviceType: 'Residential Construction',
        projectType: 'Luxury Villa',
        location: 'Indiranagar, Bengaluru',
        estimatedArea: '8,000 Sq.Ft',
        budget: '₹2.5 Cr - ₹3 Cr',
        message: 'Looking for turnkey luxury construction on item-rate basis.',
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    testEnqId = data.id;
  });

  await test('Fetch Enquiries from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/enquiries`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const found = data.find((e) => e.id === testEnqId || e.name === 'Siddharth Rao');
    if (!found) throw new Error('Created enquiry not found in PostgreSQL');
  });

  await test('Update Enquiry Status in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/enquiries/${testEnqId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Contacted' }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });

  // 8. Website Settings
  await test('Fetch and Update Website Settings in PostgreSQL', async () => {
    const res1 = await fetch(`${BASE_URL}/settings`);
    if (!res1.ok) throw new Error(`HTTP ${res1.status}`);
    const settings = await res1.json();
    if (settings.companyName !== 'PERFECT MASON') throw new Error('Invalid company name in settings');

    const res2 = await fetch(`${BASE_URL}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experienceYears: '18+' }),
    });
    if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
  });

  // 9. Activity Logs
  await test('Fetch Activity Logs from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/activity`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Invalid activity logs format');
  });

  // Cleanup test items
  await test('Clean up test items from PostgreSQL', async () => {
    if (testProjectId) await fetch(`${BASE_URL}/projects/${testProjectId}`, { method: 'DELETE' });
    if (testCommId) await fetch(`${BASE_URL}/commercial/${testCommId}`, { method: 'DELETE' });
    if (testResId) await fetch(`${BASE_URL}/residential/${testResId}`, { method: 'DELETE' });
    if (testTurnkeyId) await fetch(`${BASE_URL}/turnkey/${testTurnkeyId}`, { method: 'DELETE' });
    if (testInteriorId) await fetch(`${BASE_URL}/interiors/${testInteriorId}`, { method: 'DELETE' });
    if (testBlogId) await fetch(`${BASE_URL}/blogs/${testBlogId}`, { method: 'DELETE' });
    if (testEnqId) await fetch(`${BASE_URL}/enquiries/${testEnqId}`, { method: 'DELETE' });
  });

  console.log(`\n========================================`);
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runTestSuite();
