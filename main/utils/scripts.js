// scripts.js
// shared js utils for game-dev-caleb-2026 assignments

function initCollapsibles() {
    const toggles = document.querySelectorAll('.collapsible-toggle');

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const content = document.getElementById(toggle.getAttribute('aria-controls'));

            toggle.setAttribute('aria-expanded', String(!isExpanded));
            content.classList.toggle('is-collapsed', isExpanded);
        });
    });
}

initCollapsibles();