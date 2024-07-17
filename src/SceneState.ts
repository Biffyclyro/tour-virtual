import { MeshBasicMaterial } from "three" 

export interface SceneState {
	stateName: string
	material: MeshBasicMaterial
	path: {prox: string, lat: number, long: number}[]
}