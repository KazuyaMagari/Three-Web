import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from "lil-gui";

let scene, camera, renderer, gui, material;
let mesh1, mesh2, mesh3, mesh4;
let directionalLight;
let speed = 0;
let rotation = 0;
const clock = new THREE.Clock();

window.addEventListener("load", init);
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;
  scene.add(camera);

  const canvas = document.querySelector(".webgl");
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  material = new THREE.MeshPhysicalMaterial({
    color: "#3c94d7",
    metalness: 0.5,
    roughness: 0.4,
    flatShading: true
  });

  const loader = new GLTFLoader();
  loader.load("../imgs/chandra_v09.gltf", (gltf) => {
    const model = gltf.scene;
    model.position.set(1, 0, 0);
    model.rotation.set(0.3, -1.75, 0.25);
    model.scale.set(0.3, 0.3, 0.3);
    scene.add(model);
  });

  gui = new dat.GUI();
  gui.addColor(material, "color");
  gui.add(material, "metalness", 0, 1, 0.01);
  gui.add(material, "roughness", 0, 1, 0.01);

  mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 100), material);
  mesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(), material);
  mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 16, 100), material);
  mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(), material);

  mesh1.position.set(2, 0, 0);
  mesh2.position.set(-1, 0, 0);
  mesh3.position.set(2, 0, -6);
  mesh4.position.set(5, 0, 3);
  scene.add(mesh1, mesh2, mesh3, mesh4);

  directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(0.5, 1, 0);
  scene.add(directionalLight);

  animate();
  rot();
}

function animate() {
  let deltaTime = clock.getDelta();
  renderer.render(scene, camera);

  mesh1.rotation.x += 0.1 * deltaTime;
  mesh1.rotation.y += 0.1 * deltaTime;
  mesh2.rotation.x += 0.1 * deltaTime;
  mesh2.rotation.y += 0.1 * deltaTime;
  mesh3.rotation.x += 0.1 * deltaTime;
  mesh3.rotation.y += 0.1 * deltaTime;
  mesh4.rotation.x += 0.1 * deltaTime;
  mesh4.rotation.y += 0.1 * deltaTime;

  requestAnimationFrame(animate);
}

function rot() {
  rotation += speed;
  speed *= 0.9;
  
  mesh1.position.x = 2 + 4 * Math.cos(rotation);
  mesh1.position.z = -3 + 4 * Math.sin(rotation);
  mesh2.position.x = 2 + 4 * Math.cos(rotation + Math.PI / 2);
  mesh2.position.z = -3 + 4 * Math.sin(rotation + Math.PI / 2);
  mesh3.position.x = 2 + 4 * Math.cos(rotation + Math.PI);
  mesh3.position.z = -3 + 4 * Math.sin(rotation + Math.PI);
  mesh4.position.x = 2 + 4 * Math.cos(rotation + 3 * (Math.PI / 2));
  mesh4.position.z = -3 + 4 * Math.sin(rotation + 3 * (Math.PI / 2));
  
  requestAnimationFrame(rot);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("wheel", (e) => {
  speed += e.deltaY * 0.0002;
});
