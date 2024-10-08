#version 150

//in vec3 in_Color;
in vec3 in_Position;
in vec3 in_Normal;
in vec2 in_TexCoord;
uniform mat4 matrix;

uniform vec3 pos1;
uniform vec3 pos2;
uniform mat4 M1;
uniform mat4 M2;

out vec4 g_color;
const vec3 lightDir = normalize(vec3(0.3, 0.5, 1.0));

// Uppgift 3: Soft-skinning p� GPU
//
// Flytta �ver din implementation av soft skinning fr�n CPU-sidan
// till vertexshadern. Mer info finns p� hemsidan.

void main(void)
{
    
	// transformera resultatet med ModelView- och Projection-matriserna
    vec4 pos = (in_TexCoord.x * M1) * vec4(in_Position - pos1, 1.0) + (in_TexCoord.y * M2) * vec4(in_Position - pos2, 1.0);
	gl_Position = matrix * vec4(vec3(pos), 1.0);

	// s�tt r�d+gr�n f�rgkanal till vertex Weights
	vec4 color = vec4(in_TexCoord.x, in_TexCoord.y, 0.0, 1.0);

	// L�gg p� en enkel ljuss�ttning p� vertexarna 	
	float intensity = dot(in_Normal, lightDir);
	color.xyz *= intensity;

	g_color = color;
}
