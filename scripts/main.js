import { heroes } from "./heroes.js";
import { enemies } from "./bestiary.js";
import { Game } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(heroes, enemies);

  // Přepínání sekcí
  const showSection = (sectionClass) => {
    document.querySelectorAll(".game-section").forEach((section) => {
      section.style.display = "none";
    });

    const targetSection = document.querySelector(`.${sectionClass}`);
    if (targetSection) {
      targetSection.style.display = "block";
    } else {
      console.error(`Sekce "${sectionClass}" nebyla nalezena.`);
    }
  };

  // Výběr hrdiny
  document.querySelectorAll(".hero").forEach((button) => {
    button.addEventListener("click", () => {
      const heroName = button.getAttribute("data-hero");
      game.selectHero(heroName);

      document.getElementById("selected-hero").innerHTML = `
        <strong>${game.hero.name}</strong><br>
        Zdraví: ${game.hero.health} HP<br>
        Útok: ${game.hero.attack}<br>
        Obrana: ${game.hero.defense}<br>
        <strong>Inventář:</strong><br>
        ${game.hero.showInventory()}
      `;
      document.getElementById("start-game-btn").disabled = false;
    });
  });

  // Přechod na příběh
  document.getElementById("start-game-btn").addEventListener("click", () => {
    game.resetCombatMessages();
    showSection("start");
  });

  // Pokračování na výběr nepřítele
  document.getElementById("start-btn-1").addEventListener("click", () => {
    showSection("enemy-selection");
  });

  // Výběr nepřítele
  document.querySelectorAll(".enemy").forEach((button) => {
    button.addEventListener("click", () => {
      const enemyName = button.getAttribute("data-enemy");
      game.selectEnemy(enemyName);

      document.getElementById("selected-enemy").innerHTML = `
        <strong>${game.enemy.name}</strong><br>
        Zdraví: ${game.enemy.health} HP<br>
        Zbraň: ${game.enemy.weapon} | ${game.enemy.attack} Útok<br>
        Brnění: ${game.enemy.armor} | ${game.enemy.defense} Def
      `;
      document.getElementById("choose-enemy-btn").disabled = false;
    });
  });

  // Přechod na boj
  document.getElementById("choose-enemy-btn").addEventListener("click", () => {
    game.resetCombatMessages();
    showSection("fight");

    document.querySelector(".attack-btn").onclick = () => {
      game.handleBattleRound(
        () => {
          alert("Nepřítel poražen! Pokračujte v příběhu.");
          showSection("next-section");
        },
        () => {
          alert("Hrdina byl poražen. Konec hry!");
        }
      );
    };
  });

  // Tlačítko restart hry
  document.getElementById("restart-game-btn").addEventListener("click", () => {
    location.reload();
  });

  //Inventář
  document.getElementById("info-btn").addEventListener("click", () => {
    const characterInfo = document.getElementById("character-info");
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
    // Zobrazení modálního okna
    document.getElementById("info-modal").style.display = "flex";
  });

  // Zavření modálního okna
  document.getElementById("close-info-modal").addEventListener("click", () => {
    document.getElementById("info-modal").style.display = "none";
  });

  // Zajištění, aby kliknutí mimo modal zavřelo modal
  window.addEventListener("click", (event) => {
    const infoModal = document.getElementById("info-modal");
    if (event.target === infoModal) {
      infoModal.style.display = "none";
    }
  });
});
