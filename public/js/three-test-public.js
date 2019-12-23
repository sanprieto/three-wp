(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

})( jQuery );

const setup = () => {
	const containers = document.querySelectorAll('canvas.three-test')

	Array.from(containers).forEach(container => {
		const scene = new THREE.Scene()
		console.log(container.dataset['id'])
		const color = container.dataset['color'] || 'green'
		
		const renderer = new THREE.WebGLRenderer({canvas: container, })
	    renderer.setPixelRatio(window.devicePixelRatio)
	    renderer.setSize(container.clientWidth, container.clientHeight)

	    const ambientLight = new THREE.AmbientLight(color, 0.5)

	    const camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 1000)
		camera.position.z = 400

	    const geometry = new THREE.BoxGeometry(200, 200, 200)
	    const material = new THREE.MeshPhongMaterial()
	    const cube = new THREE.Mesh(geometry, material)

	    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
	    directionalLight.position.set(600, 200, 200)

	    scene.add(cube)
	    scene.add(ambientLight)
		scene.add(directionalLight)    

	    const animate = () => {
	    	renderer.render(scene, camera)
	    	cube.rotation.x += .01
	    	cube.rotation.y += .01
	    	cube.rotation.z += .01
	    	requestAnimationFrame(animate)
	    }
	    animate()
	})

}

document.addEventListener('DOMContentLoaded', () => {
	console.log(THREE)

	setup()
})