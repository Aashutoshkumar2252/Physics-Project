// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create Earth and other planets
const createPlanet = (size, color, distance) => {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = distance;
    return planet;
};

const planets = [
    createPlanet(0.9, 0xffa500, 7),  // Venus
    createPlanet(1, 0x0000ff, 10),   // Earth
    createPlanet(0.5, 0xff0000, 15), // Mars
    createPlanet(2, 0xffd700, 20)    // Jupiter
];

planets.forEach(planet => scene.add(planet));

// Create Orbits
const createOrbit = (radius) => {
    const geometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, 64);
    const material = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
    const orbit = new THREE.Mesh(geometry, material);
    orbit.rotation.x = Math.PI / 2;
    return orbit;
};

const orbits = [7, 10, 15, 20].map(radius => createOrbit(radius));
orbits.forEach(orbit => scene.add(orbit));

// Initialize variables for animation
let angles = [0, 0, 0, 0];

// Animate function
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate planets
    angles = angles.map((angle, index) => {
        angle += 0.01 * (index + 1); // Adjust speed based on planet's distance
        planets[index].position.x = orbits[index].geometry.parameters.innerRadius * Math.cos(angle);
        planets[index].position.z = orbits[index].geometry.parameters.innerRadius * Math.sin(angle);
        return angle;
    });

    renderer.render(scene, camera);
};

camera.position.z = 30;
animate();
