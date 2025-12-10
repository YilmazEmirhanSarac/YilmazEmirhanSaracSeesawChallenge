console.log("Project connected")

const plank = document.getElementById('plank');

plank.addEventListener('click', function(event) {

    const rect = plank.getBoundingClientRect();

    const positionFromLeft = event.clientX - rect.left;

    console.log("Distance from letf side (px)", positionFromLeft);

    // Create the box element
    const boxSize = 20;

    const box = document.createElement('div');
    
    box.style.width = boxSize + 'px';
    box.style.height = boxSize + 'px';
    box.style.backgroundColor = 'red';
    box.style.position = 'absolute';
    box.style.border = 'solid 1px black';
    // Move up by box height so it sits on top of the plank, not inside it
    box.style.top = (-boxSize) + 'px';

    // Center the box horizontally on the clicked point
    // Logic: Click Position - (Box Width / 2) -> (20 / 2 = 10)
    box.style.left = (positionFromLeft - (boxSize / 2)) + 'px';

    plank.appendChild(box);
})