let playerName = "PixelHero";
let playerLevel = 3;
let playerGold = 150.75;
let isBuffed = true;
let inventory = ["Health Potion", "Iron Dagger"];
let playerStats = {
    attack: 25,
    defense: 15
};

function renderVariables() {
    let screen = document.getElementById('var-output-screen');
    if (!screen) return;

    screen.innerHTML = `
        <strong>Player Name (String):</strong> ${playerName} <br>
        <strong>Level (Number):</strong> ${playerLevel} <br>
        <strong>Gold (Float):</strong> $${playerGold.toFixed(2)} <br>
        <strong>Buff Active (Boolean):</strong> ${isBuffed} <br>
        <strong>Inventory (Array):</strong> ${inventory.join(", ")} <br>
        <strong>Stats (Object):</strong> ATK: ${playerStats.attack} | DEF: ${playerStats.defense}
    `;
}

function gainGold() {
    playerGold += 10.50;
    playerStats.attack += 2;
    renderVariables();
}

function toggleStatus() {
    isBuffed = !isBuffed;
    renderVariables();
}

function addItemToInventory(item) {
    inventory.push(item);
    renderVariables();
}

window.addEventListener('DOMContentLoaded', () => {
    renderVariables();
});