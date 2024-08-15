import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Star Geometry and Material (Reduced Star Size by 0.5%)
const starGeometry = new THREE.SphereGeometry(0.5 * 0.995, 24, 24); // Reduced by 0.5%
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

// Group of Stars
const starGroup = new THREE.Group();

// Create a large number of stars and add them to the group
for (let i = 0; i < 1000; i++) {
    
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.x = Math.random() * 400 - 200;
    star.position.y = Math.random() * 400 - 200;
    star.position.z = Math.random() * 400 - 200;
    starGroup.add(star);
}

// Add the group of stars to the scene
scene.add(starGroup);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

function animate() {
    // Slowly rotate the group of stars
    starGroup.rotation.y += 0.001;
    starGroup.rotation.x += 0.0005;
    

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
