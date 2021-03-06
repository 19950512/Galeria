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
			'play': this.galeria_container.querySelectorAll('.' + configuracoes.controllers['play']),
			'fullscreen': null,
			'close': null,
		}
	}

	init(){

		// Renderiza a galeria
		this.render();

		// Escuta as teclas - setinhas do teclado
		document.addEventListener("keyup", function(evt){
			
			// seta direita 
			if(evt.keyCode == 39){
				galeria.next()
			}

			// seta esquerda 
			if(evt.keyCode == 37){
				galeria.back()
			}

		}, true);
	}

	/* Retorna um elemento pelo ID */
	id(id_elemento){
		return document.getElementById(id_elemento);
	}

	/* Ação imagem anterior */
	back(){

		if(this.imagens[this.imagem_current - 1]){

			// Atualiza a imagem current
			this.imagem_current = this.imagem_current - 1;
		}

		// Renderiza a galeria
		this._renderMain();

		this._renderRight()
		this._renderLeft()
	}

	/* Ação proxima imagem */
	next(){

		if(this.imagens[this.imagem_current + 1]){

			// Atualiza a imagem current
			this.imagem_current = this.imagem_current + 1;
		}

		// Renderiza a galeria
		this._renderMain()

		this._renderRight()
		this._renderLeft()
	}

	/* Slide, status = true (ON) - status = false (OFF) */
	slide(btn, status = true){

		// Altera o botão play do slide
		btn.textContent = !status ? 'ON' : 'OFF';
		btn.setAttribute('onclick', 'galeria.slide(this, ' + !status + ')');
	}

	/* Renderiza imagem principal */
	_renderMain(){

		// Se a imagem atual existe na lista das imagens
		if(this.imagens[this.imagem_current]){

			// Renderiza a imagem current em todos os elementos MAIN (imagem principal)
			for (var i = this.elements['main'].length - 1; i >= 0; i--) {
				this.elements['main'][i].src = this.imagens[this.imagem_current]['src'];
			}
		}
	}

	/* Responsável por renderizar os botões */
	_renderBotoes(){
		this._renderRight()
		this._renderLeft()
		this._renderPlay()
	}

	/* Renderiza só a setinha Direita */
	_renderRight(){

		// Renderiza os botões de controle RIGHT
		for (var i = this.controllers.right.length - 1; i >= 0; i--){

			this.controllers.right[i].setAttribute('onclick', 'galeria.next()');

			if(!this.imagens[this.imagem_current + 1]){
				this.controllers.right[i].style.display = 'none';
			}else{
				this.controllers.right[i].style.display = null;		
			}
		}
	}

	/* Renderiza só a setinha Esquerda */
	_renderLeft(){

		// Renderiza os botões de controle LEFT
		for (var i = this.controllers.left.length - 1; i >= 0; i--){

			this.controllers.left[i].setAttribute('onclick', 'galeria.back()');

			if(!this.imagens[this.imagem_current - 1]){
				this.controllers.left[i].style.display = 'none';
			}else{
				this.controllers.left[i].style.display = null;		
			}
		}
	}

	/* Renderiza só o botão Play - Slide */
	_renderPlay(){

		// Renderiza os botões de controle PLAY
		for (var i = this.controllers.play.length - 1; i >= 0; i--){

			this.controllers.play[i].setAttribute('onclick', 'galeria.slide(this, true)');

			if(!this.imagens[1]){
				this.controllers.play[i].style.display = 'none';
			}else{
				this.controllers.play[i].style.display = null;		
			}
		}
	}

	render(){

		// Renderiza os botões
		this._renderBotoes()

		// Renderiza imagem principal
		this._renderMain();
	}
}