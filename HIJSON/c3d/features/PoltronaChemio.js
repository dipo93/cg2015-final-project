var Feature = require('./Feature.js');

Feature.inherits(PoltronaChemio, Feature);

function PoltronaChemio(feature) {
	Feature.call(this, feature);
}

PoltronaChemio.prototype.style = {
			    			weight: 0,
                            fillColor: "#98AFC7",
                            fillOpacity: 1,
                            zIndex: 3
						};

PoltronaChemio.prototype.in_graph = true;

PoltronaChemio.prototype.in_2D_map = true;

PoltronaChemio.prototype.get3DModel = function() {
	//TO DO
	var poltronaChemio = new THREE.Object3D();

    var poltronaChemioX = this.geometry.coordinates[0][1][0];
    var poltronaChemioY = this.geometry.coordinates[0][2][1];
    var poltronaChemioZ = this.properties.height;


    //base 
    var g_base = new THREE.CylinderGeometry(0.2, 0.45, 0.1, 20);
    var m_base = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
    var base = new THREE.Mesh(g_base, m_base);

    base.position.y = 0.05;
    poltronaChemio.add(base);


    //sostegno della poltrona
    var g_sostegno = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 20);
    var sostegno = new THREE.Mesh(g_sostegno, m_base);

    sostegno.position.y = 0.3;
    base.add(sostegno);


    //sedile
    var m_poltrona = new THREE.MeshLambertMaterial({color: 0x98AFC7});

    var extrusionSettings = { 
        amount: 0.65, 
        bevelEnabled: false, 
        bevelSegments: 2, 
        steps: 10, 
        bevelSize: 1, 
        bevelThickness: 1 
    };

    var shape_sed = new THREE.Shape();
    shape_sed.moveTo(0, 0);
    shape_sed.lineTo(0, 0.07);
    shape_sed.quadraticCurveTo(0, 0.1, -0.03, 0.1);
    shape_sed.lineTo(-0.67, 0.1);
    shape_sed.quadraticCurveTo(-0.7, 0.1, -0.7, 0.07);
    shape_sed.lineTo(-0.7, 0);

    var g_sedile = new THREE.ExtrudeGeometry(shape_sed, extrusionSettings);
    var sedile = new THREE.Mesh(g_sedile, m_poltrona);

    sedile.rotation.y = Math.PI/2;
    sedile.position.set(-0.325, 0.25, -0.35);
    sostegno.add(sedile);


    //schienale
    var shape_sc = new THREE.Shape();
    shape_sc.moveTo(0, 0);
    shape_sc.lineTo(0, 0.1);
    shape_sc.quadraticCurveTo(-0.5, 0.07, -0.97, 0.1);
    shape_sc.quadraticCurveTo(-1, 0.1, -1, 0.07);
    shape_sc.lineTo(-1, 0);
    shape_sc.quadraticCurveTo(-0.5, -0.03, 0, 0);

    var g_schienale = new THREE.ExtrudeGeometry(shape_sc, extrusionSettings);
    var schienale = new THREE.Mesh(g_schienale, m_poltrona);

    schienale.rotation.z = -80 * Math.PI/180;
    schienale.position.set(-0.78, -0.015, 0);
    sedile.add(schienale);


    //poggiapiedi
    var shape_pp = new THREE.Shape();
    shape_pp.moveTo(0, 0);
    shape_pp.lineTo(0, 0.07);
    shape_pp.quadraticCurveTo(0, 0.1, 0.03, 0.1);
    shape_pp.lineTo(0.37, 0.1);
    shape_pp.quadraticCurveTo(0.4, 0.1, 0.4, 0.07);
    shape_pp.lineTo(0.4, 0);

    var g_poggiapiedi = new THREE.ExtrudeGeometry(shape_pp, extrusionSettings);
    var poggiapiedi = new THREE.Mesh(g_poggiapiedi, m_poltrona);

    poggiapiedi.rotation.z = -Math.PI/3;
    sedile.add(poggiapiedi);

    var g_asse_rotaz = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 16);
    var asse_rotaz = new THREE.Mesh(g_asse_rotaz, m_base);

    asse_rotaz.rotation.x = -Math.PI/2;
    asse_rotaz.position.z = 0.325;
    sedile.add(asse_rotaz);


    //braccioli
    var g_asse_bracc = new THREE.CylinderGeometry(0.02, 0.02, 0.75, 16);
    var asse_bracc = new THREE.Mesh(g_asse_bracc, m_base);

    var g_sfera = new THREE.SphereGeometry(0.02, 20);
    var g_sost = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 16);


    var shape_br = new THREE.Shape();
    shape_br.moveTo(0, 0);
    shape_br.lineTo(0.4, 0);
    shape_br.quadraticCurveTo(0.42, 0.03, 0.35, 0.05);
    shape_br.lineTo(0.02, 0.05);
    shape_br.quadraticCurveTo(-0.02, 0.03, 0, 0);

    var extrusionSettings1 = { 
        amount: 0.1, 
        bevelEnabled: false, 
        bevelSegments: 2, 
        steps: 10, 
        bevelSize: 1, 
        bevelThickness: 1 
    };

    var g_bracciolo = new THREE.ExtrudeGeometry(shape_br, extrusionSettings1);


    asse_bracc.rotation.x = -Math.PI/2;
    asse_bracc.position.set(-0.65, 0.05, 0.325);
    sedile.add(asse_bracc);

    for (var i = 0; i < 2; i++) {
        var sfera = new THREE.Mesh(g_sfera, m_base);
        var sost = new THREE.Mesh(g_sost, m_base);
        var bracciolo = new THREE.Mesh(g_bracciolo, m_poltrona);

        sfera.position.y = Math.pow(-1, i) * 0.375;
        sfera.rotation.set(0, -Math.PI/2, -Math.PI/2);
        sost.position.y = 0.1;
        bracciolo.position.set(-0.05, 0.1, 0.03);
        bracciolo.rotation.y = Math.PI/2;
        asse_bracc.add(sfera);
        sfera.add(sost);
        sost.add(bracciolo);
    };

	poltronaChemio.feature = this;
	poltronaChemio.name = this.id;
	var model = Feature.packageModel(poltronaChemio);

	return model;
};

module.exports = PoltronaChemio;