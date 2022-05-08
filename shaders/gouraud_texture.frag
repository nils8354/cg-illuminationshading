#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {

   
    //Ambient
    vec3 ambient_value = ambient * material_color;

    //Diffuse
    vec3 diffuse_value = diffuse * material_color;

    //Specular
    vec3 specular_value = specular * material_specular;

    vec4 temp = vec4((ambient_value + diffuse_value + specular_value), 1.0);

    FragColor = temp * texture(image, frag_texcoord);
}
