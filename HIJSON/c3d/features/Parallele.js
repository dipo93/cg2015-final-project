var Feature = require('./Feature.js');

Feature.inherits(Parallele, Feature);

function Parallele(feature) {
	Feature.call(this, feature);
}

Parallele.prototype.style = {
	    					weight: 0,
						    fillColor: "#9b8c75",
						    fillOpacity: 1,
	    					zIndex: 3
						};

Parallele.prototype.in_graph = true;

Parallele.prototype.in_2D_map = true;

Parallele.prototype.get3DModel = function() {
	//TO DO
	var parallele = new THREE.Object3D();

	var paralleleX = this.geometry.coordinates[0][1][0];
	var paralleleY = this.geometry.coordinates[0][2][1];
	var paralleleZ = this.properties.height;


    //pedana di base
    var points = [];

	points.push( new THREE.Vector2(0, 0));
	points.push( new THREE.Vector2(2.5, 0));
	points.push( new THREE.Vector2(2.2, 0.1));
	points.push( new THREE.Vector2(0.3, 0.1));

	var shape = new THREE.Shape(points);

	var extrusionSettings = {
		amount: 1,
		bevelEnabled: false
	};

	var g_pedana = new THREE.ExtrudeGeometry(shape, extrusionSettings);
	var m_pedana = new THREE.MeshLambertMaterial({color: 0xCC9966});
	var pedana = new THREE.Mesh(g_pedana, m_pedana);

	pedana.position.set(-1.25, 0, -0.5);



    //sbarre parallele
    var g_sbarre = new THREE.CylinderGeometry(0.03, 0.03, 2.5, 16);
    var m_sbarre =new THREE.MeshLambertMaterial({color: 0xc9c9c9});

    var g_coll = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 16);

    var g_gamba_sup = new THREE.BoxGeometry(0.04, 0.4, 0.04);
    var m_gamba_sup = new THREE.MeshLambertMaterial({color: 0x949494});

    var g_gamba_inf = new THREE.BoxGeometry(0.05, 0.5, 0.05);
    var m_gamba_inf = new THREE.MeshLambertMaterial({color: 0xf9f5b2});

    var g_termin = new THREE.CylinderGeometry(0.035, 0.035, 0.1, 16);
    var m_termin = new THREE.MeshLambertMaterial({color: 0x333333});

    var g_cil_p = new THREE.CylinderGeometry(0.005, 0.005, 0.02, 16);
    var g_cil_g = new THREE.CylinderGeometry(0.007, 0.007, 0.01, 16);
    var g_base_semisf = new THREE.CylinderGeometry(0.013, 0.013, 0.003, 16);
    var g_semisf = new THREE.SphereGeometry(0.013, 16, 16, 0, Math.PI*2, 0, Math.PI/2);


    var sbarre = [];
    var termin = [];
    var coll = [];

    for (var i = 0; i < 2; i++) {
    	sbarre[i] = new THREE.Mesh(g_sbarre, m_sbarre);
    	sbarre[i].rotation.z = Math.PI/2;

    	if (i == 0)
		    sbarre[i].position.set(1.15, 1, 0.85);
		else
			sbarre[i].position.set(1.15, 1, 0.15);

		pedana.add(sbarre[i]);


		//terminazioni delle sbarre
		for (var h = 0; h < 2; h++) {
			termin[h] = new THREE.Mesh(g_termin, m_termin);
			termin[h].position.y = Math.pow(-1, h) * 1.25;
			sbarre[i].add(termin[h]);
		};


	    //collegamento sbarra-gamba
	    for (var j = 0; j < 3; j++) {
	    	coll[j] = new THREE.Mesh(g_coll, m_sbarre);
	    	coll[j].rotation.x = Math.PI/2;
	    	coll[j].position.z = Math.pow(-1, i) * 0.2;
	    	
	    	if (j > 0)
	    		coll[j].position.y = Math.pow(-1, j) * 0.75;
	    	
	    	sbarre[i].add(coll[j]);

		    
		    //gamba superiore
		    var gamba_sup = new THREE.Mesh(g_gamba_sup, m_gamba_sup);
		    gamba_sup.rotation.z = Math.PI/2;
		    gamba_sup.position.set(-0.2, Math.pow(-1, i) * -0.1, 0);
		    coll[j].add(gamba_sup);


		    //buchi per regolazione
		    var g_buco = new THREE.CircleGeometry(0.005, 16);
		    var m_buco = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.DoubleSide});
		    var buchi = [];

		    for (var k = 0; k < 8; k++) {
		    	buchi[k] = new THREE.Mesh(g_buco, m_buco);
		    
			    buchi[k].position.set(Math.pow(-1, i) * 0.0201, 0.19 - 0.02 * k, 0);
			    buchi[k].rotation.y = Math.PI/2;

			    gamba_sup.add(buchi[k]);
		    };
	    	
		    
		    //gamba di base
		    gamba_inf = new THREE.Mesh(g_gamba_inf, m_gamba_inf);
		    gamba_inf.position.y = 0.45;
		    gamba_sup.add(gamba_inf);

		    
		    //regolatori altezza
		    var cil_p = new THREE.Mesh(g_cil_p, m_sbarre);
		    var cil_g = new THREE.Mesh(g_cil_g, m_termin);
			var base_semisf = new THREE.Mesh(g_base_semisf, m_termin);
			var semisf = new THREE.Mesh(g_semisf, m_termin);

		    cil_p.rotation.z = Math.pow(-1, i) * -Math.PI/2;
		    cil_p.position.set( Math.pow(-1, i) * 0.03, -0.22, 0);
		   
		    cil_p.add(cil_g);
		    cil_g.position.y = 0.015;

		    cil_g.add(base_semisf);
		    base_semisf.position.y = 0.0065;

		    semisf.scale.y = 0.7;
		    semisf.position.y = 0.0015;
		    base_semisf.add(semisf);

		    gamba_inf.add(cil_p);

	    };
    };

	parallele.add(pedana);


	parallele.feature = this;
	parallele.name = this.id;
	var model = Feature.packageModel(parallele);

	return model;
};

module.exports = Parallele;