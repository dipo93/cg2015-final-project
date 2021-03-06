var Feature = require('./Feature.js');

Feature.inherits(Reception, Feature);

function Reception(feature) {
	Feature.call(this, feature);
}

Reception.prototype.style = {
                            weight: 0,
                            fillColor: "#F2C495",
                            fillOpacity: 1,
                            zIndex: 3
                        };

Reception.prototype.in_graph = true;

Reception.prototype.in_2D_map = true;

Reception.prototype.get3DModel = function() {
    //TO DO
    var reception = new THREE.Object3D();

    var receptionX = this.geometry.coordinates[0][1][0];
    var receptionY = this.geometry.coordinates[0][2][1];
    var receptionZ = this.properties.height;


    var m_reception = new THREE.MeshLambertMaterial({color: 0xf2c495});


    //lato frontale
    var fronte = new THREE.Object3D();
    var g_frontale1 = new THREE.BoxGeometry(3, 0.1, 0.1);
    var g_frontale2 = new THREE.BoxGeometry(3, 0.01, 0.09);
    var fronte1 = [];
    var fronte2 = [];

    fronte1[0] = new THREE.Mesh(g_frontale1, m_reception);
    fronte1[0].position.y = 0.05;
    fronte.add(fronte1[0]);

    for (var i = 0; i < 10; i++) {
        fronte2[i] = new THREE.Mesh(g_frontale2, m_reception);
        fronte2[i].position.y = 0.055;
        fronte1[i].add(fronte2[i]);

        fronte1[i+1] = new THREE.Mesh(g_frontale1, m_reception);
        fronte1[i+1].position.y = 0.055;
        fronte2[i].add(fronte1[i+1]);
    };

    reception.add(fronte);
    

    //lati curva
    var shape1 = new THREE.Shape();
    shape1.moveTo(0, 0);
    shape1.quadraticCurveTo(0.3, -0.0, 0.3, -0.3);
    shape1.lineTo(0.2, -0.3);
    shape1.quadraticCurveTo(0.2, -0.1, 0, -0.1);

    var shape2 = new THREE.Shape();
    shape2.moveTo(0, 0);
    shape2.quadraticCurveTo(-0.3, -0.0, -0.3, -0.3);
    shape2.lineTo(-0.2, -0.3);
    shape2.quadraticCurveTo(-0.2, -0.1, 0, -0.1);


    var extrudeSettings = { 
        amount: 1.2, 
        curveSegments: 50,
        bevelEnabled: false, 
        bevelSegments: 2, 
        steps: 100, 
        bevelSize: 1, 
        bevelThickness: 1 
    };

    var g_shape1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings);
    var curva1 = new THREE.Mesh(g_shape1, m_reception);

    var g_shape2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings);
    var curva2 = new THREE.Mesh(g_shape2, m_reception);

    curva1.position.set(1.5, 1.2, 0.05);
    curva1.rotation.x = Math.PI/2;

    curva2.position.set(-1.5, 1.2, 0.05);
    curva2.rotation.x = Math.PI/2;

    fronte.add(curva1);
    fronte.add(curva2);


    //lati laterali
    var g_laterale = new THREE.BoxGeometry(0.1, 1.2, 0.4);

    var lati = [];

    for (var i = 0; i < 2; i++) {
        lati[i] = new THREE.Mesh(g_laterale, m_reception);
        lati[i].rotation.x = -Math.PI/2;
        if (i == 0){
            curva1.add(lati[i]);
            lati[i].position.set(0.25, -0.5, 0.6);
        }
        else{
            curva2.add(lati[i]);
            lati[i].position.set(-0.25, -0.5, 0.6);
        }
    };



    //piano superiore
    var m_piano = new THREE.MeshLambertMaterial({
        color: 0x57FEFF,
        transparent: true,
        opacity: 0.5
    });

    var g_piano = new THREE.BoxGeometry(3, 0.01, 0.3);
    var piano = new THREE.Mesh(g_piano, m_piano);
    piano.position.y = 1.205;
    fronte.add(piano);


    //piani di curva
    var shape3 = new THREE.Shape();
    shape3.moveTo(0, 0);
    shape3.quadraticCurveTo(0.4, -0.0, 0.4, -0.4);
    shape3.lineTo(0.1, -0.4);
    shape3.quadraticCurveTo(0.1, -0.3, 0, -0.3);

    var shape4 = new THREE.Shape();
    shape4.moveTo(0, 0);
    shape4.quadraticCurveTo(-0.4, -0.0, -0.4, -0.4);
    shape4.lineTo(-0.1, -0.4);
    shape4.quadraticCurveTo(-0.1, -0.3, 0, -0.3);


    var extrudeSettings = { 
        amount: 0.01, 
        curveSegments: 50,
        bevelEnabled: false, 
        bevelSegments: 2, 
        steps: 100, 
        bevelSize: 1, 
        bevelThickness: 1 
    };

    var g_shape3 = new THREE.ExtrudeGeometry(shape3, extrudeSettings);
    var curva3 = new THREE.Mesh(g_shape3, m_piano);

    var g_shape4 = new THREE.ExtrudeGeometry(shape4, extrudeSettings);
    var curva4 = new THREE.Mesh(g_shape4, m_piano);

    curva3.position.set(1.5, 0.005, 0.15);
    curva3.rotation.x = Math.PI/2;

    curva4.position.set(-1.5, 0.005, 0.15);
    curva4.rotation.x = Math.PI/2;

    piano.add(curva3);
    piano.add(curva4);


    //piani laterali
    var g_piano_l = new THREE.BoxGeometry(0.3, 0.01, 0.45);

    var piani_l = [];

    for (var i = 0; i < 2; i++) {
        piani_l[i] = new THREE.Mesh(g_piano_l, m_piano);
        piani_l[i].rotation.x = -Math.PI/2;
        if (i == 0){
            curva3.add(piani_l[i]);
            piani_l[i].position.set(0.25, -0.625, 0.005);
        }
        else{
            curva4.add(piani_l[i]);
            piani_l[i].position.set(-0.25, -0.625, 0.005);
        }
    };


    //viti che bloccano il piano sul bancone
    var m_vite = new THREE.MeshLambertMaterial({color: 0xC0C0C0, side: THREE.DoubleSide});
    var g_vite1 = new THREE.CylinderGeometry(0.01, 0.01, 0.01, 16);
    var g_vite2 = new THREE.SphereGeometry(0.015, 16, 16, 0, Math.PI*2, 0, Math.PI/2);

    var vite1 = [];
    var vite2 = [];

    for (var i = 0; i < 10; i++) {
        vite1[i] = new THREE.Mesh(g_vite1, m_vite);
        vite2[i] = new THREE.Mesh(g_vite2, m_vite);
        vite1[i].add(vite2[i]);
        vite2[i].position.y = 0.005;
        vite2[i].scale.y = 0.5;
        piano.add(vite1[i]);

        switch (i){
            case 0: 
            case 1:
                vite1[i].position.x = Math.pow(-1, i) * 1.45;
                break;
            case 2:
            case 3:
                vite1[i].position.x = Math.pow(-1, i) * 1.55;
                break;
            case 4:
            case 5:
                vite1[i].position.x = Math.pow(-1, i) * 1.75;
                vite1[i].position.z = -0.2;
                break;
            case 6:
            case 7:
                vite1[i].position.x = Math.pow(-1, i) * 1.75;
                vite1[i].position.z = -0.3;
                break;
            case 8:
            case 9:
                vite1[i].position.x = Math.pow(-1, i) * 1.75;
                vite1[i].position.z = -0.6;
                break;
        }
    };



    //scrivania
    var g_scrivania = new THREE.BoxGeometry(3.4, 0.05, 0.8);
    var scrivania = new THREE.Mesh(g_scrivania, m_reception);
    scrivania.position.set(0, 0.8, -0.45);
    fronte.add(scrivania);



    //cassettone sotto la scrivania
    var g_cassettone = new THREE.BoxGeometry(0.5, 0.775, 0.5);
    var m_cassettone = new THREE.MeshLambertMaterial({color: 0xf6d485});
    var cassettone = new THREE.Mesh(g_cassettone, m_cassettone);
    cassettone.position.set(1.45, 0.3875, -0.6);
    fronte.add(cassettone);


    //sportello del cassettone
    var g_sportello = new THREE.BoxGeometry(0.475, 0.75, 0.01);
    var m_sportello = new THREE.MeshLambertMaterial({color: 0xFEDC8D});
    var sportello = new THREE.Mesh(g_sportello, m_sportello);
    sportello.position.set(0, 0, -0.255);
    cassettone.add(sportello);


    //maniglia dello sportello
    var g_lungo = new THREE.CylinderGeometry(0.01, 0.01, 0.15, 16);
    var g_corto = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 16);
    var g_sfere =new THREE.SphereGeometry(0.01, 16);

    var manico = new THREE.Mesh(g_lungo, m_vite);
    manico.rotation.z = Math.PI/2;
    manico.position.set(0, 0.3, -0.04);
    sportello.add(manico);

    var sfere = [];
    var corti = [];

    for (var i = 0; i < 2; i++) {
        sfere[i] = new THREE.Mesh(g_sfere, m_vite);
        corti[i] = new THREE.Mesh(g_corto, m_vite);

        sfere[i].position.y = Math.pow(-1, i) * 0.075;
        corti[i].position.set(0, Math.pow(-1, i) * 0.075, 0.025);
        corti[i].rotation.x = Math.PI/2;
        manico.add(sfere[i]);
        manico.add(corti[i]);
    };


    //registro
    var g_copertina = new THREE.BoxGeometry(0.27, 0.01, 0.43);
    var m_copertina = new THREE.MeshLambertMaterial({color: 0x03AB0F});
    var g_pagine = new THREE.BoxGeometry(0.25, 0.03, 0.4);
    var m_pagine = new THREE.MeshLambertMaterial({color: 0xEEEEEE});

    var pagine = new THREE.Mesh(g_pagine, m_pagine);
    pagine.rotation.z = 2 * Math.PI/180;
    pagine.position.set(0.5, 0.058, 0);
    scrivania.add(pagine);

    var copertina = [];

    for (var i = 0; i < 5; i++) {
        copertina[i] = new THREE.Mesh(g_copertina, m_copertina);
        copertina[i].position.y = Math.pow(-1, i) * 0.02;
        pagine.add(copertina[i]);
    };

    var g_anelli = new THREE.TorusGeometry(0.035, 0.0025, 20, 50);

    var anelli = [];

    for (var i = 0; i < 8; i++) {
        anelli[i] = new THREE.Mesh(g_anelli, m_vite);
        anelli[i].position.set(0.151, 0, -0.175 + (0.05 * i));  
        pagine.add(anelli[i]);
    };



    //base del pc
    var shape_base = new THREE.Shape();

    //andata
    shape_base.moveTo(0, 0);
    shape_base.lineTo(-0.18, 0);
    shape_base.quadraticCurveTo(-0.2, 0.002, -0.19, 0.02);
    shape_base.lineTo(-0.09, 0.21);
    shape_base.quadraticCurveTo(-0.085, 0.22, -0.075, 0.22);
    //ritorno
    shape_base.lineTo(-0.07, 0.215);
    shape_base.quadraticCurveTo(-0.085, 0.215, -0.09, 0.205);
    shape_base.lineTo(-0.185, 0.02);
    shape_base.quadraticCurveTo(-0.1945, 0.0045, -0.18, 0.005);
    shape_base.lineTo(0, 0.002);

    var extrudeSettings_base = { 
        amount: 0.15, 
        curveSegments: 20,
        bevelEnabled: false
    };

    var m_computer = new THREE.MeshLambertMaterial({color: 0xc9c9c9});
    var g_base_pc = new THREE.ExtrudeGeometry(shape_base, extrudeSettings_base);
    var base_pc = new THREE.Mesh(g_base_pc, m_computer);


    //computer
    var shape_pc = new THREE.Shape();
    shape_pc.moveTo(0.01, 0);
    shape_pc.lineTo(0.64, 0);
    shape_pc.quadraticCurveTo(0.65, 0, 0.65, 0.01);
    shape_pc.lineTo(0.65, 0.42);
    shape_pc.quadraticCurveTo(0.65, 0.43, 0.64, 0.43);
    shape_pc.lineTo(0.01, 0.43);
    shape_pc.quadraticCurveTo(0, 0.43, 0, 0.42);
    shape_pc.lineTo(0, 0.01);
    shape_pc.quadraticCurveTo(0, 0, 0.01, 0);

    var extrudeSettings_pc = { 
        amount: 0.03, 
        curveSegments: 20,
        bevelEnabled: false
    };

    var g_computer = new THREE.ExtrudeGeometry(shape_pc, extrudeSettings_pc);
    var computer = new THREE.Mesh(g_computer, m_computer);

    //schermo del pc
    var shape_schermo = new THREE.Shape();
    shape_schermo.moveTo(0, 0.07);
    shape_schermo.lineTo(0.65, 0.07);
    shape_schermo.lineTo(0.65, 0.42);
    shape_schermo.quadraticCurveTo(0.65, 0.43, 0.64, 0.43);
    shape_schermo.lineTo(0.01, 0.43);
    shape_schermo.quadraticCurveTo(0, 0.43, 0, 0.42);
    shape_schermo.lineTo(0, 0.07);

    var extrudeSettings_schermo = { 
        amount: 0.0001, 
        curveSegments: 20,
        bevelEnabled: false
    };

    var m_schermo = new THREE.MeshLambertMaterial({color: 0x333333});
    var g_schermo = new THREE.ExtrudeGeometry(shape_schermo, extrudeSettings_schermo);
    var schermo = new THREE.Mesh(g_schermo, m_schermo);

    schermo.position.z = -0.0001;
    computer.add(schermo);

    base_pc.position.set(-1, 0.025, -0.1);
    base_pc.rotation.y = Math.PI/3;
    scrivania.add(base_pc);

    var obj = new THREE.Object3D();

    computer.position.set(-0.25, 0.07, 0.02);
    computer.rotation.x = 10 * Math.PI/180;
    obj.rotation.y = -Math.PI/2;
    base_pc.add(obj);
    obj.add(computer);


    //portapenne
    var g_base_pp = new THREE.CircleGeometry(0.045, 27);
    var g_interno = new THREE.CylinderGeometry(0.035, 0.035, 0.11, 27, 3, true);
    var g_esterno = new THREE.CylinderGeometry(0.045, 0.045, 0.11, 27, 3, true);
    var g_anello = new THREE.RingGeometry(0.035, 0.045, 27);
    var g_penna =  new THREE.CylinderGeometry(0.005, 0.005, 0.16, 16);

    var m_portapenne = [];
    m_portapenne[0] = new THREE.MeshLambertMaterial({
        color: 0x1569C7,
        side:THREE.DoubleSide
    });
    m_portapenne[1] = new THREE.MeshLambertMaterial({
        color: 0xF75D59,
        side:THREE.DoubleSide
    });

    var m_penna = [];
    m_penna[0] = new THREE.MeshLambertMaterial({color: 0x555555});
    m_penna[1] = new THREE.MeshLambertMaterial({color: 0x5CB3FF});
    m_penna[2] = new THREE.MeshLambertMaterial({color: 0xE41B17});

    for (var i = 0; i < 2; i++) {
        var portapenne = new THREE.Object3D();
        var base_pp = new THREE.Mesh(g_base_pp, m_portapenne[i]);
        var interno = new THREE.Mesh(g_interno, m_portapenne[i]);
        var esterno = new THREE.Mesh(g_esterno, m_portapenne[i]);
        var anello = new THREE.Mesh(g_anello, m_portapenne[i]);

        base_pp.rotation.x = -Math.PI/2;
        interno.rotation.x = Math.PI/2;
        esterno.rotation.x = Math.PI/2;

        interno.position.z = 0.055;
        esterno.position.z = 0.055;
        anello.position.z = 0.11;

        scrivania.add(portapenne);
        portapenne.add(base_pp);
        base_pp.add(interno);
        base_pp.add(esterno);
        base_pp.add(anello);

        for (var j = 0; j < 5; j++) {
            var penna = new THREE.Mesh(g_penna, m_penna[Math.floor(Math.random()*3)]);
            penna.rotation.set(Math.PI/2, Math.PI/2.5 * j, Math.PI/7);
            penna.position.z = 0.075;
            base_pp.add(penna);
        };

        portapenne.position.set(1 * i + (1-i) * -0.4, 0.0251, 0.25);
    };


    //fogli di carta sul tavolo
    var g_foglio = new THREE.PlaneGeometry(0.21, 0.3);
    var m_foglio = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

    for (var i = 0; i < 2; i++) {
        var foglio = new THREE.Mesh(g_foglio, m_foglio);
        foglio.rotation.set(-Math.PI/2, 0, Math.PI/4 * i);
        foglio.position.set(1.3 + 0.1*i, 0.0251, -0.05*i);
        scrivania.add(foglio);
    };


    //post-it attaccati
    var g_postit = new THREE.PlaneGeometry(0.08, 0.08);
    var m_postit = new THREE.MeshLambertMaterial({
        color: 0xFFE87C, 
        side:THREE.DoubleSide});

    var postit = [];
    postit[0] = new THREE.Mesh(g_postit, m_postit);
    postit[0].position.set(0, 0.3, 0.399);
    scrivania.add(postit[0]);

    for (var i = 1; i < 6; i++) {
        postit[i] = new THREE.Mesh(g_postit, m_postit);

        //distanza tra i foglietti
        var dist = (Math.random().toPrecision(2) * 0.1) + 0.1;
        postit[i].position.set(postit[i-1].position.x + dist, 0.3, 0.399);
        scrivania.add(postit[i]);
    };



    //cestino
    var cestino = new THREE.Object3D();

    var g_fondo = new THREE.CircleGeometry(0.15, 40);
    var m_fondo = new THREE.MeshLambertMaterial({color: 0x333333, side: THREE.DoubleSide});
    var g_corpo = new THREE.CylinderGeometry(0.2, 0.15, 0.4, 40, 1, true);

    var fondo = new THREE.Mesh(g_fondo, m_fondo);
    var corpo = new THREE.Mesh(g_corpo, m_fondo);

    fondo.rotation.x = Math.PI/2;
    corpo.rotation.x = -Math.PI/2;
    fondo.position.set(-1.3, 0.001, -0.4);
    corpo.position.z = -0.2;

    cestino.add(fondo);
    fondo.add(corpo);

    reception.add(fondo);


    //corona superiore
    var g_corona = new THREE.TorusGeometry(0.2, 0.01, 10,40);
    var m_corona = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
    var corona = new THREE.Mesh(g_corona, m_corona);

    corona.rotation.x = Math.PI/2;
    corona.position.y = 0.2;
    corpo.add(corona);


	reception.feature = this;
	reception.name = this.id;
	var model = Feature.packageModel(reception);

	return model;
};

module.exports = Reception;