let player = {
    name: "Aria Shadowstrike",
    level: 12,
    gold: 1420.50,
    isGodMode: false,
    currentQuest: "Slay the Dragon"
};

let stats = {
    hp: 150,
    maxHp: 200,
    attackPower: 45.2
};

let inventory = [
    { id: 1, name: "Rusty Dagger", type: "Weapon", power: 10 },
    { id: 2, name: "Leather Tunic", type: "Armor", defense: 15 },
    { id: 3, name: "Mana Potion", type: "Consumable", potency: 50 }
];

let systemFlags = ["INITIALIZED", "DEBUG_MODE_OFF", "STABLE"];

function logToTerminal(message) {
    let term = document.getElementById('terminal-log');
    if (!term) return;
    let timestamp = new Date().toLocaleTimeString();
    term.innerHTML += `[${timestamp}] ${message}<br>`;
    term.scrollTop = term.scrollHeight;
}

function updateEngineUI() {
    let hud = document.getElementById('player-hud');
    if (hud) {
        hud.innerHTML = `
            Character: <span class="hud-highlight">${player.name}</span> | Level: <span class="hud-highlight">${player.level}</span><br>
            Gold: <span class="hud-highlight">$${player.gold.toFixed(2)}</span> | HP: <span class="hud-highlight">${stats.hp}/${stats.maxHp}</span><br>
            God Mode: <span class="hud-highlight">${player.isGodMode}</span> | Active Quest: <span class="hud-highlight">${player.currentQuest}</span>
        `;
    }

    let invGrid = document.getElementById('inventory-grid');
    if (invGrid) {
        invGrid.innerHTML = '';
        if (inventory.length === 0) {
            let emptyMsg = document.createElement('span');
            emptyMsg.className = 'inventory-empty-msg';
            emptyMsg.innerText = 'Inventory is empty.';
            invGrid.appendChild(emptyMsg);
        } else {
            inventory.forEach(item => {
                let div = document.createElement('div');
                div.className = 'inventory-item';
                div.innerText = `${item.name} (${item.type})`;
                invGrid.appendChild(div);
            });
        }
    }

    let tableBody = document.querySelector('#variable-inspector-table tbody');
    if (tableBody) {
        let memoryMap = [
            { name: "player.name", type: typeof player.name, val: player.name },
            { name: "player.level", type: typeof player.level, val: player.level },
            { name: "player.gold", type: typeof player.gold, val: player.gold.toFixed(2) },
            { name: "player.isGodMode", type: typeof player.isGodMode, val: player.isGodMode },
            { name: "stats (Object)", type: typeof stats, val: JSON.stringify(stats) },
            { name: "inventory (Array)", type: typeof inventory, val: `${inventory.length} items loaded` },
            { name: "systemFlags (Array)", type: typeof systemFlags, val: systemFlags.join(", ") }
        ];

        tableBody.innerHTML = '';
        memoryMap.forEach(row => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code>${row.name}</code></td>
                <td><span class="inspector-type-col">${row.type}</span></td>
                <td>${row.val}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

function earnGold() {
    player.gold += 25.50;
    logToTerminal(`Player mined gold. Current Gold: $${player.gold.toFixed(2)}`);
    updateEngineUI();
}

function buyItem(itemName, cost) {
    if (player.gold >= cost) {
        player.gold -= cost;
        inventory.push({ id: inventory.length + 1, name: itemName, type: "Purchased", potency: 100 });
        logToTerminal(`Success! Purchased item: ${itemName} for $${cost}.`);
    } else {
        logToTerminal(`[Warning] Not enough gold to buy ${itemName}! Needed $${cost}.`);
    }
    updateEngineUI();
}

function toggleGodMode() {
    player.isGodMode = !player.isGodMode;
    if (player.isGodMode) {
        stats.hp = 9999;
        logToTerminal(`[WARNING] God Mode ACTIVATED. HP set to 9999.`);
    } else {
        stats.hp = 150;
        logToTerminal(`God Mode deactivated. HP restored to normal.`);
    }
    updateEngineUI();
}

function triggerQuest() {
    let questList = ["Defeat the Goblin King", "Explore the Dungeon", "Find the Lost Artifact", "Save the Kingdom"];
    let randomIndex = Math.floor(Math.random() * questList.length);
    player.currentQuest = questList[randomIndex];
    player.level += 1;
    logToTerminal(`Quest updated! New Mission: "${player.currentQuest}". Level increased to ${player.level}!`);
    updateEngineUI();
}

window.addEventListener('DOMContentLoaded', () => {
    logToTerminal("DOM loaded. Injecting runtime variables into UI & Inspector...");
    updateEngineUI();
});