import { Hero } from "./hero.js";

export const heroes = {
  warrior: new Hero(
    "Válečník",
    35,
    7,
    4,
    "Krátký zrezlý meč",
    "Nekvalitní střední brnění"
  ),
  mage: new Hero("Mág", 25, 12, 1, "Hůl", "Novicův plášť"),
  archer: new Hero("Lučištník", 30, 9, 2, "Krátký luk", "Kožená zbroj"),
};
