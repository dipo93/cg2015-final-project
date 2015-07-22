var Feature = require('./Feature.js');

Feature.inherits(Cane, Feature);

function Cane(feature) {
	Feature.call(this, feature);
}

Cane.prototype.style = 	{
									prefix: "fa",
									icon: "minus",
                                    zIndex: 3
								};

Cane.prototype.in_graph = true;
Cane.prototype.in_2D_map = false;
Cane.prototype.get3DModel = function() {

    var geometry = new THREE.BoxGeometry( 2, 1, 0.6 );
    var material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    var bed = new THREE.Mesh( geometry, material );
    
    bed.feature = this;
    bed.name = this.id;
    var model = Feature.packageModel(bed);

    return model;
};

module.exports = Cane;