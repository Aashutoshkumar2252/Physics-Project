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
planets[1].add(moon); // Add