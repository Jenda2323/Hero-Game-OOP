export function initializeInventoryModal(game) {
  const infoButton = document.getElementById("info-btn");
  const infoModal = document.getElementById("info-modal");
  const closeModal = document.getElementById("close-info-modal");
  const characterInfo = document.getElementById("character-info");

  // Nejprve odstraníme všechny event listenery a pak přidáme nový
  infoButton.replaceWith(infoButton.cloneNode(true));
  const newInfoButton = document.getElementById("info-btn");

  newInfoButton.addEventListener("click", () => {
    if (game.hero) {
      characterInfo.innerHTML = `<strong><h3>${game.hero.name}</h3>
      </strong>${game.hero.showInventory()}<br><br>
        <u>Zdraví:</u><span style="color: red"> ${game.hero.health}/${
        game.hero.maxHealth
      }</span> HP<br>
        <u>Útok:</u> ${game.hero.attack}<br>
        <u>Obrana:</u> ${game.hero.defense}<br><br>
      `;
    } else {
      characterInfo.textContent = "Není vybrán žádný hrdina.";
    }
    infoModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    infoModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === infoModal) {
      infoModal.style.display = "none";
    }
  });
}
