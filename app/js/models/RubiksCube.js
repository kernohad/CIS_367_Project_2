import * as THREE from 'three';
import redStickerRounded from "D:/DylansCloud/Classes/2018_Winter_Semester/CIS_367/Project_2/app/images/red_sticker_rounded.jpg";
import greenStickerRounded from "D:/DylansCloud/Classes/2018_Winter_Semester/CIS_367/Project_2/app/images/green_sticker_rounded.jpg";
import blueStickerRounded from "D:/DylansCloud/Classes/2018_Winter_Semester/CIS_367/Project_2/app/images/blue_sticker_rounded.jpg";
import whiteStickerRounded from "D:/DylansCloud/Classes/2018_Winter_Semester/CIS_367/Project_2/app/images/white_sticker_rounded.jpg";
import yellowStickerRounded from "D:/DylansCloud/Classes/2018_Winter_Semester/CIS_367/Project_2/app/images/yellow_sticker_rounded.jpg";
import orangeStickerRounded from "D:/DylansCloud/Classes/2018_Winter_Semester/CIS_367/Project_2/app/images/orange_sticker_rounded.jpg";



export default class RubiksCube extends THREE.Group{
	constructor(){

		super();

		// Rotation matrix
    	this.rotY1 = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(3));
    	this.rotX1 = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(3));
    	this.rotZ1 = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(3));
    	this.rotYn1 = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-3));
    	this.rotXn1 = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-3));
    	this.rotZn1 = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-3));
    	this.transY5 = new THREE.Matrix4().makeTranslation(0, 5, 0);
    	this.transYn5 = new THREE.Matrix4().makeTranslation(0, -5, 0);
    	this.transY4 = new THREE.Matrix4().makeTranslation(0, 4, 0);
    	this.transYn4 = new THREE.Matrix4().makeTranslation(0, -4, 0);
    	this.transY3 = new THREE.Matrix4().makeTranslation(0, 3, 0);
    	this.transYn3 = new THREE.Matrix4().makeTranslation(0, -3, 0);

		this.transY1 = new THREE.Matrix4().makeTranslation(0, 1, 0);
		this.transYn1 = new THREE.Matrix4().makeTranslation(0, -1, 0);

    	this.transXn1 = new THREE.Matrix4().makeTranslation(-1, 0, 0);
    	this.transX1 = new THREE.Matrix4().makeTranslation(1, 0, 0);
		this.transZn1 = new THREE.Matrix4().makeTranslation(0, 0, -1);
		this.transZ1 = new THREE.Matrix4().makeTranslation(0, 0, 1);

		// Create all cubes
		const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
	    const cubeMat = new THREE.MeshBasicMaterial({color: 0x000000});

	    // const redImg = THREE.ImageUtils.loadTexture("/images/red_sticker_normal_rounded.jpg");
	    // const greenImg = THREE.ImageUtils.loadTexture("/images/green_sticker_normal_rounded.jpg");
	    // const blueImg = THREE.ImageUtils.loadTexture("/images/blue_sticker_normal_rounded.jpg");
	    // const whiteImg = THREE.ImageUtils.loadTexture("/images/white_sticker_normal_rounded.jpg");
	    // const yellowImg = THREE.ImageUtils.loadTexture("/images/yellow_sticker_normal_rounded.jpg");
	    // const orangeImg = THREE.ImageUtils.loadTexture("/images/orange_sticker_normal_rounded.jpg");

	    const redImg = THREE.ImageUtils.loadTexture(redStickerRounded);
	    const greenImg = THREE.ImageUtils.loadTexture(greenStickerRounded);
	    const blueImg = THREE.ImageUtils.loadTexture(blueStickerRounded);
	    const whiteImg = THREE.ImageUtils.loadTexture(whiteStickerRounded);
	    const yellowImg = THREE.ImageUtils.loadTexture(yellowStickerRounded);
	    const orangeImg = THREE.ImageUtils.loadTexture(orangeStickerRounded);


	    // const redImg = THREE.ImageUtils.loadTexture("/images/red_sticker.jpg");
	    // const greenImg = THREE.ImageUtils.loadTexture("/images/green_sticker.jpg");
	    // const blueImg = THREE.ImageUtils.loadTexture("/images/blue_sticker.jpg");
	    // const whiteImg = THREE.ImageUtils.loadTexture("/images/white_sticker.jpg");
	    // const yellowImg = THREE.ImageUtils.loadTexture("/images/yellow_sticker.jpg");
	    // const orangeImg = THREE.ImageUtils.loadTexture("/images/orange_sticker.jpg");

	    const stickerGeo = new THREE.PlaneGeometry(0.9, 0.9, 32);
	    const redStickerMat = new THREE.MeshBasicMaterial({map: redImg});
	    const greenStickerMat = new THREE.MeshBasicMaterial({map: greenImg});
	    const blueStickerMat = new THREE.MeshBasicMaterial({map: blueImg});
	    const whiteStickerMat = new THREE.MeshBasicMaterial({map: whiteImg});
	    const yellowStickerMat = new THREE.MeshBasicMaterial({map: yellowImg});
	    const orangeStickerMat = new THREE.MeshBasicMaterial({map: orangeImg});
	    const blackStickerMat = new THREE.MeshBasicMaterial({color: 0x000000});


	    this.cubes = [];
	   	
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, redStickerMat, blackStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, blackStickerMat, redStickerMat, blackStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, redStickerMat, blackStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, redStickerMat, blackStickerMat, blackStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, blackStickerMat, redStickerMat, blackStickerMat, blackStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, redStickerMat, blackStickerMat, blackStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, redStickerMat, blackStickerMat, whiteStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, blackStickerMat, redStickerMat, blackStickerMat, whiteStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, redStickerMat, blackStickerMat, whiteStickerMat, blackStickerMat]))

	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, blackStickerMat))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, blackStickerMat, blackStickerMat, whiteStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, whiteStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, blackStickerMat, blackStickerMat, whiteStickerMat, blackStickerMat]))

	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, blackStickerMat, orangeStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, blackStickerMat, blackStickerMat, orangeStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, blackStickerMat, orangeStickerMat, blackStickerMat, yellowStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, blackStickerMat, orangeStickerMat, blackStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, blackStickerMat, blackStickerMat, orangeStickerMat, blackStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, blackStickerMat, orangeStickerMat, blackStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, greenStickerMat, blackStickerMat, orangeStickerMat, whiteStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blackStickerMat, blackStickerMat, blackStickerMat, orangeStickerMat, whiteStickerMat, blackStickerMat]))
	    this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, blackStickerMat, blackStickerMat, orangeStickerMat, whiteStickerMat, blackStickerMat]))



	    for(var k = 0; k < 27; k++){
	    	//this.cubes.push(new THREE.Mesh(cubeGeo, [blueStickerMat, greenStickerMat, redStickerMat, orangeStickerMat, whiteStickerMat, yellowStickerMat]));
	    	this.cubes[k].matrixAutoUpdate = false;
	    	this.add(this.cubes[k]);
	    }

	    

		this.array1 = [this.cubes[0], this.cubes[1], this.cubes[2], this.cubes[3], this.cubes[4], this.cubes[5], this.cubes[6],this.cubes[7], this.cubes[8]];
		this.array2 = [this.cubes[9], this.cubes[10], this.cubes[11], this.cubes[12], this.cubes[13], this.cubes[14], this.cubes[15], this.cubes[16], this.cubes[17]];
		this.array3 = [this.cubes[18], this.cubes[19], this.cubes[20], this.cubes[21], this.cubes[22], this.cubes[23], this.cubes[24], this.cubes[25], this.cubes[26]];

		this.array4 = [this.cubes[0], this.cubes[3], this.cubes[6], this.cubes[9], this.cubes[12], this.cubes[15], this.cubes[18], this.cubes[21], this.cubes[24]];
		this.array5 = [this.cubes[1], this.cubes[4], this.cubes[7], this.cubes[10], this.cubes[13], this.cubes[16], this.cubes[19], this.cubes[22], this.cubes[25]];
		this.array6 = [this.cubes[2], this.cubes[5], this.cubes[8], this.cubes[11], this.cubes[14], this.cubes[17], this.cubes[20], this.cubes[23], this.cubes[26]];

		this.array7 = [this.cubes[6], this.cubes[7], this.cubes[8], this.cubes[15], this.cubes[16], this.cubes[17], this.cubes[24], this.cubes[25], this.cubes[26]];
		this.array8 = [this.cubes[3], this.cubes[4], this.cubes[5], this.cubes[12], this.cubes[13], this.cubes[14], this.cubes[21], this.cubes[22], this.cubes[23]];
		this.array9 = [this.cubes[0], this.cubes[1], this.cubes[2], this.cubes[9], this.cubes[10], this.cubes[11], this.cubes[18], this.cubes[19], this.cubes[20]];
		

	 	this.array1.forEach((element) => {
			element.matrix.multiply(this.transY1);
		});
		this.array3.forEach((element) => {
			element.matrix.multiply(this.transYn1);
		});
		this.array4.forEach((element) => {
			element.matrix.multiply(this.transXn1);
		});
		this.array6.forEach((element) => {
			element.matrix.multiply(this.transX1);
		});
		this.array7.forEach((element) => {
			element.matrix.multiply(this.transZ1);
		});
		this.array9.forEach((element) => {
			element.matrix.multiply(this.transZn1);
		});
	}


	rotateCW(layer, axis, reOrder){

		let counterUp = 0;
		let place9 = 2;
		let place8 = 2;
		let place7 = 2;
		let temp = [layer[0], layer[1], layer[2], layer[3], layer[4], layer[5], layer[6], layer[7], layer[8]];

		layer.forEach((element) => {
		
			if(axis == "X"){
			element.matrix.premultiply(this.rotX1);
			}
			if(axis == "Y"){
			element.matrix.premultiply(this.rotYn1);
			}
			if(axis == "Z"){
			element.matrix.premultiply(this.rotZn1);
			}

		});

		if(reOrder){
			layer.forEach((element) => {
			
				if(layer == this.array1){
					if(counterUp < 3){
						this.array6[counterUp % 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					else if(counterUp < 6){
						this.array5[counterUp % 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					else if(counterUp < 9){
						this.array4[counterUp % 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array9[place9 % 3] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array8[place8 % 3] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array7[place7 % 3] = element;
						place7--;
					}
				}

				if(layer == this.array2){
					if(counterUp < 3){
						this.array6[(counterUp % 3) + 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					else if(counterUp < 6){
						this.array5[(counterUp % 3) + 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					else if(counterUp < 9){
						this.array4[(counterUp % 3) + 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array9[(place9 % 3) + 3] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array8[(place8 % 3) + 3] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array7[(place7 % 3) + 3] = element;
						place7--;
					}
				}

				if(layer == this.array3){
					if(counterUp < 3){
						this.array6[(counterUp % 3) + 6] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					if(counterUp < 6){
						this.array5[(counterUp % 3) + 6] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					if(counterUp < 9){
						this.array4[(counterUp % 3) + 6] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array9[(place9 % 3) + 6] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array8[(place8 % 3) + 6] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array7[(place7 % 3) + 6] = element;
						place7--;
					}
				}

				if(layer == this.array4){
					if(counterUp < 3){
						this.array7[(counterUp % 3) * 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					if(counterUp < 6){
						this.array8[(counterUp % 3) * 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					if(counterUp < 9){
						this.array9[(counterUp % 3) * 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array1[(place9 % 3) * 3] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array2[(place8 % 3) * 3] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array3[(place7 % 3) * 3] = element;
						place7--;
					}
				}

				if(layer == this.array5){
					if(counterUp < 3){
						this.array7[((counterUp % 3) * 3) + 1] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					if(counterUp < 6){
						this.array8[((counterUp % 3) * 3) + 1] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					if(counterUp < 9){
						this.array9[((counterUp % 3) * 3) + 1] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array1[((place9 % 3) * 3) + 1] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array2[((place8 % 3) * 3) + 1] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array3[((place7 % 3) * 3) + 1] = element;
						place7--;
					}
				}

				if(layer == this.array6){
					if(counterUp < 3){
						this.array7[((counterUp % 3) * 3) + 2] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					if(counterUp < 6){
						this.array8[((counterUp % 3) * 3) + 2] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					if(counterUp < 9){
						this.array9[((counterUp % 3) * 3) + 2] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array1[((place9 % 3) * 3) + 2] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array2[((place8 % 3) * 3) + 2] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array3[((place7 % 3) * 3) + 2] = element;
						place7--;
					}
				}

				if(layer == this.array7){
					if(counterUp < 3){
						this.array6[(((counterUp % 3) + 1) * 3) - 1] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					if(counterUp < 6){
						this.array5[(((counterUp % 3) + 1) * 3) - 1] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					if(counterUp < 9){
						this.array4[(((counterUp % 3) + 1) * 3) - 1] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array1[(place9 % 3) + 6] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array2[(place8 % 3) + 6] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array3[(place7 % 3) + 6] = element;
						place7--;
					}
				}

				if(layer == this.array8){
					if(counterUp < 3){
						this.array6[(((counterUp % 3) + 1) * 3) - 2] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					if(counterUp < 6){
						this.array5[(((counterUp % 3) + 1) * 3) - 2] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					if(counterUp < 9){
						this.array4[(((counterUp % 3) + 1) * 3) - 2] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array1[(place9 % 3) + 3] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array2[(place8 % 3) + 3] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array3[(place7 % 3) + 3] = element;
						place7--;
					}
				}

				if(layer == this.array9){
					if(counterUp < 3){
						this.array6[(((counterUp % 3) + 1) * 3) - 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 1] = element;
					}
					if(counterUp < 6){
						this.array5[(((counterUp % 3) + 1) * 3) - 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 2] = element;
					}
					if(counterUp < 9){
						this.array4[(((counterUp % 3) + 1) * 3) - 3] = element;
						temp[(((counterUp % 3) + 1) * 3) - 3] = element;
					}

					if(counterUp % 3 == 0){
						this.array1[(place9 % 3)] = element;
						place9--;
					}
					else if(counterUp % 3 == 1){
						this.array2[(place8 % 3)] = element;
						place8--;
					}
					else if(counterUp % 3 == 2){
						this.array3[(place7 % 3)] = element;
						place7--;
					}
				}


				counterUp++;
			});



			if(layer == this.array1){
				this.array1 = temp;
			}
			else if(layer == this.array2){
				this.array2 = temp;
			}
			else if(layer == this.array3){
				this.array3 = temp;
			}
			else if(layer == this.array4){
				this.array4 = temp;
			}
			else if(layer == this.array5){
				this.array5 = temp;
			}
			else if(layer == this.array6){
				this.array6 = temp;
			}
			else if(layer == this.array7){
				this.array7 = temp;
			}
			else if(layer == this.array8){
				this.array8 = temp;
			}
			else if(layer == this.array9){
				this.array9 = temp;
			}
		}
	}

	rotateCCW(layer, axis){
		layer.forEach((element) => {
			
		
			if(axis == "X"){
			element.matrix.premultiply(this.rotXn1);
			}
			if(axis == "Y"){
			element.matrix.premultiply(this.rotY1);
			}
			if(axis == "Z"){
			element.matrix.premultiply(this.rotZ1);
			}

		});
	}

	
	animate(counter, phase){


		if(counter >= 30){
			if(phase == 8){
				phase = 1;
			}
			else{
				phase = phase + 1;
			}
			return phase;
		}

		switch(phase){
			case 1:
				if(counter == 29){
					this.rotateCW(this.array5, "X", true);
				}
				else{
					this.rotateCW(this.array5, "X", false);
				}
				break;
			case 2:
				if(counter == 29){
					this.rotateCW(this.array1, "Y", true);
				}
				else{
					this.rotateCW(this.array1, "Y", false);
				}
				break;
			case 3:
				if(counter == 29){
					this.rotateCW(this.array6, "X", true);
				}
				else{
					this.rotateCW(this.array6, "X", false);
				}
				break;
			case 4:
				if(counter == 29){
					this.rotateCW(this.array9, "Z", true);
				}
				else{
					this.rotateCW(this.array9, "Z", false);
				}
				break;
			case 5:
				if(counter == 29){
					this.rotateCW(this.array3, "Y", true);
				}
				else{
					this.rotateCW(this.array3, "Y", false);
				}
				break;
			case 6:
				if(counter == 29){
					this.rotateCW(this.array1, "Y", true);
				}
				else{
					this.rotateCW(this.array1, "Y", false);
				}
				break;
			case 7:
				if(counter == 29){
					this.rotateCW(this.array5, "X", true);
				}
				else{
					this.rotateCW(this.array5, "X", false);
				}
				break;
			case 8:
				if(counter == 29){
					this.rotateCW(this.array4, "X", true);
				}
				else{
					this.rotateCW(this.array4, "X", false);
				}
				break;
			// case 9:
			// 	if(counter == 44){
			// 		this.rotateCW(this.array5, "X", true);
			// 	}
			// 	else{
			// 		this.rotateCW(this.array5, "X", false);
			// 	}
			// 	break;
			// case 10:
			// 	if(counter == 44){
			// 		this.rotateCW(this.array1, "Y", true);
			// 	}
			// 	else{
			// 		this.rotateCW(this.array1, "Y", false);
			// 	}
			// 	break;
			// case 11:
			// 	if(counter == 44){
			// 		this.rotateCW(this.array5, "X", true);
			// 	}
			// 	else{
			// 		this.rotateCW(this.array5, "X", false);
			// 	}
			// 	break;
			// case 12:
			// 	if(counter == 44){
			// 		this.rotateCW(this.array1, "Y", true);
			// 	}
			// 	else{
			// 		this.rotateCW(this.array1, "Y", false);
			// 	}
			// 	break;
			// case 13:
			// 	if(counter == 44){
			// 		this.rotateCW(this.array5, "X", true);
			// 	}
			// 	else{
			// 		this.rotateCW(this.array5, "X", false);
			// 	}
			// 	break;
			// case 14:
			// 	if(counter == 44){
			// 		this.rotateCW(this.array1, "Y", true);
			// 	}
			// 	else{
			// 		this.rotateCW(this.array1, "Y", false);
			// 	}
			// 	break;
			// case 15:
			// 	if(counter == 44){
			// 		this.rotateCW(this.array5, "X", true);
			// 	}
			// 	else{
			// 		this.rotateCW(this.array5, "X", false);
			// 	}
			// 	break;
			// case 16:
			// 	if(counter == 44){
			// 		this.rotateCW(this.array1, "Y", true);
			// 	}
			// 	else{
			// 		this.rotateCW(this.array1, "Y", false);
			// 	}
			// 	break;


			default:
				break;
		}

		return phase;

	}

}
