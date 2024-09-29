import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
light.castShadow = true;
scene.add(light);

light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = false;
scene.add(sphere);

const boxGeometry = new THREE.BoxGeometry(24, 5, 6);
const textureBox = new THREE.TextureLoader().load('images.jpeg');
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.castShadow = true;
box.receiveShadow = false;
scene.add(box);

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
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.z += 0.01;

    sphere.position.x += speed;
    box.position.x -= speed;

    if (sphere.position.x > 0) {
        speed = 0;
    }

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});