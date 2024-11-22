import { Hero } from "./hero.js";

export const heroes = {
  warrior: new Hero(
    "Válečník",
    35,
    1,
    1,
    { name: "Krátký zrezlý meč (+4)", type: "weapon", attackBonus: 4 },
    { name: "Nekvalitní střední brnění (+4)", type: "armor", defenseBonus: 4 }
  ),
  mage: new Hero(
    "Mág",
    25,
    1,
    1,
    { name: "Hůl ohně (+10)", type: "weapon", attackBonus: 10},
    { name: "Novicův plášť (0)", type: "armor", defenseBonus: 0 }
  ),
  archer: new Hero(
    "Lučištník",
    30,
    1,
    1,
    { name: "Krátký luk (+6)", type: "weapon", attackBonus: 6 },
    { name: "Kožená zbroj (+2)", type: "armor", defenseBonus: 2 }
  ),
};
