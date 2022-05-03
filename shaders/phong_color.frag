#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_positions[10];
uniform vec3 light_colors[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {

    vec3 light_color = light_colors[0];
    vec3 light_position = light_positions[0];

    // Ambient
    vec3 ambient = light_ambient;

    vec3 norm_light_direction = normalize(light_position - frag_pos);

    // Diffuse
    vec3 diffuse = light_color * max(dot(frag_normal, norm_light_direction),0.0);

    // Specular
    vec3 rVec =  reflect(-norm_light_direction, frag_normal);
    vec3 vVec = normalize(camera_position - frag_pos);

    vec3 specular = light_color * pow(max(dot(rVec, vVec), 0.0), material_shininess);


    //Ambient
    vec3 ambient_value = ambient * material_color;

    //Diffuse
    vec3 diffuse_value = diffuse * material_color;

    //Specular
    vec3 specular_value = specular * material_specular;

    //FragColor
    FragColor = vec4((ambient_value + diffuse_value + specular_value), 1.0);

}
