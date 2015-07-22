var Feature = require('./Feature.js');

Feature.inherits(ReneArtificiale, Feature);

function ReneArtificiale(feature) {
	Feature.call(this, feature);
}

ReneArtificiale.prototype.style = {
			    			prefix: "fa",
	    					icon: "minus",
	    					zIndex: 3
						};

ReneArtificiale.prototype.in_graph = true;

ReneArtificiale.prototype.in_2D_map = false;

ReneArtificiale.prototype.get3DModel = function() {
	//TO DO
	var rene_artif = new THREE.Object3D();


    //rotelle
    var g_rotella = new THREE.CylinderGeometry(0.03, 0.03, 0.01, 20);
    var m_rotella = new THREE.MeshLambertMaterial({color: 0x242424});

    var g_interno = new THREE.CylinderGeometry(0.02, 0.02, 0.04, 20);
    var m_interno = new THREE.MeshLambertMaterial({color: 0xC0C0C0});

    var g_raccordo = new THREE.CylinderGeometry(0.005, 0.005, 0.021, 20);

    var interni = [];
    var rotelle = [];

    for (var i = 0; i < 4; i++) {
    	interni[i] = new THREE.Mesh(g_interno, m_interno);
    	
    	for (var j = 0; j < 2; j++) {
    		rotelle[j] = new THREE.Mesh(g_rotella, m_rotella);
    		interni[i].add(rotelle[j]);

    		if(j % 2 == 0)
    			rotelle[j].position.y = 0.01499;
    		else
    			rotelle[j].position.y = -0.01499;
    	};

    	var raccordo = new THREE.Mesh(g_raccordo, m_interno);
    	
    	interni[i].rotation.z = -Math.PI/2;
    	interni[i].add(raccordo);

    	raccordo.rotation.z = Math.PI/2;
    	raccordo.position.x = -0.03;
    };

    interni[0].position.set(0.2, 0.03, -0.3);
    interni[1].position.set(-0.2, 0.03, -0.3);
    interni[2].position.set(-0.2, 0.03, 0.3);
    interni[3].position.set(0.2, 0.03, 0.3);



    //pedana base
    var g_pedana = new THREE.BoxGeometry(0.5, 0.02, 0.65);
    var m_pedana = new THREE.MeshLambertMaterial({color: 0x98AFC7});
    var pedana = new THREE.Mesh(g_pedana, m_pedana);

    pedana.position.y = 0.08;



    //corpo principale
    var g_corpo1 = new THREE.BoxGeometry(0.4, 0.9, 0.3);
    var m_corpo = new THREE.MeshLambertMaterial({color: 0xEEEEEE});
    var corpo1 = new THREE.Mesh(g_corpo1, m_corpo);

    corpo1.position.set(0, 0.54, 0.05);


    var points = [];
	
	points.push( new THREE.Vector2(0, 0));
	points.push( new THREE.Vector2(0, 0.3));
	points.push( new THREE.Vector2(0.25, 0.3));
	points.push( new THREE.Vector2(0.3, 0));

	var shape = new THREE.Shape(points);

	var extrusionSettings = {
		curveSegments: 3,
		amount: 0.4,
		bevelEnabled: false,
		material: 0, 
		extrudeMaterial: 1
	};
	
	var g_corpo2 = new THREE.ExtrudeGeometry(shape, extrusionSettings);
	
	var corpo2 = new THREE.Mesh(g_corpo2, m_corpo);
	corpo2.position.set(-0.2, 0.45, 0.15);

	corpo1.add(corpo2);
	corpo2.rotation.y = Math.PI/2;



	//strisce colorate
	var g_strisce_l = new THREE.PlaneGeometry(0.05, 1.2);
	var m_strisce = new THREE.MeshLambertMaterial({color: 0x98AFC7, side: THREE.DoubleSide});

	var strisce_l = [];

	for (var i = 0; i < 4; i++) {
		strisce_l[i] = new THREE.Mesh(g_strisce_l, m_strisce);

		if(i > 1)
			strisce_l[i].rotation.y = Math.PI/2;

		corpo1.add(strisce_l[i]);
	};

	strisce_l[0].position.set(-0.175, 0.15, 0.1501);
	strisce_l[1].position.set(0.175, 0.15, 0.1501);
	strisce_l[2].position.set(0.2001, 0.15, 0.125);
	strisce_l[3].position.set(-0.2001, 0.15, 0.125);


	var g_strisce_c = new THREE.PlaneGeometry(0.05, 0.9);

	var strisce_c = [];

	for (var i = 0; i < 4; i++) {
		strisce_c[i] = new THREE.Mesh(g_strisce_c, m_strisce);

		if(i > 1)
			strisce_c[i].rotation.y = Math.PI/2;

		corpo1.add(strisce_c[i]);
	};

	strisce_c[0].position.set(0.175, 0, -0.15001);
	strisce_c[1].position.set(-0.175, 0, -0.1501);
	strisce_c[2].position.set(0.2001, 0, -0.125);
	strisce_c[3].position.set(-0.2001, 0, -0.125);


	var g_striscia_or = new THREE.PlaneGeometry(0.05, 0.4);
	var striscia_or = new THREE.Mesh(g_striscia_or, m_strisce);
	
	corpo1.add(striscia_or);

	striscia_or.rotation.x = Math.PI/2;
	striscia_or.rotation.z = Math.PI/2;

	striscia_or.position.set(0, 0.7501, 0.125);



    //schermo
    var g_schermo = new THREE.PlaneGeometry(0.35, 0.2);
    var m_schermo = new THREE.MeshLambertMaterial({color: 0x555555, side: THREE.DoubleSide});
    var schermo = new THREE.Mesh(g_schermo, m_schermo);

    schermo.position.set(0, 0.6, -0.12501);
    schermo.rotation.x = 9.463 * Math.PI/180;
    corpo1.add(schermo);



    //particolari e dettagli

    //spine rossa e blu sul corpo
    var g_spina = new THREE.CylinderGeometry(0.013, 0.01, 0.03, 4);
    var m_spina_b = new THREE.MeshLambertMaterial({color: 0x0000ff});
    var m_spina_r = new THREE.MeshLambertMaterial({color: 0xff0000});

    var spina_b = new THREE.Mesh(g_spina, m_spina_b);
    var spina_r = new THREE.Mesh(g_spina, m_spina_r);

    corpo1.add(spina_b);
    corpo1.add(spina_r);

    spina_r.position.set(0.13, -0, -0.158);
    spina_r.rotation.x = Math.PI/3;
    spina_r.rotation.y = 45 * Math.PI/180;

    spina_b.position.set(0.1, -0, -0.158);
    spina_b.rotation.x = Math.PI/3;
    spina_b.rotation.y = 45 * Math.PI/180;


    //tasti vicino allo schermo
    var g_comandi = new THREE.PlaneGeometry(0.25, 0.03);
    var m_comandi = new THREE.MeshLambertMaterial({color: 0xDCE3FB, side: THREE.DoubleSide});
    var comandi = new THREE.Mesh(g_comandi, m_comandi);

    corpo1.add(comandi);
    comandi.position.set(0, 0.43, -0.1501); 

    var g_bottoni = new THREE.CylinderGeometry(0.005, 0.005, 0.005, 16);
    var m_bottoni = new THREE.MeshLambertMaterial({color: 0xffffff});
    
    var bottoni = [];


    for (var i = 0; i < 5; i++) {
    	bottoni[i] = new THREE.Mesh(g_bottoni, m_bottoni);
    	bottoni[i].rotation.x = Math.PI/2;
    	if(i % 2 == 0)
    		bottoni[i].position.x = i * 0.025;
    	else
    		bottoni[i].position.x = (i+1) * -0.025;
    	comandi.add(bottoni[i]);
    };


    //tasti bianchi a metà del corpo
    var g_tasti = new THREE.CylinderGeometry(0.02, 0.015, 0.02, 4);
    var m_tasti = new THREE.MeshLambertMaterial({color: 0xffffff});
    
    var tasti = [];


    for (var i = 0; i < 6; i++) {
    	tasti[i] = new THREE.Mesh(g_tasti, m_tasti);
    	tasti[i].position.set(0.13 - 0.03*i, 0.175, -0.15);
    	tasti[i].rotation.x = Math.PI/2;
    	tasti[i].rotation.y = 45 * Math.PI/180;
    	corpo1.add(tasti[i]);
    };


    //porta flebo laterale

    	
    	//sostegno basso
   	var m_portaflebo = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
    var g_base_sostegno = new THREE.BoxGeometry(0.05, 0.05, 0.07);
    var g_sostegno1 = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 16);
    var m_sostegno1 = new THREE.MeshLambertMaterial({color: 0xffffff});
    
    var base_sostegno = new THREE.Mesh(g_base_sostegno, m_sostegno1);
    var sostegno1 = new THREE.Mesh(g_sostegno1, m_sostegno1);

    corpo1.add(base_sostegno);
    base_sostegno.position.set(-0.225, 0.3, 0);

    base_sostegno.add(sostegno1);
    sostegno1.position.y = 0.03;

    	
    	//asta verticale - primo pezzo
    var g_asta1 = new THREE.CylinderGeometry(0.01, 0.01, 0.4, 16);
    var asta1 = new THREE.Mesh(g_asta1, m_portaflebo);

    sostegno1.add(asta1);
    asta1.position.y = 0.21;


    	//sostegno intermedio
    var g_sostegno2 = new THREE.TorusGeometry(0.02, 0.01, 16, 16);
    var m_sostegno2 = new THREE.MeshLambertMaterial({color: 0x777777});
    var sostegno2 = new THREE.Mesh(g_sostegno2, m_sostegno2);

    sostegno2.rotation.x = Math.PI/2;
    sostegno2.position.y = 0.05;

    asta1.add(sostegno2);

    	
    	//sostegno alto (regolatore)
    var g_sostegno3 = new THREE.CylinderGeometry(0.013, 0.013, 0.02, 16);
    var m_sostegno3 = new THREE.MeshLambertMaterial({color: 0x333333});
    var sostegno3 = new THREE.Mesh(g_sostegno3, m_sostegno3);

    asta1.add(sostegno3);
    sostegno3.position.y = 0.21;

    	
    	//asta verticale - secondo pezzo
    var g_asta2 = new THREE.CylinderGeometry(0.007, 0.007, 0.2, 16);
    var asta2 = new THREE.Mesh(g_asta2, m_portaflebo);

    sostegno3.add(asta2);
    asta2.position.y = 0.11;

    	
    	//regolatore ganci
    var g_sostegno4 = new THREE.CylinderGeometry(0.009, 0.009, 0.01, 16);
    var m_sostegno4 = new THREE.MeshLambertMaterial({color: 0xC5C5C5});
    var sostegno4 = new THREE.Mesh(g_sostegno4, m_sostegno4);

    asta2.add(sostegno4);
    sostegno4.position.y = 0.101;

    	
    	//ganci
    var g_segmento0 = new THREE.CylinderGeometry(0.002, 0.002, 0.08, 16);
	var g_segmenti = new THREE.CylinderGeometry(0.002, 0.002, 0.01, 16);
	var g_segmento7 = new THREE.CylinderGeometry(0.002, 0.002, 0.03, 16);
	var g_sfera = new THREE.SphereGeometry(0.002, 16, 16);   


    var ganci = [];

    for (var k = 0; k < 4; k++) {
    	ganci[k] = new THREE.Object3D();
    
	    var segmenti = [];
	    var sfere = [];
	    
	    //primo segmento
	    segmenti[0] = new THREE.Mesh(g_segmento0, m_portaflebo);

	    ganci[k].add(segmenti[0]);
	    segmenti[0].rotation.z = -Math.PI/2;
	    segmenti[0].position.x = 0.04;

	    sfere[0] = new THREE.Mesh(g_sfera, m_portaflebo);
	    segmenti[0].add(sfere[0]);
	    sfere[0].position.y = 0.04;


	    //segmenti dal secondo al settimo
	    for (var i = 1; i < 7; i++) {
	    	segmenti[i] = new THREE.Mesh(g_segmenti, m_portaflebo);

		    sfere[i-1].add(segmenti[i]);
		    segmenti[i].rotation.z = -Math.PI/6;
		    segmenti[i].position.x = 0.0025;
	    	segmenti[i].position.y = 0.00433;

		    sfere[i] = new THREE.Mesh(g_sfera, m_portaflebo);
		    segmenti[i].add(sfere[i]);
		    sfere[i].position.y = 0.005;
	    };


	    //ultimo segmento
	    segmenti[7] = new THREE.Mesh(g_segmento7, m_portaflebo);

	    sfere[6].add(segmenti[7]);
	    segmenti[7].rotation.z = -Math.PI/4;
	    segmenti[7].position.x = 0.0106;
	    segmenti[7].position.y = 0.0106;

	    sfere[7] = new THREE.Mesh(g_sfera, m_portaflebo);
	    segmenti[7].add(sfere[7]);
	    sfere[7].position.y = 0.015;


	    sostegno4.add(ganci[k]);
	    ganci[k].rotation.y = k * Math.PI/2;
	};




    for (var i = 0; i < 4; i++) {
    	rene_artif.add(interni[i]);
    };
    rene_artif.add(pedana);
    rene_artif.add(corpo1);

	rene_artif.feature = this;
	rene_artif.name = this.id;
	var model = Feature.packageModel(rene_artif);

	return model;
};

module.exports = ReneArtificiale;