import * as THREE from 'three';
import Wheel from './models/Wheel';
import FalconHeavy from './models/FalconHeavy';
import RubiksCube from './models/RubiksCube';
import concrete from "D:/DylansCloud/Classes/2018_Winter_Semester/CIS_367/Project_2/app/images/concrete.jpg";

// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';

export default class App {
	constructor() {

    	this.counter = 0;
	    this.phase = 1;
	    this.cycle = 0;
	    this.animCube = true;
	    this.rotateCube = true;
	    this.moveCam = false;
	    this.normalCube = false;
	    const c = document.getElementById('mycanvas');
	    this.spotLightToggle = document.getElementById('spotLightToggle');
	    this.lightOneToggle = document.getElementById('lightOneToggle');
	    this.spawnCubeToggle = document.getElementById('spawnCubeToggle');
	    // Enable antialias for smoother lines
	    this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
	    // Turn on shadows
	    this.renderer.shadowMap.enabled = true;
	    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Default

	    this.scene = new THREE.Scene();
	    this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.5, 500);
	    this.camera.position.z = 75;
	    this.camera.position.y = 20;

	    // Rotation matrix for moving wheel
	    this.rotZ1 = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(1));
	   	this.rotX1 = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(1));


	    this.forward = new THREE.Matrix4().makeTranslation(0, 0, -1);
	    this.backward = new THREE.Matrix4().makeTranslation(0, 0, 1);
	    this.right = new THREE.Matrix4().makeTranslation(1, 0, 0);
	    this.left = new THREE.Matrix4().makeTranslation(-1, 0, 0);
	   	this.up = new THREE.Matrix4().makeTranslation(0, 1, 0);
	   	this.down = new THREE.Matrix4().makeTranslation(0, -1, 0);
	   	this.rotRight = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-1));
	   	this.rotLeft = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(1));
	   	this.rotUp = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(1));
	   	this.rotDown = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-1));
	   	this.rollLeft = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(1));
	   	this.rollRight = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-1));

	   	this.selectedObject = null;



	    // const orbiter = new OrbitControls(this.camera);
	    // orbiter.enableZoom = false;
	    // orbiter.update();
	    this.tracker = new TrackballControls(this.camera, c);

	    this.tracker.rotateSpeed = 2.0;
	    this.tracker.noZoom = false;
	    this.tracker.noPan = false;


	    /**********************
	    * Ground Plane
	    **********************/
	    const concreteImg = THREE.ImageUtils.loadTexture(concrete);
	    const groundGeo = new THREE.PlaneGeometry(200, 200, 32);
	    const groundMat = new THREE.MeshPhongMaterial({map: concreteImg});
	    const ground = new THREE.Mesh(groundGeo, groundMat);
	    ground.receiveShadow = true;
	    this.scene.add(ground);
	    ground.rotateX(THREE.Math.degToRad(-90));


	    /**********************
	    * Decahedron
	    **********************/
	    const dodecgeom = new THREE.DodecahedronGeometry(30);
	    const dodecmatr = new THREE.MeshPhongMaterial({color: 0x00FF00});
	    const dodecmesh = new THREE.Mesh(dodecgeom, dodecmatr);
	    //this.scene.add(dodecmesh);


	    /**********************
	    * Wheel
	    **********************/
	    // Create a new Wheel and add it to the scene. 
	    this.myWheel = new Wheel(5);
	    //this.scene.add(this.myWheel);
	    // Enable manual coord frame update
	    this.myWheel.matrixAutoUpdate = false;


	    /**********************
	    * Falcon Heavy
	    **********************/
	    this.falconHeavy = new FalconHeavy();
	    this.scene.add(this.falconHeavy);
	    this.falconHeavy.translateX(30);
	    //this.falconHeavy.translateZ(30);



	    /**********************
	    * Rubiks Cube
	    **********************/
	    this.rubiksCube = new RubiksCube(false);
	    this.spawnCubeToggle.addEventListener( 'change', () => this.spawnCubetHandler());
	    this.scene.add(this.rubiksCube);
	    //this.rubiksCube.layer.matrixAutoUpdate = false;
	    //this.rubiksCube.matrixAutoUpdate = false;
	    this.transY4 = new THREE.Matrix4().makeTranslation(0, 4, 0);
		this.rubiksCube.translateY(4);
	    



	    /**********************
	    * Directional Light
	    **********************/
	    // Add a directional (white) light with intensity 1.0 at (10, 40, 100)
	    this.lightOne = new THREE.DirectionalLight(0xffffff, 1.0);
	    this.lightOne.position.set(0, 150, 100);
	    this.scene.add(this.lightOne);

	    /**********************
	    * Spot Light
	    **********************/
	    this.spotLight = new THREE.SpotLight(0xebeb96, 1, 200, 0.3, 0.25);
	    this.spotLight.position.set(10, 50, 75);

	    this.spotLight.castShadow = true;

	    this.spotLight.shadow.mapSize.width = 512;
	    this.spotLight.shadow.mapSize.height = 512;
	    this.spotLight.shadow.camera.near = 0.5;
	    this.spotLight.shadow.camera.far = 700;

	    // Set the target. The spotlight points here. Default is (0,0,0)
	    this.spotLight.target = this.falconHeavy;

	    this.scene.add(this.spotLight);

	


		const menu = document.getElementById("menu");
	    menu.addEventListener('change', event => {


	       switch (menu.selectedIndex){
	       		case 0:
	       			this.rotateCube = true;
	       			this.moveCam = false;

	           		this.tracker.enabled = true;
	           		this.camera.matrixAutoUpdate = true;

	               break;
	           case 1:
	           	   this.rotateCube = true;
	           		this.moveCam = false;

	           		//this.spotlight.matrixAutoUpdate = false;
	               this.selectedObject = this.spotLight;
	               	window.addEventListener('keydown', () => this.lightHandler(this.selectedObject));

	               break;
	             case 2:
	           	   this.rotateCube = true;
	           		this.moveCam = false;

	           		//this.spotlight.matrixAutoUpdate = false;
	               this.selectedObject = this.lightOne;
	               	window.addEventListener('keydown', () => this.lightHandler(this.selectedObject));

	               break;
	           case 3:
	           		this.moveCam = false;
	           		this.rubiksCube.matrixAutoUpdate = true;
	           		this.rotateCube = false;
	               this.selectedObject = this.rubiksCube;
	               	window.addEventListener('keydown', () => this.objectHandler(this.selectedObject));
	               break;
	            case 4:
	            	this.moveCam = false;
	            	this.rotateCube = true;
	               this.selectedObject = this.falconHeavy;
	              	window.addEventListener('keydown', () => this.objectHandler(this.selectedObject));

	               break;
	             case 5:
	             	this.moveCam = true;
	            	this.rotateCube = true;
	            	this.camera.matrixAutoUpdate = false;

	               this.selectedObject = this.camera;
	              	window.addEventListener('keydown', () => this.cameraHandler());

	               break;
	       }
	    });

	
	    this.spotLightToggle.addEventListener( 'change', () => this.spotLightHandler());
	    this.lightOneToggle.addEventListener( 'change', () => this.lightOneHandler());

	    window.addEventListener( 'keydown', () => this.cubeAnimHandler());


	    
	    window.addEventListener('resize', () => this.resizeHandler());
	    this.resizeHandler();
	    requestAnimationFrame(() => this.render());
 	}

 	spawnCubetHandler(){
 		this.animCube = false;
 		if(this.spawnCubeToggle.checked){
 			this.scene.remove(this.rubiksCube);
 			this.rubiksCube = new RubiksCube(true);
 		}
 		else{
 			this.scene.remove(this.rubiksCube);
 			this.rubiksCube = new RubiksCube(false);
 		}
 		this.scene.add(this.rubiksCube);
 		this.rubiksCube.translateY(4);
 		this.counter = 0;
	    this.phase = 1;
	    this.cycle = 0;
 		this.animCube = true;


 	}

 	cubeAnimHandler(){
 		var key = event.keyCode;

	    switch(key) {
	      	
	        case 80://'space'
	        	this.animCube = !this.animCube;
	        	break;
    	}
 	}

 	spotLightHandler(){
 		if(this.spotLightToggle.checked) {
		   this.spotLight.intensity = 1;
		}
		else{
		this.spotLight.intensity = 0;
		}
 	}

 	lightOneHandler(){
 		if(this.lightOneToggle.checked) {
 			this.lightOne.visible = true;
		 }
		 else{
		 	this.lightOne.visible = false;
		 }

 	}

 	cameraHandler() {
 		var key = event.keyCode;

 		if(this.moveCam){
 			switch(key) {
	      	case 87://w
	        	this.camera.matrixWorld.multiply(this.forward);
	        	break;
	        case 83://s
	        	this.camera.matrixWorld.multiply(this.backward);
	        	break;
	        case 68://d
	        	this.camera.matrixWorld.multiply(this.right);
	        	break;
	        case 65://a
	        	this.camera.matrixWorld.multiply(this.left);
	        	break;
	        case 81://q
	        	this.camera.matrixWorld.multiply(this.rotLeft);
	        	break;
	        case 69://e
	        	this.camera.matrixWorld.multiply(this.rotRight);
	        	break;
	        case 82://r
	        	this.camera.matrixWorld.multiply(this.rotUp);
	        	break;
	        case 70://f
	        	this.camera.matrixWorld.multiply(this.rotDown);
	        	break;
	        case 16://'shift'
	        	this.camera.matrixWorld.multiply(this.down);
	        	break;
	        case 32://'space'
	        	this.camera.matrixWorld.multiply(this.up);
	        	break;
	        case 67://c
	        	this.camera.matrixWorld.multiply(this.rollRight);
	        	break;
	        case 90://z
	        	this.camera.matrixWorld.multiply(this.rollLeft);
	        	break;
    	}
 		}

	    
  	}

  	objectHandler(object) {
 		var key = event.keyCode;

	    switch(key) {
	      	case 87://w
	        	object.matrix.multiply(this.forward);
	        	break;
	        case 83://s
	        	object.matrix.multiply(this.backward);
	        	break;
	        case 68://d
	        	object.matrix.multiply(this.right);
	        	break;
	        case 65://a
	        	object.matrix.multiply(this.left);
	        	break;
	        case 81://q
	        	object.matrix.multiply(this.rotLeft);
	        	break;
	        case 69://e
	        	object.matrix.multiply(this.rotRight);
	        	break;
	        case 82://r
	        	object.matrix.multiply(this.rotUp);
	        	break;
	        case 70://f
	        	object.matrix.multiply(this.rotDown);
	        	break;
	        case 16://'shift'
	        	object.matrix.multiply(this.down);
	        	break;
	        case 32://'space'
	        	object.matrix.multiply(this.up);
	        	break;
	        case 67://c
	        	object.matrix.multiply(this.rollRight);
	        	break;
	        case 90://z
	        	object.matrix.multiply(this.rollLeft);
	        	break;
    	}
  	}

  	lightHandler(light) {
 		var key = event.keyCode;
 		
 		let x = light.position.x;
 		let y = light.position.y;
 		let z = light.position.z;

	    switch(key) {
	      	case 87://w
	        	light.position.set(x, y, z - 1);
	        	break;
	        case 83://s
	        	light.position.set(x, y, z + 1);
	        	break;
	        case 68://d
	        	light.position.set(x + 1, y, z);
	        	break;
	        case 65://a
	        	light.position.set(x - 1, y, z);
	        	break;
	        case 16://'shift'
	        	light.position.set(x, y - 1, z);
	        	break;
	        case 32://'space'
	        	light.position.set(x, y + 1, z);
	        	break;
	        
    	}
  	}


  render() {
    this.renderer.render(this.scene, this.camera);
    this.tracker.update();
    this.falconHeavy.matrixAutoUpdate = false;
	this.rubiksCube.matrixAutoUpdate = false;

	if(this.animCube){
		if(this.rotateCube){
			this.rubiksCube.matrix.multiply(this.rotZ1);
	    	this.rubiksCube.matrix.multiply(this.rotX1);
		}
		

	    this.phase = this.rubiksCube.animate(this.counter, this.phase);
	   
		
		
	    if(this.counter >= 30){
	        this.counter = 0;
	    }
	    else{
	        this.counter = this.counter + 1;
	    }
	}
	

   
    requestAnimationFrame(() => this.render());
  }

  resizeHandler() {
    const canvas = document.getElementById("mycanvas");
    let w = window.innerWidth - 16;
    let h = 0.75 * w;  /* maintain 4:3 ratio */
    if (canvas.offsetTop + h > window.innerHeight) {
      h = window.innerHeight - canvas.offsetTop - 16;
      w = 4/3 * h;
    }
    canvas.width = w;
    canvas.height = h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.tracker.handleResize();
  }
}