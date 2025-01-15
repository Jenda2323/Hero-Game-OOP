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
        Útok: 1-${game.hero.attack}<br>
        Obrana: ${game.hero.defense}<br>
        ${game.hero.showInventory()}
      `;
      document.getElementById("start-game-btn").disabled = false;
    });
  });

  document.getElementById("enemy-info-btn").addEventListener("click", () => {
    game.showEnemyInfo();
  });

  // Příběhové sekce
  document.getElementById("start-game-btn").addEventListener("click", () => {
    game.showSection("start");
  });

  document.getElementById("start-btn-1").addEventListener("click", () => {
    game.showSection("enemy-selection");
  });

  // Vyber prvního nepřítele
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

  // První souboj
  document.getElementById("choose-enemy-btn").addEventListener("click", () => {
    game.showSection("fight");

    document.querySelector(".attack-btn").onclick = () => {
      game.handleBattleRound(
        () => game.showSection("afterBattle"),
        () => alert("Hrdina byl poražen.")
      );
    };
  });

  // Před hádankou
  document.getElementById("btn-yes").addEventListener("click", () => {
    game.showSection("next-section");
  });

  document.getElementById("btn-no").addEventListener("click", () => {
    game.showSection("next-section1");
  });

  // Hádanka
  document.getElementById("submit-answer-btn").addEventListener("click", () => {
    const answer = document.getElementById("puzzle-answer").value.toLowerCase();
    const puzzleResult1 = document.getElementById("puzzle-result1");
    const battleGhostBtn = document.getElementById("battle-ghost-btn");

    if (answer === "čas" || answer === "time" || answer === "cas") {
      game.rewardHero();
    } else {
      setTimeout(() => {
        puzzleResult1.textContent =
          "Špatná odpověď! Z truhly se vynoří stín plný nenávisti. Připrav se na souboj!";
        battleGhostBtn.style.display = "block";
      }, 1000);
      battleGhostBtn.addEventListener("click", () => {
        game.startSpecialBattle(
          "darkGhost",
          () => game.showSection("next-section1"),
          () => alert("Hrdina byl poražen!")
        );
      });
    }
  });

  document.getElementById("restart-game-btn").addEventListener("click", () => {
    location.reload();
  });

  // Obsluha dialogu s vesničanem
  document.querySelectorAll(".dialogue-option").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const villagerLine = document.getElementById("dialogue-result");
      const dialogueDiv = document.getElementById("dialogue");
      const continueBtn1 = document.getElementById("continue-btn1");

      game.handleVillagerDialogue(
        action,
        villagerLine,
        dialogueDiv,
        continueBtn1
      );

      continueBtn1.addEventListener("click", () => {
        game.showSection("next-section2");
      });
    });
  });

  // Barrier sekce
  document.querySelectorAll(".barrier-option").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const barrierResult = document.getElementById("barrier-result");
      const continueBtn = document.getElementById("continue-btn2");
      const diceBtn = document.getElementById("dice-btn");
      const diceInfo = document.getElementById("dice-info");

      // Skryjeme tlačítka po výběru akce
      document.querySelectorAll(".barrier-option").forEach((btn) => {
        btn.style.display = "none";
      });

      // Zpracování akce zátarasy
      game.handleBarrierAction(action, {
        barrierResult,
        continueBtn,
        diceBtn,
        diceInfo,
      });
    });
  });

  // Tlačítko pokračovat
  document.getElementById("continue-btn2").addEventListener("click", () => {
    game.showSection("next-section3"); // Přepnutí na další sekci
  });

  //Sber nebo Lov
  document.querySelectorAll(".eat-option").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const eatResult = document.getElementById("eat-result");
      const huntResult = document.getElementById("hunt-result");
      const collectResult = document.getElementById("collect-result");
      const huntBtn = document.getElementById("hunt-btn");
      const continueBtn = document.getElementById("continue-btn3");
      // Skryjeme tlačítka po výběru akce
      document.querySelectorAll(".eat-option").forEach((btn) => {
        btn.style.display = "none";
      });

      // Zpracování akce jidlo
      game.handleEatAction(action, {
        eatResult,
        huntResult,
        collectResult,
        huntBtn,
        continueBtn,
      });
    });
  });

  document.getElementById("continue-btn3").addEventListener("click", () => {
    console.log("Kliknutí na continueBtn3");
    game.showSection("next-section4"); // Přepnutí na další sekci
  });
});
