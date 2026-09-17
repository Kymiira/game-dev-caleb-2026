const img = document.getElementById('img');
let direciton = 1;
let position = 100;
function move() {
    position += direction * 5;
    img.style.left = position + 'px';
    if (position >= 200) {
        direction = -1;
    } else if (position <= -200) {
        direction 1;
    } requestAnimationFrame(move);
}
move();