console.log("Project connected")

const plank = document.getElementById('plank');
const leftTotalEl = document.getElementById('leftTotal');
const rightTotalEl = document.getElementById('rightTotal');
const nextWeightEl = document.getElementById('nextWeight');

let objects = [];
let currentWeight = 0;

function getRandomWeight() {
    return Math.floor(Math.random() * 10 + 1);
}
// Shows next weight before any box placed
currentWeight = getRandomWeight();
nextWeightEl.innerText = currentWeight;

plank.addEventListener('click', function(event) {

    const rect = plank.getBoundingClientRect();

    const positionFromLeft = event.clientX - rect.left;

    console.log("Distance from letf side (px)", positionFromLeft);

    const weight = currentWeight;

    // Create the box element
    const boxSize = 20 + (weight * 2); // I change this for better ui more weight bigger box

    const box = document.createElement('div');
    box.classList.add('box');
    box.innerText = weight;
    
    box.style.width = boxSize + 'px';
    box.style.height = boxSize + 'px';
    // Move up by box height so it sits on top of the plank, not inside it
    box.style.top = (-boxSize) + 'px';

    const lightness = 95 - (weight * 5);
    box.style.backgroundColor = `hsl(0, 70%, ${lightness}%)`;

    // Center the box horizontally on the clicked point
    // Logic: Click Position - (Box Width / 2) -> (20 / 2 = 10)
    box.style.left = (positionFromLeft - (boxSize / 2)) + 'px';

    plank.appendChild(box);
    // After some box placed generate next boxes kg and shows in info panel
    currentWeight = getRandomWeight();
    nextWeightEl.innerText = currentWeight;

    // The plank is 500px wide, so the pivot center is at 250px.
    // Logic: If click is before 250px, it's 'left'. Otherwise 'right'.
    let side = '';
    
    if (positionFromLeft < 250) {
        side = 'left';
    } else if (positionFromLeft > 250) {
        side = 'right';
    } else {
        side = 'pivot'; // we need to catch this because when there is a box in center it tork equals 0
    }

    //push the new object's data into our 'objects' array.
    objects.push({
        weight: weight,
        side: side,
        position: positionFromLeft
    })

    console.log("Guncel liste:", objects);

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
})