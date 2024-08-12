import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load('images/img2.jpg');
const earthTexture = textureLoader.load('images/img1.jpg');

const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

const earthGroup = new THREE.Group();
earthGroup.add(earth);
scene.add(earthGroup);

const earthOrbitRadius = 7;
const earthOrbitSpeed = 0.42;
const earthRotationSpeed = 0.15;
const earthOrbitRotationSpeed = 0.1;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

function animate() {
    const time = Date.now() * 0.001;

    earthGroup.position.x = earthOrbitRadius * Math.cos(time * earthOrbitSpeed);
    earthGroup.position.z = earthOrbitRadius * Math.sin(time * earthOrbitSpeed);

    earth.rotation.y += earthRotationSpeed;

    earthGroup.rotation.y += earthOrbitRotationSpeed;

    controls.update();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
