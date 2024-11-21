export class Hero {
  constructor(name, health, attack, defense, weapon, armor) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.baseAttack = attack;
    this.baseDefense = defense;

    // Přímo nastavení vybavení
    this.inventory = {
      weapon: weapon,
      armor: armor,
    };
  }

  // Dynamické získání útoku
  get attack() {
    return (
      this.baseAttack +
      (this.inventory.weapon ? this.inventory.weapon.attackBonus : 0)
    );
  }

  // Dynamické získání obrany
  get defense() {
    return (
      this.baseDefense +
      (this.inventory.armor ? this.inventory.armor.defenseBonus : 0)
    );
  }
  heal(amount) {
   this.health = Math.min(this.health + amount, this.maxHealth); 
   return this.health;
 }
  // Změna vybavení
  equipItem(item) {
    if (item.type === "weapon") {
      this.inventory.weapon = item;
    } else if (item.type === "armor") {
      this.inventory.armor = item;
    }
  }

  // Zobrazení inventáře
  showInventory() {
    return `
      Zbraň: ${this.inventory.weapon ? this.inventory.weapon.name : "Žádná"} 
    <br>
      Brnění: ${this.inventory.armor ? this.inventory.armor.name : "Žádné"} 
    
    `;
  }
}
