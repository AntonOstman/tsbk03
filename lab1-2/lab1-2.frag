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

void main(void)
{
    vec3 light = vec3(0.0, 0.7, 0.7); // Light source in view coordinates
	
	// Calculate gradients here
	float textureSize = 1.0 / 256.0; // texture size, same in both directions

    // get x gradient
    vec3 dx = vec3(0.0, 0.0, 0.0);
    for (int i=-kernelsize / 2; i < kernelsize/2 + 1; i++){
        for (int j=-kernelsize / 2; j < kernelsize/2 + 1; j++){
            int idx = (i + kernelsize / 2) * kernelsize + (j + kernelsize/2);
            float weight = sobelx[idx];
            vec2 coord = vec2(outTexCoord.x + textureSize * float(i), outTexCoord.y + textureSize * float(j));

            dx += weight * vec3(texture(texUnit, coord));
        }
    }

    // get y gradient
    vec3 dy = vec3(0.0, 0.0, 0.0);
    for (int i=-kernelsize / 2; i < kernelsize/2 + 1; i++){
        for (int j=-kernelsize / 2; j < kernelsize/2 + 1; j++){
            int idx = (i + kernelsize / 2) * kernelsize + (j + kernelsize/2);
            float weight = sobely[idx];
            vec2 coord = vec2(outTexCoord.x + textureSize * float(i), outTexCoord.y + textureSize * float(j));

            dy += weight * vec3(texture(texUnit, coord));
        }
    }


    // Since bump map is gray scale only choosing one color component should be fine

    vec3 normal = normalize(vec3(dx.r, dy.r, 1.0));
    mat3 mvt = transpose(mat3(Ps, Pt, out_Normal));

    light = mvt * light;

    
    //normal.x = dx.r;
    //normal.y = dy.r;
    //normal = normalize(normal);
	// Simplified lighting calculation.
	// A full solution would include material, ambient, specular, light sources, multiply by texture.
    out_Color = vec4( max(0.0, dot(normal, light))+0.4) * vec4(0.5f, 0.5f, 0.5f, 1.0f);
    //out_Color = vec4( max(0.0, dot(normal, light))+0.4) * texture(texUnit, outTexCoord);
}
