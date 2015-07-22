        // once everything is loaded, we run our Three.js stuff.
        $(function () {
            var stats = initStats();

            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer();
            var trackballControls = new THREE.TrackballControls(camera);

            renderer.setClearColor(new THREE.Color(0xEEEEEE,1.0));
            renderer.setSize(window.innerWidth,window.innerHeight);
            renderer.shadowMapEnabled = true;

            camera.position.set(5, 3, 2);
            camera.up = new THREE.Vector3(0,0,1);
            camera.lookAt(scene.position);
            var axisHelper = new THREE.AxisHelper(1);
            // scene.add(axisHelper);

            var ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
            scene.add( ambientlight );

            headlight = new THREE.PointLight(0xFFFFFF, 1.0);
            headlight.position.set(10, 10, -10);
            scene.add(headlight);

            var pointColor = "0xbbbbbb";
            var spotLight = new THREE.SpotLight(pointColor);
            spotLight.position.set(3, 2, -4);
            // spotLight.target = plane;
            // spotLight.target.position.set(0, 0, 0);
            // spotLight.distance = 0;
            spotLight.angle = 0.35;
            // spotLight.exponent = 30;
            spotLight.castShadow = true;

            spotLight.shadowCameraNear = 2;
            spotLight.shadowCameraFar = 70;
            spotLight.shadowCameraFov = 70;
            spotLight.shadowDarkness = 0.1;
            spotLight.shadowMapWidth = 650;
            spotLight.shadowMapHeight = 650;
            spotLight.shadow;
            scene.add(spotLight);

            // var spotLightHelper = new THREE.SpotLightHelper(spotLight);
            // scene.add(spotLightHelper);


            $('body').append(renderer.domElement);

            scene.add(get3DModel());
            render();

            function render() {
                stats.update();
                trackballControls.update();

                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }

            function initStats() {
                var stats = new Stats();
                stats.setMode(0); // 0: fps, 1: ms
                $('body').append(stats.domElement);
                return stats;
            }

        });