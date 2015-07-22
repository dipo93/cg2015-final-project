var Feature = require('./Feature.js');

Feature.inherits(Divisorio, Feature);

function Divisorio(feature) {
	Feature.call(this, feature);
}

Divisorio.prototype.style = {
			    			prefix: "fa",
	    					icon: "minus",
	    					zIndex: 3
						};

Divisorio.prototype.in_graph = true;

Divisorio.prototype.in_2D_map = false;

Divisorio.prototype.get3DModel = function() {
	//TO DO
	var divisorio = new THREE.Object3D();


    var m_barre = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
    var g_barra_or = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 16);
    var g_piede = new THREE.CylinderGeometry(0.01, 0.01, 0.1, 16);
    var g_sfera = new THREE.SphereGeometry(0.01, 20);
    
    var g_gommino = new THREE.CylinderGeometry(0.01, 0.007, 0.005, 16)
    var m_gommino = new THREE.MeshLambertMaterial({color: 0x333333});
    
    var g_barra_ver = new THREE.CylinderGeometry(0.01, 0.01, 1.6, 16);
    var g_barra_cima = new THREE.CylinderGeometry(0.01, 0.01, 0.305, 20);
    
    var g_telo = new THREE.PlaneGeometry(0.3, 1.6);
    var m_telo = new THREE.MeshLambertMaterial({color: 0x6ef2b2, side: THREE.DoubleSide});


    var barra_or = [];  
    
    for (var j = 0; j < 10; j++) {
        
        //piede
        barra_or[j] = new THREE.Mesh(g_barra_or, m_barre);

        barra_or[j].position.y = 0.105;

        for (var i = 0; i < 2; i++) {
            var piede = new THREE.Mesh(g_piede, m_barre);
            var sfera = new THREE.Mesh(g_sfera, m_barre);
            var gommino = new THREE.Mesh(g_gommino, m_gommino);

            barra_or[j].add(sfera);
            sfera.position.y = Math.pow(-1, i) * 0.15;
            
            sfera.add(piede);
            piede.rotation.x = Math.PI/2;
            piede.position.z = -0.05;

            piede.add(gommino);
            gommino.position.y = -0.0525;
        };

        //parte alta
        var barra_ver = new THREE.Mesh(g_barra_ver, m_barre);
        var sfera = new THREE.Mesh(g_sfera, m_barre);
        
        barra_ver.position.z = 0.8;
        barra_ver.rotation.x = Math.PI/2;
        barra_ver.rotation.y = Math.pow(-1, j) * Math.PI/4;
        sfera.position.y = 0.8;
        barra_or[j].add(barra_ver);
        barra_ver.add(sfera);

        if(j == 0){
            barra_or[j].rotation.x = -Math.PI/2;
            divisorio.add(barra_or[j]);
        }
        else{
            barra_or[j].position.set(Math.cos(Math.PI/4) * 0.305, Math.sin(Math.PI/4) * 0.305 * Math.pow(-1, j), 0);
            barra_or[j-1].add(barra_or[j]);
        
            var sfera_cima = new THREE.Mesh(g_sfera, m_barre);
            sfera_cima.position.y = 0.8;
            barra_ver.add(sfera_cima);

            var barra_cima = new THREE.Mesh(g_barra_cima, m_barre);
            barra_cima.position.x = -0.1525;
            barra_cima.rotation.z = Math.PI/2;
            sfera_cima.add(barra_cima);

            var barra_fondo = barra_cima.clone();
            barra_fondo.position.set(-0.1525, -0.8, 0);
            barra_fondo.rotation.z = Math.PI/2;
            barra_ver.add(barra_fondo);

            var telo = new THREE.Mesh(g_telo, m_telo);
            telo.position.set(-0.15, 0, 0);
            barra_ver.add(telo);
        }
    };


	divisorio.feature = this;
	divisorio.name = this.id;
	var model = Feature.packageModel(divisorio);

	return model;
};

module.exports = Divisorio;