import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { SceneManager } from './SceneManager'

// const createControls = (camera: THREE.Camera, renderer: THREE.Renderer) => {
// 	const controls = new OrbitControls(camera, renderer.domElement)
// 	controls.enableDamping = true
// 	controls.rotateSpeed = -0.3
// 	controls.enableRotate = true
// 	controls.zoomSpeed = 0
// 	controls.dampingFactor = 0.05
// 	return controls
// }


// const createButton = (): THREE.Mesh=> {

// 	const geometry = new THREE.SphereGeometry(20)
// 	const material = new THREE.MeshBasicMaterial({color: 0x00ff44})
// 	const point =  new THREE.Mesh(geometry, material)
// 	const spherical = new THREE.Spherical()
// 	spherical.theta = 100
// 	spherical.phi = 250
// 	spherical.radius = 515
// 	//point.position.setFromSpherical(100, 10, 509)
// 	point.position.setFromSpherical(spherical)
// 	document.addEventListener('click', (e: Event) => {
// 		const raycaster = new THREE.Raycaster()
// 		raycaster.setFromCamera(e.)
// 		if (raycaster.intersectObject(point)) {
// 			console.log('clicou no botão')
// 		}
// 	})


// 	return point
// }

// const createEnvironment = (scene: THREE.Scene) => {
// 	const geometry = new THREE.SphereGeometry( 500, 60, 40 );
// 	geometry.scale(1, 1, -1)
// 	const material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('/assets/image-1.jpg')} );
// 	const skyBox = new THREE.Mesh( geometry, material );
// 	scene.add(skyBox)
// }

// const init = () => {
// 	const scene = new THREE.Scene()
// 	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 	const renderer = new THREE.WebGLRenderer()
// 	createControls(camera, renderer)
// 	createEnvironment(scene)
// 	scene.add(createButton())


// 	renderer.setAnimationLoop(() => renderer.render(scene, camera))
// 	renderer.setSize(window.innerWidth, window.innerHeight)

// 	camera.position.z = 1;

// 	window.onresize = () => {
// 		camera.aspect = window.innerWidth / window.innerHeight;
// 		camera.updateProjectionMatrix();
// 		renderer.setSize(window.innerWidth, window.innerHeight)
// 	}
	
// 	document.body.appendChild(renderer.domElement)
// }


// init()

const sm = new SceneManager()

console.log('running...')