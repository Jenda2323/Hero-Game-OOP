import { Enemy } from "./enemy.js";

export const enemies = {
  goblin: new Enemy("Skřet", 12, 7, 2, "Zlomený meč", "Skřetí skelet"),
  skeleton: new Enemy("Kostlivec", 14, 6, 3, "Mrtvolný meč", "Prastaré brnění"),
  troll: new Enemy("Troll", 100, 100, 100, "Mrtvolný meč", "Prastaré brnění"),
};
