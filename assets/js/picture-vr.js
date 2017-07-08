(function(window, undefined)
{
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

	PictureVwr.prototype.view = function(params){
		// TODO: validate/extend default params
		this.params = params;

		if (this.modalLayout){
	    	this.image.src = this.params.src;
	    	this.image.alt = this.params.title;
	    	this.titleText.innerHTML = this.params.title;
		} else {
			_build.call(this);
			_bindEvents.call(this);
		}

		$('body').css({ overflow:'hidden' });

		$(this.modalLayout).addClass('modal-picture-viewer_visible');

		PictureVwr.prototype.imageLoaded.call(this);
	}

	PictureVwr.prototype.close = function(params){
		$(this.modalLayout).removeClass('modal-picture-viewer_visible');

		$(this.image).removeAttr('src');
		$(this.image).removeAttr('style');

		$('body').css({ overflow:'auto' });
	}

	PictureVwr.prototype.imageLoaded = function(){
		PictureVwr.prototype.scaleImage.call(this);
	}

	PictureVwr.prototype.scaleImage = function(){
		var imgWidth = this.image.naturalWidth,
		imgHeight = this.image.naturalHeight,
		vpWidth = $(window).width(),
		vpHeight = $(window).height(),
		titleBarHeight = $(this.titleBar).outerHeight()
		;

		if (imgHeight > vpHeight)
		{
			$(this.image).css({
				maxHeight: (vpHeight - 100) + titleBarHeight + 'px'
			});
		}
		else{
			$(this.image).removeAttr('style');
		}
	}


	/**
	 * Private methods
	 */
	
	
	function _bindEvents(){

		$(this.image).on('load', this.imageLoaded.bind(this));
		$(this.image).on('click', this.close.bind(this));

		$(window).on('resize.picture-vwr', this.scaleImage.bind(this));

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