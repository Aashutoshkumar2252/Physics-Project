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

// Create Moons
const createMoon = (size, color, distance) => {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const moon = new THREE.Mesh(geometry, material);
    moon.position.x = distance;
    return moon;
};

const moon = createMoon(0.3, 0xaaaaaa, 2);
planets[1].add(moon); // Add moon to Earth

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

// Create Asteroids
const createAsteroid = (size, color, distance) => {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const asteroid = new THREE.Mesh(geometry, material);
    asteroid.position.x = distance;
    return asteroid;
};

const asteroids = [];
for (let i = 0; i < 100; i++) {
    const distance = 17 + Math.random() * 3; // Asteroids between Mars and Jupiter
    const size = Math.random() * 0.2;
    const color = 0x808080;
    const angle = Math.random() * 2 * Math.PI;
    const asteroid = createAsteroid(size, color, distance);
    asteroid.position.x = distance * Math.cos(angle);
    asteroid.position.z = distance * Math.sin(angle);
    asteroids.push(asteroid);
    scene.add(asteroid);
}

// Initialize variables for animation
let angles = [0, 0, 0, 0];
let angleMoon = 0;
const asteroidAngles = Array(asteroids.length).fill(0).map(() => Math.random() * 2 * Math.PI);

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

    // Rotate moon around Earth
    angleMoon += 0.05;
    moon.position.x = 2 * Math.cos(angleMoon);
    moon.position.z = 2 * Math.sin(angleMoon);

    // Rotate asteroids
    asteroids.forEach((asteroid, index) => {
        asteroidAngles[index] += 0.01;
        asteroid.position.x = asteroid.geometry.parameters.radius * Math.cos(asteroidAngles[index]);
        asteroid.position.z = asteroid.geometry.parameters.radius * Math.sin(asteroidAngles[index]);
    });

    renderer.render(scene, camera);
};

camera.position.z = 30;
animate();
