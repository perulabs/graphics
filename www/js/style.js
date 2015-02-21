// create a new scene
var scene = new THREE.Scene();

// field of view
var fov = 75;
// aspect ratio - use full width of container / height
var aspect = window.innerWidth / window.innerHeight;
// setup the clipping plane
var near = 0.1; // front clipping plane
var far  = 1000; // back clipping plane
// create new camera with defined vars from above
var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

// create a new WebGLRenderer object
var renderer = new THREE.WebGLRenderer();
// set the size of the rending window -- smaller than full 
// size will result in lower resolution (ie window.innerWidth / 2 
// and window.innerHeight / 2 would result in HALF the resolution)
renderer.setSize( window.innerWidth, window.innerHeight );
// add the renderer to our page. This is the canvas element that the renderer uses
// to display our scene
document.body.appendChild( renderer.domElement );

// setup dimensions of the sphere
var radius = 2;
// moar segments == moar roundedness!
var widthSegments = 100;
var heightSegments = 100;

var geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
// setup material to wrap geometry with
// wireframe line width won't change no matter what value is set
// reason: Due to limitations in the ANGLE (https://code.google.com/p/angleproject/) layer
// on Windows platforms linewidth will always be 1 regardless of the set value.
var material = new THREE.MeshBasicMaterial( { color: 0x2980b9, wireframe: true } );
// the Mesh object takes a geometry and applies a material to it that can be
// inserted into the scene and be moved around
var sphere     = new THREE.Mesh( geometry, material );
// add to our scene
scene.add( sphere );

// move the camera from default ( 0, 0, 0 )
// so the camera & sphere don't fall into the same location
camera.position.z = 5;

// create render function. We use requestAnimationFrame instead of setInterval
// because it pauses when the user navigates to another browser tab
function render(){
	requestAnimationFrame( render );
	// rotation logic goes here
	sphere.rotation.y += 0.05;
	sphere.rotation.x += 0.05;
	renderer.render( scene, camera );
}
// call our render function to display the sphere
render();