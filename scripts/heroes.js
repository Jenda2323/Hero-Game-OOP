import { Hero } from "./hero.js";

export const heroes = {
  warrior: new Hero(
    "Válečník",
    35,
    0,
    0,
    { name: "Krátký zrezlý meč (+5)", type: "weapon", attackBonus: 5 },
    { name: "Nekvalitní střední brnění (+5)", type: "armor", defenseBonus: 5 }
  ),
  mage: new Hero(
    "Mág",
    25,
    0,
    0,
    { name: "Hůl ohně (+11)", type: "weapon", attackBonus: 11},
    { name: "Novicův plášť (+1)", type: "armor", defenseBonus: 1 }
  ),
  archer: new Hero(
    "Lučištník",
    30,
    0,
    0,
    { name: "Krátký luk (+8)", type: "weapon", attackBonus: 8 },
    { name: "Kožená zbroj (+3)", type: "armor", defenseBonus: 3 }
  ),
};

export const heroImageMap = {
  Válečník: "warrior.png",
  Mág: "mage.png",
  Lučištník: "archer.png",
};

