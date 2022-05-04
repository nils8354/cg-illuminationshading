#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_positions[10];
uniform vec3 light_colors[10]; // I_p
uniform vec3 camera_position;
uniform float material_shininess; // n
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);

    // Normals
    vec3 new_position = vec3(model_matrix * vec4(vertex_position, 1.0));
    mat3 normal_matrix = transpose(inverse(mat3(model_matrix)));
    vec3 new_normal = normalize(normal_matrix * vertex_normal);


    // Ambient
    ambient = light_ambient;

    vec3 sumDiffuse = vec3(0.0, 0.0, 0.0);
    vec3 sumSpecular = vec3(0.0, 0.0, 0.0);

    for(int i = 0; i < 10; i++) {

        if(light_colors[i] == vec3(0.0, 0.0, 0.0)) {
            break;
        }

        vec3 norm_light_direction = normalize(light_positions[i] - new_position);


        // Diffuse
        sumDiffuse += light_colors[i] * max(dot(new_normal, norm_light_direction),0.0);

        // Specular
        vec3 rVec =  reflect(-norm_light_direction, new_normal);
        vec3 vVec = normalize(camera_position - new_position);
        sumSpecular += light_colors[i] * pow(max(dot(rVec, vVec), 0.0), material_shininess);
    }

    diffuse = sumDiffuse;
    specular = sumSpecular;
}
