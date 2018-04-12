import { TorusGeometry, CylinderGeometry, ConeGeometry, SphereGeometry, MeshPhongMaterial, MeshStandardMaterial, Mesh, Group} from 'three';

export default class FalconHeavy{
	constructor(){
		let falconHeavyGroup = new Group();

		let leftBoosterGroup = new Group();
		let centerBoosterGroup = new Group();
		let rightBoosterGroup = new Group();

		let leftRocketGroup = new Group();
		let centerRocketGroup = new Group();
		let rightRocketGroup = new Group();

		let fairingGroup = new Group();

		let leftTopperGroup = new Group();
		let rightTopperGroup = new Group();


		leftBoosterGroup = this.makeBoosterArray(0,0);
		centerBoosterGroup = this.makeBoosterArray(0,0);
		rightBoosterGroup = this.makeBoosterArray(0,0);

		leftRocketGroup = this.makeRocketCylinder(13.3);
		centerRocketGroup = this.makeRocketCylinder(18.7);
		rightRocketGroup = this.makeRocketCylinder(13.3);

		fairingGroup = this.makeFairing();

		leftTopperGroup = this.makeTopper();
		rightTopperGroup = this.makeTopper();

		// Translate left booster group
		leftBoosterGroup.translateX(-1);
		leftBoosterGroup.translateZ(1);

		// Translate right booster Group
		rightBoosterGroup.translateX(1);
		rightBoosterGroup.translateZ(-1);

		// Translate left Rocket Group
		leftRocketGroup.translateX(-1);
		leftRocketGroup.translateZ(1);

		// Translate right Rocket Group
		rightRocketGroup.translateX(1);
		rightRocketGroup.translateZ(-1);

		// Translate Fiaring
		fairingGroup.translateY(18);

		// Translate left topper
		leftTopperGroup.translateX(-1);
		leftTopperGroup.translateZ(1);
		leftTopperGroup.translateY(13.4);

		// Translate right topper
		rightTopperGroup.translateX(1);
		rightTopperGroup.translateZ(-1);
		rightTopperGroup.translateY(13.4);

		const barGeo = new CylinderGeometry(0.05, 0.05, 2.9, 20, 20);
		const barMat = new MeshPhongMaterial({color: 0x3a3a3a});
		const bar1 = new Mesh(barGeo, barMat);
		const bar2 = new Mesh(barGeo, barMat);

		bar1.rotateX(1.5708);
		bar1.rotateZ(0.785398);
		bar1.translateZ(-13);
		bar1.translateX(0.55);
		
		bar2.rotateX(1.5708);
		bar2.rotateZ(0.785398);
		bar2.translateZ(-13);
		bar2.translateX(-0.55);

		bar1.castShadow = true;
		bar1.receiveShadow = false;

		bar2.castShadow = true;
		bar2.receiveShadow = false;



		falconHeavyGroup.add(fairingGroup);
		falconHeavyGroup.add(leftBoosterGroup, leftRocketGroup);
		falconHeavyGroup.add(centerBoosterGroup, centerRocketGroup);
		falconHeavyGroup.add(rightBoosterGroup, rightRocketGroup);
		falconHeavyGroup.add(leftTopperGroup, rightTopperGroup, bar1, bar2);


		//falconHeavyGroup.rotateY(-0.78)
		return falconHeavyGroup;
	}

	makeBoosterArray(x, y){
		const boosterGroup = new Group();

		let temp1 = 0.4;
		let temp2 = 0.15;

		for (let k = 0; k < 9; k++){
			const boostGeo = new CylinderGeometry(0.05, 0.2, 0.3, 10, 10);
			const boostMat = new MeshPhongMaterial({color: 0x3a3a3a })
			const booster = new Mesh(boostGeo, boostMat);


			if( k == 0){
				booster.translateX(x);
				booster.translateZ(y);

			}
			else if (k < 5){
				booster.translateX(temp1);
				booster.translateZ(temp2);
				temp1 = temp1 * -1;
				let t = temp1;
				temp1 = temp2;
				temp2 = t;
			}
			else{
				booster.translateX(temp2);
				booster.translateZ(temp1);
				temp1 = temp1 * -1;
				let t = temp1;
				temp1 = temp2;
				temp2 = t;
			}

			boosterGroup.add(booster);
		}
		

		return boosterGroup;
	}

	makeRocketCylinder(height){
		const rocketGroup = new Group();

		const rocketCylinderGeo = new CylinderGeometry(0.55, 0.55, height, 20, 20);
		const rocketCylinderMat = new MeshPhongMaterial({color: 0xe5e5e5 })
		const rocketCylinder = new Mesh(rocketCylinderGeo, rocketCylinderMat);

		rocketCylinder.translateY(height/2);

		// Make cast shadow
		rocketCylinder.castShadow = true;
		rocketCylinder.receiveShadow = false;


		const finGeo = new ConeGeometry(0.2, 6.343, 10);
		const finMat = new MeshPhongMaterial({color: 0x3a3a3a});

		const fin1 = new Mesh(finGeo, finMat);
		const fin2 = new Mesh(finGeo, finMat);
		const fin3 = new Mesh(finGeo, finMat);
		const fin4 = new Mesh(finGeo, finMat);

		fin1.translateX(-0.46);
		fin1.translateZ(0);
		fin1.translateY((6.343/2) + 0.1);

		fin2.translateX(0);
		fin2.translateZ(0.46);
		fin2.translateY((6.343/2) + 0.1);

		fin3.translateX(0.46);
		fin3.translateZ(0);
		fin3.translateY((6.343/2) + 0.1);

		fin4.translateX(0);
		fin4.translateZ(-0.46);
		fin4.translateY((6.343/2) + 0.1);

		fin1.castShadow = true;
		fin1.receiveShadow = false;

		fin2.castShadow = true;
		fin2.receiveShadow = false;

		fin3.castShadow = true;
		fin3.receiveShadow = false;

		fin4.castShadow = true;
		fin4.receiveShadow = false;


		rocketGroup.add(rocketCylinder, fin1, fin2, fin3, fin4);

		return rocketGroup;
	}

	makeFairing(){
		const fairingGroup = new Group();

		const connectorGeo = new CylinderGeometry(0.8, 0.30, 0.5, 20, 20);
		const connectorMat = new MeshPhongMaterial({color: 0xe5e5e5})
		const connector = new Mesh(connectorGeo, connectorMat);

		const bodyGeo = new CylinderGeometry(0.8, 0.8, 2.1, 20, 20);
		const bodyMat = new MeshPhongMaterial({color: 0xe5e5e5})
		const body = new Mesh(bodyGeo, bodyMat);

		const top1Geo = new CylinderGeometry(0.75, 0.8, .2, 20, 20);
		const top1Mat = new MeshPhongMaterial({color: 0xe5e5e5})
		const top1 = new Mesh(top1Geo, top1Mat);

		const top2Geo = new CylinderGeometry(0.65, 0.75, .2, 20, 20);
		const top2Mat = new MeshPhongMaterial({color: 0xe5e5e5})
		const top2 = new Mesh(top2Geo, top2Mat);

		const top3Geo = new CylinderGeometry(0.5, 0.65, .2, 20, 20);
		const top3Mat = new MeshPhongMaterial({color: 0xe5e5e5})
		const top3 = new Mesh(top3Geo, top3Mat);

		const top4Geo = new CylinderGeometry(0.27, 0.5, .2, 20, 20);
		const top4Mat = new MeshPhongMaterial({color: 0xe5e5e5})
		const top4 = new Mesh(top4Geo, top4Mat);

		const sphereGeo = new SphereGeometry(0.365, 20, 20);
		const sphereMat = new MeshPhongMaterial({color: 0xe5e5e5})
		const sphere = new Mesh(sphereGeo, sphereMat);

		body.translateY(1.3);
		top1.translateY(2.45);
		top2.translateY(2.65);
		top3.translateY(2.85);
		top4.translateY(3.05);
		sphere.translateY(2.92);

		fairingGroup.add(connector, body, top1, top2, top3, top4, sphere);

		// Make cast shadow
		body.castShadow = true;
		body.receiveShadow = false;

		top1.castShadow = true;
		top1.receiveShadow = false;

		top2.castShadow = true;
		top2.receiveShadow = false;

		top3.castShadow = true;
		top3.receiveShadow = false;

		top4.castShadow = true;
		top4.receiveShadow = false;

		return fairingGroup;

	}

	makeTopper(){
		const topperGroup = new Group();

		const top1Geo = new CylinderGeometry(0.5, 0.55, .2, 20, 20);
		const top1Mat = new MeshPhongMaterial({color: 0xe5e5e5})
		const top1 = new Mesh(top1Geo, top1Mat);

		const top2Geo = new CylinderGeometry(0.4, 0.5, .2, 20, 20);
		const top2Mat = new MeshPhongMaterial({color: 0xe5e5e5})
		const top2 = new Mesh(top2Geo, top2Mat);

		const top3Geo = new CylinderGeometry(0.2, 0.4, .2, 20, 20);
		const top3Mat = new MeshPhongMaterial({color: 0xe5e5e5})
		const top3 = new Mesh(top3Geo, top3Mat);

		const sphereGeo = new SphereGeometry(0.25, 20, 20);
		const sphereMat = new MeshPhongMaterial({color: 0xe5e5e5})
		const sphere = new Mesh(sphereGeo, sphereMat);

		top2.translateY(0.2);
		top3.translateY(0.4);
		sphere.translateY(0.35);

		top1.castShadow = true;
		top1.receiveShadow = false;

		top2.castShadow = true;
		top2.receiveShadow = false;

		top3.castShadow = true;
		top3.receiveShadow = false;

		topperGroup.add(top1, top2, top3, sphere);

		return topperGroup;
	}


}