export class Game {
  constructor(heroes, enemies) {
    this.heroes = heroes;
    this.enemies = enemies;
    this.hero = null;
    this.enemy = null;
  }

  selectHero(heroName) {
    this.hero = this.heroes[heroName];
  }

  selectEnemy(enemyName) {
    this.enemy = this.enemies[enemyName];
  }

  showEnemyInfo() {
    if (this.enemy) {
      alert(
        `Nepřítel: ${this.enemy.name}\n` +
          `Zdraví: ${this.enemy.health} HP\n` +
          `Útok: 1-${this.enemy.attack} dmg\n` +
          `Obrana: ${this.enemy.defense}\n` +
          `Zbraň: ${this.enemy.weapon}\n` +
          `Brnění: ${this.enemy.armor}`
      );
    } else {
      alert("Nepřítel nebyl nalezen.");
    }
  }

  resetCombatMessages() {
    document.querySelector(".damageToEnemy").textContent = "";
    document.querySelector(".damageToHero").textContent = "";
    document.querySelector(".hero-info").textContent = "";
    document.querySelector(".enemy-info").textContent = "";
  }

  updateCombatUI() {
    document.querySelector(
      ".hero-hp"
    ).textContent = `Hrdina má: ${this.hero.health} HP`;
    document.querySelector(
      ".enemy-hp"
    ).textContent = `${this.enemy.name} má: ${this.enemy.health} HP`;
  }

  battleRound() {
    const heroRawDamage = Math.floor(Math.random() * this.hero.attack) + 1;
    const realDamageToEnemy = Math.max(heroRawDamage - this.enemy.defense, 0);
    this.enemy.health = Math.max(this.enemy.health - realDamageToEnemy, 0);

    const enemyRawDamage = Math.floor(Math.random() * this.enemy.attack) + 1;
    const realDamageToHero = Math.max(enemyRawDamage - this.hero.defense, 0);
    this.hero.health = Math.max(this.hero.health - realDamageToHero, 0);

    return {
      heroRawDamage,
      enemyRawDamage,
      realDamageToHero,
      realDamageToEnemy,
      heroHealth: this.hero.health,
      enemyHealth: this.enemy.health,
    };
  }

  isGameOver() {
    if (this.hero.health <= 0) {
      return "Nepřítel vyhrál a ty končíš v tomhle dobrodružství";
    }
    if (this.enemy.health <= 0) {
      return "Hrdina vyhrál! Pokračuj v příběhu";
    }
    return false;
  }

  handleBattleRound(onVictory, onDefeat) {
    const result = this.battleRound();

    // Aktualizace UI pro zranění a stavy
    document.querySelector(
      ".damageToEnemy"
    ).textContent = `${this.enemy.name} je zraněn o ${result.realDamageToEnemy} HP`;
    document.querySelector(
      ".damageToHero"
    ).textContent = `Hrdina je zraněn o ${result.realDamageToHero} HP`;

    document.querySelector(".enemy-info").textContent = `
      Způsobené škody: ${result.heroRawDamage} - ${this.enemy.defense} obrana = ${result.realDamageToEnemy}`;
    document.querySelector(".hero-info").textContent = `
      Způsobené škody: ${result.enemyRawDamage} - ${this.hero.defense} obrana = ${result.realDamageToHero}`;

    this.updateCombatUI();

    const gameOverMessage = this.isGameOver();
    if (gameOverMessage) {
      setTimeout(() => {
        alert(gameOverMessage);

        if (this.hero.health <= 0) {
          document.getElementById("restart-game-btn").style.display = "block";
          onDefeat();
        } else if (this.enemy.health <= 0) {
          document.getElementById("restart-game-btn").style.display = "none";
          onVictory();
        }
      }, 100);
    }
  }

  showSection(sectionClass) {
    document.querySelectorAll(".game-section").forEach((section) => {
      section.style.display = "none";
    });

    const targetSection = document.querySelector(`.${sectionClass}`);
    if (targetSection) {
      targetSection.style.display = "block";
    } else {
      console.error(`Sekce "${sectionClass}" nebyla nalezena.`);
    }
  }

  rewardHero() {
    const puzzleResult = document.getElementById("puzzle-result");
    const puzzleResult1 = document.getElementById("puzzle-result1");
    const continueBtn = document.getElementById("continue-btn");

    if (!puzzleResult || !puzzleResult1 || !continueBtn) {
      console.error("Některé DOM prvky pro odměnu chybí!");
      return;
    }

    let rewardMessage = "";

    if (this.hero.name === "Válečník") {
      this.hero.addItem({
        name: "Dlouhý meč (+6)",
        type: "weapon",
        attackBonus: 6,
      });
      rewardMessage = "Získáváš Dlouhý meč (+6 útok)!";
    } else if (this.hero.name === "Lučištník") {
      this.hero.addItem({
        name: "Lehký luk (+9)",
        type: "weapon",
        attackBonus: 9,
      });
      rewardMessage = "Získáváš Lehký luk (+9 útok)!";
    } else if (this.hero.name === "Mág") {
      this.hero.addItem({
        name: "Magická hůl (+12)",
        type: "weapon",
        attackBonus: 12,
      });
      rewardMessage = "Získáváš Magickou hůl (+12 útok)!";
    } else {
      alert("Hrdina nemá specifickou odměnu.");
      return;
    }

    puzzleResult.textContent = "Správná odpověď! Truhla se otevírá...";
    setTimeout(() => {
      puzzleResult1.textContent = rewardMessage;
    }, 4000);
    setTimeout(() => {
      continueBtn.style.display = "block";
    }, 5000);

    continueBtn.addEventListener("click", () => {
      this.showSection("next-section1");
    });
  }
}
