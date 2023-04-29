/** @type {Object[]} */
let data;

const unitStrings = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month'
};

window.addEventListener('load', async () => {
    await fetchData();
    updateTime('daily');
});

/** @type {HTMLInputElement[]} */
const unitInputs = document.querySelectorAll('input[name="format"]');

unitInputs.forEach((input) => input.addEventListener('change', (e) => updateTime(e.target.value)));

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (response.ok) {
            data = await response.json();
        }
    } catch (e) {
        console.error(error);
    }
}

/**
 *
 * @param {string} unit
 */
function updateTime(unit) {
    data.forEach((card) => {
        console.log(card.timeframes);
        const cardName = '.card.' + card.title.toLowerCase();
        document.querySelector(cardName + ' .currentTime span').innerHTML = card.timeframes[unit].current;
        document.querySelector(cardName + ' .lastTime .unit').innerHTML = unitStrings[unit];
        document.querySelector(cardName + ' .lastTime .time').innerHTML = card.timeframes[unit].previous;
    });
}
