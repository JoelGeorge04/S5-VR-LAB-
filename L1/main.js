import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Set background color to black
scene.background = new THREE.Color(0x000000);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 30, 150);
controls.update();

const geometry1 = new THREE.SphereGeometry(8, 32, 16);
const texture_sun = new THREE.TextureLoader().load('/images/8k_sun.jpg');
const material1 = new THREE.MeshBasicMaterial({ map: texture_sun });
const ball = new THREE.Mesh(geometry1, material1);
scene.add(ball);

function createPlanet(radius, textureUrl, orbitRadius, color) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);

    const orbitGeometry = new THREE.RingGeometry(orbitRadius, orbitRadius + 0.5, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, opacity: 0.2, transparent: true });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);

    return { planet, orbit };
}

const planets = [];
planets.push(createPlanet(0.39, '/images/8k_mercury.jpg', 10, 0xffd700)); // Mercury
planets.push(createPlanet(0.95, '/images/8k_venus_surface.jpg', 15, 0xffa500)); // Venus
planets.push(createPlanet(1, '/images/earth.jpg', 20, 0x0000ff)); // Earth
planets.push(createPlanet(0.27, '/images/moon.jpg', 23, 0xffffff)); // Moon
planets.push(createPlanet(0.53, '/images/8k_mars.jpg', 25, 0xff4500)); // Mars
planets.push(createPlanet(6.8, '/images/8k_jupiter.jpg', 35, 0xffd700)); // Jupiter
planets.push(createPlanet(5, '/images/8k_saturn.jpg', 50, 0xcd853f)); // Saturn
planets.push(createPlanet(3.0, '/images/2k_uranus.jpg', 65, 0xadd8e6)); // Uranus
planets.push(createPlanet(2.9, '/images/2k_neptune.jpg', 75, 0x00008b)); // Neptune

planets.forEach(p => {
    scene.add(p.planet);
});

const earth = planets[2].planet;
const moon = planets[3].planet;

let earthAngle = 0;
let moonAngle = 0;

function animate() {
    planets.forEach((p, index) => {
        if (index === 0) { // Mercury
            p.planet.position.x = 10 * Math.cos(earthAngle * 1.6);
            p.planet.position.z = 10 * Math.sin(earthAngle * 1.6);
        } else if (index === 1) { // Venus
            p.planet.position.x = 15 * Math.cos(earthAngle * 1.2);
            p.planet.position.z = 15 * Math.sin(earthAngle * 1.2);
        } else if (index === 2) { // Earth
            p.planet.position.x = 20 * Math.cos(earthAngle);
            p.planet.position.z = 20 * Math.sin(earthAngle);
        } else if (index === 3) { // Moon
            moon.position.x = earth.position.x + 3 * Math.cos(moonAngle);
            moon.position.z = earth.position.z + 3 * Math.sin(moonAngle);
            moonAngle += 0.05; // Slowed Moon orbit for balance
        } else if (index === 4) { // Mars
            p.planet.position.x = 25 * Math.cos(earthAngle * 0.8);
            p.planet.position.z = 25 * Math.sin(earthAngle * 0.8);
        } else if (index === 5) { // Jupiter
            p.planet.position.x = 35 * Math.cos(earthAngle * 0.4);
            p.planet.position.z = 35 * Math.sin(earthAngle * 0.4);
        } else if (index === 6) { // Saturn
            p.planet.position.x = 50 * Math.cos(earthAngle * 0.2);
            p.planet.position.z = 50 * Math.sin(earthAngle * 0.2);
        } else if (index === 7) { // Uranus
            p.planet.position.x = 65 * Math.cos(earthAngle * 0.1);
            p.planet.position.z = 65 * Math.sin(earthAngle * 0.1);
        } else if (index === 8) { // Neptune
            p.planet.position.x = 75 * Math.cos(earthAngle * 0.05);
            p.planet.position.z = 75 * Math.sin(earthAngle * 0.05);
        }
    });

    earthAngle += 0.01;
    moonAngle += 0.02; // Adjusted to keep it proportionate with Earth’s movement

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
