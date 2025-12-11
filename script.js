//console.log("Project connected")


// ---DOM ELEMENTS---
const plank = document.getElementById('plank');
const leftTotalEl = document.getElementById('leftTotal');
const rightTotalEl = document.getElementById('rightTotal');
const nextWeightEl = document.getElementById('nextWeight');
const tiltAngleEl = document.getElementById('tiltAngle');

// --- STATE MANAGEMENT ---
let objects = [];
let currentWeight = 0;

// Helper function to generate random integer between 1 and 10
function getRandomWeight() {
    return Math.floor(Math.random() * 10 + 1);
}

// Initialize: Generate and display the first weight when page loads
currentWeight = getRandomWeight();
nextWeightEl.innerText = currentWeight;

// --- MAIN EVENT LISTENER ---
plank.addEventListener('click', function(event) {

    // Calculate Click Position relative to the plank
    const rect = plank.getBoundingClientRect();
    const positionFromLeft = event.clientX - rect.left;

    //console.log("Distance from letf side (px)", positionFromLeft);

    const weight = currentWeight;

    // Create the Visual Box Element
    // Dynamic Sizing: Heavier boxes are larger for better UI feedback (20px base + 2px per kg)
    const boxSize = 20 + (weight * 2);

    const box = document.createElement('div');
    box.classList.add('box');
    box.innerText = weight;
    
    box.style.width = boxSize + 'px';
    box.style.height = boxSize + 'px';
    // Move up by box height so it sits on top of the plank, not inside it
    box.style.top = (-boxSize) + 'px';

    // Dynamic Coloring: Heavier weights are darker (HSL Lightness decreases)
    const lightness = 95 - (weight * 5);
    box.style.backgroundColor = `hsl(0, 70%, ${lightness}%)`;

    // Horizontal Positioning: Center the box on the clicked point
    // Logic: Click Position - (Box Width / 2) -> (20 / 2 = 10)
    box.style.left = (positionFromLeft - (boxSize / 2)) + 'px';

    plank.appendChild(box);

    // Generate a new weight for the next click and update the UI
    currentWeight = getRandomWeight();
    nextWeightEl.innerText = currentWeight;

    // The plank is 500px wide, so the pivot center is at 250px.
    // Logic:
    // - Less than 250px: Left side
    // - More than 250px: Right side
    // - Exactly 250px: Pivot point
    let side = '';
    
    if (positionFromLeft < 250) {
        side = 'left';
    } else if (positionFromLeft > 250) {
        side = 'right';
    } else {
        side = 'pivot'; // Handle center click because it generates 0 torque
    }

    // Add the new object's data to the state array
    objects.push({
        weight: weight,
        side: side,
        position: positionFromLeft
    })

    //console.log("Guncel liste:", objects);

    // Calculate & Update Total Weights per Side
    let leftSum = 0;
    let rightSum = 0;

    objects.forEach(item => {
        if (item.side === 'left') {
            leftSum += item.weight;
        } else if (item.side === 'right') {
            rightSum += item.weight;
        }
    });

    leftTotalEl.innerText = leftSum;
    rightTotalEl.innerText = rightSum;

    // Trigger Physics Calculation
    updateSimulation();
})

// --- PHYSICS ENGINE ---
function updateSimulation() {
    let netTorque = 0;

    // Calculate Net Torque
    // Sum the torque (Force * Distance) of all objects.
    // Left side creates negative torque, right side creates positive.
    objects.forEach(item => {
        const distance = item.position - 250;
        const torque = item.weight * distance;
        netTorque += torque;
    });
    console.log('Net Torque:', netTorque)

    // Physics & Scaling
    // Convert large torque values to degrees. Dividing by 10 acts as a damper.
    let angle = (netTorque / 10);

    // Clamping (Limit Angle)
    // Constrain the rotation between -30 and 30 degrees to simulate the ground.
    // Uses Math.min for the ceiling and Math.max for the floor.
    angle = Math.max(-30, Math.min(30,angle));

    // Update UI (Visual & Text) 
    plank.style.transform = `rotate(${angle}deg)`;
    tiltAngleEl.innerText = angle.toFixed(1);
}