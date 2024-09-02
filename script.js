let selectedOptions = {
    question1: 0,
    question2: [],
    question3: [],
    question4: [],
    question5: [],
    question6: []
};

let stats = {
    PER: 0, RES: 0, SOZ: 0, MOT: 0, KOG: 0, DID: 0
};

function toggleOption(button) {
    const questionBlock = button.closest('.question-block');
    const questionIndex = Array.from(document.querySelectorAll('.question-block')).indexOf(questionBlock) + 1;
    const optionIndex = Array.from(questionBlock.querySelectorAll('button')).indexOf(button) + 1;

    if (questionIndex === 1) {
        // Für Frage 1: Nur eine Option auswählbar
        questionBlock.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
        if (selectedOptions.question1 === optionIndex) {
            selectedOptions.question1 = 0;
            button.classList.remove('selected');
        } else {
            selectedOptions.question1 = optionIndex;
            button.classList.add('selected');
        }
    } else {
        // Für alle anderen Fragen: Mehrere Optionen auswählbar
        button.classList.toggle('selected');
        const questionKey = `question${questionIndex}`;
        const optionPosition = selectedOptions[questionKey].indexOf(optionIndex);
        if (optionPosition > -1) {
            selectedOptions[questionKey].splice(optionPosition, 1);
        } else {
            selectedOptions[questionKey].push(optionIndex);
        }
    }

    console.log(`Frage ${questionIndex}, Option ${optionIndex} wurde geklickt`);
    console.log('Aktuelle Auswahl:', selectedOptions);

    updateStats();
}

function getStatChanges(question, option) {
    const statChanges = {
        question1: {
            1: { PER: -2, RES: -3, SOZ: -1, MOT: -3 },
            2: { PER: 2, RES: 1, SOZ: 2 },
            3: { PER: 3, RES: 2 }
        },
        question2: {
            1: { PER: 3, KOG: 2, MOT: 1 },
            2: { RES: 2, SOZ: 3 },
            3: { PER: 2, RES: 3, MOT: -1 },
            4: { PER: 2, KOG: 3, MOT: 1 },
            5: { PER: 2, RES: 4, MOT: 2 },
            6: { RES: 3, SOZ: 2, MOT: 1 }
        },
        question3: {
            1: { PER: 2, KOG: 2, MOT: 1 },
            2: { PER: 1, KOG: 1, SOZ: 3 },
            3: { PER: 2, RES: 1, SOZ: 2 },
            4: { PER: 2, KOG: 3, MOT: 1 },
            5: { PER: 3, KOG: 2, MOT: 2 },
            6: { PER: 1, KOG: 2, SOZ: 3 }
        },
        question4: {
            1: { KOG: 1, SOZ: 4, MOT: 2 },
            2: { PER: 2, KOG: 3, MOT: 2 },
            3: { PER: 3, KOG: 2, MOT: 3 },
            4: { PER: 1, SOZ: 3, MOT: 2 },
            5: { PER: 2, KOG: 2, MOT: 1 },
            6: { PER: 3, KOG: 2, MOT: 2 }
        },
        question5: {
            1: { PER: -3, RES: -3, SOZ: -1, MOT: -3 },
            2: { PER: -2, RES: -2, SOZ: -1, MOT: -2 },
            3: { PER: -2, RES: -2, SOZ: -1, MOT: -3 },
            4: { PER: -1, RES: -1, SOZ: -3, MOT: -2 },
            5: { PER: -2, RES: -3, SOZ: -1, MOT: -2 },
            6: { PER: -3, RES: -3, SOZ: -1, MOT: -3 }
        },
        question6: {
            1: { PER: 4, RES: 4, MOT: 3 },
            2: { KOG: 2, RES: 3, SOZ: 3 },
            3: { PER: 3, RES: 4, MOT: 3 },
            4: { PER: 2, KOG: 1, RES: 3, SOZ: 1, MOT: 2 },
            5: { PER: 3, KOG: 3, MOT: 2 },
            6: { PER: 1, RES: 2, SOZ: 3 }
        }
    };

    return statChanges[question]?.[option] || {};
}

function updateStats() {
    console.log("updateStats wurde aufgerufen");

    Object.keys(stats).forEach(key => stats[key] = 0);

    Object.entries(selectedOptions).forEach(([question, options]) => {
        const optionsArray = Array.isArray(options) ? options : [options];
        optionsArray.forEach(option => {
            if (option !== 0) {
                const changes = getStatChanges(question, option);
                Object.entries(changes).forEach(([stat, value]) => {
                    if (stats.hasOwnProperty(stat)) {
                        stats[stat] += value;
                    }
                });
            }
        });
    });

    displayStats();
    console.log('Aktuelle Statistiken:', stats);
}

function displayStats() {
    const statsDisplay = document.getElementById('statsDisplay');
    if (statsDisplay) {
        statsDisplay.innerHTML = Object.entries(stats)
            .map(([key, value]) => `<p>${key}: ${value}</p>`)
            .join('');
    }
}

function resetSelection() {
    document.querySelectorAll('.question-block button').forEach(btn => btn.classList.remove('selected'));
    Object.keys(selectedOptions).forEach(key => {
        selectedOptions[key] = key === 'question1' ? 0 : [];
    });
    Object.keys(stats).forEach(key => stats[key] = 0);
    displayStats();
}

function initializeEventListeners() {
    document.querySelectorAll('.question-block button').forEach(button => {
        button.addEventListener('click', function() {
            toggleOption(this);
        });
    });

    document.querySelector('.reset').addEventListener('click', resetSelection);

    document.querySelectorAll('.question-block button').forEach(button => {
        button.addEventListener('mouseover', function() {
            const details = this.getAttribute('data-details');
            const detailsElement = document.getElementById('details');
            if (detailsElement && details) {
                detailsElement.textContent = details;
                detailsElement.style.display = 'block';
                positionDetails(this, detailsElement);
            }
        });

        button.addEventListener('mouseout', function() {
            const detailsElement = document.getElementById('details');
            if (detailsElement) {
                detailsElement.style.display = 'none';
            }
        });
    });
}

function positionDetails(button, detailsElement) {
    const rect = button.getBoundingClientRect();
    const detailsRect = detailsElement.getBoundingClientRect();

    let top = rect.top - detailsRect.height - 10;
    const left = rect.left + (rect.width / 2) - (detailsRect.width / 2);

    if (top < 0) {
        top = rect.bottom + 10;
    }

    detailsElement.style.top = `${top + window.scrollY}px`;
    detailsElement.style.left = `${left + window.scrollX}px`;
}

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    displayStats();
});
