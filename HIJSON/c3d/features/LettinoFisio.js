var Feature = require('./Feature.js');

Feature.inherits(LettinoFisio, Feature);

function LettinoFisio(feature) {
	Feature.call(this, feature);
}

LettinoFisio.prototype.style = {
			    			weight: 0,
                            fillColor: "#2C8C8B",
                            fillOpacity: 1,
                            zIndex: 3
						};

LettinoFisio.prototype.in_graph = true;

LettinoFisio.prototype.in_2D_map = true;

LettinoFisio.prototype.get3DModel = function() {
	//TO DO
	var lettinoFisio = new THREE.Object3D();

    var lettinoFisioX = this.geometry.coordinates[0][1][0];
    var lettinoFisioY = this.geometry.coordinates[0][2][1];
    var lettinoFisioZ = this.properties.height;

    var g_gamba = new THREE.BoxGeometry(0.02, 1, 0.1);
    var m_legno = new THREE.MeshLambertMaterial({color: 0xBB7939, side: THREE.DoubleSide});

    var gambe = []

    for (var i = 0; i < 8; i++) {
        gambe[i] = new THREE.Mesh(g_gamba, m_legno);
        lettinoFisio.add(gambe[i]);
        if (i > 3) 
            gambe[i].rotation.y = Math.PI/2;
    };

    gambe[0].position.set(1, 0.5, -0.35);
    gambe[1].position.set(-1, 0.5, -0.35);
    gambe[2].position.set(-1, 0.5, 0.35);
    gambe[3].position.set(1, 0.5, 0.35);
    gambe[4].position.set(0.94, 0.5, -0.39);
    gambe[5].position.set(-0.94, 0.5, -0.39);
    gambe[6].position.set(-0.94, 0.5, 0.39);
    gambe[7].position.set(0.94, 0.5, 0.39);


    var g_asse_l = new THREE.BoxGeometry(2.06, 0.1, 0.02);
    var g_asse_c = new THREE.BoxGeometry(0.02, 0.1, 0.8)
    var g_vite = new THREE.SphereGeometry(0.015, 16, 16);
    var m_vite = new THREE.MeshLambertMaterial({color: 0xC0C0C0});

    for (var i = 0; i < 2; i++) {
        var asse_l = new THREE.Mesh(g_asse_l, m_legno);
        var asse_c = new THREE.Mesh(g_asse_c, m_legno);
        asse_l.position.set(0, 0.97, Math.pow(-1, i) * 0.41);
        asse_c.position.set(Math.pow(-1, i) * 1.02, 0.97, 0);
        lettinoFisio.add(asse_l);
        lettinoFisio.add(asse_c);

        var viti = [];

        for (var j = 0; j < 2; j++) {
            viti[j] = new THREE.Mesh(g_vite, m_vite);
            viti[j].scale.z = 0.5;
            viti[j].position.set(0.95 * Math.pow(-1, j), 0, 0.01 * Math.pow(-1, i));
            asse_l.add(viti[j]);
        };

        for (var j = 0; j < 2; j++) {
            viti[j] = new THREE.Mesh(g_vite, m_vite);
            viti[j].scale.x = 0.5;
            viti[j].position.set(0.01 * Math.pow(-1, i), 0, 0.37 * Math.pow(-1, j));
            asse_c.add(viti[j]);
        };
    };


    //piano di appoggio per i sostegni della parte rialzata
    var g_piano_app = new THREE.PlaneGeometry(0.4, 0.8);
    var piano_app = new THREE.Mesh(g_piano_app, m_legno);

    piano_app.rotation.x = Math.PI/2;
    piano_app.position.set(-0.81, 1, 0);
    lettinoFisio.add(piano_app);


    var shape1 = new THREE.Shape();
    shape1.moveTo(0, 0);
    shape1.lineTo(0, 0.07);
    shape1.quadraticCurveTo(0, 0.1, -0.05, 0.1);
    shape1.lineTo(-1.45, 0.1);
    shape1.quadraticCurveTo(-1.5, 0.1, -1.5, 0.07);
    shape1.lineTo(-1.5, 0);


    var shape2 = new THREE.Shape();
    shape2.moveTo(0, 0);
    shape2.lineTo(0, 0.07);
    shape2.quadraticCurveTo(0, 0.1, -0.05, 0.1);
    shape2.lineTo(-0.45, 0.1);
    shape2.quadraticCurveTo(-0.5, 0.1, -0.5, 0.07);
    shape2.lineTo(-0.5, 0);


    var extrudeSettings = {
        amount: 0.8, 
        bevelEnabled: false, 
        bevelSegments: 2, 
        steps: 10, 
        bevelSize: 1, 
        bevelThickness: 1 
    };

    
    var g_materasso1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings);
    var g_materasso2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings);
    var m_materasso = new THREE.MeshLambertMaterial({color: 0x2C8C8B});
    var materasso1 = new THREE.Mesh(g_materasso1, m_materasso);
    var materasso2 = new THREE.Mesh(g_materasso2, m_materasso);

    materasso1.position.set(1.01, 1, -0.4);
    materasso2.position.set(-0.51, 1, -0.4);

    materasso2.rotation.z = -25 * Math.PI/180;

    lettinoFisio.add(materasso1);
    lettinoFisio.add(materasso2);

    var g_sostegno = new THREE.BoxGeometry(0.02, 0.2, 0.02);

    for (var i = 0; i < 2; i++) {
        sostegno = new THREE.Mesh(g_sostegno, m_legno);
        sostegno.position.set(-0.4, -0.09, 0.05 + i * 0.7);
        sostegno.rotation.z = 25 * Math.PI/180;
        materasso2.add(sostegno);
    };


	lettinoFisio.feature = this;
	lettinoFisio.name = this.id;
	var model = Feature.packageModel(lettinoFisio);

	return model;
};

module.exports = LettinoFisio;