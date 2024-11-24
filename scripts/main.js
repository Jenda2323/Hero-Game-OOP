import { heroes } from "./heroes.js";
import { enemies } from "./bestiary.js";
import { Game } from "./game.js";
import { initializeInventoryModal } from "./inventoryModal.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(heroes, enemies);

  // Inicializace inventáře (modální okno)
  initializeInventoryModal(game);
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
        Obrana: ${game.hero.defense}<br><br>
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

  ///-------------------------------Hádanka----------------------------------------///

  // Odpověď na hádanku
  // Funkce pro odměnu hrdiny
  function rewardHero() {
    const puzzleResult = document.getElementById("puzzle-result");

    if (game.hero.name === "Válečník") {
      game.hero.addItem({
        name: "Dlouhý meč (+5)",
        type: "weapon",
        attackBonus: 5,
      });
      alert("Získáváš Dlouhý meč (+5 útok)!");
    } else if (game.hero.name === "Lučištník") {
      game.hero.addItem({
        name: "Lehký luk (+8)",
        type: "weapon",
        attackBonus: 8,
      });
      alert("Získáváš Lehký luk (+8 útok)!");
    } else if (game.hero.name === "Mág") {
      game.hero.addItem({
        name: "Magická hůl (+11)",
        type: "weapon",
        attackBonus: 11,
      });
      alert("Získáváš Magickou hůl (+11 útok)!");
    } else {
      alert("Hrdina nemá specifickou odměnu.");
    }

    puzzleResult.textContent = "Správná odpověď! Truhla se otevírá...";
    setTimeout(() => game.showSection("reward-section"), 2000);
  }

  // Funkce pro spuštění boje při špatné odpovědi
  function startFightWithDarkGhost() {
    const puzzleResult = document.getElementById("puzzle-result");
    puzzleResult.textContent = "Špatná odpověď! Uslyšíš děsivé zvuky...";
    console.log("Nepřítel:", game.enemy);
    console.log("Sekce:", document.querySelector(".fight").style.display);
    setTimeout(() => {
      game.selectEnemy("darkGhost");
      game.updateCombatUI();
      game.resetCombatMessages();
      showSection("fight"); // Zobrazí sekci boje

      // Logika boje
      document.querySelector(".attack-btn").onclick = () => {
        game.handleBattleRound(
          () => {
            alert("Dark Ghost poražen! Pokračujte v příběhu.");
            game.showSection("next-section"); // Další část příběhu
          },
          () => {
            alert("Hrdina byl poražen. Konec hry!");
            document.getElementById("restart-game-btn").style.display = "block"; // Zviditelní restart
          }
        );
      };
    }, 20);
  }

  // Nastavení posluchače pro odeslání odpovědi
  document.getElementById("submit-answer-btn").addEventListener("click", () => {
    const answer = document.getElementById("puzzle-answer").value.toLowerCase();

    if (answer === "čas" || answer === "time" || answer === "cas") {
      rewardHero();
    } else {
      startFightWithDarkGhost();
    }
  });

  // Nastavení posluchače pro pokračování
  document.getElementById("continue-btn").addEventListener("click", () => {
    game.showSection("next-section"); // Nahraďte názvem další sekce
  });
});
