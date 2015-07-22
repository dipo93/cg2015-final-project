var Feature = require('./Feature.js');

Feature.inherits(Lavandino, Feature);

function Lavandino(feature) {
	Feature.call(this, feature);
}

Lavandino.prototype.style = {
			    			prefix: "fa",
	    					icon: "minus",
	    					zIndex: 3
						};

Lavandino.prototype.in_graph = true;

Lavandino.prototype.in_2D_map = false;

Lavandino.prototype.get3DModel = function() {
	//TO DO
	var lavandino = new THREE.Object3D();


    var silver_material = new THREE.MeshLambertMaterial({color:0xDDDDDD, side: THREE.DoubleSide});
    var white_material = new THREE.MeshLambertMaterial({color:0xFFFFFF});
	var black_material = new THREE.MeshLambertMaterial({color: 0x000000});
	var blue_material = new THREE.MeshLambertMaterial({ color : 0x0000FF});
	var red_material = new THREE.MeshLambertMaterial({ color : 0xFF0000});


	var fondo_geometry = new THREE.BoxGeometry(0.505, 0.505, 0.02);

	var fondo = new THREE.Mesh(fondo_geometry, white_material);
	fondo.position.y = 1;
	fondo.rotation.x = Math.PI/2;
	lavandino.add(fondo);


	var davanti_geometry = new THREE.BoxGeometry (0.5, 0.15, 0.015);
	var davanti = new THREE.Mesh(davanti_geometry, white_material);
	davanti.rotation.x = -Math.PI/2;
	davanti.position.set(0, -0.245, -0.085);
	fondo.add(davanti);


	var lato1_geometry = new THREE.BoxGeometry (0.015, 0.15, 0.505);
	var lato1 = new THREE.Mesh(lato1_geometry, white_material);
	lato1.rotation.x = -Math.PI/2;
	lato1.position.set(-0.245, 0, -0.085);
	fondo.add(lato1);


	var lato2= new THREE.Mesh(lato1_geometry, white_material);
	lato2.rotation.x = -Math.PI/2;
	lato2.position.set(0.245, 0, -0.085);
	fondo.add(lato2);

	var dietro_geometry = new THREE.BoxGeometry(0.5, 0.15, 0.05);
	var dietro= new THREE.Mesh(dietro_geometry, white_material);
	dietro.rotation.x = -Math.PI/2;
	dietro.position.set(0, 0.2275, -0.085);
	fondo.add(dietro);


	var curve = new THREE.CubicBezierCurve3(
		new THREE.Vector3(0, 0, 0), 
		new THREE.Vector3(0, 0, 0.2), 
		new THREE.Vector3(0, 0.2, 0.4), 
		new THREE.Vector3(0, 0.25, 0.2)
	);

	var sink_geometry = new THREE.TubeGeometry(curve, 20, 0.015, 10, false);

	var sink = new THREE.Mesh(sink_geometry, silver_material);

	sink.rotation.x = -Math.PI/2;
	sink.position.z = 0.01;
	dietro.add(sink);


	var drain_geometry = new THREE.TorusGeometry(0.02, 0.003, 20,20);
	var drain = new THREE.Mesh(drain_geometry, black_material);
	drain.position.z = -0.01;
	fondo.add(drain);


	var soapContainer_geometry = new THREE.CylinderGeometry(0.025, 0.025, 0.15, 20);

	var soapContainer_material = new THREE.MeshLambertMaterial({color: 0xCCFFCC});

	var soapContainer = new THREE.Mesh(soapContainer_geometry, soapContainer_material);
	dietro.add(soapContainer);
	soapContainer.position.set(0.15, 0.15, 0);

	curve2 = new THREE.SplineCurve3([ 
		new THREE.Vector3(0, 0, 0), 
		new THREE.Vector3(0, 0.01, 0.03), 
		new THREE.Vector3(0, 0.1, 0.04), 
		new THREE.Vector3(0, 0.12, 0.03)
	]);

	var soap_geometry = new THREE.TubeGeometry(curve2, 64, 0.005);

	var soap = new THREE.Mesh(soap_geometry, silver_material);

	soap.rotation.x = -Math.PI/2;
	soap.position.y = 0.03;
	soapContainer.add(soap);


	var knobWaterBig_geometry = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 20);
	var knobWaterBig = new THREE.Mesh(knobWaterBig_geometry, silver_material);
	
	knobWaterBig.position.x = -0.035;
	knobWaterBig.position.y = 0.015;
	knobWaterBig.position.z = 0.1;
	knobWaterBig.rotation.z = Math.PI/2;
	sink.add(knobWaterBig);

	var knobWaterSmall_geometry = new THREE.CylinderGeometry(0.005, 0.005, 0.05, 20);
	var knobWaterSmall = new THREE.Mesh(knobWaterSmall_geometry, silver_material);
	
	knobWaterSmall.position.y = 0.02;
	knobWaterSmall.position.z = 0.025;
	knobWaterSmall.rotation.x = Math.PI/2;
	knobWaterBig.add(knobWaterSmall);




	var waterSignal_geometry = new THREE.CylinderGeometry(0.0025, 0.0025, 0.001);
	var coldWater = new THREE.Mesh(waterSignal_geometry, blue_material);

	knobWaterBig.add(coldWater);
	coldWater.position.y = 0.025;
	coldWater.position.x = -0.005;


	var hotWater_geometry = new THREE.CylinderGeometry(0.0025, 0.0025, 0.001);
	var hotWater = new THREE.Mesh(waterSignal_geometry, red_material);

	coldWater.add(hotWater);
	hotWater.position.x = 0.01;

	lavandino.feature = this;
	lavandino.name = this.id;
	var model = Feature.packageModel(lavandino);

	return model;
};

module.exports = Lavandino;