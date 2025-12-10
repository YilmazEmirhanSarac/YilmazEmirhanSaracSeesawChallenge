console.log("Project connected")

const plank = document.getElementById('plank');

plank.addEventListener('click', function(event) {

    const rect = plank.getBoundingClientRect();

    const positionFromLeft = event.clientX - rect.left;
    
    console.log("Distance from letf side (px)", positionFromLeft);
})