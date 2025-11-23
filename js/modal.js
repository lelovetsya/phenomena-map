function showModal(ph) {
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${ph.name}</h2>
      <div>${marked.parse(ph.description)}</div>
      <button class="close-button" onclick="closeModal()">Закрыть</button>
    </div>
  `;
  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
