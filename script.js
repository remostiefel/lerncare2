const stats = {
    PER: 0, RES: 0, SOZ: 0, PLN: 0, ARB: 0, FUH: 0, UNT: 0, EIN: 0, LEI: 0, PRO: 0, SEL: 0, EMO: 0, WID: 0
};

function toggleOption(button) {
    button.classList.toggle('selected');
    updateStats(button);
}

function updateStats(button) {
    const option = button.textContent;
    const isSelected = button.classList.contains('selected');

    // Reset stats for this option
    Object.keys(stats).forEach(key => stats[key] -= getStatChanges(option)[key] || 0);

    // If selected, apply stats
    if (isSelected) {
        Object.keys(stats).forEach(key => stats[key] += getStatChanges(option)[key] || 0);
    }

    console.log(stats); // For debugging, remove in production
}

function getStatChanges(option) {
    const changes = {
        "Ständige Müdigkeit": { WID: -1, SEL: -1 },
        "Erhöhte Stresssymptome": { EMO: -1, WID: -1 },
        "Verminderte Motivation": { LEI: -1, EMO: -1 },
        "Soziale Isolation": { SOZ: -1, EIN: -1 },
        "Gesundheitliche Beschwerden": { WID: -1, EMO: -1 },
        "Verlust der Work-Life-Balance": { ARB: 1, PLN: 1 },
        "Work-Life-Balance stärken": { ARB: 1, PLN: 1 },
        "Delegation": { FUH: 1, SOZ: 1 },
        "Selbstfürsorge fördern": { EIN: 1, EMO: 1 },
        "Professionelle Hilfe suchen": { SEL: 1, PRO: 1 },
        "Organisation verbessern": { ARB: 1, PLN: 1 },
        "Schulinterne Ressourcen nutzen": { FUH: 1, LEI: 1 }
    };
    return changes[option] || {};
}

function resetSelection() {
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
    Object.keys(stats).forEach(key => stats[key] = 0);
}

// Show details on hover
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', function(e) {
        const details = this.getAttribute('data-details');
        const detailsElement = document.getElementById('details');
        detailsElement.textContent = details;
        detailsElement.style.display = 'block';

        // Position the details above the button
        const rect = this.getBoundingClientRect();
        detailsElement.style.left = rect.left + 'px';
        detailsElement.style.top = (rect.top - detailsElement.offsetHeight - 10) + 'px';
    });

    button.addEventListener('mouseout', function() {
        document.getElementById('details').style.display = 'none';
    });
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseover', function(e) {
            const details = this.getAttribute('data-details');
            const detailsElement = document.getElementById('details');
            detailsElement.textContent = details;
            detailsElement.style.display = 'block';

            // Position the details above the button
            const rect = this.getBoundingClientRect();
            const detailsRect = detailsElement.getBoundingClientRect();

            detailsElement.style.left = `${rect.left + (rect.width / 2) - (detailsRect.width / 2)}px`;
            detailsElement.style.top = `${rect.top - detailsRect.height - 10}px`;
        });

        button.addEventListener('mouseout', function() {
            document.getElementById('details').style.display = 'none';
        });
    });
});
