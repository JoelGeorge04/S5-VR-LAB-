import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement); // Create OrbitControls
controls.enableDamping = true; // Enables smooth damping (inertia)
controls.dampingFactor = 0.05; // Damping factor
controls.enablePan = true; // Enable panning with the mouse
controls.enableZoom = true; // Allow zooming

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
light.castShadow = true;
scene.add(light);

// Shadow properties
light.shadow.mapSize.width = 2048; // Higher resolution shadow map
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
light.shadow.bias = -0.0001; // Reduces shadow artifacts
light.shadow.radius = 2; // Smooth shadows

// Sphere with MeshStandardMaterial for better shadow handling
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = false;
scene.add(sphere);

// Box with MeshStandardMaterial for better shadow handling
const boxGeometry = new THREE.BoxGeometry(24, 5, 6);
const textureBox = new THREE.TextureLoader().load('images.jpeg');
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.castShadow = true;
box.receiveShadow = false;
scene.add(box);

// Plane that receives shadows
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

sphere.position.x = -30;
box.position.x = 30;
plane.position.y = -20;
camera.position.z = 70;
camera.position.y = 20;
camera.lookAt(new THREE.Vector3(0, 0, 0));

let speed = 0.1;

function animate() {
    // Sphere and box rotation
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.z += 0.01;

    sphere.position.x += speed;
    box.position.x -= speed;

    if (sphere.position.x > 0) {
        speed = 0;
    }

    // Update orbit controls
    controls.update(); // This is required for damping to work

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
