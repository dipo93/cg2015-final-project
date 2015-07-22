function get3DModel() {
	/*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshLambertMaterial( {color: 0x0000ff} );
	var object = new THREE.Mesh( geometry, material );

	return object;*/

	/* To set on get3DModel for the new Features
	var model = Feature.packageModel(object);
	return model;
	*/


	/*CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
	BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
	PlaneGeometry(width, height, widthSegments, heightSegments)
	SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
	CircleGeometry(radius, segments, thetaStart, thetaLength)
	TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
	THREE.DoubleSide
    THREE.AxisHelper()
	******************************************************************
	var circleShape = new THREE.Shape();
    var raggio = 0.5;
    circleShape.moveTo( 0, raggio );
	circleShape.quadraticCurveTo( raggio, raggio, raggio, 0 );
	//i primi due parametri sono i manici di controllo, gli ultimi due indicano il punto di arrivo
	circleShape.lineTo(0.45, 0);
	circleShape.quadraticCurveTo( 0.45, 0.45, 0, 0.45 );
    var extrudeSettings = { amount: 0.1, bevelEnabled: false, bevelSegments: 2, steps: 10, bevelSize: 1, bevelThickness: 1 };
    var geometry = new THREE.ExtrudeGeometry( circleShape, extrudeSettings );
    var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x0000ff } ) );
    ******************************************************************
    var points = [];
	points.push( new THREE.Vector2(0, 0));
	points.push( new THREE.Vector2(0, 0.3));
	points.push( new THREE.Vector2(0.25, 0.3));
	points.push( new THREE.Vector2(0.3, 0));
	var shape = new THREE.Shape(points);
	var extrusionSettings = {curveSegments: 3, amount: 0.4, bevelEnabled: false, material: 0, extrudeMaterial: 1};
	var g_corpo2 = new THREE.ExtrudeGeometry(shape, extrusionSettings);
	*/

	
	var obja = new THREE.Object3D();

	//cubo 1x1x1 per prendere le misure
	var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(0, 0.5, 2);
    obja.add(cube);


	//piano della scena
	var planeGeometry = new THREE.PlaneGeometry(5, 3, 20, 20);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI/2;
    obja.add(plane);



    



    // obja.add();
    // obja.add();
    // obja.add();
    // obja.add();
    // obja.add();
    // obja.add();
    

	//tutti gli oggetti proiettano e ricevono ombra
	obja.traverse( function (object) {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    } );


    /* TODO list
     * letto per dialisi
     * sedia con rotelle
     * portaflebo
    */

	return obja;

}