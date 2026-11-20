import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { contactData } from '../../data/contactData';
import { Navigation, ExternalLink, Phone, Layers, LocateFixed, Compass } from 'lucide-react';

export const ContactMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeTileLayerRef = useRef<L.TileLayer | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');

  const { lat, lng, zoom, address, city, pincode, googleMapsUrl } = contactData.mapLocation;
  const studioTitle = 'PERFECT MASON STUDIO';

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 16,
      scrollWheelZoom: false,
      zoomControl: false,
    });

    // High reliability tile provider: OpenStreetMap standard tiles (Zero API key required, 100% visible)
    const streetTiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abc',
        maxZoom: 19,
      }
    ).addTo(map);

    activeTileLayerRef.current = streetTiles;

    // Custom Luxury Architectural Location Pin Marker
    const customIcon = L.divIcon({
      className: 'custom-perfect-mason-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer; user-select: none;">
          <!-- Floating Status Label Badge -->
          <div style="margin-bottom: 6px; padding: 4px 12px; border-radius: 9999px; background: #0F172A; color: #FFFFFF; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 1.5px solid rgba(255,255,255,0.2); display: flex; align-items: center; gap: 6px; white-space: nowrap;">
            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: #10B981; box-shadow: 0 0 8px #10B981;"></span>
            <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
              PERFECT MASON STUDIO
            </span>
          </div>

          <!-- Teardrop Location Pin Body -->
          <div style="position: relative; width: 48px; height: 58px; filter: drop-shadow(0 12px 16px rgba(15, 23, 42, 0.45));">
            <svg width="48" height="58" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 0C10.7452 0 0 10.7452 0 24C0 39.2 21.1 56.4 22.9 57.8C23.55 58.3 24.45 58.3 25.1 57.8C26.9 56.4 48 39.2 48 24C48 10.7452 37.2548 0 24 0Z" fill="#0B132B"/>
              <path d="M24 1.5C11.5736 1.5 1.5 11.5736 1.5 24C1.5 38.3 21.7 54.7 24 56.5C26.3 54.7 46.5 38.3 46.5 24C46.5 11.5736 36.4264 1.5 24 1.5Z" stroke="#F97316" stroke-width="2"/>
              <!-- Glowing Inner Hub -->
              <circle cx="24" cy="23" r="14" fill="#0F172A" stroke="#FFFFFF" stroke-width="2"/>
              <!-- Architectural Drafting Compass Glyph -->
              <path d="M24 13L28 22H20L24 13Z" fill="#F97316"/>
              <path d="M24 33L20 24H28L24 33Z" fill="#CBD5E1"/>
              <circle cx="24" cy="23" r="3" fill="#FFFFFF"/>
            </svg>
          </div>

          <!-- Pulsing Radiant Ground Wave At Point -->
          <div style="position: absolute; bottom: -8px; width: 28px; height: 10px; border-radius: 100%; background: rgba(249, 115, 22, 0.4); filter: blur(2px);"></div>
          <div style="position: absolute; bottom: -6px; width: 14px; height: 6px; border-radius: 100%; background: #0F172A;"></div>
        </div>
      `,
      iconSize: [48, 58],
      iconAnchor: [24, 58],
      popupAnchor: [0, -62],
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    // Interactive Studio Popup
    const popupContent = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 6px 8px; min-width: 220px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: #F97316;"></span>
          <span style="font-size: 10px; font-weight: 800; color: #1456D8; letter-spacing: 0.15em; text-transform: uppercase;">
            REGISTERED OFFICE & STUDIO
          </span>
        </div>
        <div style="font-size: 14px; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-bottom: 4px;">
          ${studioTitle}
        </div>
        <div style="font-size: 11px; color: #475569; line-height: 1.45; margin-bottom: 10px;">
          ${address}, ${city} ${pincode}
        </div>
        <div style="display: flex; gap: 6px;">
          <a 
            href="${googleMapsUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; background: #0F172A; color: #FFFFFF; border-radius: 9999px; font-size: 10px; font-weight: 800; letter-spacing: 0.05em; text-decoration: none;"
          >
            GET DIRECTIONS &rarr;
          </a>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, {
      className: 'pm-custom-popup',
      closeButton: true,
      autoPan: true,
    });

    // Auto open popup after map mounts
    setTimeout(() => {
      marker.openPopup();
    }, 600);

    mapInstanceRef.current = map;

    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      } catch {
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom, studioTitle, address, city, pincode, googleMapsUrl]);

  // Handle Layer Toggle (Streets vs Satellite)
  const handleToggleStyle = (style: 'streets' | 'satellite') => {
    if (!mapInstanceRef.current) return;
    setMapStyle(style);

    if (activeTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(activeTileLayerRef.current);
    }

    if (style === 'satellite') {
      const satLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; DigitalGlobe, GeoEye, Earthstar Geographics',
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current);
      activeTileLayerRef.current = satLayer;
    } else {
      const osmLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
          subdomains: 'abc',
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current);
      activeTileLayerRef.current = osmLayer;
    }
  };

  // Re-center onto the Studio Pin
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([lat, lng], 16, {
      duration: 1.2,
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-white select-none py-6">
      {/* Map Viewport Container */}
      <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] bg-slate-100 overflow-hidden">
        {/* Live Leaflet Map Container */}
        <div
          ref={mapContainerRef}
          className="w-full h-full z-10"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Soft Architectural White Gradient Edge Blends */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-20" />

        {/* Top Right Map Control Toolbar */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30 flex items-center gap-2">
          {/* Style Toggle (Streets / Satellite) */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full p-1 shadow-lg flex items-center gap-1">
            <button
              onClick={() => handleToggleStyle('streets')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                mapStyle === 'streets'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
            <button
              onClick={() => handleToggleStyle('satellite')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                mapStyle === 'satellite'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Satellite</span>
            </button>
          </div>

          {/* Re-center Button */}
          <button
            onClick={handleRecenter}
            title="Center on Perfect Mason Studio Pin"
            className="p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 hover:text-slate-950 hover:bg-slate-100 shadow-lg transition-all"
          >
            <LocateFixed className="w-4 h-4 text-orange-500" />
          </button>
        </div>

        {/* Floating Architectural Office Information Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 lg:left-14 z-30 max-w-md w-[calc(100%-3rem)] sm:w-auto"
        >
          <div className="p-6 sm:p-7 rounded-[32px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-orange-100 animate-pulse" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-950">
                  PERFECT MASON STUDIO
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ACTIVE SITE PIN
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-display text-lg font-bold text-slate-950 uppercase tracking-tight">
                PERFECT MASON HEADQUARTERS
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {address}, {city}, Karnataka {pincode}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 border-y border-slate-100/90 text-xs">
              <div>
                <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  PHONE
                </span>
                <span className="text-slate-800 font-medium">
                  {contactData.contactInfo.phone.value}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  WORKING HOURS
                </span>
                <span className="text-slate-800 font-medium">
                  Mon – Sat: 9:00 AM – 6:00 PM
                </span>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={contactData.contactInfo.phone.href}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-slate-700" />
                <span>CALL OFFICE</span>
              </a>

              <button
                onClick={handleRecenter}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-bold uppercase tracking-wider transition-all"
              >
                <LocateFixed className="w-3 h-3 text-orange-500" />
                <span>PIN</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
