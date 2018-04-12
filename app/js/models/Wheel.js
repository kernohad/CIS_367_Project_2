import { TorusGeometry, CylinderGeometry, MeshPhongMaterial, Mesh, Group} from 'three';

export default class Wheel {
  constructor (numSpokes) { // number of spokes on the wheel
    const WHEEL_RADIUS = 200;
    const TIRE_THICKNESS = 20;
    /* Torus with 6 radial segments, 30 tubular segments */
    const tubeGeom = new TorusGeometry (WHEEL_RADIUS, TIRE_THICKNESS, 6, 30);
    const tubeMatr = new MeshPhongMaterial ({color: 0x82332a});
    const tube = new Mesh (tubeGeom, tubeMatr);

    const wheelGroup = new Group();
    wheelGroup.add(tube);

    for (let k = 0; k < numSpokes; k++){
    	// Create spoke
    	const spGeo = new CylinderGeometry(0.7 * TIRE_THICKNESS, 0.7 * TIRE_THICKNESS, WHEEL_RADIUS, 10, 10);
    	const spMat = new MeshPhongMaterial({color: 0x001199});
    	const sp = new Mesh (spGeo, spMat);

    	// Rotate and translate spoke
    	sp.rotateZ(k * 2 * Math.PI / numSpokes);
    	sp.translateY(WHEEL_RADIUS / 2);

    	// Add spoke to group
    	wheelGroup.add(sp);
    }

    return wheelGroup;
  }
}