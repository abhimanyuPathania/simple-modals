$(document).ready(function () {

	var simpleModals = $(".simple-modal-wrapper");
	var simpleModalTriggers = $(".simple-modal-trigger");
	var imageModals = $(".image-modal");

	if (simpleModals.length === 0 && imageModals.length === 0) {
		// if user has no modals; return
		return false;
	}

	simpleModalTriggers.on("click.modal", openModal);
	imageModals.on("click.modal", viewImageModal);
	$(window).on("resize.modal", resizeImageModal);

	function openModal(event) {

		//stop propagation if target is the modal trigger
		event.stopPropagation();

		var modalId = $(this).attr("data-trigger-modal-id");
		var attrSelector = "[data-modal-id='"+  modalId + "']";
		var modalDiv = simpleModals.filter(attrSelector);

		//attach closeModal to the dark background click
		modalDiv.on("click.modal", closeModal);

		//create the close mark and attach closeModal event handler
		var closeMark = $("<span class='close-modal'>&times;</span>");
		closeMark.on("click.modal", closeModal);
		var modalHeading = $(".modal-heading", modalDiv);
		if (modalHeading.find(".close-modal").length === 0 && modalHeading.length > 0) {
			// dont add the 'x' mark if already there
			modalHeading.append(closeMark);
		}
		
		modalDiv.fadeIn(300);

		function closeModal(event) {

			//defining closeModal inside the openModal give it
			//closure access to the pertinent modalDiv

			if (event.target !== event.currentTarget){
				/*this prevents the click on/inside actual modal
				to fire click event on the dark background and close
				the modal*/
				return false;
			}
			modalDiv.fadeOut(300);
		}
	}

	function viewImageModal(event) {
		var imageDiv = $("<div class='image-modal-div'></div>");

		//image width as set by the user
		var pageImageWidth = $(this).width();

		//clone the image and remove the modal image class(useful if we are using delegate)
		//class "image-modal-image" is added for increasing specificity of the css selector
		var modalImg = $(this).clone().removeClass("image-modal").addClass("image-modal-image");
		imageDiv.append(modalImg);

		//adding close handler on div, since click on img will bubble up
		imageDiv.on("click.modal", closeImageModal);

		$(document.body).append(imageDiv);

		var speed = parseInt(modalImg.attr("data-animation-speed"), 10) || 150;
		if (pageImageWidth === modalImg.width()) {
			speed = 0;
		}

		//handles the animation and layout
		setImageModal(modalImg, pageImageWidth, speed);

		// inner helper functions
		function closeImageModal(event) {

			event.stopPropagation();
			modalImg.stop().animate({
				width: pageImageWidth }, {
					duration: speed,
					complete: function () {
						imageDiv.remove();
						allowScroll(true);
					}
			});
		}
	}

	function setImageModal(image, initialWidth, speed) {
		/*this can be called seperately on browser resize
		to make the modal fairly resposive*/

		var imageWidth = image.width();
		var imageHeight = image.height(); 
		
		if(initialWidth) {
			/*set width back to initial width to scale from original size
			initialWidth is not needed when setImageModal is called by browser resize */
			image.css("width", initialWidth);
		}
		
		var viewportWidth =  $(window).width(); 
		var viewportHeight =  $(window).height();

		// if image is bigger than the viewport width
		var finalImageWidth = Math.min(imageWidth, (viewportWidth-20));
		centerImageModal();
		
		if (!speed) {
			// no animation when browser resizes
			speed = 0;
		}
		image.animate({
			width: finalImageWidth }, {
				duration: speed
		});
		allowScroll(false);


		// helper function
		function centerImageModal() {
			
			var horMargin = finalImageWidth/2;
			var verMargin = imageHeight/2;

			//always center horizontally
			image.css({
				position:"absolute",
				left: "50%",
				marginLeft: -horMargin
			});

			/* center vertically only if image height is smaller than viewport; else
				the 'max-height:100%(in css)' will force it to scale to viewport
				and set its width accordingly too  */
			if (imageHeight < viewportHeight) {
				image.css({
					top: "50%",
					marginTop: -verMargin
				});
			}
		} 
	}

	function resizeImageModal(event) {
		var modalImgDiv = $(".image-modal-div");
		if (modalImgDiv.length === 0) {
			return;
		}

		var modalImg = $("img" ,modalImgDiv);
		modalImg.removeAttr('style');
		setImageModal(modalImg);
	}

	function allowScroll(allow) {

		//make viewport un-scrollable
		var body = $('body');

		if(allow) {
			body.css("overflow", "");
		} else {
			body.css("overflow", "hidden");
		}	
	}

});