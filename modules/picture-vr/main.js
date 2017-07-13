(function(window, undefined)
{
	var _isTouchDevice = !!('ontouchstart' in window),
		_body = document.getElementsByTagName('body')[0],
		_bodyPrevWidth = 0,
		_imagesLoaded = [];

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

		_bodyPrevWidth = _body.clientWidth;

		if (this.modalLayout) {
	    	this.image.src = this.params.src;
	    	this.image.alt = this.params.title;
	    	this.titleText.innerHTML = this.params.title;
		} else {
			_build.call(this);
			_bindEvents.call(this);
		}

		_body.style.overflow = 'hidden';
		_body.style.width = _bodyPrevWidth+'px';

		_addClass(this.modalLayout, 'modal-picture-viewer_visible');

		if (-1 === _imagesLoaded.indexOf(this.image.src)) {
			_addClass(this.imagePlaceholder, 'modal-picture-viewer__picture_loading');
		}

		PictureVwr.prototype.onResizeHandler.call(this);
	}


	PictureVwr.prototype.close = function(params) {
		_removeClass(this.modalLayout, 'modal-picture-viewer_visible');
		_removeClass(this.imagePlaceholder, 'modal-picture-viewer__picture_loading');
		_removeClass(this.image, 'modal-picture-viewer__picture-image_visible');

		this.image.removeAttribute('src');
		this.image.removeAttribute('style');

		_body.style.overflow = 'auto';
		_body.style.width = 'auto';
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


	PictureVwr.prototype.onImageLoadedHandler = function() {
		if (-1 === this.modalLayout.className.split(' ').indexOf('modal-picture-viewer_visible')
			&& -1 === this.imagePlaceholder.className.split(' ').indexOf('modal-picture-viewer__picture_loading')) {
			return false;
		}
		if (-1 === _imagesLoaded.indexOf(this.image.src)) {
			_removeClass(this.imagePlaceholder, 'modal-picture-viewer__picture_loading');
			_imagesLoaded.push(this.image.src);
		}

		setTimeout(function() {
			_addClass(this.image, 'modal-picture-viewer__picture-image_visible');
		}.bind(this), 100);
		PictureVwr.prototype.scaleImage.call(this);
	}

	PictureVwr.prototype.onResizeHandler = function() {
		this.scaleImage();
	}

	PictureVwr.prototype.onTouchstartHandler = function() {
		if (this.image){
			this.close();
		}
	}

	PictureVwr.prototype.onKeydownHandler = function(e){
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
		this.image.addEventListener('load', this.onImageLoadedHandler.bind(this));
		this.modalLayout.addEventListener('click', this.close.bind(this));
		window.addEventListener('resize', this.onResizeHandler.bind(this));
		window.addEventListener('touchmove', this.onTouchstartHandler.bind(this));
		window.addEventListener('keydown', this.onKeydownHandler.bind(this));
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