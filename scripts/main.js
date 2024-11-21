import { heroes } from "./heroes.js";
import { enemies } from "./bestiary.js";
import { Game } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(heroes, enemies);

  // Výběr hrdiny
  document.querySelectorAll(".hero").forEach((button) => {
    button.addEventListener("click", () => {
      const heroName = button.getAttribute("data-hero");
      game.selectHero(heroName);

      // Získání vybavení
      const equippedItems = game.hero.inventory;

      // Zobrazení informací o hrdinovi
      document.getElementById("selected-hero").innerHTML = `
      <strong>${game.hero.name}</strong><br>
      Zdraví: ${game.hero.health} HP<br>
      Útok: ${game.hero.attack}<br>
      Obrana: ${game.hero.defense}<br><br>
      <strong>Vybavení:</strong><br>
      Zbraň: ${equippedItems.weapon ? equippedItems.weapon.name : "Žádná"}<br>
      Brnění: ${equippedItems.armor ? equippedItems.armor.name : "Žádné"}
    `;
      document.getElementById("start-game-btn").disabled = false;
    });
  });

  // Začátek hry
  document.getElementById("start-game-btn").addEventListener("click", () => {
    console.log("Hra začíná!"); // Debug
    document.querySelector(".hero-selection").style.display = "none";
    document.querySelector(".start").style.display = "block";
  });

  document.getElementById("start-btn-1").addEventListener("click", () => {
    console.log("Začíná první úroveň!"); // Debug
    document.querySelector(".start").style.display = "none";
    document.querySelector(".enemy-selection").style.display = "block";
  });

  // Výběr nepřítele
  document.querySelectorAll(".enemy").forEach((button) => {
    button.addEventListener("click", (event) => {
      const enemyName = button.getAttribute("data-enemy");
      console.log(`Vybrán nepřítel: ${enemyName}`); // Debug
      game.selectEnemy(enemyName);
      document.getElementById(
        "selected-enemy"
      ).innerHTML = `${game.enemy.name}<br>Zdraví: ${game.enemy.health} HP | ${game.enemy.weapon} (1-${game.enemy.attack} dmg) | ${game.enemy.armor} (${game.enemy.defense} def)`;
      document.getElementById("choose-enemy-btn").disabled = false;
    });
  });

  // Přechod na boj
  document.getElementById("choose-enemy-btn").addEventListener("click", () => {
    console.log("Začíná boj!"); // Debug
    document.querySelector(".enemy-selection").style.display = "none";
    document.querySelector(".fight").style.display = "block";
    game.resetCombatMessages();

    document.querySelector(
      ".hero-hp"
    ).textContent = `Hrdina má: ${game.hero.health} HP`;
    document.querySelector(
      ".enemy-hp"
    ).textContent = `${game.enemy.name} má: ${game.enemy.health} HP`;
  });

  // Bojová logika
  document.querySelector(".attack-btn").addEventListener("click", () => {
    console.log("Útok proveden!"); // Debug
    const result = game.battleRound();

    // Aktualizace zranění a stavů
    document.querySelector(
      ".damageToEnemy"
    ).textContent = `${game.enemy.name} je zraněn o ${result.realDamageToEnemy} HP`;
    document.querySelector(
      ".damageToHero"
    ).textContent = `Hrdina je zraněn o ${result.realDamageToHero} HP`;

    document.querySelector(
      ".enemy-info"
    ).textContent = `Způsobené škody: ${result.heroRawDamage} - ${game.enemy.defense} obrana = ${result.realDamageToEnemy}`;
    document.querySelector(
      ".hero-info"
    ).textContent = `Způsobené škody: ${result.enemyRawDamage} - ${game.hero.defense} obrana = ${result.realDamageToHero}`;

    // Aktualizace zdraví
    document.querySelector(
      ".hero-hp"
    ).textContent = `Hrdina má: ${result.heroHealth} HP`;
    document.querySelector(
      ".enemy-hp"
    ).textContent = `${game.enemy.name} má: ${result.enemyHealth} HP`;

    // Kontrola konce hry
    if (game.isGameOver()) {
      alert(game.isGameOver());
      document.querySelector(".attack-btn").disabled = true;
      document.getElementById("restart-game-btn").style.display = "block";
    }
  });

  // Restart hry
  document.getElementById("restart-game-btn").addEventListener("click", () => {
    console.log("Restart hry!"); // Debug
    location.reload();
  });

  // Tlačítko pro informace
  const infoButton = document.getElementById("info-btn");
  const infoModal = document.getElementById("info-modal");
  const closeModal = document.getElementById("close-info-modal");
  const characterInfo = document.getElementById("character-info");

  infoButton.addEventListener("click", () => {
    if (game.hero) {
      const inventory = game.hero.showInventory();

      characterInfo.innerHTML = `
      <strong>${game.hero.name}</strong><br>
      Zdraví: ${game.hero.health} HP<br>
      Útok: ${game.hero.attack}<br>
      Obrana: ${game.hero.defense}<br><br>
      <strong>Vybavení:</strong><br>${inventory}
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
});
