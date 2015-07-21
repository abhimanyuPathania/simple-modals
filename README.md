# simple-modals
1. create modals to display forms
2. use special image modals to maximize images to full-screen

It uses bootstrap like div/class based syntax to add the modal markup and modal triggers.

```html
<div class="simple-modal-wrapper" data-modal-id="modal1" data-animation-duration="200">
	<div class="modal-content">
	
		<p class="modal-heading">Modal Heading</p>
		
		<div class="modal-body">
		  Your modal content markup goes here
		</div>
		
	</div>
</div>

<!-- This could be placed anywhere according to your markup -->
<button class="simple-modal-trigger" data-trigger-modal-id = "modal1">Trigger Modal 1</button>
```

Bare minimum CSS has been added to style and center the modals. You can fully customize it by overriding few CSS classes.

Modals are fully responsive and animation speed can be controlled/turned off.

Library also features special modals for animating images to display them full-screen. This can be done by just adding 
an "image-modal" class to the "img" tag.

Refer to the repository website for the complete tutorial, examples and documentation.
http://abhimanyupathania.github.io/simple-modals/




