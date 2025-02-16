let data = [];
let id = 0;
let isRunning = false;
let maxXAccel = 0;
let maxYAccel = 0;
let maxZAccel = 0;
let maxXRot = 0;
let maxYRot = 0;
let maxZRot = 0;

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

    const currentXAccel = acceleration.x || 0;
    const currentYAccel = acceleration.y || 0;
    const currentZAccel = acceleration.z || 0;

    const currentXRot = rotationRate.alpha || 0;
    const currentYRot = rotationRate.beta || 0;
    const currentZRot = rotationRate.gamma || 0;

    maxXAccel = Math.max(maxXAccel, currentXAccel);
    maxYAccel = Math.max(maxYAccel, currentYAccel);
    maxZAccel = Math.max(maxZAccel, currentZAccel);

    maxXRot = Math.max(maxXRot, currentXRot);
    maxYRot = Math.max(maxYRot, currentYRot);
    maxZRot = Math.max(maxZRot, currentZRot);

    document.getElementById('currentXAccel').textContent = currentXAccel.toFixed(2);
    document.getElementById('currentYAccel').textContent = currentYAccel.toFixed(2);
    document.getElementById('currentZAccel').textContent = currentZAccel.toFixed(2);

    document.getElementById('currentXRot').textContent = currentXRot.toFixed(2);
    document.getElementById('currentYRot').textContent = currentYRot.toFixed(2);
    document.getElementById('currentZRot').textContent = currentZRot.toFixed(2);

    document.getElementById('maxXAccel').textContent = maxXAccel.toFixed(2);
    document.getElementById('maxYAccel').textContent = maxYAccel.toFixed(2);
    document.getElementById('maxZAccel').textContent = maxZAccel.toFixed(2);

    document.getElementById('maxXRot').textContent = maxXRot.toFixed(2);
    document.getElementById('maxYRot').textContent = maxYRot.toFixed(2);
    document.getElementById('maxZRot').textContent = maxZRot.toFixed(2);

    // Placeholder for position calculation
    document.getElementById('xPos').textContent = '0';
    document.getElementById('yPos').textContent = '0';
    document.getElementById('zPos').textContent = '0';
}

function handleOrientationEvent(event) {
    if (!isRunning) return;
    // Handle orientation data if needed
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
