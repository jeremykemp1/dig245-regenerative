
/* javascript */
const container = document.getElementById('container');
const bars = document.getElementById('bars');

const today = new Date();
const barCount = 50; // Number of bars to initially display
const barHeight = 50; // Height of each bar in pixels

for (let i = 0; i < barCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    createBar(date);
}

container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollTop;
    const visibleBars = Math.ceil(scrollPosition / barHeight);

    for (let i = barCount; i < visibleBars + barCount; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        createBar(date);
    }
});

function createBar(date) {
    const rgb = dateToRGB(date);
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    bars.appendChild(bar);
}

function dateToRGB(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear() % 100; // Use last two digits of the year
    return [month, day, year];
}

