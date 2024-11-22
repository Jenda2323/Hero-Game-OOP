export function initializeInventoryModal(game) {
  const infoButton = document.getElementById("info-btn");
  const infoModal = document.getElementById("info-modal");
  const closeModal = document.getElementById("close-info-modal");
  const characterInfo = document.getElementById("character-info");

  // Zobrazení modálního okna
  infoButton.addEventListener("click", () => {
    if (game.hero) {
      characterInfo.innerHTML = `
        <strong>${game.hero.name}</strong><br>
        Zdraví: ${game.hero.health}/${game.hero.maxHealth} HP<br>
        Útok: ${game.hero.attack}<br>
        Obrana: ${game.hero.defense}<br><br>
        <strong>Inventář:</strong><br>${game.hero.showInventory()}
      `;
    } else {
      characterInfo.textContent = "Není vybrán žádný hrdina.";
    }
    infoModal.style.display = "flex";
  });

  // Zavření modálního okna
  closeModal.addEventListener("click", () => {
    infoModal.style.display = "none";
  });

  // Zavření kliknutím mimo obsah
  window.addEventListener("click", (event) => {
    if (event.target === infoModal) {
      infoModal.style.display = "none";
    }
  });
}
