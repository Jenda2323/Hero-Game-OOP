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

  battleRound() {
    // Náhodné poškození hrdiny
    const heroRawDamage = Math.floor(Math.random() * this.hero.attack) + 1;
    const realDamageToEnemy = Math.max(heroRawDamage - this.enemy.defense, 0);
    this.enemy.health = Math.max(this.enemy.health - realDamageToEnemy, 0);

    // Náhodné poškození nepřítele
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
}
