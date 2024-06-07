import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { cameraFar, color } from 'three/examples/jsm/nodes/Nodes.js';
import Renderer from 'three/examples/jsm/renderers/common/Renderer.js';


// INSTANCIA THREE (Asignar espacio de trabajo para ANIMACIONES)
const renderer  = new THREE.WebGLRenderer();

// Habilitar sombras
renderer.shadowMap.enabled = true;

// DEFINIMOS EL TAMAÑO QUE OCUPAREMOS EN LA VENTANA
renderer.setSize(window.innerWidth , window.innerHeight);

// INYECTAMOS EL LIENZO QUE CREAMOS HACIA EL INDEX
document.body.appendChild(renderer.domElement);

// CREAR ESCENA CON CAMARA 3D
const scene = new THREE.Scene();

const camara = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Creamos INSTANCIA de la clase control de orbita
const orbit = new OrbitControls(camara, renderer.domElement);

// incluimos sistema de coordenadas para poder visualizar
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// modificamos unicacion por defecto de la camara
camara.position.set(-10, 30, 30)

orbit.update();

//Agregar ELEMENTO A LA ESCENA "CUADRO"
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Agregar plano a la escena
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);

//Agrear grid
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// Agregar esfera
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0000FF
    ,wireframe : false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10,10,0);
sphere.castShadow = true;
sphere.receiveShadow = false;
scene.add(sphere);

// Agregar luz de ambiente, es necesario que el material de los objetos no sea BASIC
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Agregar luz direccional
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);

directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
// Agregamos ayudante de direccion de luz
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 3);
scene.add(dLightHelper);


// Creamos ISNTANCIA de GUI (Ubicacion de objetos)
const gui = new dat.GUI();

    // Creamos array con opciones que se usan con "GUI"
    const options = {
        sphereColor : '#ffffff',
        wireframe : false,
        speed: 0.01
    };

    // Agregamos paleta de colores
    gui.addColor(options, 'sphereColor').onChange(function(e){
        sphere.material.color.set(e);
    })

    // Agregamos ON/OFF grilla de objetos
    gui.add(options, 'wireframe').onChange(function(e){
        sphere.material.wireframe = e;
    })

    // Agregamos escala
    gui.add(options, 'speed', 0, 0.1);

// Animación de rebote
let step = 0;
let speed = 0.01;

// Agregar animacion al objeto
function animate() {
    box.rotation.x += 0.01;
    box.rotation.z += 0.01 ;
    // Ahora VINCULAMOS la ESCENA con la CAMARA
    renderer.render(scene, camara);

    //Animacion de rebote
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
}
renderer.setAnimationLoop(animate);



// tuve que habilitar permisos de powerShell para poder llamar a parcel(CONSOLA W)
    // Set-ExecutionPolicy RemoteSigned

// fue necesario demover la carpeta .parcel-cache para ejecutar PARCEL (VSCODE)
// CON EL SIGUIENTE CODIGO ACTUALIZAMOS TODO EL PROYECTO
    //  parcel ./src/index.html

// instale AYUDA PARA PODER (VSCODE)
    //npm install dat.gui