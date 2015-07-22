var Feature = require('./Feature.js');

Feature.inherits(Spalliera, Feature);

function Spalliera(feature) {
	Feature.call(this, feature);
}

Spalliera.prototype.style = {
			    			prefix: "fa",
	    					icon: "minus",
	    					zIndex: 3
						};

Spalliera.prototype.in_graph = true;

Spalliera.prototype.in_2D_map = false;

Spalliera.prototype.get3DModel = function() {
	//TO DO
	var spalliera = new THREE.Object3D();

    //sostegni laterali paralleli al muro
    var m_sostegni = new THREE.MeshLambertMaterial({color: 0xffffff});
    var g_sostegno1 = new THREE.BoxGeometry(2.3, 0.05, 0.02);
    var sostegno1 = [];


    //terminazioni dei sostegni
    var g_termin1 = new THREE.BoxGeometry(0.02, 0.0501, 0.0201);
    var g_termin2 = new THREE.BoxGeometry(0.0501, 0.02, 0.0201);
    var m_termin = new THREE.MeshLambertMaterial({color: 0x333333});

    var termin1 = [];
    var termin2 = [];

    
    //attacchi al muro
    var g_attacco = new THREE.BoxGeometry(0.08, 0.2, 0.02);
    var attacchi = [];


    for (var i = 0; i < 2; i++) {
    	sostegno1[i] = new THREE.Mesh(g_sostegno1, m_sostegni);
    	sostegno1[i].position.set(0, 1.155, Math.pow(-1, i) * 0.35);
    	sostegno1[i].rotation.z = -Math.PI/2;

    	termin1[i] = new THREE.Mesh(g_termin1, m_termin);
    	termin1[i].position.x = 1.145;
    	sostegno1[i].add(termin1[i]);

    	spalliera.add(sostegno1[i]);

    	for (var k = 0; k < 2; k++) {
    		attacchi[k] = new THREE.Mesh(g_attacco, m_sostegni);
    		if(k == 0)
    			attacchi[k].position.set(-1, -0.1, 0);
    		else
    			attacchi[k].position.set(1.02, -0.1, 0);
    		sostegno1[i].add(attacchi[k]);
    	};
    };


    //sostegni laterali paralleli al terreno
    var g_sostegno2 = new THREE.BoxGeometry(0.05, 1.2, 0.02);
    var sostegno2 = [];

    for (var i = 0; i < 2; i++) {
    	sostegno2[i] = new THREE.Mesh(g_sostegno2, m_sostegni);
    	sostegno2[i].position.set(-1.15, 0.45, 0);

    	termin2[i] = new THREE.Mesh(g_termin2, m_termin);
    	termin2[i].position.y = 0.595;
    	sostegno2[i].add(termin2[i]);

    	sostegno1[i].add(sostegno2[i]);
    };
    

    var g_sbarra = new THREE.CylinderGeometry(0.02, 0.02, 0.75, 16);
    var m_sbarra = new THREE.MeshLambertMaterial({color: 0xf2c495});

    var g_gommino = new THREE.CylinderGeometry(0.025, 0.025, 0.03, 16);
    var m_gommino = new THREE.MeshLambertMaterial({color: 0x333333});
    
    var sbarre = [];
    var gommini = [];

    for (var j = 0; j < 16; j++) {
    	sbarre[j] = new THREE.Mesh(g_sbarra, m_sbarra);
    	sbarre[j].rotation.x = Math.PI/2;
    	if (j < 10) { //sbarre in verticale
	    	sbarre[j].position.set(0.95 + j * -0.2, 0, -0.35);
	    	sostegno1[0].add(sbarre[j]);
    	} else { //sbarre in orizzonatale
	    	sbarre[j].position.set(0, -0.525 + 0.2 * (j - 10), -0.35);
	    	sostegno2[0].add(sbarre[j]);
    	};

    	for (var i = 0; i < 2; i++) {
    		gommini[i] = new THREE.Mesh(g_gommino, m_gommino);
    		gommini[i].position.y = Math.pow(-1, i) * 0.35;
    		sbarre[j].add(gommini[i]);
    	};
    };

	spalliera.feature = this;
	spalliera.name = this.id;
	var model = Feature.packageModel(spalliera);

	return model;
};

module.exports = Spalliera;