
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.z = 4.5;
camera.position.x = -5.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);


// funcion

function troncoPiramide(altura, nlados, apotemaBaseInferior, porcentajeApotemaBaseSuperior) {
  const apotemaBaseSuperior = apotemaBaseInferior * (1 + porcentajeApotemaBaseSuperior / 100);

  const baseInferior = poligono(nlados, apotemaBaseInferior);
  const baseSuperior = poligono(nlados, apotemaBaseSuperior);

  const alturaVertices = [[0, 0, 0], [0, 0, altura]];

  const vertices = [];
  for (let i = 0; i < nlados; i++) {
      vertices.push([baseInferior[i][0], baseInferior[i][1], 0]);
      vertices.push([baseSuperior[i][0], baseSuperior[i][1], altura]);
  }

  const carasLaterales = [];
  for (let i = 0; i < nlados - 1; i++) {
      carasLaterales.push([i * 2, i * 2 + 1, i * 2 + 3, i * 2 + 2]);
  }
  carasLaterales.push([(nlados - 1) * 2, (nlados - 1) * 2 + 1, 1, 0]);

  const carasBases = [];
  for (let i = 0; i < nlados - 1; i++) {
      carasBases.push([i * 2, i * 2 + 2, (nlados - 1) * 2 + 2]);
      carasBases.push([i * 2 + 1, (nlados - 1) * 2 + 1, i * 2 + 3]);
  }
  carasBases.push([(nlados - 1) * 2, 0, (nlados - 1) * 2 + 2]);
  carasBases.push([(nlados - 1) * 2 + 1, (nlados - 1) * 2 + 3, 1]);

  const triangulos = carasLaterales.concat(carasBases);

  return {
      vertices: vertices.concat(alturaVertices),
      caras: triangulos
  };
}

function poligono(nlados, dim) {
  const vertices = [];
  const ang = 2 * Math.PI / nlados;
  const radio = dim / 2 / Math.sin(ang / 2);
  for (let i = 0; i <= nlados; i++) {
      const x = radio * Math.cos(i * ang);
      const y = radio * Math.sin(i * ang);
      vertices.push([x, y]);
  }
  return vertices;
}

// Ejemplo de uso
const altura = 5;
const nlados = 6;
const apotemaBaseInferior = 3;
const porcentajeApotemaBaseSuperior = 50;

const piramide = troncoPiramide(altura, nlados, apotemaBaseInferior, porcentajeApotemaBaseSuperior);
console.log(piramide);





//render
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}



render();




