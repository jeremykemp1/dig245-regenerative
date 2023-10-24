const container = document.getElementById('container');
const bars = document.getElementById('bars');

const barHeight = 50;

function createBars() {
    const today = new Date();
    const visibleBars = Math.ceil(container.clientHeight / barHeight) + 10; // Load additional bars

    for (let i = 0; i < visibleBars; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        createBar(date);
    }
}

function createBar(date) {
    const rgb = dateToRGB(date);
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    bars.appendChild(bar);
}

function dateToRGB(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    return [month, day, year];
}

container.addEventListener('scroll', () => {
    if (container.scrollTop + container.clientHeight >= bars.clientHeight) {
        createBars();
    }
});

createBars();
