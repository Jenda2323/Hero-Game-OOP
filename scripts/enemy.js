export class Enemy {
  constructor(name, health, attack, defense, weapon, armor) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.weapon = weapon;
    this.armor = armor;
  }

  attackHero(hero) {
    const damage = Math.max(
      Math.floor(Math.random() * this.attack) + 1 - hero.defense,
      0
    );
    hero.health -= damage;
    return damage;
  }

  isAlive() {
    return this.health > 0;
  }
}
