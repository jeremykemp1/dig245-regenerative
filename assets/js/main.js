const container = document.getElementById('container');
const bars = document.getElementById('bars');
const dateDisplay = document.getElementById('dateDisplay');
const colorDisplay = document.getElementById('colorDisplay');
const aboutDiv = document.getElementById('about');
const modal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');

const today = new Date();
const barCount = 50;
const barHeight = 20;

// Create bars initially
for (let i = 0; i < barCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    createBar(date);
}

container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollTop;
    const firstVisibleBar = Math.floor(scrollPosition / barHeight);

    // Create additional bars if needed
    const lastVisibleBar = firstVisibleBar + barCount - 1;
    for (let i = bars.children.length; i <= lastVisibleBar; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        createBar(date);
    }
});

// Function to create a bar
function createBar(date) {
    const hsl = dateToHSL(date);
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.backgroundColor = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;

    // Attach the date and Colour directly to the DOM element
    bar.dataset.date = date.toISOString();

    bar.dataset.hue = hsl[0];
    bar.dataset.saturation = hsl[1].toFixed(2);

    // Add a hover event listener
    bar.addEventListener('mouseover', (event) => {
        const hoveredDate = new Date(event.currentTarget.dataset.date);
        dateDisplay.innerText = formatDate(hoveredDate);
        const hue = event.currentTarget.dataset.hue;
        const saturation = event.currentTarget.dataset.saturation;
        colorDisplay.innerText = `Hue: ${hue}, Saturation: ${saturation}%`;
    });

    // Remove date when mouse leaves the bar
    bar.addEventListener('mouseout', () => {
        dateDisplay.innerText = 'Date:';
        colorDisplay.innerText = 'Hue: Saturation:';
    });

    bars.appendChild(bar);
}

// Function to update an existing bar
function updateBar(bar, date) {
    const hsl = dateToHSL(date);
    bar.style.backgroundColor = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

// Convert date to HSL value
function dateToHSL(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;

    // Calculate HSL values
    const hue = (month / 12) * 360;  // Month corresponds to Hue (0 to 360)
    const saturation = (day / 31) * 100;  // Day corresponds to Saturation (1 to 100)
    const lightness = (50);

    return [hue, saturation, lightness];
}

// Format date as a string
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}


// Add a hover event listener to the "about" div
aboutDiv.addEventListener('click', () => {
    // Display the modal when hovering over the "about" div
    modal.style.display = 'block';
});

// Close the modal when clicking on the close button
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
