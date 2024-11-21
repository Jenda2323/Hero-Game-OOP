export class Hero {
  constructor(name, health, attack, defense, weapon, armor) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.weapon = weapon;
    this.armor = armor;
  }

  attackEnemy(enemy) {
    const damage = Math.max(
      Math.floor(Math.random() * this.attack) + 1 - enemy.defense,
      0
    );
    enemy.health -= damage;
    return damage;
  }

  isAlive() {
    return this.health > 0;
  }
}
