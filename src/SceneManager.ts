
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { SceneState } from './SceneState'

export class SceneManager {
	private readonly controls: OrbitControls
	private button: THREE.Mesh | undefined
	private readonly scene: THREE.Scene
	private readonly camera: THREE.PerspectiveCamera
	private readonly renderer: THREE.WebGLRenderer
	private readonly mouse: THREE.Vector2
	private sceneState: SceneState | undefined;

	constructor() {
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		this.renderer = new THREE.WebGLRenderer()
		this.controls = this.createControls()
		this.mouse = new THREE.Vector2()

		this.sceneState = {stateImage:'/assets/image-1.jpg', path: [{prox: 'outra-sala', lat: 100, long: 200}]}


		this.createEnvironment()
		this.scene.add(this.createButton())


		this.renderer.setAnimationLoop(() => this.renderer.render(this.scene, this.camera))
		this.renderer.setSize(window.innerWidth, window.innerHeight)

		this.camera.position.z = 1;

		// window.onresize = () => {
		// 	this.camera.aspect = window.innerWidth / window.innerHeight;
		// 	this.camera.updateProjectionMatrix();
		// 	this.renderer.setSize(window.innerWidth, window.innerHeight)
		// }
		this.init()

	}

	private init() {

		window.onresize = this.resize.bind(this)
		document.addEventListener('mousemove', this.mouseMove.bind(this), false)

		document.body.appendChild(this.renderer.domElement)
	} 

	private createControls(): OrbitControls {
		const controls = new OrbitControls(this.camera, this.renderer.domElement)
		controls.enableDamping = true
		controls.rotateSpeed = -0.3
		controls.enableRotate = true
		controls.zoomSpeed = 0
		controls.dampingFactor = 0.05
		return controls
	}


	private createButton(): THREE.Mesh {

		const geometry = new THREE.SphereGeometry(20)
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff44 })
		const point = new THREE.Mesh(geometry, material)
		const spherical = new THREE.Spherical()
		spherical.theta = 100
		spherical.phi = 250
		spherical.radius = 515
		//point.position.setFromSpherical(100, 10, 509)
		point.position.setFromSpherical(spherical)
		point.userData = {'sala': 'teste'}
		document.addEventListener('click', (e: MouseEvent) => {
			const raycaster = new THREE.Raycaster()
			raycaster.setFromCamera(this.mouse, this.camera)
			if (raycaster.intersectObject(point).length > 0) {

				console.log(point.userData)
			}
		})


		return point
	}

	private createEnvironment() {
		const geometry = new THREE.SphereGeometry(500, 60, 40);
		geometry.scale(1, 1, -1)
		const material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(this.sceneState!.stateImage) });
		//const material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/assets/image-1.jpg') });
		const skyBox = new THREE.Mesh(geometry, material);
		this.scene.add(skyBox)
	}

	private mouseMove(e: MouseEvent) {
		this.mouse.set((e.clientX / this.renderer.domElement.clientWidth) * 2 - 1,
		-(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1)
	}

	private resize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight)
	}
	
}