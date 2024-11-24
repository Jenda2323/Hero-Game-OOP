import { Enemy } from "./enemy.js";

export const enemies = {
  goblin: new Enemy(
    "Skřet",
    12,
    7,
    2,
    "Zlomený meč (+6)",
    "Skřetí skelet (+1)"
  ),
  skeleton: new Enemy(
    "Kostlivec",
    14,
    6,
    3,
    "Mrtvolný meč (+5)",
    "Prastaré brnění (+2)"
  ),
  troll: new Enemy("Trol", 25, 10, 3, "Obří kyj (+9)", "Kostěné brnění (+2)"),
  darkGhost: new Enemy(
    "Temný duch",
    20,
    5,
    0,
    "Temný stisk (+4)",
    "Nehmotná aura (0)"
  ),
};
