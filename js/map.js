const appState = {
  map: null,
  phenomena: [],
  markers: []
};

async function loadPhenomena() {
  const response = await fetch('data/phenomena.json');
  appState.phenomena = await response.json();
}

function getEmojiIcon(phenomenon) {
  if (phenomenon.icon) {
    return L.icon({
      iconUrl: phenomenon.icon,
      iconSize: [40, 40],
      iconAnchor: [20, 37]
    });
  }
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.35)" />
        </filter>
      </defs>
      <path
        d="M20 3 C12 3 6 9 6 17 C6 25 13.5 31.5 18.5 36.5
           C19.1 37.1 19.5 37.5 20 37.5 C20.5 37.5 20.9 37.1 21.5 36.5
           C26.5 31.5 34 25 34 17 C34 9 28 3 20 3 Z"
        fill="#ffffff" stroke="#208080" stroke-width="2.5" filter="url(#shadow)"
      />
      <circle cx="20" cy="17" r="8"
        fill="#208080" fill-opacity="0.12" stroke="#208080" stroke-width="1.5"
      />
      <text x="20" y="20.5" text-anchor="middle" font-size="13"
        font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif"
        fill="#208080">${(phenomenon.emoji || '•')}</text>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'phenomenon-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 37]
  });
}

function initMap() {
  appState.map = L.map('map');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(appState.map);

  appState.phenomena.forEach(phenomenon => {
    const marker = L.marker([phenomenon.latitude, phenomenon.longitude], {
      icon: getEmojiIcon(phenomenon)
    }).addTo(appState.map);
    marker.on('click', () => openModal(phenomenon));
    appState.markers.push(marker);
  });

  if (appState.phenomena.length > 0) {
    const bounds = L.latLngBounds(appState.phenomena.map(ph => [ph.latitude, ph.longitude]));
    appState.map.fitBounds(bounds, { padding: [32, 32] });
    appState.map.setMaxBounds(bounds.pad(0.1));
  }
}

async function initApp() {
  await loadPhenomena();
  initMap();
}

document.addEventListener('DOMContentLoaded', initApp);