import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const light = new THREE.PointLight(0xffffff, 500, 500);
light.position.set(0, 20, 4);
light.castShadow = true;
scene.add(light);
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 2;
light.shadow.camera.far = 2000;

const cubegeometry = new THREE.BoxGeometry(10, 10, 10);
const cubematerial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubegeometry, cubematerial);
scene.add(cube);
cube.castShadow = true;
cube.receiveShadow = false;
cube.position.x = -75;

const spheregeometry = new THREE.SphereGeometry(10, 10, 32);
const spherematerial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(spheregeometry, spherematerial);
sphere.castShadow = true;
sphere.receiveShadow = false;
scene.add(sphere);
sphere.position.x = 75;

const planeGeometry = new THREE.PlaneGeometry(250, 250, 320, 320);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff })
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);
plane.position.z = -2;


camera.position.z = 60;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;

	if (cube.position.x == sphere.position.x) {
		cube.position.x = sphere.position.x = 0;
	}
	else {
		cube.position.x += 0.5;
		sphere.position.x -= 0.5;
	}

	renderer.render(scene, camera);

}
