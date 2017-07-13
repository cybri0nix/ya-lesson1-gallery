(function(window, undefined)
{
	var _isTouchDevice = !!('ontouchstart' in window);
	var _body = document.getElementsByTagName('body')[0];

	this.PictureVwr = function(params){
		this.defaultParams = {
			thumb: '',
			src: '',
			title: ''
		}

		this.modalLayout = null;
		this.titleBar = null;
		this.titleText = null;
		this.imagePlaceholder = null;
		this.image = null;
	}

	PictureVwr.prototype.destroy = function(){}

	PictureVwr.prototype.view = function(params){
		// TODO: validate/extend default params
		this.params = params;

		if (this.modalLayout) {
	    	this.image.src = this.params.src;
	    	this.image.alt = this.params.title;
	    	this.titleText.innerHTML = this.params.title;
		} else {
			_build.call(this);
			_bindEvents.call(this);
		}

		_body.style.overflow = 'hidden';

		_addClass(this.modalLayout, 'modal-picture-viewer_visible');

		PictureVwr.prototype.imageLoaded.call(this);
	}


	PictureVwr.prototype.close = function(params){
		_removeClass(this.modalLayout, 'modal-picture-viewer_visible');

		this.image.removeAttribute('src');
		this.image.removeAttribute('style');

		_body.style.overflow = 'auto';
	}


	PictureVwr.prototype.imageLoaded = function(){
		PictureVwr.prototype.scaleImage.call(this);
	}


	PictureVwr.prototype.scaleImage = function(){
		var imgWidth = this.image.naturalWidth,
			imgHeight = this.image.naturalHeight,
			vpWidth = this.getWindowWidth(),
			vpHeight = this.getWindowHeight(),
			titleBarHeight = this.titleBar.clientHeight
			;

		if (imgHeight > vpHeight)
		{
			this.image.style.maxHeight = (vpHeight - 100) + titleBarHeight + 'px';
		} else {
			this.image.removeAttribute('style');
		}
	}


	PictureVwr.prototype.getWindowWidth = function(){
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}


	PictureVwr.prototype.getWindowHeight = function(){
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	}


	PictureVwr.prototype.touchstart = function() {
		if (this.image){
			this.close();
		}
	}


	PictureVwr.prototype.keydown = function(e){
		if (27 === e.keyCode )
		{
			if (this.image){
				this.close();
			}
		}
	}


	/**
	 * Private methods
	 */
	
	function _addClass(elem, _className) {
		if (-1 === elem.className.indexOf(_className)) {
        	elem.className = [elem.className, _className].join(' ');
		}
	}

	function _removeClass(elem, _className) {
		var newClasses = [],
			i,
        	classes = elem.className.split(" ");

        for (i = 0; i < classes.length; i++) {
            if (classes[i] !== _className) {
                newClasses.push(classes[i]);
            }
        }
        elem.className = newClasses.join(' ');
	}

	function _bindEvents(){
		this.image.addEventListener('load', this.imageLoaded.bind(this));
		this.image.addEventListener('click', this.close.bind(this));
		window.addEventListener('resize', this.scaleImage.bind(this));
		window.addEventListener('touchmove', this.touchstart.bind(this));
		window.addEventListener('keydown', this.keydown.bind(this));
	}

	function _build(){
	    // Layout
	    this.modalLayout = document.createElement('div');
	    this.modalLayout.className = 'modal-picture-viewer';
	    
		// Title bar
	    this.titleBar = document.createElement('h3');
	    this.titleBar.className = 'modal-picture-viewer__title-wrap';

	    this.titleText = document.createElement('span');
	    this.titleText.className = 'modal-picture-viewer__title-text';
	    this.titleText.innerHTML = this.params.title;

	    this.titleBar.appendChild( this.titleText );
	    this.modalLayout.appendChild(this.titleBar);

	    // Image placeholder
	    this.imagePlaceholder = document.createElement('div');
	    this.imagePlaceholder.className = 'modal-picture-viewer__picture-wrap';
	    // Image
	    this.image = document.createElement('img');
	    this.image.className = 'modal-picture-viewer__picture-image';
	    this.image.title = 'Уменьшить';
	    this.image.alt = this.params.title;
	    this.image.src = this.params.src;

	    this.imagePlaceholder.appendChild(this.image);
	    this.modalLayout.appendChild( this.imagePlaceholder );

	    // Inject to document
	    document.body.appendChild( this.modalLayout );
	}

}(window));