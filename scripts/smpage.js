$(document).ready(function () {

	var header = $("header");
	var mainWrapper = $(".main-wrapper");
	var githubButton = $("#toGithub");

	//make the top equals to height of the header
	//header height is always set to viewport height via css
	mainWrapper.css("top", header.height());
	
	//in case user resizes; recalculate header height and apply it again
	$(window).on("resize", function() {
		mainWrapper.css("top", header.height());
	});

	githubButton.on("click", function (event) {
		event.preventDefault();
		window.open("https://github.com/abhimanyuPathania/simple-modals","_blank");
	});
});