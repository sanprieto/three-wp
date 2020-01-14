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

let radius = 8;
let theta = 0;
let line = [];
let letters;
let fullText = [];

let letterSetting = {
    curveSegments: 12,
    steps: 10,
    depth: .1,
    bevelEnabled: false,
    bevelThickness: .03,
    bevelSize: .05,
    bevelSegments: 6
};

const xixote = () => {

	console.log('dcl')
	// function loadFont(callback) {
	const loader = new THREE.FontLoader();

	const containers = document.querySelectorAll( 'canvas.three-test' );
	const material = new THREE.MeshPhongMaterial( {color: 0x6699ff} ); 

	loader.load(
		// resource URL
		'https://unpkg.com/three@0.112.1/examples/fonts/helvetiker_bold.typeface.json',

		// onLoad callback
		function ( font ) {
			// do something with the font
			init( font, containers, material );
			console.log('load font call init')
		}
	);
	// }
	// loadFont(init, containers, material)
}

if (['interactive', 'loaded', 'completed'].includes(document.readyState)) {
	console.log('ready')
	xixote()
}
else {
	console.log('not ready')
	document.addEventListener("DOMContentLoaded", () => {
		console.log('yes ready')
		xixote()
	})
}

console.log({xixote, rs: document.readyState})

function init( font, containers, material ){ 

	Array.from( containers ).forEach( container => { 

		const scene = new THREE.Scene()
		const color = container.dataset['color'] || 'green'
		
		const renderer = new THREE.WebGLRenderer({canvas: container, })
	    renderer.setPixelRatio(window.devicePixelRatio)
	    renderer.setSize(container.clientWidth, container.clientHeight)

	    const ambientLight = new THREE.AmbientLight(color, 0.5)

	    const camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 1000)
		camera.position.z = 8

	    const geometry = new THREE.BoxGeometry(2, 2, 2)
	    const material = new THREE.MeshPhongMaterial()
	    //const cube = new THREE.Mesh(geometry, material)
	    const texts = createTextByLetters( scene, 'Click to show \nTime to interactive.' );

	    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
	    directionalLight.position.set(600, 200, 200)

	    //scene.add(cube)
	    scene.add(ambientLight)
		scene.add(directionalLight)    

	    const animate = () => {
	    	renderer.render(scene, camera)

	    	/*
	    	cube.rotation.y+= 0.01;
	    	cube.rotation.x+= 0.01;
	    	cube.rotation.z+= 0.01;
	    	*/
	    	
	    	texts.forEach( ( obj,i ) => {

	    	  obj.rotation.y += 0.001 * i;
	    	  obj.rotation.x += 0.001 * i;

	    	} );


	    	theta += 0.1;
	    	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	    	camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	    	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	    	camera.lookAt( scene.position );
	    	camera.updateMatrixWorld();
	    	
	    	
	    	requestAnimationFrame(animate)
	    }

	    renderer.render(scene, camera);
	    //animate();
	 //    window.onload = function() {
	 //    	console.log('Event onload')

		// };
		animate();
	    
	})


	function createTextByLetters( scene, contentText ){ 

		contentText = contentText.split('\n');

		for( var i = 0; i < contentText.length ; i ++ ){ 

			let shapes = font.generateShapes( contentText[i], 1 );

			const geometry = new THREE.ShapeGeometry( shapes );
			geometry.computeBoundingBox();

			let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
			//console.log( xMid )

			for ( var u = 0; u < shapes.length; u ++ ) {

			    const shape = shapes[ u ];
			    const geometrus = new THREE.ExtrudeGeometry( shape, letterSetting );
			    geometrus.translate( xMid, - ((i * 1) * 1.5) , 0 );
			    letters = new THREE.Mesh( geometrus, material.clone() );
			    
			    let centrer = new THREE.Vector3();
			    letters.geometry.computeBoundingBox();
			    letters.geometry.boundingBox.getCenter( centrer );
			    letters.geometry.center();
			    letters.position.copy(centrer);
			    letters.position.y = letters.position.y + 1;
				
			    scene.add( letters );
			    fullText.push( letters );
			}

		}
		//console.log( fullText );

		return fullText;
	}

}

// document.getElementById("beginMagic").addEventListener("click", () => {
// 	let t= performance.now() 
// 	alert( t/1000)
// })






