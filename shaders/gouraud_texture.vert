#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;
in vec2 vertex_texcoord;

uniform vec3 light_ambient;
uniform int array_length;
uniform vec3 light_positions[10];
uniform vec3 light_colors[10]; // I_p
uniform vec3 camera_position;
uniform float material_shininess;
uniform vec2 texture_scale;
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;
out vec2 frag_texcoord;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    frag_texcoord = vertex_texcoord * texture_scale;

        // Normals
    vec3 new_position = vec3(model_matrix * vec4(vertex_position, 1.0));
    mat3 normal_matrix = transpose(inverse(mat3(model_matrix)));
    // N vec
    vec3 new_normal = normalize(normal_matrix * vertex_normal);


    // Ambient
    ambient = light_ambient;

    for(int i = 0; i < array_length; i++) {
        // L vec
        vec3 norm_light_direction = normalize(light_positions[i] - new_position);


        // Diffuse
        diffuse += light_colors[i] * max(dot(new_normal, norm_light_direction),0.0);

        // Specular
        vec3 rVec =  reflect(-norm_light_direction, new_normal);
        vec3 vVec = normalize(camera_position - new_position);
        specular += light_colors[i] * pow(max(dot(rVec, vVec), 0.0), material_shininess);
    }

    frag_texcoord = vertex_texcoord * texture_scale;
}
