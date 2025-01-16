import { heroImageMap } from "./heroes.js";

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
  addItem(item) {
    if (item.type === "weapon") {
      this.inventory.weapon = item; // Pokud je zbraň, nastavíme jako aktuální zbraň
    } else if (item.type === "armor") {
      this.inventory.armor = item; // Pokud je brnění, nastavíme jako aktuální brnění
    } else {
      console.warn("Předmět není typu weapon nebo armor. Nebyl přidán.");
    }
  }
  // Zobrazení inventáře
  showInventory() {
    const imgFileName = heroImageMap[this.name] || "default.png";
    const imgPath = `./pictures/heroes/${imgFileName}`;
    console.log("Generovaná cesta k obrázku:", imgPath);
    return `
    <img src="${imgPath}" alt="${this.name}" class="hero-icon" />
    <br><br>
    <u>Zbraň:</u> ${this.inventory.weapon ? this.inventory.weapon.name : "Žádná"} 
    <br>
    <u>Brnění:</u> ${this.inventory.armor ? this.inventory.armor.name : "Žádné"} 
  `;
  }
}
