var Feature = require('./Feature.js');

Feature.inherits(Cestino, Feature);

function Cestino(feature) {
	Feature.call(this, feature);
}

Cestino.prototype.style = {
			    			prefix: "fa",
	    					icon: "minus",
	    					zIndex: 3
						};

Cestino.prototype.in_graph = true;

Cestino.prototype.in_2D_map = false;

Cestino.prototype.get3DModel = function() {
	//TO DO
	var cestino = new THREE.Object3D();

    //fondo e corpo del cestino
    var g_fondo = new THREE.CircleGeometry(0.15, 40);
    var m_fondo = new THREE.MeshLambertMaterial({color: 0x333333, side: THREE.DoubleSide});
    var g_corpo = new THREE.CylinderGeometry(0.2, 0.15, 0.4, 40, 1, true);

    var fondo = new THREE.Mesh(g_fondo, m_fondo);
    var corpo = new THREE.Mesh(g_corpo, m_fondo);

    fondo.rotation.x = Math.PI/2;
    corpo.rotation.x = -Math.PI/2;
    fondo.position.y = 0.001;
    corpo.position.z = -0.2;

    cestino.add(fondo);
    fondo.add(corpo);


    //corona superiore
    var g_corona = new THREE.TorusGeometry(0.2, 0.01, 10,40);
    var m_corona = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
    var corona = new THREE.Mesh(g_corona, m_corona);

    corona.rotation.x = Math.PI/2;
    corona.position.y = 0.2;
    corpo.add(corona);


	cestino.feature = this;
	cestino.name = this.id;
	var model = Feature.packageModel(cestino);

	return model;
};

module.exports = Cestino;