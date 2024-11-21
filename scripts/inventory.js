export class Inventory {
  constructor() {
    this.weapon = null; 
    this.armor = null; 
  }

  // Vybavení předmětu
  equipItem(item) {
    if (item.type === "weapon") {
      this.weapon = item;
    } else if (item.type === "armor") {
      this.armor = item;
    }
  }

  // Odebrání předmětu
  removeItem(itemType) {
    if (itemType === "weapon") {
      this.weapon = null;
    } else if (itemType === "armor") {
      this.armor = null;
    }
  }

  // Získání všech vybavených předmětů
  getItems() {
    return {
      weapon: this.weapon,
      armor: this.armor,
    };
  }
}
