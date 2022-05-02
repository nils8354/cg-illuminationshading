#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {
    // Ambient
    vec3 ambient = light_ambient;

    vec3 norm_light_direction = normalize(light_position - frag_pos);
    // Diffuse
    vec3 diffuse = light_color * max(dot(frag_normal, norm_light_direction),0.0);

    // Specular
    vec3 rVec =  reflect(-norm_light_direction, frag_normal);
    vec3 normalize_new_direction = normalize(camera_position - frag_pos);
    float powerResult = pow(max(dot(rVec, normalize_new_direction), 0.0), material_shininess);

    vec3 specular = light_color * powerResult;

    vec3 ambient_value = ambient * material_color;
    vec3 diffuse_value = diffuse * material_color;
    vec3 specular_value = specular * material_specular;

    FragColor = vec4((ambient_value + diffuse_value + specular_value), 1.0);
}
