console.log("Project connected")

const plank = document.getElementById('plank');

plank.addEventListener('click', function(event) {

    const rect = plank.getBoundingClientRect();

    const positionFromLeft = event.clientX - rect.left;

    console.log("Distance from letf side (px)", positionFromLeft);

    const weight = Math.floor(Math.random() * 10 + 1);

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
})