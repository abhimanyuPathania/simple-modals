$(document).ready(function () {

	var simpleModals = $(".simple-modal-wrapper");
	var imageModals = $(".image-modal");

	if (simpleModals.length === 0 && imageModals.length === 0) {
		// if user has no modals; return
		return false;
	}
	var simpleModalTriggers = $(".simple-modal-trigger");
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

		//if user wants to create his custom button to close the modal
		// this obviously will have to inside the .modal-content
		var simpleModalClose = $(".simple-modal-close", modalDiv);
		if (simpleModalClose.length > 0) {
			//if exsist attack the same close function
			simpleModalClose.on("click.modal", closeModal);
		}

		//create the close mark and attach closeModal event handler
		var closeMark = $("<span class='close-modal'>&times;</span>");
		closeMark.on("click.modal", closeModal);
		var modalHeading = $(".modal-heading", modalDiv);
		if (modalHeading.find(".close-modal").length === 0 && modalHeading.length > 0) {
			// dont add the 'x' mark if already there
			modalHeading.append(closeMark);
		}

		var duration = 200;
		var durationAttr = parseInt(modalDiv.attr("data-animation-duration"), 10);

		if (!isNaN(durationAttr)) {
			//to assign animation-duration of 0ms.
			//we get NaN if user omits this attribute hence using isNaN()
			duration = durationAttr;
		}
		
		modalDiv.fadeIn(duration);

		function closeModal(event) {

			//defining closeModal inside the openModal give it
			//closure access to the pertinent modalDiv

			if (event.target !== event.currentTarget){
				/*this prevents the click on/inside actual modal
				to fire click event on the dark background and close
				the modal*/
				return false;
			}
			modalDiv.fadeOut(duration);
		}
	}

	function viewImageModal(event) {
		var imageDiv = $("<div class='image-modal-div'></div>");
		var closeMark = $("<span class='close-image-modal'>&times;</span>");

		//image width as set by the user(css or style)
		var pageImageWidth = $(this).width();

		//clone the image and remove the modal image class(useful if we are using delegate)
		//class "image-modal-image" is added for increasing specificity of the css selector
		var modalImg = $(this).clone().removeClass("image-modal").addClass("image-modal-image");
		imageDiv.append(modalImg);
		imageDiv.append(closeMark);

		//adding close handler on div, since click on img will bubble up
		imageDiv.on("click.modal", closeImageModal);

		$(document.body).append(imageDiv);

		var duration = 150;
		var durationAttr = parseInt(modalImg.attr("data-animation-duration"), 10);

		if (!isNaN(durationAttr)) {
			//to assign animation-duration of 0ms.
			//we get NaN if user omits this attribute hence using isNaN()
			duration = durationAttr;
		}

		if (pageImageWidth === modalImg.width()) {
			duration = 0;
		}

		//handles the animation and layout
		setImageModal(modalImg, pageImageWidth, duration);

		// inner helper functions
		function closeImageModal(event) {

			event.stopPropagation();
			modalImg.stop().animate({
				width: pageImageWidth }, {
					duration: duration,
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