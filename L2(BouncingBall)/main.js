import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping for smoother controls
controls.dampingFactor = 0.05;

// Ball 1: White
const Ballgeometry = new THREE.SphereGeometry(10, 32, 16);
const Ballmaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff // White
});
const Ball = new THREE.Mesh(Ballgeometry, Ballmaterial);
scene.add(Ball);

// Ball 2: Light Blue
const Ball2geometry = new THREE.SphereGeometry(10, 32, 16);
const Ball2material = new THREE.MeshBasicMaterial({
    color: 0x00BFFF // DeepSkyBlue
});
const Ball2 = new THREE.Mesh(Ball2geometry, Ball2material);
scene.add(Ball2);

// Ball 3: Pink
const Ball3geometry = new THREE.SphereGeometry(3, 17, 8);
const Ball3material = new THREE.MeshBasicMaterial({
    color: 0xFF69B4 // HotPink
});
const Ball3 = new THREE.Mesh(Ball3geometry, Ball3material);
scene.add(Ball3);

// Table: Dark Wood Texture (Brown)
const geometry = new THREE.BoxGeometry(80, 10, 50);
const TableMaterial = new THREE.MeshBasicMaterial({
    color: 0x8B4513 // SaddleBrown
});
const table = new THREE.Mesh(geometry, TableMaterial);
scene.add(table);

table.rotation.x = Math.PI / 6;
table.position.y = -10;

Ball.position.y = 80;
let velocity = -10;
let acceleration = -0.5;

Ball2.position.y = 80;
Ball2.position.x = 30;
let velocity2 = -8;
let acceleration2 = -0.7;

Ball3.position.y = 80;
Ball3.position.x = -30;
let velocity3 = -8;
let acceleration3 = -0.6;

let damping = 0.9;

let bounceCount1 = 0;
let bounceCount2 = 0;
let bounceCount3 = 0;
const maxBounces = 25;

camera.position.z = 100;

function animate() {
    Ball.position.y += velocity;
    velocity += acceleration;
    Ball2.position.y += velocity2;
    velocity2 += acceleration2;
    Ball3.position.y += velocity3;
    velocity3 += acceleration3;

    Ball.rotation.x += 0.09;
    Ball.rotation.y += 0.04;
    Ball2.rotation.x += 0.09;
    Ball2.rotation.y += 0.04;
    Ball3.rotation.x += 0.09;
    Ball3.rotation.y += 0.04;

    if (Ball.position.y <= table.position.y + 5) {
        if (bounceCount1 < maxBounces) {
            velocity = -velocity * damping;
            bounceCount1++;
        } else {
            velocity = 0;
            Ball.position.y = table.position.y + 5;
            Ball.rotation.x = 0;
            Ball.rotation.y = 0;
        }
    }

    if (Ball2.position.y <= table.position.y + 5) {
        if (bounceCount2 < maxBounces) {
            velocity2 = -velocity2 * damping;
            bounceCount2++;
        } else {
            velocity2 = 0;
            Ball2.position.y = table.position.y + 5;
            Ball2.rotation.x = 0;
            Ball2.rotation.y = 0;
        }
    }

    if (Ball3.position.y <= table.position.y + 5) {
        if (bounceCount3 < maxBounces) {
            velocity3 = -velocity3 * damping;
            bounceCount3++;
        } else {
            velocity3 = 0;
            Ball3.position.y = table.position.y + 5;
            Ball3.rotation.x = 0;
            Ball3.rotation.y = 0;
        }
    }

    // Update the controls
    controls.update();

    renderer.render(scene, camera);
}
