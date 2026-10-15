let netrunnerAlias = 'UNKNOWN';
let currentTarget = 'araska-data-farm';
let gameStatus = 'online';
let stressLevel = 'LOW';
let lastAction = 'none';
let cyberdeckModel = 'Tetratronic Rippler';
let operatingSystem = 'basic cyberdeck';
let credits = 500;
let ramCapacity = 8;
let ramUsed = 2;
let successfulBreaches = 0;
let failedBreaches = 0;
let totalBreaches = 0;
let playerLevel = 1;
let experience = 0;
let maxExperience = 100;
let humanity = 100;
let cyberpsychosis = 0;
let borgPercentage = 0;
let heartRate = 72;
let neuralLoad = 10;
let targetIndex = 0;
let selectedExploitIndex = 0;
let selectedImplantIndex = 0;
let consoleCommandCount = 0;
let recoveryCount = 0;
let breachMultiplier = 1.0;
let cyberpsychosisRate = 1.0;
let humanityMultiplier = 1.0;
let criticalChance = 0.05;
let escapeChance = 0.25;
let marketDiscount = 0.0;
let neuralEfficiency = 1.0;
let moneyMultiplier = 1.0;
let isGameActive = true;
let isConnected = true;
let stealthMode = true;
let targetSelected = false;
let breachInProgress = false;
let hasBaseCyberdeck = true;
let isFullBorg = false;
let hasEmergencyICE = false;
let saveEnabled = true;
let debugMode = false;
let hardware = {
    processor: 'basic',
    memoryType: 'DDR5 neural RAM',
    cooling: 'standard',
    interface: 'neural link',
    firmware: 'NEXUS 1.0'
};
let biometrics = {
    heartRate: 72,
    bloodOxygen: 99,
    neuralTemperature: 36.8,
    stress: 'LOW',
    humanity: 100
};
let playerStats = {
    intelligence: 10,
    stealth: 10,
    hacking: 10,
    resilience: 10,
    reputation: 0
};
let sessionStats = {
    creditsEarned: 0,
    creditsSpent: 0,
    breachesAttempted: 0,
    breachesSuccessful: 0,
    implantsInstalled: 0,
    exploitsPurchased: 0
};
class Target {
    constructor(id, name, corporation, difficulty, reward, ramCost, psychosisRisk, requiredLevel) {
        this.id = id;
        this.name = name;
        this.corporation = corporation;
        this.difficulty = difficulty;
        this.reward = reward;
        this.ramCost = ramCost;
        this.psychosisRisk = psychosisRisk;
        this.requiredLevel = requiredLevel;
        this.available = true;
    }
    getReward() {
        return Math.floor(this.reward * moneyMultiplier * breachMultiplier);
    }
    isUnlocked() {
        return playerLevel >= this.requiredLevel;
    }
}
class Exploit {
    constructor(name, description, cost, ramCost, power, psychosisReduction, owned) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.ramCost = ramCost;
        this.power = power;
        this.psychosisReduction = psychosisReduction;
        this.owned = owned;
    }
    getDisplayName() {
        return this.name + ' // RAM ' + this.ramCost;
    }
}
class Implant {
    constructor(name, slot, cost, borgGain, ramBonus, hackingBonus, psychosisGain, installed) {
        this.name = name;
        this.slot = slot;
        this.cost = cost;
        this.borgGain = borgGain;
        this.ramBonus = ramBonus;
        this.hackingBonus = hackingBonus;
        this.psychosisGain = psychosisGain;
        this.installed = installed;
    }
    getInstallText() {
        return this.installed ? 'INSTALLED' : 'INSTALL';
    }
}
let targets = [
    new Target(
        'araska-data-farm',
        'ARASAKA DATA FARM',
        'ARASAKA',
        15,
        350,
        3,
        4,
        1
    ),
    new Target(
        'militech-blacksite',
        'MILITECH BLACKSITE',
        'MILITECH',
        30,
        900,
        5,
        8,
        2
    ),
    new Target(
        'kang-tao-server',
        'KANG TAO SERVER',
        'KANG TAO',
        50,
        1800,
        7,
        12,
        3
    ),
    new Target(
        'nightcorp-mainframe',
        'NIGHT CORP MAINFRAME',
        'NIGHT CORP',
        70,
        3500,
        9,
        18,
        4
    ),
    new Target(
        'arasaka-orbital',
        'ARASAKA ORBITAL NODE',
        'ARASAKA',
        90,
        7500,
        12,
        28,
        5
    ),
    new Target(
        'blackwall-node',
        'UNKNOWN // BLACKWALL',
        '???',
        100,
        15000,
        16,
        40,
        7
    )
];
let exploits = [
    new Exploit(
        'Ping',
        'Maps nearby systems and reveals network architecture.',
        0,
        1,
        5,
        0,
        true
    ),
    new Exploit(
        'Overheat',
        'Overloads hostile cyberware and security hardware.',
        300,
        2,
        15,
        1,
        false
    ),
    new Exploit(
        'Short Circuit',
        'Electrifies a target node and bypasses basic ICE.',
        650,
        3,
        25,
        2,
        false
    ),
    new Exploit(
        'System Reset',
        'Aggressive neural attack capable of disabling hardened systems.',
        1200,
        5,
        40,
        3,
        false
    ),
    new Exploit(
        'Black ICE Killer',
        'Specialized payload designed for lethal-grade ICE.',
        3000,
        8,
        65,
        5,
        false
    ),
    new Exploit(
        'Blackwall Breach',
        'Unknown code. Unknown consequences.',
        7500,
        12,
        95,
        8,
        false
    )
];
let implants = [
    new Implant(
        'Basic Neural Link',
        'Nervous System',
        400,
        5,
        2,
        5,
        2,
        false
    ),
    new Implant(
        'Kiroshi Optics',
        'Optics',
        750,
        8,
        0,
        10,
        3,
        false
    ),
    new Implant(
        'Reflex Tuner',
        'Nervous System',
        1200,
        10,
        2,
        15,
        5,
        false
    ),
    new Implant(
        'Monowire Interface',
        'Arms',
        2200,
        12,
        3,
        20,
        7,
        false
    ),
    new Implant(
        'Synaptic Accelerator',
        'Nervous System',
        3500,
        15,
        4,
        25,
        10,
        false
    ),
    new Implant(
        'Militech Sandevistan',
        'Operating System',
        5500,
        18,
        5,
        35,
        14,
        false
    ),
    new Implant(
        'Experimental Cyberdeck',
        'Operating System',
        8000,
        22,
        8,
        45,
        18,
        false
    ),
    new Implant(
        'Full Borg Conversion',
        'Entire Body',
        15000,
        30,
        12,
        60,
        30,
        false
    )
];
let consoleLog = [
    'NEXUS OS // boot sequence complete',
    'neural interface detected',
    'ICE protocols loaded',
    'waiting for operator...'
];
const aliasInput = document.getElementById('alias-input');
const aliasButton = document.getElementById('alias-button');
const aliasOutput = document.getElementById('alias-output');
const creditsOutput = document.getElementById('credits-output');
const ramOutput = document.getElementById('ram-output');
const psychosisOutput = document.getElementById('psychosis-output');
const borgOutput = document.getElementById('borg-output');
const psychosisBar = document.getElementById('psychosis-bar');
const humanityBar = document.getElementById('humanity-bar');
const psychosisMeterText = document.getElementById('psychosis-meter-text');
const humanityMeterText = document.getElementById('humanity-meter-text');
const heartRateOutput = document.getElementById('heart-rate-output');
const neuralLoadOutput = document.getElementById('neural-load-output');
const stressOutput = document.getElementById('stress-output');
const syncOutput = document.getElementById('sync-output');
const targetGrid = document.getElementById('target-grid');
const exploitList = document.getElementById('exploit-list');
const implantList = document.getElementById('implant-list');
const exploitSelect = document.getElementById('exploit-select');
const implantSelect = document.getElementById('implant-select');
const consoleOutput = document.getElementById('console-output');
const consoleInput = document.getElementById('console-input');
const memoryTableBody = document.getElementById('memory-table-body');
const systemMessage = document.getElementById('system-message');
function initializeGame() {
    loadGame();
    renderTargets();
    renderExploits();
    renderImplants();
    populateShopMenus();
    updateAllUI();
    updateMemoryInspector();
    writeConsole('system initialization complete', 'system');
}
function updateAllUI() {
    updatePlayerUI();
    updateBiometrics();
    updateTargets();
    updateMemoryInspector();
}
function updatePlayerUI() {
    aliasOutput.textContent = netrunnerAlias;
    creditsOutput.textContent = '€$ ' + credits;
    ramOutput.textContent = ramUsed + ' / ' + ramCapacity + ' GB';
    psychosisOutput.textContent = cyberpsychosis + '%';
    borgOutput.textContent = borgPercentage + '%';
}
function updateBiometrics() {
    humanity = Math.max(0, 100 - cyberpsychosis);
    humanityBar.style.width = humanity + '%';
    psychosisBar.style.width = cyberpsychosis + '%';
    humanityMeterText.textContent = humanity + '%';
    psychosisMeterText.textContent = cyberpsychosis + '%';
    heartRate = 72 + Math.floor(cyberpsychosis * 0.65);
    neuralLoad = Math.min(100, 10 + cyberpsychosis + neuralLoad);
    if (neuralLoad > 100) {
        neuralLoad = 100;
    }
    if (cyberpsychosis < 30) {
        stressLevel = 'LOW';
    } else if (cyberpsychosis < 60) {
        stressLevel = 'MODERATE';
    } else if (cyberpsychosis < 85) {
        stressLevel = 'HIGH';
    } else {
        stressLevel = 'CRITICAL';
    }
    biometrics.heartRate = heartRate;
    biometrics.humanity = humanity;
    biometrics.stress = stressLevel;
    heartRateOutput.textContent = heartRate + ' BPM';
    neuralLoadOutput.textContent = neuralLoad + '%';
    stressOutput.textContent = stressLevel;
    syncOutput.textContent = Math.max(0, 100 - cyberpsychosis) + '%';
}
function renderTargets() {
    targetGrid.innerHTML = '';
    for (let i = 0; i < targets.length; i++) {
        let target = targets[i];
        let card = document.createElement('div');
        card.className = 'target-card';
        if (!target.isUnlocked()) {
            card.classList.add('locked');
        }
        if (i === targetIndex && targetSelected) {
            card.classList.add('selected');
        }
        let difficultyClass = 'difficulty-low';
        if (target.difficulty >= 50) {
            difficultyClass = 'difficulty-high';
        } else if (target.difficulty >= 30) {
            difficultyClass = 'difficulty-medium';
        }
        card.innerHTML =
            '<h3>' + target.name + '</h3>' +
            '<p>Corporation: ' + target.corporation + '</p>' +
            '<p>Difficulty: <span class="' + difficultyClass + '">' +
            target.difficulty + '</span></p>' +
            '<p>Reward: <span class="target-value">€$ ' +
            target.getReward() + '</span></p>' +
            '<p>RAM requirement: ' + target.ramCost + ' GB</p>' +
            '<p>Psychosis risk: +' + target.psychosisRisk + '%</p>' +
            '<p>Required level: ' + target.requiredLevel + '</p>';
        if (!target.isUnlocked()) {
            card.innerHTML += '<p>LOCKED</p>';
        }
        card.addEventListener('click', function () {
            selectTarget(i);
        });
        targetGrid.appendChild(card);
    }
}
function selectTarget(index) {
    if (!isGameActive) return;
    if (!targets[index].isUnlocked()) {
        writeConsole('access denied // insufficient level', 'warning');
        return;
    }
    targetIndex = index;
    currentTarget = targets[index].id;
    targetSelected = true;
    systemMessage.textContent =
        'Target selected: ' + targets[index].name;
    renderTargets();
    updateMemoryInspector();
    writeConsole(
        'target locked // ' + targets[index].name,
        'system'
    );
}
function renderExploits() {
    exploitList.innerHTML = '';
    for (let i = 0; i < exploits.length; i++) {
        let exploit = exploits[i];
        let card = document.createElement('div');
        card.className = 'item-card';
        let ownershipText = exploit.owned ? 'OWNED' : 'NOT OWNED';
        card.innerHTML =
            '<div class="item-card-header">' +
            '<h3>' + exploit.name + '</h3>' +
            '<span class="item-stat">' + ownershipText + '</span>' +
            '</div>' +
            '<p>' + exploit.description + '</p>' +
            '<p>RAM: ' + exploit.ramCost +
            ' // POWER: ' + exploit.power +
            ' // COST: €$ ' + exploit.cost + '</p>';
        exploitList.appendChild(card);
    }
}
function renderImplants() {
    implantList.innerHTML = '';
    for (let i = 0; i < implants.length; i++) {
        let implant = implants[i];
        let card = document.createElement('div');
        card.className = 'item-card';
        let status = implant.installed ? 'INSTALLED' : 'AVAILABLE';
        card.innerHTML =
            '<div class="item-card-header">' +
            '<h3>' + implant.name + '</h3>' +
            '<span class="item-stat">' + status + '</span>' +
            '</div>' +
            '<p>Slot: ' + implant.slot + '</p>' +
            '<p>Borg: +' + implant.borgGain +
            '% // RAM: +' + implant.ramBonus +
            ' // Hacking: +' + implant.hackingBonus + '</p>' +
            '<p>Psychosis exposure: +' +
            implant.psychosisGain + '%</p>' +
            '<p>Cost: €$ ' + implant.cost + '</p>';
        implantList.appendChild(card);
    }
}
function populateShopMenus() {
    exploitSelect.innerHTML = '';
    implantSelect.innerHTML = '';
    for (let i = 0; i < exploits.length; i++) {
        let exploit = exploits[i];
        if (!exploit.owned) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent =
                exploit.name + ' // €$ ' + exploit.cost;
            exploitSelect.appendChild(option);
        }
    }
    for (let i = 0; i < implants.length; i++) {
        let implant = implants[i];
        if (!implant.installed) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent =
                implant.name + ' // €$ ' + implant.cost;
            implantSelect.appendChild(option);
        }
    }
}
function buyExploit() {
    let index = Number(exploitSelect.value);
    let exploit = exploits[index];
    if (!exploit) return;
    if (exploit.owned) {
        writeConsole('payload already owned', 'warning');
        return;
    }
    if (credits < exploit.cost) {
        writeConsole('insufficient credits for payload', 'danger');
        return;
    }
    credits -= exploit.cost;
    exploit.owned = true;
    sessionStats.creditsSpent += exploit.cost;
    sessionStats.exploitsPurchased++;
    playerStats.hacking += exploit.power;
    writeConsole(
        'payload acquired // ' + exploit.name,
        'success'
    );
    renderExploits();
    populateShopMenus();
    updateAllUI();
    saveGame();
}
function installImplant() {
    let index = Number(implantSelect.value);
    let implant = implants[index];
    if (!implant) return;
    if (implant.installed) {
        writeConsole('implant already installed', 'warning');
        return;
    }
    if (credits < implant.cost) {
        writeConsole('insufficient credits // installation aborted', 'danger');
        return;
    }
    credits -= implant.cost;
    implant.installed = true;
    creditsSpent = implant.cost;
    ramCapacity += implant.ramBonus;
    playerStats.hacking += implant.hackingBonus;
    borgPercentage += implant.borgGain;
    cyberpsychosis += implant.psychosisGain;
    cyberpsychosis = Math.min(100, cyberpsychosis);
    sessionStats.creditsSpent += implant.cost;
    sessionStats.implantsInstalled++;
    hardware.processor = implant.name;
    writeConsole(
        'implant installed // ' + implant.name,
        'success'
    );
    renderImplants();
    populateShopMenus();
    updateAllUI();
    saveGame();
    checkCyberpsycho();
}
function executeBreach() {
    if (!isGameActive) return;
    if (!targetSelected) {
        writeConsole('no target selected', 'warning');
        return;
    }
    if (breachInProgress) {
        writeConsole('breach already executing', 'warning');
        return;
    }
    let target = targets[targetIndex];
    if (ramUsed + target.ramCost > ramCapacity) {
        writeConsole(
            'RAM overflow // breach cancelled',
            'danger'
        );
        neuralLoad = Math.min(100, neuralLoad + 10);
        updateAllUI();
        return;
    }
    breachInProgress = true;
    ramUsed += target.ramCost;
    totalBreaches++;
    sessionStats.breachesAttempted++;
    writeConsole(
        'executing breach // ' + target.name,
        'system'
    );
    setTimeout(function () {
        finishBreach(target);
    }, 700);
}
function finishBreach(target) {
    let exploitPower = getBestExploitPower();
    let hardwarePower = playerStats.hacking;
    let totalPower =
        exploitPower +
        hardwarePower +
        Math.floor(playerLevel * 5);
    let randomFactor = Math.floor(Math.random() * 25);
    let finalPower =
        totalPower +
        randomFactor;
    let success = finalPower >= target.difficulty;
    if (Math.random() < criticalChance) {
        success = true;
        finalPower += 50;
        writeConsole(
            'CRITICAL BREACH // ICE completely bypassed',
            'success'
        );
    }
    if (success) {
        successfulBreaches++;
        sessionStats.breachesSuccessful++;
        let reward = target.getReward();
        credits += reward;
        experience += target.difficulty;
        sessionStats.creditsEarned += reward;
        cyberpsychosis +=
            Math.floor(target.psychosisRisk * cyberpsychosisRate);
        playerStats.reputation += 5;
        writeConsole(
            'BREACH SUCCESS // +' + reward + ' credits',
            'success'
        );
        writeConsole(
            'neural damage detected // psychosis +' +
            target.psychosisRisk + '%',
            'warning'
        );
        checkLevelUp();
    } else {
        failedBreaches++;
        cyberpsychosis +=
            Math.floor(target.psychosisRisk * 1.5);
        neuralLoad += 15;
        writeConsole(
            'BREACH FAILED // ICE countermeasure triggered',
            'danger'
        );
        writeConsole(
            'emergency neural spike detected',
            'warning'
        );
    }
    cyberpsychosis = Math.min(100, cyberpsychosis);
    ramUsed = Math.max(2, ramUsed - target.ramCost);
    neuralLoad = Math.max(10, neuralLoad - 5);
    breachInProgress = false;
    lastAction = 'breach ' + target.id;
    updateAllUI();
    renderTargets();
    saveGame();
    checkCyberpsycho();
}
function getBestExploitPower() {
    let bestPower = 0;
    for (let i = 0; i < exploits.length; i++) {
        if (exploits[i].owned) {
            if (exploits[i].power > bestPower) {
                bestPower = exploits[i].power;
            }
        }
    }
    return bestPower;
}
function checkLevelUp() {
    while (experience >= maxExperience) {
        experience -= maxExperience;
        playerLevel++;
        maxExperience += 50;
        ramCapacity += 2;
        playerStats.hacking += 5;
        writeConsole(
            'LEVEL UP // operator level ' + playerLevel,
            'success'
        );
    }
}
function recoverFromPsychosis() {
    if (!isGameActive) return;
    let recoveryAmount = 8;
    cyberpsychosis =
        Math.max(0, cyberpsychosis - recoveryAmount);
    neuralLoad =
        Math.max(10, neuralLoad - 15);
    recoveryCount++;
    lastAction = 'breathing exercise';
    writeConsole(
        'neural recovery protocol // psychosis -' +
        recoveryAmount + '%',
        'success'
    );
    updateAllUI();
    saveGame();
}
function checkCyberpsycho() {
    if (cyberpsychosis >= 100) {
        triggerCyberpsycho();
    }
}
function triggerCyberpsycho() {
    isGameActive = false;
    isFullBorg = true;
    gameStatus = 'cyberpsycho';
    document.body.classList.add('game-over');
    systemMessage.textContent =
        'CRITICAL FAILURE // OPERATOR LOST';
    writeConsole(
        'CYBERPSYCHOSIS 100% // HUMANITY COLLAPSE',
        'danger'
    );
    writeConsole(
        'operator designation: CYBERPSYCHO',
        'danger'
    );
    writeConsole(
        'NEXUS CONNECTION TERMINATED',
        'danger'
    );
    let gameOverMessage =
        document.createElement('div');
    gameOverMessage.className =
        'game-over-message';
    gameOverMessage.id =
        'game-over-message';
    gameOverMessage.innerHTML =
        '<h2>CYBERPSYCHO EVENT</h2>' +
        '<p>Your humanity reached 0%.</p>' +
        '<p>The chrome won.</p>' +
        '<button id="reset-game-button" class="cyber-button primary-button" type="button">' +
        'RESET OPERATOR' +
        '</button>';
    document.querySelector('main').prepend(gameOverMessage);
    document
        .getElementById('reset-game-button')
        .addEventListener('click', resetGame);
}
function resetGame() {
    localStorage.removeItem('t1a06-nexus-save');
    location.reload();
}
function writeConsole(message, type) {
    let timestamp = new Date().toLocaleTimeString();
    consoleLog.push(
        '[' + timestamp + '] ' + message
    );
    if (consoleLog.length > 50) {
        consoleLog.shift();
    }
    let line = document.createElement('div');
    line.className = 'console-line ' + (type || '');
    line.textContent =
        '> ' + message;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop =
        consoleOutput.scrollHeight;
}
function runConsoleCommand() {
    let command =
        consoleInput.value.trim().toLowerCase();
    if (command === '') return;
    consoleCommandCount++;
    writeConsole(
        'operator@NEXUS:~$ ' + command,
        'system'
    );
    switch (command) {
        case 'help':
            writeConsole(
                'commands: help, status, targets, exploits, implants, clear'
            );
            break;
        case 'status':
            writeConsole(
                'alias=' + netrunnerAlias +
                ' // credits=' + credits +
                ' // psychosis=' + cyberpsychosis + '%'
            );
            break;
        case 'targets':
            for (let i = 0; i < targets.length; i++) {
                writeConsole(
                    targets[i].name +
                    ' // difficulty=' +
                    targets[i].difficulty
                );
            }
            break;
        case 'exploits':
            for (let i = 0; i < exploits.length; i++) {
                if (exploits[i].owned) {
                    writeConsole(
                        'owned payload // ' +
                        exploits[i].name
                    );
                }
            }
            break;
        case 'implants':
            for (let i = 0; i < implants.length; i++) {
                if (implants[i].installed) {
                    writeConsole(
                        'installed chrome // ' +
                        implants[i].name
                    );
                }
            }
            break;
        case 'clear':
            consoleOutput.innerHTML = '';
            break;
        default:
            writeConsole(
                'command not recognized // type help',
                'warning'
            );
            break;
    }
    consoleInput.value = '';
    updateMemoryInspector();
}
function setAlias() {
    let newAlias =
        aliasInput.value.trim();
    if (newAlias === '') {
        writeConsole(
            'invalid alias',
            'warning'
        );
        return;
    }
    netrunnerAlias =
        newAlias.toUpperCase();
    aliasOutput.textContent =
        netrunnerAlias;
    aliasInput.value = '';
    writeConsole(
        'operator alias updated // ' +
        netrunnerAlias,
        'success'
    );
    saveGame();
    updateMemoryInspector();
}
function updateMemoryInspector() {
    let memoryVariables = {
        netrunnerAlias,
        currentTarget,
        gameStatus,
        stressLevel,
        lastAction,
        cyberdeckModel,
        operatingSystem,
        credits,
        ramCapacity,
        ramUsed,
        successfulBreaches,
        failedBreaches,
        totalBreaches,
        playerLevel,
        experience,
        maxExperience,
        humanity,
        cyberpsychosis,
        borgPercentage,
        heartRate,
        neuralLoad,
        targetIndex,
        selectedExploitIndex,
        selectedImplantIndex,
        consoleCommandCount,
        recoveryCount,
        breachMultiplier,
        cyberpsychosisRate,
        humanityMultiplier,
        criticalChance,
        escapeChance,
        marketDiscount,
        neuralEfficiency,
        moneyMultiplier,
        isGameActive,
        isConnected,
        stealthMode,
        targetSelected,
        breachInProgress,
        hasBaseCyberdeck,
        isFullBorg,
        hasEmergencyICE,
        saveEnabled,
        debugMode,
        hardware,
        biometrics,
        playerStats,
        sessionStats,
        targets,
        exploits,
        implants,
        consoleLog
    };
    memoryTableBody.innerHTML = '';
    for (let variableName in memoryVariables) {
        let value = memoryVariables[variableName];
        let row =
            document.createElement('tr');
        let nameCell =
            document.createElement('td');
        let typeCell =
            document.createElement('td');
        let valueCell =
            document.createElement('td');
        nameCell.textContent =
            variableName;
        typeCell.textContent =
            getVariableType(value);
        typeCell.className =
            'memory-type';
        valueCell.textContent =
            formatMemoryValue(value);
        valueCell.className =
            'memory-value';
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(valueCell);
        memoryTableBody.appendChild(row);
    }
}
function getVariableType(value) {
    if (Array.isArray(value)) {
        return 'array';
    }
    if (value === null) {
        return 'null';
    }
    if (typeof value === 'object') {
        return 'object';
    }
    return typeof value;
}
function formatMemoryValue(value) {
    if (Array.isArray(value)) {
        return '[' +
            value.length +
            ' items]';
    }
    if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
    }
    return String(value);
}
function saveGame() {
    if (!saveEnabled) return;
    let saveData = {
        netrunnerAlias,
        credits,
        cyberpsychosis,
        borgPercentage,
        ramCapacity,
        playerLevel,
        experience,
        successfulBreaches,
        failedBreaches,
        exploits: exploits.map(function (exploit) {
            return exploit.owned;
        }),
        implants: implants.map(function (implant) {
            return implant.installed;
        })
    };
    localStorage.setItem(
        't1a06-nexus-save',
        JSON.stringify(saveData)
    );
}
function loadGame() {
    let savedData =
        localStorage.getItem(
            't1a06-nexus-save'
        );
    if (!savedData) return;
    try {
        let data =
            JSON.parse(savedData);
        netrunnerAlias =
            data.netrunnerAlias || 'UNKNOWN';
        credits =
            data.credits || 500;
        cyberpsychosis =
            data.cyberpsychosis || 0;
        borgPercentage =
            data.borgPercentage || 0;
        ramCapacity =
            data.ramCapacity || 8;
        playerLevel =
            data.playerLevel || 1;
        experience =
            data.experience || 0;
        successfulBreaches =
            data.successfulBreaches || 0;
        failedBreaches =
            data.failedBreaches || 0;
        if (Array.isArray(data.exploits)) {
            for (let i = 0; i < data.exploits.length; i++) {
                if (exploits[i]) {
                    exploits[i].owned =
                        data.exploits[i];
                }
            }
        }
        if (Array.isArray(data.implants)) {
            for (let i = 0; i < data.implants.length; i++) {
                if (implants[i]) {
                    implants[i].installed =
                        data.implants[i];
                }
            }
        }
        writeConsole(
            'previous operator state restored',
            'success'
        );
    } catch (error) {
        writeConsole(
            'save corruption detected // fresh state loaded',
            'warning'
        );
    }
}
aliasButton.addEventListener('click',setAlias);
aliasInput.addEventListener('keydown',function (event) {if (event.key === 'Enter') {setAlias();}});
document.getElementById('hack-button').addEventListener('click',executeBreach);
document.getElementById('recover-button').addEventListener('click',recoverFromPsychosis);
document.getElementById('exploit-buy-button').addEventListener('click',buyExploit);
document.getElementById('implant-buy-button').addEventListener('click',installImplant);
document.getElementById('console-button').addEventListener('click',runConsoleCommand);
consoleInput.addEventListener('keydown',function (event) {
        if (event.key === 'Enter') {
            runConsoleCommand();
        }
    }
);
setInterval(function () {
    if (!isGameActive) return;

    if (cyberpsychosis > 70) {
        neuralLoad =
            Math.min(100, neuralLoad + 1);
    }
    updateBiometrics();
    updatePlayerUI();
    updateMemoryInspector();
}, 1000);
initializeGame();
