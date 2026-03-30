function openModal(ph) {
  const modal = document.getElementById('phenomenonModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = `${ph.emoji || ''} ${ph.name}`;

  const sourcesHtml = ph.sources && ph.sources.length
    ? `<div class="sources">
        <h4>Источники</h4>
        <ul>
          ${ph.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('')}
        </ul>
      </div>`
    : '';

  body.innerHTML = `
    <div class="info-grid">
      <div class="info-grid-item">
        <label>Город</label>
        <value>${ph.city}</value>
      </div>
      <div class="info-grid-item">
        <label>Страна</label>
        <value>${ph.country}</value>
      </div>
    </div>
    <div>${marked.parse(ph.description)}</div>
    ${sourcesHtml}
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('phenomenonModal').classList.remove('active');
}

// Закрытие по клику на фон
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('phenomenonModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
});