var glapp;
var scene;

function init() {
    scene = Vue.createApp({
        data() {
            return {
                background: vec3.fromValues(0.8, 0.8, 0.8), // red, green, blue
                camera: {
                    position: vec3.fromValues(0.0, 1.8, 3.0),  // x, y, z
                    target: vec3.fromValues(0.0, 1.8, 0.0),  // location of object camera is looking at
                    up: vec3.fromValues(0.0, 1.0, 0.0)  // vector pointing in camera's up direction
                },
                models: [
                    {
                        type: 'plane',
                        shader: 'color',
                        material: {
                            color: vec3.fromValues(0.7, 0.1, 0.1),  // red, green, blue
                            specular: vec3.fromValues(0.0, 0.0, 0.0),  // red, green, blue
                            shininess: 1
                        },
                        center: vec3.fromValues(0.0, 0.0, -8.0),  // x, y, z
                        size: vec3.fromValues(8.0, 1.0, 8.0),  // width, 1.0, depth
                        rotate_x: 0,
                        rotate_y: 0,
                        rotate_z: 0
                    },
                    {
                        type: 'sphere',
                        shader: 'color',
                        material: {
                            color: vec3.fromValues(0.1, 0.4, 0.9),  // red, green, blue
                            specular: vec3.fromValues(1.0, 1.0, 1.0),  // red, green, blue
                            shininess: 32
                        },
                        center: vec3.fromValues(0.0, 1.0, -6.0), // x, y, z
                        size: vec3.fromValues(2.0, 2.0, 2.0),  // width, height, depth
                        rotate_x: 0,
                        rotate_y: 0,
                        rotate_z: 0
                    }
                ],
                light: {
                    ambient: glMatrix.vec3.fromValues(0.2, 0.2, 0.2),  // red, green, blue
                    point_lights: [
                        {
                            position: vec3.fromValues(1.5, 3.0, -4.5),  // x, y, z
                            color: vec3.fromValues(1.0, 1.0, 0.8)  // red, green, blue
                        },
                        {
                            position: vec3.fromValues(3.0, 3.0, -1.5),  // x, y, z
                            color: vec3.fromValues(1.0, 0.3, 1.0)  // red, green, blue
                        },
                        {
                            position: vec3.fromValues(2.5, 0.7, -7.0),  // x, y, z
                            color: vec3.fromValues(0.5, 1.0, 1.0)  // red, green, blue
                        }

                    ]
                }
            }
        },
        methods: {
            selectShadingAlgorithm() {
                var shading_alg = document.getElementById('shading_alg');
                glapp.setShadingAlgorithm(shading_alg.value);
            },

            updateLightColor(index) {
                let light_color = document.getElementById('light' + index + '_color');
                let r = parseInt(light_color.value.substring(1, 3), 16);
                let g = parseInt(light_color.value.substring(3, 5), 16);
                let b = parseInt(light_color.value.substring(5), 16);
                vec3.set(this.light.point_lights[index].color, r / 255, g / 255, b / 255);
                glapp.updateScene(this.$data);
            },

            updateLightPosition(index) {
                let light_posx = document.getElementById('light' + index + '_posx');
                let light_posy = document.getElementById('light' + index + '_posy');
                let light_posz = document.getElementById('light' + index + '_posz');
                let x = parseFloat(light_posx.value);
                let y = parseFloat(light_posy.value);
                let z = parseFloat(light_posz.value);
                vec3.set(this.light.point_lights[index].position, x, y, z);
                glapp.updateScene(this.$data);
            },

            htmlColor(color) {
                let r = parseInt(color[0] * 255, 10).toString(16);
                let g = parseInt(color[1] * 255, 10).toString(16);
                let b = parseInt(color[2] * 255, 10).toString(16);
                if (r.length < 2) r = '0' + r;
                if (g.length < 2) g = '0' + g;
                if (b.length < 2) b = '0' + b;
                return '#' + r + g + b; 
            }
        }
    }).mount('#gui');
    glapp = new GlApp('view', 800, 600, scene.$data);
    for (let i = 0; i < scene.models.length; i++) {
        if (scene.models[i].shader === 'texture') {
            scene.models[i].texture.id = glapp.initializeTexture(scene.models[i].texture.url);
        }
    }

    // event handler for pressing arrow keys
    document.addEventListener('keydown', onKeyDown, false);
}

function loadNewScene() {
    var scene_file = document.getElementById('scene_file');

    var reader = new FileReader();
    reader.onload = (event) => {
        let new_scene = JSON.parse(event.target.result);
        
        vec3.set(scene.background, new_scene.background[0],
                 new_scene.background[1], new_scene.background[2]);
        
        vec3.set(scene.camera.position, new_scene.camera.position[0], 
                 new_scene.camera.position[1], new_scene.camera.position[2]);
        vec3.set(scene.camera.target, new_scene.camera.target[0], 
                 new_scene.camera.target[1], new_scene.camera.target[2]);
        vec3.set(scene.camera.up, new_scene.camera.up[0], 
                 new_scene.camera.up[1], new_scene.camera.up[2]);

        scene.models = [];
        for (let i = 0; i < new_scene.models.length; i++) {
            let m = {};
            m.type = new_scene.models[i].type;
            m.shader = new_scene.models[i].shader;
            m.material = {};
            m.material.color = vec3.fromValues(new_scene.models[i].material.color[0], 
                                               new_scene.models[i].material.color[1],
                                               new_scene.models[i].material.color[2]);
            m.material.specular = vec3.fromValues(new_scene.models[i].material.specular[0], 
                                                  new_scene.models[i].material.specular[1],
                                                  new_scene.models[i].material.specular[2]);
            m.material.shininess = new_scene.models[i].material.shininess;
            m.center = vec3.fromValues(new_scene.models[i].center[0], 
                                       new_scene.models[i].center[1],
                                       new_scene.models[i].center[2]);
            m.size = vec3.fromValues(new_scene.models[i].size[0], 
                                     new_scene.models[i].size[1],
                                     new_scene.models[i].size[2]);
            m.rotate_x = new_scene.models[i].rotate_x || 0;
            m.rotate_x *= Math.PI / 180;
            m.rotate_y = new_scene.models[i].rotate_y || 0;
            m.rotate_y *= Math.PI / 180;
            m.rotate_z = new_scene.models[i].rotate_z || 0;
            m.rotate_z *= Math.PI / 180;
            if (m.shader === 'texture') {
                m.texture = {};
                m.texture.url = new_scene.models[i].texture.url;
                m.texture.scale = vec2.fromValues(new_scene.models[i].texture.scale[0],
                                                  new_scene.models[i].texture.scale[1]);
                m.texture.id = glapp.initializeTexture(m.texture.url);
            }
            scene.models.push(m);
        }

        vec3.set(scene.light.ambient, new_scene.light.ambient[0], 
                 new_scene.light.ambient[1], new_scene.light.ambient[2]);
        scene.light.point_lights = [];
        for (let i = 0; i < new_scene.light.point_lights.length; i++) {
            let l = {}
            l.position = vec3.fromValues(new_scene.light.point_lights[i].position[0],
                                         new_scene.light.point_lights[i].position[1],
                                         new_scene.light.point_lights[i].position[2]);
            l.color = vec3.fromValues(new_scene.light.point_lights[i].color[0],
                                      new_scene.light.point_lights[i].color[1],
                                      new_scene.light.point_lights[i].color[2]);
            scene.light.point_lights.push(l);
        }

        glapp.updateScene(scene);
    };
    reader.readAsText(scene_file.files[0], 'UTF-8');
}

function onKeyDown(event) {
    let dir;
    let u, v, n;
    let rotate;
    switch (event.keyCode) {
        case 37: // LEFT Arrow
            dir = vec3.fromValues(scene.camera.target[0] - scene.camera.position[0],
                                  scene.camera.target[1] - scene.camera.position[1],
                                  scene.camera.target[2] - scene.camera.position[2]);
            u = vec3.create();
            v = vec3.create();
            n = vec3.create();
            vec3.normalize(n, dir);
            vec3.cross(u, n, scene.camera.up);
            vec3.normalize(u, u);
            vec3.cross(v, u, n);
            rotate = mat4.create();
            mat4.rotate(rotate, rotate, Math.PI / 32, v);
            dir = vec4.fromValues(scene.camera.target[0] - scene.camera.position[0],
                                  scene.camera.target[1] - scene.camera.position[1],
                                  scene.camera.target[2] - scene.camera.position[2],
                                  1.0);
            vec4.transformMat4(dir, dir, rotate);
            vec3.set(scene.camera.target, scene.camera.position[0] + dir[0],
                                          scene.camera.position[1] + dir[1],
                                          scene.camera.position[2] + dir[2]);
            glapp.updateScene(scene);
            break;
        case 39: // RIGHT Arrow
            dir = vec3.fromValues(scene.camera.target[0] - scene.camera.position[0],
                                  scene.camera.target[1] - scene.camera.position[1],
                                  scene.camera.target[2] - scene.camera.position[2]);
            u = vec3.create();
            v = vec3.create();
            n = vec3.create();
            vec3.normalize(n, dir);
            vec3.cross(u, n, scene.camera.up);
            vec3.normalize(u, u);
            vec3.cross(v, u, n);
            rotate = mat4.create();
            mat4.rotate(rotate, rotate, -Math.PI / 32, v);
            dir = vec4.fromValues(scene.camera.target[0] - scene.camera.position[0],
                                  scene.camera.target[1] - scene.camera.position[1],
                                  scene.camera.target[2] - scene.camera.position[2],
                                  1.0);
            vec4.transformMat4(dir, dir, rotate);
            vec3.set(scene.camera.target, scene.camera.position[0] + dir[0],
                                          scene.camera.position[1] + dir[1],
                                          scene.camera.position[2] + dir[2]);
            glapp.updateScene(scene);
            break;
        case 65: // A key
            dir = vec3.fromValues(scene.camera.target[0] - scene.camera.position[0],
                                  scene.camera.target[1] - scene.camera.position[1],
                                  scene.camera.target[2] - scene.camera.position[2]);
            n = vec3.create();
            u = vec3.create();
            vec3.normalize(n, dir);
            vec3.cross(u, n, scene.camera.up);
            vec3.normalize(u, u);
            vec3.scale(u, u, 0.5);
            vec3.subtract(scene.camera.position, scene.camera.position, u);
            vec3.subtract(scene.camera.target, scene.camera.target, u);
            glapp.updateScene(scene);
            break;
        case 68: // D key
            dir = vec3.fromValues(scene.camera.target[0] - scene.camera.position[0],
                                  scene.camera.target[1] - scene.camera.position[1],
                                  scene.camera.target[2] - scene.camera.position[2]);
            n = vec3.create();
            u = vec3.create();
            vec3.normalize(n, dir);
            vec3.cross(u, n, scene.camera.up);
            vec3.normalize(u, u);
            vec3.scale(u, u, 0.5);
            vec3.add(scene.camera.position, scene.camera.position, u);
            vec3.add(scene.camera.target, scene.camera.target, u);
            glapp.updateScene(scene);
            break;
        case 83: // S key
            dir = vec3.fromValues(scene.camera.target[0] - scene.camera.position[0],
                                  scene.camera.target[1] - scene.camera.position[1],
                                  scene.camera.target[2] - scene.camera.position[2]);
            n = vec3.create();
            vec3.normalize(n, dir);
            vec3.scale(n, n, 0.5);
            vec3.subtract(scene.camera.position, scene.camera.position, n);
            vec3.subtract(scene.camera.target, scene.camera.target, n);
            glapp.updateScene(scene);
            break;
        case 87: // W key
            dir = vec3.fromValues(scene.camera.target[0] - scene.camera.position[0],
                                  scene.camera.target[1] - scene.camera.position[1],
                                  scene.camera.target[2] - scene.camera.position[2]);
            n = vec3.create();
            vec3.normalize(n, dir);
            vec3.scale(n, n, 0.5);
            vec3.add(scene.camera.position, scene.camera.position, n);
            vec3.add(scene.camera.target, scene.camera.target, n);
            glapp.updateScene(scene);
            break;
    }
}
