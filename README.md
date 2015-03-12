# simple-modals
> create modals to display HMTL content and also create modals for your images to display them on full screen.

It uses bootstrap like div/class based synatx to add the modal markup and modal triggers.

```html
<div class="simple-modal-wrapper" data-modal-id="modal1" data-animation-duration="200">
	<div class="modal-content">
	
		<p class="modal-heading">Modal Heading</p>
		
		<div class="modal-body">
		  Your modal content markup
		</div>
		
	</div>
</div>

<!-- This could be placed anywhere according to your markup -->
<button class="simple-modal-trigger" data-trigger-modal-id = "modal1">Trigger Modal 1</button>
```

Bare minimum CSS has been added to style and center the modals and you can fully customize it by overiding few CSS classes.

Modals are fully responsive and animation speed can be controlled/turned off.

Library also features special modals for animating images to diplay them full-screen. This can be done by just adding 
an "image-modal" class to the "img" tag.




