#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color; // I_p
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

    // Ambient
    ambient = light_ambient;

    // Normals
    vec3 new_position = vec3(model_matrix * vec4(vertex_position, 1.0));
    mat3 normal_matrix = transpose(inverse(mat3(model_matrix)));
    //mat3 normal_matrix = mat3(model_matrix);
    vec3 new_normal = normalize(normal_matrix * vertex_normal);

    vec3 norm_light_direction = normalize(light_position - new_position);

    // Diffuse
    diffuse = light_color * max(dot(new_normal, norm_light_direction),0.0);

    // Specular
    vec3 rVec =  reflect(-norm_light_direction, new_normal);
    vec3 vVec = normalize(camera_position - new_position);
    float powerResult = pow(max(dot(rVec, vVec), 0.0), material_shininess);

    specular = light_color * pow(max(dot(rVec, vVec), 0.0), material_shininess);//light_color * powerResult;
}
