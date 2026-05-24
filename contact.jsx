// contact.jsx — Contact page composition

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#00b8e6", "#060d18", "#f5f5f7"],
  "faceStyle": "solid",
  "heroPace": "medium",
  "density": "regular",
  "motion": "moderate"
}/*EDITMODE-END*/;

const PALETTES = [
  ["#00b8e6", "#060d18", "#f5f5f7"],
  ["#0ea5c9", "#091520", "#fbfbfd"],
  ["#0cb4d4", "#0b1219", "#f4f4f5"],
  ["#1fb6cc", "#0a1626", "#f2eee5"],
  ["#b89968", "#10141d", "#f1ece1"],
  ["#3a6df0", "#0a1020", "#eef2f8"],
  ["#c1462e", "#10100e", "#f4ede0"],
  ["#1f7a5a", "#0a1410", "#eef3ec"],
];

const PALETTE_SPECS = {
  "#00b8e6|#060d18|#f5f5f7": { ink2: "#0a1424", ink3: "#101e33", paper2: "#e5e5ea", rgba: "220,228,240", accent2: "#b89460" },
  "#0ea5c9|#091520|#fbfbfd": { ink2: "#0e1d2d", ink3: "#152639", paper2: "#f0f0f2", rgba: "230,234,242", accent2: "#b89a5e" },
  "#0cb4d4|#0b1219|#f4f4f5": { ink2: "#111a24", ink3: "#192433", paper2: "#e4e4e7", rgba: "215,225,235", accent2: "#b8975a" },
};

function applyPalette(palette, motion) {
  const [accent, ink, paper] = palette;
  const r = document.documentElement;
  r.style.setProperty("--accent", accent);
  r.style.setProperty("--ok", accent);
  r.style.setProperty("--ink", ink);
  r.style.setProperty("--paper", paper);
  const spec = PALETTE_SPECS[`${accent}|${ink}|${paper}`];
  if (spec) {
    r.style.setProperty("--ink-2",   spec.ink2);
    r.style.setProperty("--ink-3",   spec.ink3);
    r.style.setProperty("--paper-2", spec.paper2);
    r.style.setProperty("--accent-2", spec.accent2);
    r.style.setProperty("--line",    `rgba(${spec.rgba}, 0.07)`);
    r.style.setProperty("--line-2",  `rgba(${spec.rgba}, 0.14)`);
    r.style.setProperty("--mute",    `rgba(${spec.rgba}, 0.58)`);
    r.style.setProperty("--mute-2",  `rgba(${spec.rgba}, 0.38)`);
  } else {
    ["--ink-2","--ink-3","--paper-2","--accent-2","--line","--line-2","--mute","--mute-2"].forEach((v) => r.style.removeProperty(v));
  }
  r.style.setProperty("--motion-on", motion === "off" ? "0" : "1");
}

const LOCATIONS = [
  { id: "L01", name: "Dubai", title: "Middle East", address: "Pitchfact Technologies LLC FZ\n6th Floor, Meydan Grandstand,\nMeydan Road, Nad Al Sheba,\nDubai, U.A.E", mapsLink: "https://maps.google.com/?q=Meydan+Grandstand+Dubai", lat: 25.1565, lng: 55.3033 },
  { id: "L02", name: "Gurgaon", title: "South Asia", address: "TOWER J FL.NO 306, WEMBLEY ESTATE ROSEWOOD, Gurgaon, GURGAON, Gurgaon, Gurgaon- 122018, Haryana, India", mapsLink: "https://maps.google.com/?q=Wembley+Estate+Gurgaon", lat: 28.4116, lng: 77.0620 },
  { id: "L03", name: "Bengaluru", title: "Government & Enterprise", address: "Block E , # 403, Grand Edifice\nHoskote, Bengaluru : 562114", mapsLink: "https://maps.google.com/?q=Grand+Edifice+Hoskote+Bengaluru", lat: 13.0713, lng: 77.7981 },
  { id: "L04", name: "Kochi", title: "Data & Cloud", address: "Infopark Phase 1, Kakkanad", mapsLink: "https://maps.google.com/?q=Infopark+Kochi", lat: 10.0093, lng: 76.3571 },
];

function LocationPointer({ loc, accent }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid var(--line-2)",
        borderRadius: 16,
        padding: "24px 28px",
        background: hovered ? "var(--ink-3)" : "var(--ink-2)",
        transition: "all 0.3s ease",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minHeight: 160,
        overflow: "hidden",
        position: "relative"
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--paper)"
        }}>
          {loc.name}
        </div>
        <span className="mono" style={{ fontSize: 11, color: "var(--mute-2)", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "right" }}>
          {loc.title}
        </span>
      </div>

      <div style={{
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        opacity: 1,
        transform: "none",
        pointerEvents: "auto"
      }}>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--mute)", textWrap: "pretty", whiteSpace: "pre-line" }}>
          {loc.address}
        </div>
        <a 
          href={loc.mapsLink} 
          target="_blank"
          style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", color: accent, display: "flex", alignItems: "center", gap: 6
          }}
        >
          Get directions <span>→</span>
        </a>
      </div>
    </div>
  );
}

function useGoogleMapsApi() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?v=quarterly&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);
  return loaded;
}

function LocationsMap({ locations, accent }) {
  const isLoaded = useGoogleMapsApi();
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState(null);

  React.useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach(loc => bounds.extend({ lat: loc.lat, lng: loc.lng }));

      const m = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20, lng: 60 },
        zoom: 3,
        mapTypeId: "roadmap",
        backgroundColor: "#0a1626",
        disableDefaultUI: true,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#0a1626" }] },
          { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "rgba(238, 242, 248, 0.38)" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0a1626" }] },
          { featureType: "administrative", elementType: "geometry", stylers: [{ color: "rgba(238, 242, 248, 0.07)" }] },
          { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "rgba(238, 242, 248, 0.14)" }] },
          { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#0a1626" }] },
          { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ color: "#0f1d31" }] },
          { featureType: "poi", elementType: "geometry", stylers: [{ color: "#0f1d31" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "rgba(238, 242, 248, 0.07)" }] },
          { featureType: "transit", elementType: "geometry", stylers: [{ color: "#0f1d31" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#060d18" }] },
          { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "rgba(238, 242, 248, 0.14)" }] }
        ],
      });
      m.fitBounds(bounds, { left: 50, right: 50, top: 50, bottom: 50 });
      setMap(m);
    }
  }, [isLoaded, mapRef, map, locations]);

  React.useEffect(() => {
    if (!map) return;
    const markers = [];
    let activeInfoWindow = null;

    locations.forEach(loc => {
      const marker = new window.google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: accent,
          fillOpacity: 1,
          strokeColor: '#0a1626',
          strokeWeight: 2,
        },
        title: loc.name
      });

      const contentString = `
        <div style="color: #0a1626; font-family: 'Space Grotesk', sans-serif; padding: 12px 8px 4px; min-width: 220px;">
          <div style="font-size: 18px; font-weight: 500; letter-spacing: -0.01em; margin-bottom: 4px;">${loc.name}</div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #666; margin-bottom: 12px;">${loc.title}</div>
          <div style="font-size: 13px; line-height: 1.5; color: #333;">${loc.address}</div>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: true,
      });

      marker.addListener("mouseover", () => {
        if (activeInfoWindow) activeInfoWindow.close();
        infoWindow.open({
          anchor: marker,
          map,
        });
        activeInfoWindow = infoWindow;
      });

      marker.addListener("mouseout", () => {
        infoWindow.close();
      });

      markers.push(marker);
    });

    return () => {
      markers.forEach(m => m.setMap(null));
    };
  }, [map, locations, accent]);

  return (
    <div 
      style={{ 
        width: "100%", 
        height: 480, 
        borderTop: "1px solid var(--line-2)", 
        borderBottom: "1px solid var(--line-2)",
        position: "relative",
        background: "var(--ink-2)",
        overflow: "hidden"
      }}
    >
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

function ContactApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accent = t.palette[0];

  React.useEffect(() => {
    applyPalette(t.palette, t.motion);
    document.documentElement.setAttribute("data-motion", t.motion);
  }, [t.palette, t.motion]);

  return (
    <>
      <Nav faceStyle={t.faceStyle} accent={accent} />
      
      {/* Contact Hero */}
      <section className="section" style={{ padding: "80px 0 40px", borderTop: 0 }}>
        <div className="wrap">
          <span className="tag">08 · Engage</span>
          <h1 className="display" style={{ fontSize: "clamp(48px, 7vw, 96px)", marginTop: 24, marginBottom: 24 }}>
            Start a <span className="serif-italic" style={{ color: accent }}>conversation.</span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: "var(--mute)", maxWidth: 640, textWrap: "pretty" }}>
            Reach out to our partners or interact with our digital concierge, Pitch. We operate from four distinct studios globally.
          </p>
        </div>
      </section>

      {/* Dual Column Layout: ChatBot + Addresses */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 120 }}>
        <div className="wrap">
          <div className="contact-layout-grid">
            {/* Left: Chatbot */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: accent, boxShadow: `0 0 8px ${accent}` }}></span>
                Digital Concierge
              </div>
              <ChatBot accent={accent} faceStyle={t.faceStyle} />
            </div>

            {/* Right: Locations */}
            <div>
              <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                 <span style={{ width: 6, height: 6, borderRadius: 999, background: accent, boxShadow: `0 0 8px ${accent}` }}></span>
                 Studios & Offices
              </div>
              <div className="contact-locations-grid">
                {LOCATIONS.map(loc => (
                  <LocationPointer key={loc.id} loc={loc} accent={accent} />
                ))}
              </div>
              
              <div style={{
                marginTop: 40,
                borderTop: "1px solid var(--line)",
                paddingTop: 32
              }}>
                 <h3 className="display" style={{ fontSize: 24, marginBottom: 16 }}>Direct Inquiries</h3>
                 <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
                    <div>
                      <div className="mono" style={{ fontSize: 10, color: "var(--mute)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>New Engagements</div>
                      <a href="mailto:sales@pitchfact.co" style={{ fontSize: 15, color: "var(--paper)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = "var(--paper)"}>sales@pitchfact.co</a>
                    </div>
                    <div>
                      <div className="mono" style={{ fontSize: 10, color: "var(--mute)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Media & Press</div>
                      <a href="mailto:tech@pitchfact.co" style={{ fontSize: 15, color: "var(--paper)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = "var(--paper)"}>tech@pitchfact.co</a>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-width interactive map */}
      <LocationsMap locations={LOCATIONS} accent={accent} />

      {/* Try reusing Footer if it's exposed, but we saw it in app.jsx. Is Footer in sections.jsx? */}
      {typeof Footer !== "undefined" && <Footer accent={accent} faceStyle={t.faceStyle} />}


    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<ContactApp />);
