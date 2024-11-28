import { Enemy } from "./enemy.js";

export const enemies = {
  goblin: new Enemy(
    "Skřet",
    12,
    7,
    2,
    "Zlomený meč (+7)",
    "Skřetí skelet (+2)"
  ),
  skeleton: new Enemy(
    "Kostlivec",
    14,
    6,
    3,
    "Mrtvolný meč (+6)",
    "Prastaré brnění (+3)"
  ),
  troll: new Enemy("Trol", 25, 10, 3, "Obří kyj (+10)", "Kostěné brnění (+3)"),
  darkGhost: new Enemy(
    "Temný duch",
    20,
    5,
    0,
    "Temný stisk (+5)",
    "Nehmotná aura (0)"
  ),
};
