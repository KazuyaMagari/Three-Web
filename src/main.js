import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; 
import * as dat from "lil-gui";

const gui = new dat.GUI();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;
scene.add(camera);
const canvas = document.querySelector(".webgl"); 
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const material = new THREE.MeshPhysicalMaterial({
  color: "#3c94d7",
  metalness: 0.5,
  roughness: 0.4,
  flatShading: true
});

gui.addColor(material, "color");
gui.add(material, "metalness", 0, 1, 0.01);
gui.add(material, "roughness", 0, 1, 0.01);

const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 100), material);
const mesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(), material);
const mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 16, 100), material);
const mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(), material);

mesh1.position.set(2, 0, 0);
mesh2.position.set(-1, 0, 0);
mesh3.position.set(2, 0, -6);
mesh4.position.set(5, 0, 3);
scene.add(mesh1, mesh2, mesh3, mesh4);

const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper);
renderer.render(scene, camera);

const clock = new THREE.Clock();

function animate(){
  let DeltaTime = clock.getDelta();
  renderer.render(scene, camera);

  mesh1.rotation.x += 0.1 * DeltaTime;
  mesh1.rotation.y += 0.1 * DeltaTime;
  mesh2.rotation.x += 0.1 * DeltaTime;
  mesh2.rotation.y += 0.1 * DeltaTime;
  mesh3.rotation.x += 0.1 * DeltaTime;
  mesh3.rotation.y += 0.1 * DeltaTime;
  mesh4.rotation.x += 0.1 * DeltaTime;
  mesh4.rotation.y += 0.1 * DeltaTime;

  window.requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();