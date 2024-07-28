export class LoadingScreenManager {
	public static readonly INSTANCE = new LoadingScreenManager()
	private canvas: HTMLElementTagNameMap["canvas"] | undefined | null
	private loadingDiv: HTMLElementTagNameMap["div"] | undefined 

	private constructor() {
		if (LoadingScreenManager.INSTANCE) {
			return LoadingScreenManager.INSTANCE 
		}
	}

	beginLoading() {
		this.canvas = document.querySelector('canvas')

		if (this.canvas) {
			this.canvas.style.display = 'none'
		}

		this.loadingDiv = document.createElement('div')
		this.loadingDiv.setAttribute('id', 'loadingText')
		
		this.loadingDiv.style.width = '100%'
		this.loadingDiv.style.height = '100%'
		this.loadingDiv.style.background= '#000'

		const text = document.createElement('h1')
		text.style.textAlign = 'center'
		text.style.color = '#ffffff'
		text.style.fontSize = `500%`
		text.innerHTML = 'Carregando...'
		text.style.paddingTop = '15%'

		this.loadingDiv.appendChild(text)
		document.querySelector('body')?.appendChild(this.loadingDiv)

	}

	endLoading() {
		if (this.canvas) {
			this.canvas.style.display = 'block'
		}

		document.querySelector('body')?.removeChild(this.loadingDiv!)
	}

}