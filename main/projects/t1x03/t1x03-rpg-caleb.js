let player = {
    class: "Warrior",
    stats: { str: 1, per: 1, end: 1, cha: 1, int: 1, agi: 1, lck: 1 },
    hp: 100,
    maxHp: 100,
    gold: 0,
    level: 1,
    equipment: {
        mainHand: null, offHand: null, head: null, shoulders: null,
        chest: null, back: null, waist: null, legs: null,
        feet: null, hands: null, arms: null, necklace: null,
        ring1: null, ring2: null, earrings: null, bauble: null
    },
    inventory: []
};

let pointsRemaining = 21;
let currentEnemy = null;
let inCombat = false;

const slotNames = [
    { key: 'mainHand', label: 'Main-Hand' },
    { key: 'offHand', label: 'Off-Hand' },
    { key: 'head', label: 'Head' },
    { key: 'shoulders', label: 'Shoulders' },
    { key: 'chest', label: 'Chest' },
    { key: 'back', label: 'Back (Cape/Bag)' },
    { key: 'waist', label: 'Waist' },
    { key: 'legs', label: 'Legs' },
    { key: 'feet', label: 'Feet' },
    { key: 'hands', label: 'Hands' },
    { key: 'arms', label: 'Arms' },
    { key: 'necklace', label: 'Necklace' },
    { key: 'ring1', label: 'Ring 1' },
    { key: 'ring2', label: 'Ring 2' },
    { key: 'earrings', label: 'Earrings' },
    { key: 'bauble', label: 'Bauble' }
];

const rarityTiers = [
    { name: "Trash", weight: 50, scale: 0.5 },
    { name: "Common", weight: 30, scale: 1.0 },
    { name: "Uncommon", weight: 12, scale: 1.8 },
    { name: "Rare", weight: 5, scale: 3.0 },
    { name: "Epic", weight: 2, scale: 5.5 },
    { name: "Legendary", weight: 0.8, scale: 10.0 },
    { name: "Mythic", weight: 0.2, scale: 20.0 },
    { name: "Supreme", weight: 0.05, scale: 50.0 }
];

function adjustStat(statName, amount) {
    if (amount > 0 && pointsRemaining > 0) {
        player.stats[statName] += 1;
        pointsRemaining -= 1;
    } else if (amount < 0 && player.stats[statName] > 1) {
        player.stats[statName] -= 1;
        pointsRemaining += 1;
    }
    document.getElementById(`stat-${statName}`).innerText = player.stats[statName];
    document.getElementById('points-remaining').innerText = pointsRemaining;
}

function startGame() {
    if (pointsRemaining > 0) {
        alert("Please allocate all 21 stat points before beginning!");
        return;
    }

    player.class = document.getElementById('hero-class').value;
    player.maxHp = 50 + (player.stats.end * 15);
    player.hp = player.maxHp;

    document.getElementById('char-creation-screen').classList.add('hidden');
    document.getElementById('game-dashboard').classList.remove('hidden');

    renderEquipmentGrid();
    updateDashboard();
    logMessage(`You embark as a level 1 ${player.class}. Your journey begins.`);
}

function renderEquipmentGrid() {
    const grid = document.getElementById('equipment-grid');
    grid.innerHTML = "";
    slotNames.forEach(slot => {
        let equippedItem = player.equipment[slot.key];
        let itemName = equippedItem ? equippedItem.name : "Empty";
        grid.innerHTML += `
            <div class="equip-slot-card">
                <span><strong>${slot.label}:</strong> ${itemName}</span>
                ${equippedItem ? `<button class="item-action-btn" onclick="unequipItem('${slot.key}')">Unequip</button>` : ''}
            </div>
        `;
    });
}

function updateDashboard() {
    document.getElementById('display-class').innerText = player.class;
    document.getElementById('display-hp').innerText = player.hp;
    document.getElementById('display-max-hp').innerText = player.maxHp;
    document.getElementById('display-gold').innerText = player.gold;
    document.getElementById('display-level').innerText = player.level;

    renderEquipmentGrid();

    let baseCap = 10;
    let backItem = player.equipment.back;
    if (backItem && backItem.backpackMod) {
        if (backItem.backpackMod.type === '+') baseCap += backItem.backpackMod.val;
        if (backItem.backpackMod.type === '%') baseCap = Math.floor(baseCap * (1 + backItem.backpackMod.val));
        if (backItem.backpackMod.type === '*') baseCap = Math.floor(baseCap * backItem.backpackMod.val);
    }

    let currentCount = player.inventory.length;
    document.getElementById('capacity-indicator').innerText = `Capacity: ${currentCount}/${baseCap}`;

    if (currentCount >= baseCap * 2) {
        logMessage(`⚠️ <span style="color:#AD2831;">You are severely overencumbered! Taking constant swift damage and suffering heavy penalties!</span>`);
        player.hp = Math.max(0, player.hp - 5);
        if (player.hp === 0) {
            logMessage(`💀 You succumbed to weight and exhaustion... Game Over.`);
        }
    }

    const invContainer = document.getElementById('inventory-list');
    invContainer.innerHTML = "";
    if (player.inventory.length === 0) {
        invContainer.innerHTML = `<p class="empty-inv">Your bag is empty.</p>`;
        return;
    }

    player.inventory.forEach((item, index) => {
        invContainer.innerHTML += `
            <div class="item-card">
                <span>${item.name} (${item.rarity})</span>
                <div>
                    <button class="item-action-btn" onclick="equipItem(${index})">Equip</button>
                    <button class="item-action-btn secondary" onclick="dropItem(${index})" style="background:#AD2831;">Drop</button>
                </div>
            </div>
        `;
    });
}

function logMessage(text) {
    const log = document.getElementById('adventure-log');
    log.innerHTML += `<p>> ${text}</p>`;
    log.scrollTop = log.scrollHeight;
}

function generateLoot() {
    let totalWeight = rarityTiers.reduce((sum, t) => sum + t.weight, 0);
    let randomRoll = Math.random() * totalWeight;
    let cumulative = 0;
    let selectedTier = rarityTiers[0];

    for (let tier of rarityTiers) {
        cumulative += tier.weight;
        if (randomRoll <= cumulative) {
            selectedTier = tier;
            break;
        }
    }

    let randomSlot = slotNames[Math.floor(Math.random() * slotNames.length)];
    let baseNames = ["Iron", "Steel", "Obsidian", "Shadow", "Gilded", "Ancient", "Runed", "Etheral"];
    let baseName = baseNames[Math.floor(Math.random() * baseNames.length)] + " " + randomSlot.label;

    let item = {
        name: `${selectedTier.name} ${baseName}`,
        slotTarget: randomSlot.key,
        rarity: selectedTier.name,
        durability: 100,
        maxDurability: 100,
        modifiers: { flat: {}, percent: {}, multi: {}, abilities: [] },
        sockets: []
    };

    if (["Rare", "Epic"].includes(selectedTier.name)) item.sockets = [null];
    if (["Legendary", "Mythic"].includes(selectedTier.name)) item.sockets = [null, null];
    if (selectedTier.name === "Supreme") item.sockets = [null, null, null, null, null];

    if (randomSlot.key === 'back' && Math.random() < 0.4) {
        item.backpackMod = { type: '+', val: Math.floor(Math.random() * 8) + 2 };
    }

    return item;
}

function equipItem(index) {
    let item = player.inventory[index];
    let slot = item.slotTarget;

    if (player.equipment[slot]) {
        player.inventory.push(player.equipment[slot]);
    }

    player.equipment[slot] = item;
    player.inventory.splice(index, 1);
    logMessage(`🛡️ Equipped <span style="color:var(--accent-color);">${item.name}</span>.`);
    updateDashboard();
}

function unequipItem(slotKey) {
    let item = player.equipment[slotKey];
    if (!item) return;

    player.inventory.push(item);
    player.equipment[slotKey] = null;
    logMessage(`📦 Unequipped ${item.name} into bag.`);
    updateDashboard();
}

function dropItem(index) {
    let removed = player.inventory.splice(index, 1);
    logMessage(`🗑️ Dropped ${removed[0].name} on the ground.`);
    updateDashboard();
}

function triggerExplore() {
    if (inCombat) return;

    const roll = Math.random();
    if (roll < 0.45) {
        startCombat();
    } else if (roll < 0.8) {
        let foundGold = Math.floor(Math.random() * 20) + 10 + player.stats.lck;
        player.gold += foundGold;

        let foundItem = generateLoot();
        player.inventory.push(foundItem);

        logMessage(`✨ You discovered a chest with <span style="color:var(--accent-color);">${foundGold} gold</span> and a <strong>${foundItem.name}</strong>!`);
        updateDashboard();
    } else {
        logMessage(`🔮 You find a mysterious altar. Your spirit feels rejuvenated.`);
        player.hp = player.maxHp;
        updateDashboard();
    }
}

function restCamp() {
    if (inCombat) return;
    const healAmount = 20 + (player.stats.end * 2);
    player.hp = Math.min(player.maxHp, player.hp + healAmount);
    logMessage(`🏕️ You rested at camp and recovered <span style="color:green;">${healAmount} HP</span>.`);
    updateDashboard();
}

function startCombat() {
    inCombat = true;
    const enemies = [
        { name: "Goblin Scavenger", hp: 35, attackPower: 9 },
        { name: "Corrupted Knight", hp: 60, attackPower: 14 },
        { name: "Shadow Beast", hp: 45, attackPower: 11 }
    ];
    currentEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    document.getElementById('exploration-controls').classList.add('hidden');
    document.getElementById('combat-controls').classList.remove('hidden');

    logMessage(`⚔️ <strong>AMBUSH!</strong> A wild <strong>${currentEnemy.name}</strong> attacks!`);
}

function combatAction(action) {
    if (!inCombat) return;

    if (action === 'flee') {
        logMessage(`🏃‍♂️ You successfully fled from the battle.`);
        endCombat();
        return;
    } else if (action === 'attack') {
        let damage = Math.floor(Math.random() * 10) + 5 + (player.stats.str * 2);
        currentEnemy.hp -= damage;
        logMessage(`🗡️ You strike the ${currentEnemy.name} for <span style="color:var(--accent-color);">${damage} damage</span>.`);

        if (currentEnemy.hp <= 0) {
            let goldReward = Math.floor(Math.random() * 25) + 15;
            player.gold += goldReward;
            let droppedLoot = generateLoot();
            player.inventory.push(droppedLoot);

            logMessage(`🎉 Victory! You defeated the ${currentEnemy.name}, gained <span style="color:var(--accent-color);">${goldReward} gold</span>, and looted a <strong>${droppedLoot.name}</strong>.`);
            endCombat();
            updateDashboard();
            return;
        }
    }

    let enemyDmg = Math.max(3, currentEnemy.attackPower - Math.floor(player.stats.end * 0.4));
    player.hp -= enemyDmg;
    logMessage(`💥 The ${currentEnemy.name} retaliates for <span style="color:#AD2831;">${enemyDmg} damage</span>.`);
    updateDashboard();

    if (player.hp <= 0) {
        logMessage(`💀 You have been slain in battle... Game Over.`);
        document.getElementById('combat-controls').classList.add('hidden');
        inCombat = false;
    }
}

function endCombat() {
    inCombat = false;
    currentEnemy = null;
    document.getElementById('combat-controls').classList.add('hidden');
    document.getElementById('exploration-controls').classList.remove('hidden');
}