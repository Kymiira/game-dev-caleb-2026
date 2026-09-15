document.addEventListener('DOMContentLoaded', () => {
    initWhaleGame();
})


function initWhaleGame() {
    const whaleList = document.getElementById('whale-list');
    const whales = whaleList.querySelectorAll('li');
    whales[0].textContent = "Humpback"
    whales[1].textContent = "Blue Whale"
    whales[2].textContent = "Beluga"
    whales[3].textContent = "Orca"
    whales[4].textContent = "Sperm Whale"
}