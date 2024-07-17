
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { SceneState } from './SceneState'

export class SceneManager {
	private readonly controls: OrbitControls
	private buttonRight: THREE.Mesh | undefined
	private buttonLeft: THREE.Mesh | undefined
	private readonly scene: THREE.Scene
	private readonly camera: THREE.PerspectiveCamera
	private readonly renderer: THREE.WebGLRenderer
	private readonly mouse: THREE.Vector2
	private sceneState: SceneState | undefined;
	private readonly salaPath: Map<string, SceneState>
	private currentSkyBox: THREE.Mesh | undefined

	constructor() {
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		this.renderer = new THREE.WebGLRenderer()
		this.controls = this.createControls()
		this.mouse = new THREE.Vector2()
		this.salaPath = new Map();
		this.salaPath.set('sala-1', {stateName:'sala-1', material: this.loadMaterial('sala-1'), path: [{prox: 'sala-7', lat: 400, long: 500}, {prox: 'sala-2', lat: 450, long: 50}]})
		this.salaPath.set('sala-2', {stateName:'sala-2', material: this.loadMaterial('sala-2'), path: [{prox: 'sala-1', lat: 400, long: 500}, {prox: 'sala-3', lat: 450, long: 50}]})
		this.salaPath.set('sala-3', {stateName:'sala-3', material: this.loadMaterial('sala-3'), path: [{prox: 'sala-2', lat: 500, long: 300}, {prox: 'sala-4', lat: 450, long: 50}]})
		this.salaPath.set('sala-4', {stateName:'sala-4', material: this.loadMaterial('sala-4'), path: [{prox: 'sala-3', lat: 350, long: 750}, {prox: 'sala-5', lat: 450, long: 300}]})
		this.salaPath.set('sala-5', {stateName:'sala-5', material: this.loadMaterial('sala-5'), path: [{prox: 'sala-4', lat: 550, long: 550}, {prox: 'sala-6', lat: 450, long: 50}]})
		this.salaPath.set('sala-6', {stateName:'sala-6', material: this.loadMaterial('sala-6'), path: [{prox: 'sala-5', lat: 400, long: 500}, {prox: 'sala-7', lat: 450, long: 50}]})
		this.salaPath.set('sala-7', {stateName:'sala-7', material: this.loadMaterial('sala-7'), path: [{prox: 'sala-6', lat: 400, long: 500}, {prox: 'sala-1', lat: 450, long: 50}]})

		this.sceneState = this.salaPath.get('sala-1')


		this.createEnvironment()
		this.renderer.setAnimationLoop(() => this.renderer.render(this.scene, this.camera))
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.camera.position.z = 1;
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


	private createButton({prox, lat, long}:{prox: string, lat:number, long: number}): THREE.Mesh {

		const geometry = new THREE.SphereGeometry(20)
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff44 })
		const point = new THREE.Mesh(geometry, material)
		const spherical = new THREE.Spherical()
		spherical.phi =lat 
		spherical.theta =long 
		//spherical.theta = 100
		spherical.radius = 515
		//point.position.setFromSpherical(100, 10, 509)
		point.position.setFromSpherical(spherical)
		point.userData = {'sala': prox}
		document.addEventListener('click', (e: MouseEvent) => {
			const raycaster = new THREE.Raycaster()
			raycaster.setFromCamera(this.mouse, this.camera)
			if (raycaster.intersectObject(point).length > 0) {

				this.sceneState = this.salaPath.get(prox)
				this.createEnvironment()
			}
		})


		return point
	}

	private createAllButtons() {
		if (this.buttonLeft) {
			this.scene.remove(this.buttonLeft)
		}
		if (this.buttonRight) {

			this.scene.remove(this.buttonRight)
		}
		this.buttonLeft = this.createButton(this.sceneState!.path[0])
		this.buttonRight = this.createButton(this.sceneState!.path[1])
		this.scene.add(this.buttonLeft)
		this.scene.add(this.buttonRight)
	}

	private createEnvironment() {
		const geometry = new THREE.SphereGeometry(500, 60, 40);
		geometry.scale(1, 1, -1)
		const material = this.sceneState!.material
		const skyBox = new THREE.Mesh(geometry, material)
		console.log(this.sceneState!.stateName)
		if (this.currentSkyBox) {
			this.scene.remove(this.currentSkyBox)
		}

		this.scene.add(skyBox)
		this.currentSkyBox = skyBox
		this.createAllButtons()
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

	private loadMaterial(name: string): THREE.MeshBasicMaterial {
		return new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`./assets/${name}.JPG`) });
	}
	
}