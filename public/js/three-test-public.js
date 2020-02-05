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

let fullText = [];
let camera;
let containers;
let raycaster;
let mouse;
let plane;
let geometryCopy;
let scene;
let texts;
let cont = 0;
let font;
let img;
let imgOne;
let renderer;
let myContainer;
let mouseX = 0 , mouseY = 0;
let mobil = 3;

const xixote = () => {


	console.log( )

	var manager = new THREE.LoadingManager();
	manager.onLoad = function() { 

	  init( font, containers, imgOne );

	}
	var loader = new THREE.FontLoader( manager );
	loader.load(
		'https://unpkg.com/three@0.112.1/examples/fonts/helvetiker_bold.typeface.json',
		function ( resource ) {
			font = resource;
		}
	);

	var loader2 = new THREE.TextureLoader( manager );
	loader2.load( 'https://sanprieto.es/WpThree/wp-content/plugins/three-wp-master/public/img/backLuuk.jpg', function ( texture ) {
		imgOne = texture;
	} );
}


/*
if (['interactive', 'loaded', 'completed'].includes(document.readyState)) {
	console.log('ready')
	xixote();
}else {
	console.log('not ready')
	document.addEventListener("DOMContentLoaded", () => {
		console.log('yes ready')
		xixote();
	})
}
*/


document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    xixote();
  }
}


console.log({xixote, rs: document.readyState})
function init( font, container, imgOne ){ 


		container = document.querySelector( '#myContainer' );


	//Array.from( containers ).forEach( container => { 

		scene = new THREE.Scene()
		scene.background = imgOne;
		//scene.background = new THREE.Color(0x6699FF);
		const color = container.dataset['color'] || 'green'
		
		renderer = new THREE.WebGLRenderer({ antialias: true , alpha: true } );
	    renderer.setPixelRatio( window.devicePixelRatio )
	    renderer.setSize( container.clientWidth, container.clientHeight )
	    renderer.autoClearColor = true;
	    container.appendChild( renderer.domElement );

	    camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 1, 1000)
		camera.position.z = 5;

		if( container.clientWidth < 400){

			camera.position.z = 7;
			mobil = 0;
		}

	    const geometry = new THREE.PlaneGeometry( 1000, 800 );
	    const material = new THREE.MeshBasicMaterial( { color: 0xffff00, transparent: true, opacity: 0 } );
	    plane = new THREE.Mesh( geometry, material );
	    scene.add( plane );
	    plane.receiveShadow = true;
	    plane.position.z = -.7;
	    scene.add( plane );

	    texts = createParticlesLineText ( scene, 'CAMPAGNES VOOR DE\n   MOBIELE REVOLUTIE', font);
	    geometryCopy = new THREE.BufferGeometry();
	    geometryCopy.copy( texts.geometry );

	    raycaster = new THREE.Raycaster();
	    mouse = new THREE.Vector2( 1000,1000 );

	    const animate = () => {

	    	raycaster.setFromCamera( mouse, camera );

	    	const intersects = raycaster.intersectObject( plane );

	    	if ( intersects.length > 0 ) {

	    	  const mx = intersects[ 0 ].point.x;
	    	  const my = intersects[ 0 ].point.y;
	    	  const mz = intersects[ 0 ].point.z;

	    	  const pos = texts.geometry.attributes.position;
	    	  const copy = geometryCopy.attributes.position;

	    	  for ( var i = 0, l = pos.count; i < l; i++) {

	    	    const initX = copy.getX(i);
	    	    const initY = copy.getY(i);
	    	    const initZ = copy.getZ(i);

	    	    let px = pos.getX(i);
	    	    let py = pos.getY(i);
	    	    let pz = pos.getZ(i);

	    	    const dx = mx - px;
	    	    const dy = my - py;
	    	    const dz = mz - pz;

	    	    const mouseDistance = distance( mx, my, px, py )

	    	    if( mouseDistance < mobil ){

	    	      const ax = dx;
	    	      const ay = dy;
	    	      const az = dz;

	    	      px -= ax/20;
	    	      py -= ay/20;
	    	      pz -= az/20;

	    	      pos.setXYZ( i, px, py, pz );
	    	      pos.needsUpdate = true;


	    	    }
	    	    const dxo = px - initX;
	    	    const dyo = py - initY;
	    	    const dzo = pz - initZ;

	    	    px -= dxo/25;
	    	    py -= dyo/25;
	    	    pz -= dzo/25;

	    	    pos.setXYZ( i, px, py, pz );
	    	    pos.needsUpdate = true;

	    	  }
	    	}

	    	renderer.render( scene, camera )
	    	requestAnimationFrame( animate )
	    }

	    renderer.render(scene, camera);

		document.addEventListener( 'mousemove', onDocumentMouseMove );
		document.getElementById( 'myContainer' ).addEventListener("click", createNewText, true); 
		window.addEventListener( 'resize', onWindowResize );
		animate();
		onWindowResize();
	//})

	function onWindowResize(){ 

		const canvasAspect = container.clientWidth / container.clientHeight;
		const imageAspect = imgOne.image ? imgOne.image.width / imgOne.image.height : 1;
		const aspect = imageAspect / canvasAspect;
		  
		imgOne.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
		imgOne.repeat.x = aspect > 1 ? 1 / aspect : 1;
		  
		imgOne.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
		imgOne.repeat.y = aspect > 1 ? 1 : aspect;

	    camera.aspect = container.clientWidth / container.clientHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( container.clientWidth, container.clientHeight );

	}

	function onDocumentMouseMove( event ) {

	  event.preventDefault();
	  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	}


	const distance = (x1, y1, x2, y2) => {
	 
	  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
	}
	function createNewText( ){

	  scene.remove(texts);
	  texts.geometry.dispose();
	  texts.material.dispose();
	  texts = undefined;

	  if( cont == 0 ){

	  
	    texts = createParticlesLineText ( scene, '  STIJGING IN UW \nANALYTICSDATA', font);
	    geometryCopy.copy( texts.geometry );

	    const pos = texts.geometry.attributes.position;

	    for ( var i = 0, l = pos.count; i < l; i++) {

	      pos.setXYZ( i, Math.random() * 200 - 100 , Math.random() * 200 - 100 , Math.random() * 200 - 100    );
	      pos.needsUpdate = true;

	    }

	    cont++;

	  }else{

	    texts = createParticlesLineText ( scene, 'CAMPAGNES VOOR DE\n   MOBIELE REVOLUTIE', font);
	    geometryCopy.copy( texts.geometry );

	    const pos = texts.geometry.attributes.position;

	    for ( var i = 0, l = pos.count; i < l; i++) {

	      pos.setXYZ( i, Math.random() * 30 - 15 , Math.random() * 30 - 15 , Math.random() * 30 - 15  );
	      pos.needsUpdate = true;

	    }

	    cont = 0;

	  }
	}

	function createParticlesLineText( scene, contentText, font ){

		var xMid;
		let thePoints = [];

			let shapes = font.generateShapes( contentText, 1 );
			let holeShapes = [];

			for ( let q = 0; q < shapes.length; q ++ ) {

				let shape = shapes[ q ];

				if ( shape.holes && shape.holes.length > 0 ) {

					for ( let  j = 0; j < shape.holes.length; j ++ ) {

						let  hole = shape.holes[ j ];
						holeShapes.push( hole );
					}
				}

			}
			shapes.push.apply( shapes, holeShapes );
				
			for ( let  x = 0; x < shapes.length; x ++ ) {

				let shape = shapes[ x ];
				let points = shape.getSpacedPoints( 100 ) ;

				points.forEach( ( element ) => {
					thePoints.push( element )
				});

			}

			let geoParticles = new THREE.BufferGeometry().setFromPoints( thePoints );
			geoParticles.computeBoundingBox();

			xMid = - 0.5 * ( geoParticles.boundingBox.max.x - geoParticles.boundingBox.min.x );
			geoParticles.translate( xMid, 0, 0 );

			let PointMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.7, sizeAttenuation: false });

			let particles = new THREE.Points( geoParticles, PointMaterial );
			scene.add( particles );
			

		return particles;

	}


}







