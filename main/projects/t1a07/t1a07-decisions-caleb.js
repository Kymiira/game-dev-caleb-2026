'use strict';

// --- Example 1: Multi-branch if / else if / else ---
const ticketsInput = document.getElementById('ticketsInput');
const ticketButton = document.getElementById('ticketButton');
const ticketOutput = document.getElementById('ticketOutput');

function checkTickets() {
    const tickets = Number(ticketsInput.value);

    // Error handling decision
    if (isNaN(tickets) || tickets < 0) {
        ticketOutput.textContent = 'Invalid input! Please enter a positive number of tickets.';
        return;
    }

    let prize = '';

    // Multi-branch conditional logic
    if (tickets >= 500) {
        prize = 'Grand Prize: Nintendo Switch / Console!';
    } else if (tickets >= 250) {
        prize = 'Medium Prize: Giant Plush Toy!';
    } else if (tickets >= 100) {
        prize = 'Small Prize: Board Game or Toy!';
    } else if (tickets >= 50) {
        prize = 'Basic Prize: Candy and Stickers!';
    } else {
        prize = 'No prize yet. Keep playing to earn more tickets!';
    }

    ticketOutput.textContent = `With ${tickets} tickets -> ${prize}`;
    console.log(`Evaluated ${tickets} tickets -> ${prize}`);
}

if (ticketButton) {
    ticketButton.addEventListener('click', checkTickets);
}

// --- Example 2: Switch Statement ---
const classSelect = document.getElementById('classSelect');
const classButton = document.getElementById('classButton');
const classOutput = document.getElementById('classOutput');

function handleClassSelection() {
    const choice = classSelect.value;
    let description = '';

    // Switch statement decision structure
    switch (choice) {
        case 'warrior':
            description = 'Class: Warrior | HP: 150 | Weapon: Greatsword | Role: Frontline Tank';
            break;
        case 'mage':
            description = 'Class: Mage | HP: 80 | Weapon: Staff | Role: Elemental DPS';
            break;
        case 'rogue':
            description = 'Class: Rogue | HP: 100 | Weapon: Daggers | Role: Stealth Crit';
            break;
        case 'healer':
            description = 'Class: Healer | HP: 90 | Weapon: Wand | Role: Support & Recovery';
            break;
        default:
            description = 'Unknown class selected.';
    }

    classOutput.textContent = description;
    console.log(`Switch statement picked class: ${choice}`);
}

if (classButton) {
    classButton.addEventListener('click', handleClassSelection);
}

// --- Example 3: Nested If & Ternary Operator ---
const vipCheck = document.getElementById('vipCheck');
const levelInput = document.getElementById('levelInput');
const vipButton = document.getElementById('vipButton');
const vipOutput = document.getElementById('vipOutput');

function verifyVIPAccess() {
    const isVip = vipCheck.checked;
    const level = Number(levelInput.value);

    let accessMessage = '';

    // Nested If Decision Structure
    if (isVip) {
        if (level >= 10) {
            accessMessage = 'Elite VIP Access Granted: Full server privileges unlocked!';
        } else {
            accessMessage = 'Standard VIP Access Granted: Level up to 10 for full perks.';
        }
    } else {
        // Ternary operator decision for non-VIPs
        accessMessage = (level >= 20) 
            ? 'Access Granted via High Level Grinding (Level 20+).' 
            : 'Access Denied: Requires VIP pass or Level 20+.';
    }

    vipOutput.textContent = accessMessage;
    console.log(`VIP Checked: ${isVip}, Level: ${level} -> ${accessMessage}`);
}

if (vipButton) {
    vipButton.addEventListener('click', verifyVIPAccess);
}