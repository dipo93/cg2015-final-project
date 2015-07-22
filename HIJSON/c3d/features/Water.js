var Feature = require('./Feature.js');

Feature.inherits(Water, Feature);

function Water(feature) {
      Feature.call(this, feature);
}

Water.prototype.style = {
                                    prefix: "fa",
                                    icon: "plus",
                                    zIndex: 3
                                    };

Water.prototype.in_graph = true;

Water.prototype.in_2D_map = false;

Water.prototype.get3DModel = function() {

	var water=new THREE.Object3D();
	scene.add(water);


	var curve = new THREE.SplineCurve3([
	    new THREE.Vector3( 0.12, 0, 0 ),
	    new THREE.Vector3( 0.14, 0, 0.1 ),
	    new THREE.Vector3( 0.18, 0, 0.2 ),
	    new THREE.Vector3( 0.3, 0, 0.32 ),
	    new THREE.Vector3( 0.2, 0, 0.36 ),
	    new THREE.Vector3( 0.2, 0, 0.3)
	   ]
	);


	var geometry = new THREE.LatheGeometry(curve.getPoints(20),200);
	var material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
	material.side = THREE.DoubleSide;
	var lathe = new THREE.Mesh( geometry, material );
	lathe.rotation.x=-Math.PI/2;
	lathe.scale.set(0.7,0.8,0.8);
	lathe.position.set(0.015,0.405,-0.01);
	water.add(lathe);

	var curve = new THREE.CubicBezierCurve3(
	    new THREE.Vector3( 0.08, 0, 0 ),
	    new THREE.Vector3( 0.14, 0, 0.05 ),
	    new THREE.Vector3( 0.18, 0, 0.25 ),
	    new THREE.Vector3( 0, 0, 0.25 )
	   
	);
	
	var geometry = new THREE.LatheGeometry( curve.getPoints(20),200);
	var material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
	material.side = THREE.DoubleSide;
	var lathe = new THREE.Mesh( geometry, material );
	lathe.rotation.x=-Math.PI/2;
	lathe.scale.set(1.3,0.1,1.7);
	lathe.position.set(0.01,0.69,-0.21);

	water.add( lathe );

	water.scale.set(1,1.2,1.2);
    water.feature = this;
    water.name = this.id;
    var model = Feature.packageModel(water);

    return model;

};

module.exports = Water;