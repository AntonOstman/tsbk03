#version 150
// bump mapping should be calculated
// 1) in view coordinates
// 2) in texture coordinates

in vec2 outTexCoord;
in vec3 out_Normal;
in vec3 Ps;
in vec3 Pt;
in vec3 pixPos;  // Needed for specular reflections
uniform sampler2D texUnit;
out vec4 out_Color;


const int kernelsize = 3;
float sobely[9] = float[] ( 1,  2,  1,
                            0,  0,  0,
                           -1, -2, -1);

float sobelx[9] = float[] (-1,  0,  1,
                           -2,  0,  2,
                           -1,  0,  1);

float seperated_sobel(float* kernelx, float* kernely, int kernelsize){
    float dx = 0;
    vec2 pixelsize = 1.0/textureSize(texUnit, 0);

    for (int i = -kernelsize / 2; i < kernelsize / 2 + 1; i++){
        float weight = kernelx[i + kernelsize / 2];
        vec2 coord = vec2(outTexCoord.x + pixelsize.x * float(i), outTexCoord.y);
        dx += weight * vec3(texture(texUnit, coord));
    }

    for (int i = -kernelsize / 2; i < kernelsize / 2 + 1; i++){
        float weight = kernely[i + kernelsize / 2];
        vec2 coord = vec2(outTexCoord.x + pixelsize.x * float(i), outTexCoord.y);
        dx += weight * vec3(texture(texUnit, coord));
    }
    return dx;
}

void main(void)
{
    vec3 light = vec3(0.0, 0.7, 0.7); // Light source in view coordinates
	
	// Calculate gradients here
	float offset = 1.0 / 256.0; // texture size, same in both directions


	
    vec3 normal = normalize(out_Normal);
	// Simplified lighting calculation.
	// A full solution would include material, ambient, specular, light sources, multiply by texture.
    out_Color = vec4( max(0.0, dot(normal, light))+0.4) * texture(texUnit, outTexCoord);
}
