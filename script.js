let data = [];
let id = 0;
let isRunning = false;

function getAccel() {
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            window.addEventListener('devicemotion', handleMotionEvent);
            window.addEventListener('deviceorientation', handleOrientationEvent);
        }
    });
}

function handleMotionEvent(event) {
    if (!isRunning) return;

    const acceleration = event.acceleration;
    const rotationRate = event.rotationRate;

    const entry = {
        id: id++,
        xAccel: acceleration.x,
        yAccel: acceleration.y,
        zAccel: acceleration.z,
        xRotAccel: rotationRate.alpha,
        yRotAccel: rotationRate.beta,
        zRotAccel: rotationRate.gamma,
        xPos: 0, // Placeholder for position
        yPos: 0, // Placeholder for position
        zPos: 0, // Placeholder for position
        xSpeed: 0, // Placeholder for speed
        ySpeed: 0, // Placeholder for speed
        zSpeed: 0, // Placeholder for speed
        xRotSpeed: 0, // Placeholder for rotation speed
        yRotSpeed: 0, // Placeholder for rotation speed
        zRotSpeed: 0  // Placeholder for rotation speed
    };

    data.push(entry);
    updateTable(entry);
}

function handleOrientationEvent(event) {
    if (!isRunning) return;
    // Handle orientation data if needed
}

function updateTable(entry) {
    const table = document.getElementById('dataTable');
    const row = table.insertRow();
    Object.values(entry).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
    });
}

document.getElementById('start').addEventListener('click', () => {
    isRunning = true;
    getAccel();
});

document.getElementById('stop').addEventListener('click', () => {
    isRunning = false;
});

document.getElementById('resetPosition').addEventListener('click', () => {
    // Reset position logic
});

document.getElementById('resetOffset').addEventListener('click', () => {
    // Reset offset logic
});

document.getElementById('exportJson').addEventListener('click', () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
});