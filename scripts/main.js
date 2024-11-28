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

  //vyber prvniho nepritele
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

  //prvni souboj
  document.getElementById("choose-enemy-btn").addEventListener("click", () => {
    game.showSection("fight");

    document.querySelector(".attack-btn").onclick = () => {
      game.handleBattleRound(
        () => game.showSection("afterBattle"),
        () => alert("Hrdina byl poražen.")
      );
    };
  });

  //pred hadankou
  document.getElementById("btn-yes").addEventListener("click", () => {
    game.showSection("next-section");
  });

  document.getElementById("btn-no").addEventListener("click", () => {
    game.showSection("next-section1");
  });

  //hadanka
  document.getElementById("submit-answer-btn").addEventListener("click", () => {
    const answer = document.getElementById("puzzle-answer").value.toLowerCase();
    const puzzleResult1 = document.getElementById("puzzle-result1");

    if (answer === "čas" || answer === "time" || answer === "cas") {
      game.rewardHero();
    } else {
      puzzleResult1.textContent =
        "Špatná odpověď! Cítíš jak se ochladil vzduch. Připrav se na souboj...";

      // Nastavení zpoždění před spuštěním souboje
      setTimeout(() => {
        game.selectEnemy("darkGhost");
        game.updateCombatUI();
        game.resetCombatMessages();
        game.showSection("fight");

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

  // Obsluha dialogu s vesničanem
  document.querySelectorAll(".dialogue-option").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const villagerLine = document.getElementById("dialogue-result");
      const dialogueDiv = document.getElementById("dialogue");

      if (action === "heal") {
        if (game.hero.health < game.hero.maxHealth) {
          game.hero.health = game.hero.maxHealth; // Nastaví zdraví na maximum
          villagerLine.textContent =
            'Vesničan: "Tvá zranění jsou nyní vyléčena. Dávej na se sebe příště větší pozor"';
        } else {
          villagerLine.textContent =
            'Vesničan: "Vypadá to, že už jsi zcela zdráv."';
        }
        dialogueDiv.style.display = "none"; // Skryje možnosti dialogu
      } else if (action === "advice") {
        villagerLine.textContent =
          'Vesničan: "Tvé další kroky povedou do temného lesa. Dávej si pozor na záludné pasti a poslouchej zvuky lesa. Jestli narazíš na místo s pěti sochami bohů, vždy se ukloň k bohovi svítání "';
        dialogueDiv.style.display = "none"; // Skryje možnosti dialogu
      }
      // Po interakci se objeví tlačítko pro pokračování
      setTimeout(() => {
        const continueBtn1 = document.getElementById("continue-btn1");
        continueBtn1.style.display = "block";

        continueBtn1.addEventListener("click", () => {
          game.showSection("next-section2");
        });
      }, 2000);
    });
  });

  //Zkousky
  // Nastavení událostí pro zátarasu
  document.querySelectorAll(".barrier-option").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const barrierResult = document.getElementById("barrier-result");
      const continueBtn = document.getElementById("continue-btn2");
      const diceBtn = document.getElementById("dice-btn");
      const diceInfo = document.getElementById("dice-info");

      if (action === "courage") {
        barrierResult.textContent =
          "Rozhodl ses pro odvahu. Kámen se třese, ale zůstává stát. Dokázal jsi projít.";
        setTimeout(() => {
          continueBtn.style.display = "block";
        }, 3000);
      } else if (action === "strength") {
        barrierResult.textContent =
          "Používáš svou sílu k odstranění části kamene. Klikni na tlačítko pro hod kostkou.";
        diceBtn.style.display = "block";

        diceBtn.onclick = () => {
          const diceRoll = Math.floor(Math.random() * 6) + 1; // Hod kostkou
          if (diceRoll >= 4) {
            diceInfo.textContent = `Hodil jsi ${diceRoll}! Podařilo se ti prorazit zátarasu bez zranění.`;
          } else {
            const damage = 4; // Poškození při neúspěchu
            game.hero.health -= damage;
            diceInfo.textContent = `Hodil jsi ${diceRoll}. Podařilo se ti prorazit zátarasu, ale utrpěl jsi ${damage} zranění.`;

            // Kontrola zdraví hrdiny
            if (game.hero.health <= 0) {
              setTimeout(() => game.isGameOverStory(), 3000);
              return;
            }
          }
          // Skrytí tlačítka po hodu
          diceBtn.style.display = "none";

          // Zobrazení tlačítka pokračování
          setTimeout(() => {
            continueBtn.style.display = "block";
          }, 3000);
        };
      } else if (action === "wisdom") {
        const answer = prompt(
          "Runy září a hlas ti pokládá otázku: Můžeš mě slyšet, ale nikdy nevidět. Jsem ti blíž, čím víc utíkáš. Co jsem?"
        ).toLowerCase();
        if (answer === "vítr" || answer === "vitr" || answer === "wind") {
          barrierResult.textContent =
            "Odpověděl jsi správně. Runy zmizely a zátarasa se otevřela.";
          setTimeout(() => {
            continueBtn.style.display = "block";
          }, 3000);
        } else {
          barrierResult.innerHTML =
            "Špatná odpověď! Z run vystřelila přímo proti tobě ohnivá koule a způsobila ti zranění <strong>7 životů</strong>";
          game.hero.health -= 7;
          if (game.hero.health <= 0) {
            setTimeout(() => game.isGameOverStory(), 5000);
          } else {
            setTimeout(() => {
              continueBtn.style.display = "block";
            }, 3000);
          }
        }
      }
    });
  });

  // Tlačítko pokračovat
  document.getElementById("continue-btn2").addEventListener("click", () => {
    game.showSection("next-section3"); // Nahraďte dalším oddílem příběhu
  });

  // Pokračování po zátarase
});
