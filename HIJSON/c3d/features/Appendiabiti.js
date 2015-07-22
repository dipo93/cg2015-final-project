var Feature = require('./Feature.js');

Feature.inherits(Appendiabiti, Feature);

function Appendiabiti(feature) {
	Feature.call(this, feature);
}

Appendiabiti.prototype.style = {
			    			prefix: "fa",
	    					icon: "minus",
	    					zIndex: 3
						};

Appendiabiti.prototype.in_graph = true;

Appendiabiti.prototype.in_2D_map = false;

Appendiabiti.prototype.get3DModel = function() {
	//TO DO
	var appendiabiti = new THREE.Object3D();


    //base di appoggio
    var base_geom = new THREE.CylinderGeometry(0.09, 0.25, 0.08, 20, 2, true);
    var base_mat = new THREE.MeshLambertMaterial({color: 0x4B4B4B});
    base_mat.side = THREE.DoubleSide;
    var base = new THREE.Mesh(base_geom, base_mat);
    base.position.set(0, 0.04, 0);

    var base2_geom = new THREE.CylinderGeometry(0.09, 0.01, 0.03, 20, 2, true);
    var base2 = new THREE.Mesh(base2_geom, base_mat);
    base2.position.set(0, 0.015+0.05, 0);



    //tronco principale
    var tronco_geom = new THREE.CylinderGeometry(0.03, 0.03, 2, 20);
    var tronco_mat = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
    var tronco = new THREE.Mesh(tronco_geom, tronco_mat);
    tronco.position.set(0, 1, 0);


    //portaombrelli
    var g_portaombrelli_base = new THREE.TorusGeometry(0.045, 0.02, 16, 16);
    var m_portaombrelli = new THREE.MeshLambertMaterial({
        color: 0x3399FF, 
        transparent: true,
        opacity: 0.8
    });
    var portaombrelli_base = new THREE.Mesh(g_portaombrelli_base, m_portaombrelli);
    portaombrelli_base.rotation.x = Math.PI/2;
    portaombrelli_base.position.set(0, 0.7, 0);


    var g_portaombrelli = new THREE.TorusGeometry(0.06, 0.015, 16, 16);
    var portaombrelli = [];

    for (var i = 0; i < 4; i++) {
        portaombrelli[i] = new THREE.Mesh(g_portaombrelli, m_portaombrelli);
        portaombrelli[i].rotation.x = Math.PI/2;
        portaombrelli[i].position.y = 0.7;
    };

    portaombrelli[0].position.x = 0.1;
    portaombrelli[1].position.z = 0.1;
    portaombrelli[2].position.x = -0.1;
    portaombrelli[3].position.z = -0.1;



    //ganci
    var g_corpo_gancio = new THREE.CylinderGeometry(0.015, 0.015, 0.17);
    var m_corpo_gancio = new THREE.MeshLambertMaterial({color: 0xC0C0C0});

    var g_gancio = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16);
    var m_gancio = new THREE.MeshLambertMaterial({
        color: 0x3399FF, 
        transparent: true,
        opacity: 0.8
    });


    var ganci = [];

    for (var i = 0; i < 8; i++) {
    	ganci[i] = new THREE.Object3D();
    	ganci[i].rotation.x = Math.PI/2;
    	ganci[i].position.set(0, 1.7, 0);

    	var corpo_gancio = new THREE.Mesh(g_corpo_gancio, m_corpo_gancio);
    	ganci[i].add(corpo_gancio);

    	var gancio = new THREE.Mesh(g_gancio, m_gancio);
    	corpo_gancio.add(gancio);
    	gancio.position.y = 0.085;

    	ganci[i].rotation.z = 45 * i * Math.PI/180
		corpo_gancio.position.y = 0.115;
		
		if (i % 2 == 1)
			ganci[i].position.y += 0.2;
    };



    appendiabiti.add(base);
    appendiabiti.add(base2);
    appendiabiti.add(tronco);
    appendiabiti.add(portaombrelli_base);
    for (var i = 0; i < 4; i++) {
    	appendiabiti.add(portaombrelli[i]);
    };
    for (var i = 0; i < 8; i++) {
    	appendiabiti.add(ganci[i]);
    };

    appendiabiti.feature = this;
	appendiabiti.name = this.id;
	var model = Feature.packageModel(appendiabiti);

	return model;
};

module.exports = Appendiabiti;