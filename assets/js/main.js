const container = document.getElementById('container');
const bars = document.getElementById('bars');

const today = new Date();
const barCount = 500;
const barHeight = 5;

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

// Create RGB Bar
function createBar(date) {
    const rgb = dateToRGB(date);
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    bar.setAttribute('data-rgb', `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    bars.appendChild(bar);
}
// Create Hex Bar
// function createBar(date) {
//     const hex = dateToHex(date);
//     const bar = document.createElement('div');
//     bar.className = 'bar';
//     bar.style.backgroundColor = hex;
//     bars.appendChild(bar);
// }

//Convert date to RGB Value
function dateToRGB(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    return [month, day, year];
}
//Convert date to Hex value
function dateToHex(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear() % 100;
    return `#${month}${day}${year}`;
}