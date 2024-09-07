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

void main(void)
{
    vec2 pixelsize = 1/textureSize(texUnit, 0);
    for (int i=0; i < kernelsize; i++){
        for (int j=0; j < kernelsize; j++){
            float weight = kernel[i * kernelsize + j] / 273;
            out_Color += weight * texture(texUnit, outTexCoord + vec2(pixelsize.x * i, pixelsize.y * j));
        }
    }
}
