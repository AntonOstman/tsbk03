#version 150

in vec2 outTexCoord;
uniform sampler2D texUnit;
out vec4 out_Color;

float kernel[25] = float[] (1, 4,  7,  4,  1,
                            4, 16, 26, 16, 4,
                            7, 26, 41, 26, 7, 
                            4, 16, 26, 16, 4,
                            1, 4,  7,  4,  1);
int kernelsize = 5;

vec3 col = vec3(0.0,0.0,0.0);
void main(void)
{
    vec2 pixelsize = 1.0f/textureSize(texUnit, 0);

    for (int i=-kernelsize / 2; i < kernelsize/2 + 1; i++){
        for (int j=-kernelsize / 2; j < kernelsize/2 + 1; j++){
            int idx = (i + kernelsize / 2) * kernelsize + (j + kernelsize/2);
            float weight = kernel[idx];
            col += weight * vec3(texture(texUnit, outTexCoord + vec2(pixelsize.x * i, pixelsize.y * j)));
        }
    }
    col = col / 273;
    out_Color = vec4(col, 1.0f);
}
