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

const earth = createPlanet(1, 0x0000ff, 10);
scene.add(earth);

// Initialize variables for animation
let angleEarth = 0;

// Animate function
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate Earth
    angleEarth += 0.01;
    earth.position.x = 10 * Math.cos(angleEarth);
    earth.position.z = 10 * Math.sin(angleEarth);

    renderer.render(scene, camera);
};

camera.position.z = 20;
animate();
