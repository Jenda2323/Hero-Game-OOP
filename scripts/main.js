import { heroes } from "./heroes.js";
import { enemies } from "./bestiary.js";
import { Game } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(heroes, enemies);

  // Výběr hrdiny
  document.querySelectorAll(".hero").forEach((button) => {
    button.addEventListener("click", (event) => {
      const heroName = button.getAttribute("data-hero");
      game.selectHero(heroName);
      document.getElementById(
        "selected-hero"
      ).innerHTML = `${game.hero.name}<br>Zdraví: ${game.hero.health} HP | ${game.hero.weapon} (1-${game.hero.attack} dmg) | ${game.hero.armor} (${game.hero.defense} def)`;
      document.getElementById("start-game-btn").disabled = false;
    });
  });

  // Začátek hry
  document.getElementById("start-game-btn").addEventListener("click", () => {
    document.querySelector(".hero-selection").style.display = "none";
    document.querySelector(".start").style.display = "block";
  });

  document.getElementById("start-btn-1").addEventListener("click", () => {
    document.querySelector(".start").style.display = "none";
    document.querySelector(".enemy-selection").style.display = "block";
  });

  // Výběr nepřítele
  document.querySelectorAll(".enemy").forEach((button) => {
    button.addEventListener("click", (event) => {
      const enemyName = button.getAttribute("data-enemy");
      game.selectEnemy(enemyName);
      document.getElementById(
        "selected-enemy"
      ).innerHTML = `${game.enemy.name}<br>Zdraví: ${game.enemy.health} HP | ${game.enemy.weapon} (1-${game.enemy.attack} dmg) | ${game.enemy.armor} (${game.enemy.defense} def)`;
      document.getElementById("choose-enemy-btn").disabled = false;
    });
  });

  // Přechod na boj
  document.getElementById("choose-enemy-btn").addEventListener("click", () => {
    document.querySelector(".enemy-selection").style.display = "none";
    document.querySelector(".fight").style.display = "block";
    game.resetCombatMessages();

    document.querySelector(
      ".hero-hp"
    ).textContent = `Hrdina má: ${game.hero.health} HP`;
    document.querySelector(
      ".enemy-hp"
    ).textContent = `${game.enemy.name} má: ${game.enemy.health} HP`;
  });

  // Bojová logika
  document.querySelector(".attack-btn").addEventListener("click", () => {
    const result = game.battleRound();

    // Aktualizace zranění a stavů
    document.querySelector(
      ".damageToEnemy"
    ).textContent = `${game.enemy.name} je zraněn o ${result.realDamageToEnemy} HP`;
    document.querySelector(
      ".damageToHero"
    ).textContent = `Hrdina je zraněn o ${result.realDamageToHero} HP`;

    document.querySelector(
      ".enemy-info"
    ).textContent = `Způsobené škody: ${result.heroRawDamage} - ${game.enemy.defense} obrana = ${result.realDamageToEnemy}`;
    document.querySelector(
      ".hero-info"
    ).textContent = `Způsobené škody: ${result.enemyRawDamage} - ${game.hero.defense} obrana = ${result.realDamageToHero}`;

    // Aktualizace zdraví
    document.querySelector(
      ".hero-hp"
    ).textContent = `Hrdina má: ${result.heroHealth} HP`;
    document.querySelector(
      ".enemy-hp"
    ).textContent = `${game.enemy.name} má: ${result.enemyHealth} HP`;

    // Kontrola konce hry
    if (game.isGameOver()) {
      alert(game.isGameOver());
      document.querySelector(".attack-btn").disabled = true;
      document.getElementById("restart-game-btn").style.display = "block";
    }
  });

  // Restart hry
  document.getElementById("restart-game-btn").addEventListener("click", () => {
    location.reload();
  });
});
