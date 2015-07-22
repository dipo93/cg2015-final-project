var Feature = require('./Feature.js');

Feature.inherits(Letto, Feature);

function Letto(feature) {
	Feature.call(this, feature);
}

Letto.prototype.style = {
			    		weight: 0,
                              fillColor: "#FFFFFF",
                              fillOpacity: 1,
                              zIndex: 3
				};

Letto.prototype.in_graph = true;

Letto.prototype.in_2D_map = true;

Letto.prototype.get3DModel = function() {
	var letto = new THREE.Object3D();

      var lettoX = this.geometry.coordinates[0][1][0];
      var lettoY = this.geometry.coordinates[0][2][1];
      var lettoZ = this.properties.height;


      letto.scale.set(0.08,0.08,0.08);
      var materasso = creaMaterasso()
      materasso.position.y = 2 + 8;

      letto.add( materasso);

      var bedBase_geometry = new THREE.BoxGeometry( 32 , 1 , 16 )
      var bedBase_material = new THREE.MeshLambertMaterial({color : 0x2BC066});
      var bedBase = new THREE.Mesh(bedBase_geometry, bedBase_material);
      bedBase.position.y = 0.5 + 7

      letto.add( bedBase );

      var cuscino = creaCuscino();
      cuscino.position.y = 1 + 4 +8;
      cuscino.position.x = 11.5; 

      letto.add( cuscino);

      var bedWall_geometry = new THREE.BoxGeometry( 0.5,7, 13 );
      var bedWall_geometry1 = new THREE.BoxGeometry( 0.5,2, 15 );
      var bedHeadWall_geometry = new THREE.BoxGeometry( 0.5,2, 7 );
      var bedWall_material= new THREE.MeshLambertMaterial({ color : 0x42C7AD});
      var bedWallForward = new THREE.Mesh(bedWall_geometry, bedWall_material);
      var bedWallBackward = new THREE.Mesh(bedWall_geometry,bedWall_material);
      var bedWallBackward1 = new THREE.Mesh(bedWall_geometry1,bedWall_material);
      var bedHeadWall = new THREE.Mesh(bedHeadWall_geometry, bedWall_material);
      bedWallBackward.position.x = -15.5;
      bedWallBackward.position.y = 8+ 7/2;
      bedWallBackward1.position.x = -15.5;
      bedWallBackward1.position.y = 8+ 7/2;
      bedWallForward.position.x = 15.5;
      bedWallForward.position.y = 8 + 7/2;


      letto.add( bedWallForward );
      letto.add( bedWallBackward );
      letto.add( bedWallBackward1 );

      var o5 = new THREE.Object3D();

      letto.add( o5 );
      o5.position.y = 8;
      bedHeadWall.position.x = 15.5;
      bedHeadWall.position.y = 7.5;
      o5.add(bedHeadWall);

      var bedWallTube_geometry = new THREE.CylinderGeometry( 0.3 , 0.3 , 8 , 16 );
      var bedWallTube1 = new THREE.Mesh( bedWallTube_geometry, bedWall_material);
      var bedWallTube2 = new THREE.Mesh( bedWallTube_geometry, bedWall_material);
      var bedWallTube3 = new THREE.Mesh( bedWallTube_geometry, bedWall_material);
      var bedWallTube4 = new THREE.Mesh( bedWallTube_geometry, bedWall_material);

      bedWallTube1.position.set( 15.5 , 4 , 7.5 );
      bedWallTube2.position.set( 15.5 , 4 , -7.5 );
      bedWallTube3.position.set( -15.5 , 4 , 7.5 );
      bedWallTube4.position.set( -15.5 , 4 , -7.5 );
      o5.add(bedWallTube1);
      o5.add(bedWallTube2);
      o5.add(bedWallTube3);
      o5.add(bedWallTube4);

      var bedWallUpperTube_geometry = new THREE.CylinderGeometry( 0.3 , 0.3 , 14 , 16 );
      var bedWallUpperTube1 = new THREE.Mesh( bedWallUpperTube_geometry , bedWall_material);
      var bedWallUpperTube2 = new THREE.Mesh( bedWallUpperTube_geometry , bedWall_material);

      bedWallUpperTube1.rotation.x = Math.PI/2;
      bedWallUpperTube1.position.y = 8.5;
      bedWallUpperTube1.position.x = 15.5;

      bedWallUpperTube2.rotation.x = Math.PI/2;
      bedWallUpperTube2.position.y = 8.5;
      bedWallUpperTube2.position.x = -15.5;

      var bedWallUpperSphere1_geometry = new THREE.SphereGeometry( 0.55 , 32 ,32 );
      var bedWallUpperSphere1 = new THREE.Mesh(bedWallUpperSphere1_geometry , bedWall_material);
      var bedWallUpperSphere2 = new THREE.Mesh(bedWallUpperSphere1_geometry , bedWall_material);
      var bedWallUpperSphere3 = new THREE.Mesh(bedWallUpperSphere1_geometry , bedWall_material);
      var bedWallUpperSphere4 = new THREE.Mesh(bedWallUpperSphere1_geometry , bedWall_material);
      bedWallUpperSphere1.position.set( 15.5 , 8.5 , 7.5)
      bedWallUpperSphere2.position.set( 15.5 , 8.5 , -7.5)
      bedWallUpperSphere3.position.set( -15.5 , 8.5 , 7.5)
      bedWallUpperSphere4.position.set( -15.5 , 8.5 , -7.5)

      o5.add(bedWallUpperSphere1);
      o5.add(bedWallUpperSphere2);
      o5.add(bedWallUpperSphere3);
      o5.add(bedWallUpperSphere4);

      o5.add( bedWallUpperTube1);
      o5.add( bedWallUpperTube2);


      var bedCylinder_geometry = new THREE.CylinderGeometry( 4, 4, 4, 16 );
      var bedCylinder_material = new THREE.MeshBasicMaterial( {color: 0x4E91B3, antialias : true} );
      var bedCylinder = new THREE.Mesh( bedCylinder_geometry, bedCylinder_material );
      bedCylinder.position.y = 2 + 4;

      letto.add( bedCylinder );

      var bedLowerBase_geometry = new THREE.BoxGeometry( 26 , 2 , 1 );
      var bedLowerBase_material = new THREE.MeshLambertMaterial( {color : 0x597C8D , antialias : true} );
      var bedLowerBaseLeft = new THREE.Mesh(bedLowerBase_geometry, bedLowerBase_material);
      var bedLowerBaseRight = new THREE.Mesh(bedLowerBase_geometry, bedLowerBase_material);

      bedLowerBaseLeft.position.y = 1 + 2;
      bedLowerBaseRight.position.y = 1 + 2;
      bedLowerBaseLeft.position.z = -5;
      bedLowerBaseRight.position.z = 5;

      letto.add( bedLowerBaseLeft );
      letto.add( bedLowerBaseRight );

      var bedLowCylinderBase_geometry = new THREE.BoxGeometry( 12 , 1 , 10 );
      var bedLowCylinderBase = new THREE.Mesh( bedLowCylinderBase_geometry, bedLowerBase_material );

      bedLowCylinderBase.position.y = 4;

      letto.add(bedLowCylinderBase);

      var o1 = new THREE.Object3D();
      o1.position.x = 12.5;
      o1.position.y = 1;
      letto.add(o1);

      var wheel_geometry = new THREE.TorusGeometry( 1, 0.5, 32, 100 );
      var wheel_material = new THREE.MeshBasicMaterial( { color: 0x00000 , antialias : true } );
      var wheel1 = new THREE.Mesh( wheel_geometry, wheel_material );

      var wheelCenter_geometry = new THREE.CylinderGeometry( 0.7 , 0.4 , 2 , 16);
      var wheelCenter1 = new THREE.Mesh( wheelCenter_geometry , bedLowerBase_material );

      var wheelJoint_geometry = new THREE.SphereGeometry( 0.6 , 32 , 32 );
      var wheelJoint1 = new THREE.Mesh(wheelJoint_geometry , bedLowerBase_material );

      var wheelBedConnector_geometry = new THREE.CylinderGeometry( 0.4 , 0.4 , 2 , 16);
      var wheelBedConnector = new THREE.Mesh( wheelBedConnector_geometry , bedLowerBase_material);


      wheelBedConnector.position.y = 1;
      wheelBedConnector.position.z = -1.6;
      wheel1.add(wheelBedConnector);
      wheelJoint1.position.z = -1.5;
      wheelCenter1.rotation.x = Math.PI /2;
      wheelCenter1.position.z = -0.5;
      wheel1.position.z = 6.7;
      wheel1.position.y = 0.4;
      o1.add( wheel1 );
      wheel1.add(wheelCenter1);
      wheel1.add(wheelJoint1);


      var o2 = new THREE.Object3D();
      var wheel2 = new THREE.Mesh( wheel_geometry, wheel_material );
      var wheelCenter2 = new THREE.Mesh( wheelCenter_geometry , bedLowerBase_material );
      var wheelJoint2 = new THREE.Mesh(wheelJoint_geometry , bedLowerBase_material );
      var wheelBedConnector2 = new THREE.Mesh( wheelBedConnector_geometry , bedLowerBase_material);

      o2.rotation.y = Math.PI;
      wheelBedConnector2.position.y = 1;
      wheelBedConnector2.position.z = -1.6;
      wheel2.add(wheelBedConnector2);
      wheelJoint2.position.z = -1.5;
      wheelCenter2.rotation.x = Math.PI /2;
      wheelCenter2.position.z = -0.5;
      wheel2.position.z = 6.7;
      wheel2.position.y = 0.4;
      o2.add( wheel2 );
      wheel2.add(wheelCenter2);
      wheel2.add(wheelJoint2);
      o1.add(o2);

      var o3 = new THREE.Object3D();
      var wheel3 = new THREE.Mesh( wheel_geometry, wheel_material );
      var wheelCenter3 = new THREE.Mesh( wheelCenter_geometry , bedLowerBase_material );
      var wheelJoint3 = new THREE.Mesh(wheelJoint_geometry , bedLowerBase_material );
      var wheelBedConnector3 = new THREE.Mesh( wheelBedConnector_geometry , bedLowerBase_material);

      o3.rotation.y = Math.PI;
      // var axisHelper1 = new THREE.AxisHelper( 10 );
      // o3.add(axisHelper1);
      o3.position.x = -12.5;
      o3.position.y = 1;
      letto.add(o3);


      wheelBedConnector3.position.y = 1;
      wheelBedConnector3.position.z = -1.6;
      wheel3.add(wheelBedConnector);
      wheelJoint3.position.z = -1.5;
      wheelCenter3.rotation.x = Math.PI /2;
      wheelCenter3.position.z = -0.5;
      wheel3.position.z = 6.7;
      wheel3.position.y = 0.4;
      o3.add( wheel3 );
      wheel3.add(wheelCenter3);
      wheel3.add(wheelJoint3);


      var o4 = new THREE.Object3D();
      var wheel4 = new THREE.Mesh( wheel_geometry, wheel_material );
      var wheelCenter4 = new THREE.Mesh( wheelCenter_geometry , bedLowerBase_material );
      var wheelJoint4 = new THREE.Mesh(wheelJoint_geometry , bedLowerBase_material );
      var wheelBedConnector4 = new THREE.Mesh( wheelBedConnector_geometry , bedLowerBase_material);

      o4.rotation.y = Math.PI;
      wheelBedConnector4.position.y = 1;
      wheelBedConnector4.position.z = -1.6;
      wheel4.add(wheelBedConnector4);
      wheelJoint4.position.z = -1.5;
      wheelCenter4.rotation.x = Math.PI /2;
      wheelCenter4.position.z = -0.5;
      wheel4.position.z = 6.7;
      wheel4.position.y = 0.4;
      o4.add( wheel4 );
      wheel4.add(wheelCenter4);
      wheel4.add(wheelJoint4);
      o3.add(o4);

      function creaCuscino(){
      var cuscino = new THREE.Object3D();
      var geometriaBordoCorto = new THREE.CylinderGeometry( 1 , 1 , 4 , 16 );
      var geometriaBordoLungo = new THREE.CylinderGeometry( 1 , 1 , 12 , 16 );
      var geometriaAngolo = new THREE.SphereGeometry( 1 , 32 , 32 );
      var pillow_geometry = new THREE.BoxGeometry( 4 , 2  , 12 );
      var pillow_material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
      var pillow = new THREE.Mesh(pillow_geometry,pillow_material);
      var bordoCorto1 = new THREE.Mesh(geometriaBordoCorto, pillow_material);
      var bordoCorto2 = new THREE.Mesh(geometriaBordoCorto, pillow_material);
      var bordoLungo1 = new THREE.Mesh(geometriaBordoLungo, pillow_material);
      var bordoLungo2 = new THREE.Mesh(geometriaBordoLungo, pillow_material);
      var angolo1 = new THREE.Mesh(geometriaAngolo, pillow_material);
      var angolo2 = new THREE.Mesh(geometriaAngolo, pillow_material);
      var angolo3 = new THREE.Mesh(geometriaAngolo, pillow_material);
      var angolo4 = new THREE.Mesh(geometriaAngolo, pillow_material);
      bordoLungo1.rotation.x = Math.PI/2;
      bordoLungo1.position.x = 2;
      bordoLungo2.rotation.x = Math.PI/2;
      bordoLungo2.position.x =-2;
      bordoCorto1.rotation.z = Math.PI/2;
      bordoCorto1.position.z = 6;
      bordoCorto2.rotation.z = Math.PI/2;
      bordoCorto2.position.z =-6;
      angolo1.position.y = 6;
      angolo3.position.y = 6;
      angolo2.position.y =-6;
      angolo4.position.y =-6;
      bordoLungo1.add(angolo1);
      bordoLungo1.add(angolo2);
      bordoLungo2.add(angolo3);
      bordoLungo2.add(angolo4);
      pillow.add(bordoLungo1);
      pillow.add(bordoLungo2);
      pillow.add(bordoCorto2);
      pillow.add(bordoCorto1);
      cuscino.add(pillow)
      return cuscino;
    } 
    function  creaMaterasso(){
      var bed_geometry = new THREE.BoxGeometry( 30 , 4  , 15 );
      var materasso = new THREE.Object3D();
      var geometriaBordoCorto = new THREE.CylinderGeometry( 2 , 2 , 12 , 16 );
      var geometriaBordoLungo = new THREE.CylinderGeometry( 2 , 2 , 27 , 16 );
      var geometriaAngolo = new THREE.SphereGeometry( 2 , 32 , 32 );
      var pillow_geometry = new THREE.BoxGeometry( 12 , 4  , 27 );
      var pillow_material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
      var pillow = new THREE.Mesh(pillow_geometry,pillow_material);
      var bordoCorto1 = new THREE.Mesh(geometriaBordoCorto, pillow_material);
      var bordoCorto2 = new THREE.Mesh(geometriaBordoCorto, pillow_material);
      var bordoLungo1 = new THREE.Mesh(geometriaBordoLungo, pillow_material);
      var bordoLungo2 = new THREE.Mesh(geometriaBordoLungo, pillow_material);
      var angolo1 = new THREE.Mesh(geometriaAngolo, pillow_material);
      var angolo2 = new THREE.Mesh(geometriaAngolo, pillow_material);
      var angolo3 = new THREE.Mesh(geometriaAngolo, pillow_material);
      var angolo4 = new THREE.Mesh(geometriaAngolo, pillow_material);
      bordoLungo1.rotation.x = Math.PI/2;
      bordoLungo1.position.x = 6;
      bordoLungo2.rotation.x = Math.PI/2;
      bordoLungo2.position.x =-6;
      bordoCorto1.rotation.z = Math.PI/2;
      bordoCorto1.position.z = 13.5;
      bordoCorto2.rotation.z = Math.PI/2;
      bordoCorto2.position.z =-13.5;
      angolo1.position.y = 13.5;
      angolo3.position.y = 13.5;
      angolo2.position.y =-13.5;
      angolo4.position.y =-13.5;
      bordoLungo1.add(angolo1);
      bordoLungo1.add(angolo2);
      bordoLungo2.add(angolo3);
      bordoLungo2.add(angolo4);
      pillow.add(bordoLungo1);
      pillow.add(bordoLungo2);
      pillow.add(bordoCorto2);
      pillow.add(bordoCorto1);
      materasso.add(pillow)
      materasso.rotation.y = Math.PI/2;
      return materasso
    }

    letto.name = this.id;
	letto.feature = this;
	var model = Feature.packageModel(letto);
	return model;
};

module.exports = Letto;