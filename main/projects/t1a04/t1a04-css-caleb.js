const img = document.getElementById('img');
let direction = 1;
let position = 0;
function move() {
    position += direction * 2;
    img.style.left = position + 'px';
    if (position >= 120) {
        direction = -1;
    } else if (position <= -120) {
        direction = 1;
    } 
    requestAnimationFrame(move);
}
move();
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if(savedTheme) {
        setTheme(savedTheme);
    }
});
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    document.getElementById('current-theme-name').textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1);  
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent.toLowerCase() === themeName) {
            btn.classList.add('active');
        }
    });
    localStorage.setItem('preferred-theme', themeName);
}