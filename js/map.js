function getEmojiIcon(phenomenon) {
  const type = phenomenon.name.toLowerCase();
  let emoji = "❔";
  if (type.includes("тильзиттер") || type.includes("сыр")) emoji = "🧀";
  else if (type.includes("гамбургер")) emoji = "🍔";
  else if (type.includes("болоньезе")) emoji = "🍝";
  else if (type.includes("мокка") || type.includes("кофе")) emoji = "☕";
  else if (type.includes("портвейн") || type.includes("вино") || type.includes("шираз")) emoji = "🍷";
  else if (type.includes("балаклава")) emoji = "🥷"; // или 👽/😈
  else if (type.includes("танжерин") || type.includes("апельсин")) emoji = "🍊";
  else if (type.includes("берлинер")) emoji = "🍩";
  else if (type.includes("вена") || type.includes("wiener")) emoji = "🌭";
  // ... остальные на ваше усмотрение
  return L.divIcon({
    html: `<span style="font-size:32px;">${emoji}</span>`,
    iconSize: [36, 36],
    className: ''
  });
}

// При инициализации маркеров:
phenomena.forEach(function(ph) {
  L.marker([ph.latitude, ph.longitude], { icon: getEmojiIcon(ph) })
    .addTo(map)
    .on('click', function() {
      showModal(ph); // функция открытия модального окна из modal.js
    });
});
