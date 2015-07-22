var Feature = require('./Feature.js');

Feature.inherits(Scalini, Feature);

function Scalini(feature) {
	Feature.call(this, feature);
}

Scalini.prototype.style = {
			    			weight: 0,
						    fillColor: "#CC9966",
						    fillOpacity: 1,
	    					zIndex: 3
						};

Scalini.prototype.in_graph = true;

Scalini.prototype.in_2D_map = true;

Scalini.prototype.get3DModel = function() {
	//TO DO
	var scalini = new THREE.Object3D();

	var scaliniX = this.geometry.coordinates[0][1][0];
	var scaliniY = this.geometry.coordinates[0][2][1];
	var scaliniZ = this.properties.height;


	var materiale = new THREE.MeshLambertMaterial({ color: 0xCC9966});

	//pedana inferiore
	var g_pedana_bassa = new THREE.BoxGeometry(3.5, 0.15, 1);
	var pedana_bassa = new THREE.Mesh(g_pedana_bassa, materiale);

	pedana_bassa.position.set(0, 0.075, 0);


	//prima pedana intermedia
	var g_pedana_intermedia1 = new THREE.BoxGeometry(3, 0.2, 1);
	var pedana_intermedia1 = new THREE.Mesh(g_pedana_intermedia1, materiale);

	pedana_intermedia1.position.set(0, 0.15+0.075, 0);


	//seconda pedana intermedia
	var g_pedana_intermedia2 = new THREE.BoxGeometry(2.5, 0.2, 1);
	var pedana_intermedia2 = new THREE.Mesh(g_pedana_intermedia2, materiale);

	pedana_intermedia2.position.set(0, 0.35+0.075, 0);


	//pedana superiore
	var g_pedana_alta = new THREE.BoxGeometry(2, 0.2, 1);
	var pedana_alta = new THREE.Mesh(g_pedana_alta, materiale);

	pedana_alta.position.set(0, 0.55+0.075, 0);


	//corrimano orizzontale destro
	var g_corrimano_or_dx = new THREE.BoxGeometry(2, 0.03, 0.07);
	var corrimano_or_dx = new THREE.Mesh(g_corrimano_or_dx, materiale);

	corrimano_or_dx.position.set(0, 0.75+0.8, -0.5+0.035);


	//corrimano orizzontale sinistro
	var g_corrimano_or_sx = new THREE.BoxGeometry(2, 0.03, 0.07);
	var corrimano_or_sx = new THREE.Mesh(g_corrimano_or_sx, materiale);

	corrimano_or_sx.position.set(0, 0.75+0.8, 0.5-0.035);


	//corrimano di salita destro
	var g_corrimano_sal_dx = new THREE.BoxGeometry(1, 0.03, 0.07);
	var corrimano_sal_dx = new THREE.Mesh(g_corrimano_sal_dx, materiale);

	corrimano_sal_dx.position.set(1+0.35, (0.75+0.8)-0.35, -0.5+0.035);
	corrimano_sal_dx.rotation.z = -45 * Math.PI/180;


	//corrimano di salita sinistro
	var g_corrimano_sal_sx = new THREE.BoxGeometry(1, 0.03, 0.07);
	var corrimano_sal_sx = new THREE.Mesh(g_corrimano_sal_sx, materiale);

	corrimano_sal_sx.position.set(1+0.35, (0.75+0.8)-0.35, 0.5-0.035);
	corrimano_sal_sx.rotation.z = -45 * Math.PI/180;


	//corrimano di discesa destro
	var g_corrimano_dis_dx = new THREE.BoxGeometry(1, 0.03, 0.07);
	var corrimano_dis_dx = new THREE.Mesh(g_corrimano_dis_dx, materiale);

	corrimano_dis_dx.position.set(-(1+0.35), (0.75+0.8)-0.35, -0.5+0.035);
	corrimano_dis_dx.rotation.z = 45 * Math.PI/180;


	//corrimano di discesa sinistro
	var g_corrimano_dis_sx = new THREE.BoxGeometry(1, 0.03, 0.07);
	var corrimano_dis_sx = new THREE.Mesh(g_corrimano_dis_sx, materiale);

	corrimano_dis_sx.position.set(-(1+0.35), (0.75+0.8)-0.35, 0.5-0.035);
	corrimano_dis_sx.rotation.z = 45 * Math.PI/180;


	//sostegni verticali per i corrimano
	var g_sostegno = new THREE.BoxGeometry(0.1, 1, 0.03);
	

	var sostegno1_dx = new THREE.Mesh(g_sostegno, materiale);
	sostegno1_dx.position.set(0.95, 1.05, -0.485);

	var sostegno2_dx = new THREE.Mesh(g_sostegno, materiale);
	sostegno2_dx.position.set(0, 1.05, -0.485);

	var sostegno3_dx = new THREE.Mesh(g_sostegno, materiale);
	sostegno3_dx.position.set(-0.95, 1.05, -0.485);

	var sostegno1_sx = new THREE.Mesh(g_sostegno, materiale);
	sostegno1_sx.position.set(0.95, 1.05, 0.485);

	var sostegno2_sx = new THREE.Mesh(g_sostegno, materiale);
	sostegno2_sx.position.set(0, 1.05, 0.485);

	var sostegno3_sx = new THREE.Mesh(g_sostegno, materiale);
	sostegno3_sx.position.set(-0.95, 1.05, 0.485);


	var g_sostegno_iniz = new THREE.BoxGeometry(0.03, 0.7, 0.07);
	
	var sostegno_iniz_dx = new THREE.Mesh(g_sostegno_iniz, materiale);
	sostegno_iniz_dx.position.set(1.7, 0.5, -0.5+0.035);

	var sostegno_iniz_sx = new THREE.Mesh(g_sostegno_iniz, materiale);
	sostegno_iniz_sx.position.set(1.7, 0.5, 0.5-0.035);

	var sostegno_fin_dx = new THREE.Mesh(g_sostegno_iniz, materiale);
	sostegno_fin_dx.position.set(-1.7, 0.5, -0.5+0.035);

	var sostegno_fin_sx = new THREE.Mesh(g_sostegno_iniz, materiale);
	sostegno_fin_sx.position.set(-1.7, 0.5, 0.5-0.035);

	

	scalini.add(pedana_bassa);
	scalini.add(pedana_intermedia1);
	scalini.add(pedana_intermedia2);
	scalini.add(pedana_alta);
	scalini.add(corrimano_or_dx);
	scalini.add(corrimano_or_sx);
	scalini.add(corrimano_sal_dx);
	scalini.add(corrimano_sal_sx);
	scalini.add(corrimano_dis_dx);
	scalini.add(corrimano_dis_sx);
	scalini.add(sostegno1_dx);
	scalini.add(sostegno2_dx);
	scalini.add(sostegno3_dx);
	scalini.add(sostegno1_sx);
	scalini.add(sostegno2_sx);
	scalini.add(sostegno3_sx);
	scalini.add(sostegno_iniz_dx);
	scalini.add(sostegno_iniz_sx);
	scalini.add(sostegno_fin_dx);
	scalini.add(sostegno_fin_sx);

	scalini.feature = this;
	scalini.name = this.id;
	var model = Feature.packageModel(scalini);

	return model;
};

module.exports = Scalini;