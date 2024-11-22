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
      return "Nepřítel vyhrál!";
    }
    if (this.enemy.health <= 0) {
      return "Hrdina vyhrál!";
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
      // Zpoždění  alertu
      setTimeout(() => {
        alert(gameOverMessage);

        if (this.hero.health <= 0) {
          // Hrdina prohrál objeví se restart button
          document.getElementById("restart-game-btn").style.display = "block";
          onDefeat();
        } else if (this.enemy.health <= 0) {
          // Hrdina vyhrál
          document.getElementById("restart-game-btn").style.display = "none";
          onVictory();
        }
      }, 100); // zpoždění
    }
  }
}
