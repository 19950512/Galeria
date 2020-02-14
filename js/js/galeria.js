class Galeria{

	constructor(imagens = {}, configuracoes = {}){

		// Elemento pai da galeria
		this.galeria_container = this.id(configuracoes['galeria-id']);
		
		// Armazen todas as imagens da galeria
		this.imagens = imagens;

		// Imagem atual
		this.imagem_current = 0;

		// Elementos da galeria
		this.elements = {
			'main': this.galeria_container.querySelectorAll('.' + configuracoes.elements['main']),
		}

		// Armazena todos os elementos de controle da galeria
		this.controllers = {
			'left': this.galeria_container.querySelectorAll('.' + configuracoes.controllers['left']),
			'right': this.galeria_container.querySelectorAll('.' + configuracoes.controllers['right']),
			'play': null,
			'fullscreen': null,
			'close': null,
		}

		// Renderiza a galeria
		this.render();
	}

	/* Retorna um elemento pelo ID */
	id(id_elemento){
		return document.getElementById(id_elemento);
	}

	/* Ação imagem anterior */
	back(btn){
		console.log(btn, 'estou voltando..');
	}

	/* Ação proxima imagem */
	next(btn){
		console.log(btn, 'estou avançando..');
	}


	/* Responsável por renderizar os botões */
	_renderBotoes(){
		// Renderiza os botões de controle RIGHT
		for (var i = this.controllers.right.length - 1; i >= 0; i--){
			this.controllers.right[i].setAttribute('onclick', 'galeria.next(this)');
		}

		// Renderiza os botões de controle LEFT
		for (var i = this.controllers.left.length - 1; i >= 0; i--){
			this.controllers.left[i].setAttribute('onclick', 'galeria.back(this)');
		}
	}
	render(){

		// Renderiza os botões
		this._renderBotoes()
	}
}