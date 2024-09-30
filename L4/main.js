import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const geometry1 = new THREE.SphereGeometry( 1,32,16 ); 
const texture_sun = new THREE.TextureLoader().load('8k_sun.jpg'); 
const material1 = new THREE.MeshBasicMaterial( { map : texture_sun } ); 
const ball = new THREE.Mesh( geometry1, material1 ); 
scene.add( ball );


camera.position.z = 5;
ball.position.x = 2;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    ball.rotation.x += 0.01;
	ball.rotation.y += 0.01;

	renderer.render( scene, camera );

}