import { Enemy } from "./enemy.js";

export const enemies = {
  goblin: new Enemy("Skřet", 12, 7, 2, "Zlomený meč", "Skřetí skelet"),
  skeleton: new Enemy("Kostlivec", 14, 6, 3, "Mrtvolný meč", "Prastaré brnění"),
  troll: new Enemy("Trol", 25, 10, 3, "Obří kyj", "Kostěné brnění"),
  darkGhost: new Enemy("Temný duch", 20, 5, 0, "Temný stisk", "Nehmotná aura"),
};
