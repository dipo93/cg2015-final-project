var Feature = require('./Feature.js');

Feature.inherits(SerieSedie, Feature);

function SerieSedie(feature) {
	Feature.call(this, feature);
}

SerieSedie.prototype.style = {
			    			weight: 0,
                            fillColor: "#F2C495",
                            fillOpacity: 1,
                            zIndex: 3
						};

SerieSedie.prototype.in_graph = true;

SerieSedie.prototype.in_2D_map = true;

SerieSedie.prototype.get3DModel = function() {
	//TO DO
	var serie_sedie = new THREE.Object3D();

	var serie_sedieX = this.geometry.coordinates[0][1][0];
    var serie_sedieY = this.geometry.coordinates[0][2][1];
    var serie_sedieZ = this.properties.height;


    var m_assi = new THREE.MeshLambertMaterial({color: 0xCCCCCC});
    

    //asse orizzontale
    var g_asse_orizz = new THREE.BoxGeometry(1.8, 0.1, 0.05);
    var asse_orizz = new THREE.Mesh(g_asse_orizz, m_assi);

    asse_orizz.position.y = 0.45;


    //assi verticali laterali e assi orizzontali (piedi)
    var g_asse_v = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 16);
    var g_asse_o = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16);

    
    	//la terminazione dell'asse orizzontale
    var g_termin_orizz = new THREE.BoxGeometry(0.03, 0.11, 0.07);
    	//la terminazione degli assi verticali
    var g_termin_v = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16);
    	//la terminazione degli assi orizzontali (piedi)
    var g_termin_o = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16);
    	//i piedini che poggiano per terra
    var g_piedino = new THREE.CylinderGeometry(0.01, 0.05, 0.05, 16);

    
    var m_termin = new THREE.MeshLambertMaterial({color: 0x333333});

    var termin_asse_orizz = [];
    var assi_v = [];
    var assi_o = [];
    var termin_assi_o = [];
    var piedini = [];

    for (var i = 0; i < 2; i++) {
    	termin_asse_orizz[i] = new THREE.Mesh(g_termin_orizz, m_termin);
    	termin_asse_orizz[i].position.x = Math.pow(-1, i) * 0.91;

    	assi_v[i] = new THREE.Mesh(g_asse_v, m_assi);
    	assi_v[i].position.y = -0.15;
    	assi_v[i].position.x = Math.pow(-1, i+1) * 0.85;

    	termin_asse_v = new THREE.Mesh(g_termin_v, m_termin);
    	termin_asse_v.position.y = 0.226 ;

    	assi_o[i] = new THREE.Mesh(g_asse_o, m_assi);
    	assi_o[i].scale.z = 0.8;
    	assi_o[i].rotation.x = -Math.PI/2;
    	assi_o[i].position.y = -0.23;

	    for (var j = 0; j < 2; j++) {
	    	termin_assi_o[j] = new THREE.Mesh(g_termin_o, m_termin);
	    	termin_assi_o[j].scale.z = 0.9;
	    	termin_assi_o[j].position.y = Math.pow(-1, j) * 0.26;
	    	assi_o[i].add(termin_assi_o[j]);

	    	piedini[j] = new THREE.Mesh(g_piedino, m_termin);
	    	piedini[j].position.y = Math.pow(-1, j) * 0.21;
	    	piedini[j].position.z = -0.065;
	    	piedini[j].rotation.x = Math.PI/2;
	    	assi_o[i].add(piedini[j]);
	    };

    	assi_v[i].add(termin_asse_v);
    	assi_v[i].add(assi_o[i]);
    	asse_orizz.add(assi_v[i]);
    	asse_orizz.add(termin_asse_orizz[i]);
    };



    //sedie
    var g_sedile = new THREE.BoxGeometry(0.4, 0.01, 0.3);
    var m_sedia = new THREE.MeshLambertMaterial({color: 0xf2c495});
    
    var sedili = [];

    for (var j = 0; j < 3; j++) {
    	sedili[j] = new THREE.Mesh(g_sedile, m_sedia);
	    sedili[j].position.y = 0.07;
	    if(j > 0)
	    	sedili[j].position.x = Math.pow(-1, j) * 0.55;
	    asse_orizz.add(sedili[j]);


	    var extrudeSettings1 = { 
	    	amount: 0.4, 
	    	bevelEnabled: false, 
	    	bevelSegments: 2, 
	    	steps: 20, 
	    	bevelSize: 1, 
	    	bevelThickness: 1 
	    };

	    var shape1 = new THREE.Shape();
	    shape1.moveTo(0, 0);
	    shape1.quadraticCurveTo(0.055, 0.04, 0.1, 0.03);
	    shape1.lineTo(0.1, 0.04);
	    shape1.quadraticCurveTo(0.05, 0.05, 0, 0.01);
	    
	    var g_shape1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings1);
	    var shape_sedia1 = new THREE.Mesh(g_shape1, m_sedia);

	    sedili[j].add(shape_sedia1);

	    shape_sedia1.rotation.y = -Math.PI/2;
	    shape_sedia1.position.set(0.2, -0.035, -0.25);


	    var shape2 = new THREE.Shape();
	    shape2.moveTo(0, 0);
	    shape2.quadraticCurveTo(0.07, -0.03, 0.05, 0.05);
	    shape2.lineTo(0.06, 0.05);
	    shape2.quadraticCurveTo(0.08, -0.04, 0, -0.01);

	    var g_shape2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings1);
	    var shape_sedia2 = new THREE.Mesh(g_shape2, m_sedia);

	    sedili[j].add(shape_sedia2);

	    shape_sedia2.rotation.y = -Math.PI/2;
	    shape_sedia2.position.set(0.2, 0.005, 0.15);


	    var points = [];
		points.push( new THREE.Vector2(0, 0));
		points.push( new THREE.Vector2(0.4, 0));
		points.push( new THREE.Vector2(0.35, 0.4));
		points.push( new THREE.Vector2(0.05, 0.4));
		var shape3 = new THREE.Shape(points);

		var extrudeSettings2 = { 
	    	amount: 0.01, 
	    	bevelEnabled: false, 
	    	bevelSegments: 2, 
	    	steps: 20, 
	    	bevelSize: 1, 
	    	bevelThickness: 1 
	    };

	    var g_schienale = new THREE.ExtrudeGeometry(shape3, extrudeSettings2);
	    var schienale = new THREE.Mesh(g_schienale, m_sedia);

	    schienale.position.set(-0.2, 0.055, 0.2);

	    schienale.rotation.x = 10 * Math.PI/180;
	    sedili[j].add(schienale);


	    //sostegni che attaccano la sedia all'asse
	    var g_sostegni = new THREE.BoxGeometry(0.01, 0.13, 0.07);

	    var sostegni = [];

	    for (var i = 0; i < 2; i++) {
	    	sostegni[i] = new THREE.Mesh(g_sostegni, m_termin);
	    	sostegni[i].position.x = sedili[j].position.x + Math.pow(-1, i+1) * 0.025;
	    	asse_orizz.add(sostegni[i]);
	    };
	};


    serie_sedie.add(asse_orizz);


	serie_sedie.feature = this;
	serie_sedie.name = this.id;
	var model = Feature.packageModel(serie_sedie);

	return serie_sedie;
};

module.exports = SerieSedie;