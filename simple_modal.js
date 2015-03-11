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
		var pageImageWidth = $(this).css("width");

		//clone the image and remove the modal image class(useful if we are using delegate)
		var modalImg = $(this).clone().removeClass("image-modal");
		imageDiv.append(modalImg);
		imageDiv.on("click.modal", closeImageModal);

		$(document.body).append(imageDiv);
		var actualImageWidth = modalImg.css("width");
		var actualImageHeight = modalImg.css("height");
		modalImg.css("width", pageImageWidth);

		// if image is bigger than the viewport width
		var viewportWidth = $(window).innerWidth();
		var finalImageWidth = Math.min(parseInt(actualImageWidth, 10), (parseInt(viewportWidth, 10)) - 20);
		centerImageModal();

		modalImg.animate({
			width: finalImageWidth }, {
				duration: 150
		});
		handleScroll();

		// inner helper functions
		function closeImageModal() {

			modalImg.stop().animate({
				width: pageImageWidth }, {
					duration: 150,
					complete: function () {
						imageDiv.remove();
					}
			});
			handleScroll();
		}

		function centerImageModal() {
			var horMargin = (viewportWidth - finalImageWidth)/2;
			var verMargin = (parseInt($(window).innerHeight(), 10) - parseInt(actualImageHeight, 10))/2;

			modalImg.css({
				marginTop:verMargin,
				marginBottom:verMargin,
				marginLeft:horMargin,
				marginRight:horMargin
			});
		}
	}

	function handleScroll() {

		var body = $('body');
		if (body.css("overflow") !== "hidden"){
			body.css("overflow", "hidden");
		} else {
			body.css("overflow", "");
		}
		
	}
});