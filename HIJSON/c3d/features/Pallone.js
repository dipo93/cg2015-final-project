var Feature = require('./Feature.js');

Feature.inherits(Pallone, Feature);

function Pallone(feature) {
	Feature.call(this, feature);
}

Pallone.prototype.style = {
			    			prefix: "fa",
	    					icon: "minus",
	    					zIndex: 3
						};

Pallone.prototype.in_graph = true;

Pallone.prototype.in_2D_map = false;

Pallone.prototype.get3DModel = function() {
	//TO DO
	var pallone = new THREE.Object3D();

    do{
    	var raggio = Math.random().toPrecision(1);
    }
    while (raggio < 0.1 || raggio > 0.5);


    var x = Math.random().toPrecision(2);

    if (x <= 0.25)
    	colore = 0x39a083;
    else if (x > 0.25 && x <= 0.5) 
    	colore = 0xf8ff8c;
    else if (x > 0.5 && x <= 0.75) 
    	colore = 0xffa857;
    else
    	colore = 0xb1c5ff;

    var g_palla = new THREE.SphereGeometry(raggio, 20, 20);
    var m_palla = new THREE.MeshLambertMaterial({color: colore});
    var palla = new THREE.Mesh(g_palla, m_palla);
    palla.position.y = raggio;
    

	pallone.add(palla);


	pallone.feature = this;
	pallone.name = this.id;
	var model = Feature.packageModel(pallone);

	return model;
};

module.exports = Pallone;