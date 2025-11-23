// Используем emoji из phenomena.json для маркера
function getEmojiIcon(phenomenon) {
  const emoji = phenomenon.emoji || "❔";
  return L.divIcon({
    html: `<span style="font-size:32px;">${emoji}</span>`,
    iconSize: [36, 36],
    className: ''
  });
}

// Инициализация карты после загрузки данных
function initMap() {
  appState.map = L.map('map');

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(appState.map);

  // Добавляем маркеры
  appState.phenomena.forEach(phenomenon => {
    const marker = L.marker([phenomenon.latitude, phenomenon.longitude], {
      icon: getEmojiIcon(phenomenon)
    }).addTo(appState.map);
    marker.on('click', () => openModal(phenomenon));
    appState.markers.push(marker);
  });

  // Ограничиваем область карты по явлениям + чуть отступаем (паддинг)
  if (appState.phenomena.length > 0) {
    const bounds = L.latLngBounds(appState.phenomena.map(ph => [ph.latitude, ph.longitude]));
    appState.map.fitBounds(bounds, { padding: [32, 32] });
    const expandedBounds = bounds.pad(0.1); // расширяем границы на 10%
    appState.map.setMaxBounds(expandedBounds);
  }
}

// Вызовите после загрузки phenomena
async function initApp() {
  await loadPhenomena(); // функция загрузки данных
  initMap();
}

document.addEventListener('DOMContentLoaded', initApp);
