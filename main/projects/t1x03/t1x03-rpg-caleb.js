let player = {
    class: "Warrior",
    stats: { str: 1, per: 1, end: 1, cha: 1, int: 1, agi: 1, lck: 1 },
    hp: 100,
    maxHp: 100,
    gold: 0,
    level: 1
};

let pointsRemaining = 21;
let currentEnemy = null;
let inCombat = false;

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

    updateDashboard();
    logMessage(`You embark as a level 1 ${player.class}. May fortune favor your blade.`);
}

function updateDashboard() {
    document.getElementById('display-class').innerText = player.class;
    document.getElementById('display-hp').innerText = player.hp;
    document.getElementById('display-max-hp').innerText = player.maxHp;
    document.getElementById('display-gold').innerText = player.gold;
    document.getElementById('display-level').innerText = player.level;
}

function logMessage(text) {
    const log = document.getElementById('adventure-log');
    log.innerHTML += `<p>> ${text}</p>`;
    log.scrollTop = log.scrollHeight;
}

function triggerExplore() {
    if (inCombat) return;

    const roll = Math.random();
    if (roll < 0.5) {
        startCombat();
    } else if (roll < 0.8) {
        const foundGold = Math.floor(Math.random() * 20) + 5 + player.stats.lck;
        player.gold += foundGold;
        logMessage(`✨ You searched an old ruin and discovered <span style="color:var(--accent-color);">${foundGold} gold pieces</span>!`);
        updateDashboard();
    } else {
        logMessage(`🔮 You stumble upon a strange glowing shrine in the woods. Your mind feels slightly sharper.`);
        player.stats.int += 1;
        updateDashboard();
    }
}

function restCamp() {
    if (inCombat) return;
    const healAmount = 15 + (player.stats.end * 2);
    player.hp = Math.min(player.maxHp, player.hp + healAmount);
    logMessage(`🏕️ You set up camp and recover <span style="color:green;">${healAmount} HP</span>.`);
    updateDashboard();
}

function startCombat() {
    inCombat = true;
    const enemies = [
        { name: "Goblin Scavenger", hp: 30, maxHp: 30, attackPower: 8 },
        { name: "Forest Bandit", hp: 45, maxHp: 45, attackPower: 12 },
        { name: "Shadow Wolf", hp: 35, maxHp: 35, attackPower: 10 }
    ];
    
    currentEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    
    document.getElementById('exploration-controls').classList.add('hidden');
    document.getElementById('combat-controls').classList.remove('hidden');

    logMessage(`⚔️ <strong>AMBUSH!</strong> A wild <strong>${currentEnemy.name}</strong> attacks you!`);
}

function combatAction(action) {
    if (!inCombat) return;

    if (action === 'flee') {
        const escapeChance = 0.4 + (player.stats.agi * 0.05);
        if (Math.random() < escapeChance) {
            logMessage(`🏃‍♂️ You successfully fled from the ${currentEnemy.name}!`);
            endCombat(false);
            return;
        } else {
            logMessage(`❌ Failed to escape! The enemy intercepts your path.`);
        }
    } else if (action === 'attack') {
        let playerDmg = Math.floor(Math.random() * 8) + 5 + Math.floor(player.stats.str * 1.5);
        currentEnemy.hp -= playerDmg;
        logMessage(`🗡️ You strike the ${currentEnemy.name} for <span style="color:var(--accent-color);">${playerDmg} damage</span>.`);

        if (currentEnemy.hp <= 0) {
            let lootGold = Math.floor(Math.random() * 15) + 10;
            player.gold += lootGold;
            logMessage(`🎉 Victory! You defeated the ${currentEnemy.name} and looted <span style="color:var(--accent-color);">${lootGold} gold</span>.`);
            endCombat(true);
            updateDashboard();
            return;
        }
    }

    let enemyDmg = Math.max(2, currentEnemy.attackPower - Math.floor(player.stats.end * 0.5));
    player.hp -= enemyDmg;
    logMessage(`💥 The ${currentEnemy.name} strikes back for <span style="color:#AD2831;">${enemyDmg} damage</span>.`);
    updateDashboard();

    if (player.hp <=  0) {
        logMessage(`💀 You have been slain in battle... Game Over. Refresh to restart.`);
        document.getElementById('combat-controls').classList.add('hidden');
        inCombat = false;
    }
}

function endCombat(won) {
    inCombat = false;
    currentEnemy = null;
    document.getElementById('combat-controls').classList.add('hidden');
    document.getElementById('exploration-controls').classList.remove('hidden');
}