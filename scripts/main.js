import { heroes } from "./heroes.js";
import { enemies } from "./bestiary.js";
import { Game } from "./game.js";
import { initializeInventoryModal } from "./inventoryModal.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(heroes, enemies);

  initializeInventoryModal(game);

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
        ${game.hero.showInventory()}
      `;
      document.getElementById("start-game-btn").disabled = false;
    });
  });

  // Příběhové sekce
  document.getElementById("start-game-btn").addEventListener("click", () => {
    game.showSection("start");
  });

  document.getElementById("start-btn-1").addEventListener("click", () => {
    game.showSection("enemy-selection");
  });

  document.querySelectorAll(".enemy").forEach((button) => {
    button.addEventListener("click", () => {
      const enemyName = button.getAttribute("data-enemy");
      game.selectEnemy(enemyName);

      document.getElementById("selected-enemy").innerHTML = `
        <strong>${game.enemy.name}</strong><br>
        Zdraví: ${game.enemy.health} HP<br>
        Zbraň: ${game.enemy.weapon}<br>
        Brnění: ${game.enemy.armor}<br>
      `;
      document.getElementById("choose-enemy-btn").disabled = false;
    });
  });

  document.getElementById("choose-enemy-btn").addEventListener("click", () => {
    game.showSection("fight");

    document.querySelector(".attack-btn").onclick = () => {
      game.handleBattleRound(
        () => game.showSection("next-section"),
        () => alert("Hrdina byl poražen.")
      );
    };
  });

  document.getElementById("submit-answer-btn").addEventListener("click", () => {
    const answer = document.getElementById("puzzle-answer").value.toLowerCase();
    const puzzleResult = document.getElementById("puzzle-result");
    const puzzleResult1 = document.getElementById("puzzle-result1");

    if (answer === "čas" || answer === "time" || answer === "cas") {
      game.rewardHero();
    } else {
      puzzleResult1.textContent =
        "Špatná odpověď! Cítíš jak se ochladil vzduch. Připrav se na souboj...";

      // Nastavení zpoždění před spuštěním souboje
      setTimeout(() => {
        game.selectEnemy("darkGhost");
        game.showSection("fight");
        game.updateCombatUI();
        game.resetCombatMessages();

        document.querySelector(".attack-btn").onclick = () => {
          game.handleBattleRound(
            () => game.showSection("next-section1"),
            () => alert("Hrdina byl poražen!")
          );
        };
      }, 5000); // Zpoždění 5 sekundy
    }
  });

  document.getElementById("restart-game-btn").addEventListener("click", () => {
    location.reload();
  });
});
