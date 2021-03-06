var Feature = require('./Feature.js');

Feature.inherits(Lettino, Feature);

function Lettino(feature) {
	Feature.call(this, feature);
}

Lettino.prototype.style = {
			    			weight: 0,
                            fillColor: "#ADDFFF",
                            fillOpacity: 1,
                            zIndex: 3
						};

Lettino.prototype.in_graph = true;

Lettino.prototype.in_2D_map = true;

Lettino.prototype.get3DModel = function() {
	//TO DO
	var lettino = new THREE.Object3D();

    var lettinoX = this.geometry.coordinates[0][1][0];
    var lettinoY = this.geometry.coordinates[0][2][1];
    var lettinoZ = this.properties.height;



    //struttura gambe

    //costruzione gambe verticali
    var g_gamba = new THREE.CylinderGeometry(0.03, 0.03, 0.78, 16);
    var m_gambe = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
    
    var g_piedino = new THREE.CylinderGeometry(0.03, 0.03, 0.01, 16);
    var m_piedino = new THREE.MeshLambertMaterial({color: 0x000000});

    var g_sfera_cima = new THREE.SphereGeometry(0.03, 16, 16);

    var gamba = [];

    for (var i = 0; i < 4; i++) {
        gamba[i] = new THREE.Mesh(g_gamba, m_gambe);
        
        var piedino = new THREE.Mesh(g_piedino, m_piedino);
        gamba[i].add(piedino);
        piedino.position.y = -0.395;
        
        var sfera_cima = new THREE.Mesh(g_sfera_cima, m_gambe);
        gamba[i].add(sfera_cima);
        sfera_cima.position.y = 0.39;       
    };

    gamba[0].position.set(0.75, 0.4, -0.4);
    gamba[1].position.set(0.75, 0.4, 0.4);
    gamba[2].position.set(-0.75, 0.4, 0.4);
    gamba[3].position.set(-0.75, 0.4, -0.4);



    //costruzione assi di sostegno
    var g_asse_lungo = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 16);

    var asse_l = [];

    for (var i = 0; i < 3; i++) {
        asse_l[i] = new THREE.Mesh(g_asse_lungo, m_gambe);
        asse_l[i].rotation.z = Math.PI/2;
    };

    asse_l[0].position.y = 0.79;
    asse_l[0].position.z = -0.4
    asse_l[1].position.y = 0.79;
    asse_l[1].position.z = 0.4
    asse_l[2].position.y = 0.25;


    var g_asse_corto = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 16);

    var asse_c = [];

    for (var i = 0; i < 3; i++) {
        asse_c[i] = new THREE.Mesh(g_asse_corto, m_gambe);
        asse_c[i].rotation.x = Math.PI/2;
    };

    asse_c[0].position.y = 0.25;
    asse_c[0].position.x = -0.75;
    asse_c[1].position.y = 0.25;
    asse_c[1].position.x = 0.75;



    //materasso orizzontale

    var extrudeSettings = {
        amount: 0.85, 
        bevelEnabled: false, 
        bevelSegments: 2, 
        steps: 10, 
        bevelSize: 1, 
        bevelThickness: 1 
    };

    var shape1 = new THREE.Shape();
    shape1.moveTo(-0.05, 0);
    shape1.quadraticCurveTo(-0.02, 0.03, -0.05, 0.06);
    shape1.lineTo(-1.5, 0.06);
    shape1.lineTo(-1.5, 0);

    var g_materasso1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings);
    var m_materasso = new THREE.MeshLambertMaterial({color: 0xADDFFF});
    var materasso1 = new THREE.Mesh(g_materasso1, m_materasso);
    materasso1.position.set(0.95, 0.82, -0.425);



    //asse di raccordo tra i due materassi
    var g_asse_raccordo = new THREE.CylinderGeometry(0.03, 0.03, 0.85, 8, 1, false, 0, Math.PI);
    var asse_raccordo = new THREE.Mesh(g_asse_raccordo, m_gambe);

    asse_raccordo.rotation.x = Math.PI/2;
    asse_raccordo.rotation.z = Math.PI;
    asse_raccordo.position.set(-0.55, 0.85, 0);



    //materasso rialzato
    var shape2 = new THREE.Shape();
    shape2.moveTo(0, 0);
    shape2.lineTo(0, 0.06);
    shape2.lineTo(-0.57, 0.06);
    shape2.quadraticCurveTo(-0.6, 0.06, -0.6, 0.03);
    shape2.lineTo(-0.6, 0);


    var g_materasso2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings);
    var materasso2 = new THREE.Mesh(g_materasso2, m_materasso);
    materasso2.rotation.z = -Math.PI/6;
    materasso2.position.set(-0.595, 0.83, -0.425);



    //rotolo di carta

    //sostegni
    var g_sostegno = new THREE.CylinderGeometry(0.005, 0.005, 0.4);
    
    var g_sfera_cima2 = new THREE.SphereGeometry(0.005);

    var sostegni = [];

    for (var i = 0; i < 2; i++) {
        sostegni[i] = new THREE.Mesh(g_sostegno, m_gambe);
        sostegni[i].rotation.z = Math.PI/2;
        sostegni[i].position.set(-0.95, 0.6, 0);

        var sfera_cima2 = new THREE.Mesh(g_sfera_cima2, m_gambe);
        sostegni[i].add(sfera_cima2);
        sfera_cima2.position.y = 0.2;
    };

    sostegni[0].position.z = -0.4;
    sostegni[1].position.z = 0.4;


    //rotolo
    var g_rotolo = new THREE.CylinderGeometry(0.07, 0.07, 0.79, 25);
    var m_rotolo = new THREE.MeshLambertMaterial({color: 0xFFFFDD});
    var rotolo = new THREE.Mesh(g_rotolo, m_rotolo);

    rotolo.rotation.x = Math.PI/2;
    rotolo.position.set(-1.15, 0.6, 0);


    //buco del rotolo
    var g_buco = new THREE.CircleGeometry(0.03, 25);
    var m_buco = new THREE.MeshLambertMaterial({color: 0x4B4B4B});

    var buco = [];

    for (var i = 0; i < 2; i++) {
        buco[i] = new THREE.Mesh(g_buco, m_buco);
        rotolo.add(buco[i]);
    }

    buco[0].position.y = 0.4001;
    buco[0].rotation.x = -Math.PI/2;
    buco[1].position.y = -0.4001;
    buco[1].rotation.x = Math.PI/2;


    //foglio del rotolo
    var g_foglio = new THREE.PlaneGeometry(0.79, 0.2);
    m_rotolo.side = THREE.DoubleSide;
    var foglio = new THREE.Mesh(g_foglio, m_rotolo);

    rotolo.add(foglio);
    
    foglio.rotation.x = -Math.PI/2;
    foglio.rotation.y = Math.PI/2;
    foglio.position.x = -0.07;
    foglio.position.z = 0.1;



    for (var i = 0; i < 4; i++) {
        lettino.add(gamba[i]);
    }
    for (var i = 0; i < 3; i++) {
        lettino.add(asse_l[i]);
    }
    for (var i = 0; i < 2; i++) {
        lettino.add(asse_c[i]);
    }
    lettino.add(materasso1);
    lettino.add(asse_raccordo);
    lettino.add(materasso2);
    for (var i = 0; i < 2; i++) {
        lettino.add(sostegni[i]);
    }
    lettino.add(rotolo);

	lettino.feature = this;
	lettino.name = this.id;
	var model = Feature.packageModel(lettino);

	return model;
};

module.exports = Lettino;