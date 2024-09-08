#version 150

in vec2 outTexCoord;
uniform sampler2D texUnit;
out vec4 out_Color;

#define kernelsize 21 
// gaussian of sigma=3
//float kernel[kernelsize] = float[] (0.1, 0.1, 0.1, 0.1, 0.1);
float kernel[kernelsize] = float[] (0.00197638, 0.0042698,  0.00850603, 0.01562532, 0.02646761, 0.04134144,
                                    0.05954462, 0.07908352, 0.09685379, 0.10937923, 0.11390451, 0.10937923,
                                    0.09685379, 0.07908352, 0.05954462, 0.04134144, 0.02646761, 0.01562532,
                                    0.00850603, 0.0042698,  0.00197638);
//float kernel[kernelsize] = float[] (0.00081325, 0.00123386, 0.00183241, 0.00266377, 0.00379041, 0.00527948,
//                                     0.00719801, 0.00960615, 0.01254879, 0.01604613, 0.0200842,  0.02460676,
//                                     0.02951006, 0.03464188, 0.03980602, 0.04477255, 0.04929361, 0.05312333,
//                                     0.0560397,  0.05786581, 0.05848765, 0.05786581, 0.0560397,  0.05312333,
//                                     0.04929361, 0.04477255, 0.03980602, 0.03464188, 0.02951006, 0.02460676,
//                                     0.0200842,  0.01604613, 0.01254879, 0.00960615, 0.00719801, 0.00527948,
//                                     0.00379041, 0.00266377, 0.00183241, 0.00123386, 0.00081325);

 //float kernel[kernelsize] = float[] (0.02431488, 0.02432617, 0.02433688, 0.02434702, 0.02435658, 0.02436556,
 //                                    0.02437397, 0.0243818,  0.02438906, 0.02439573, 0.02440183, 0.02440734,
 //                                    0.02441228, 0.02441664, 0.02442041, 0.02442361, 0.02442623, 0.02442826,
 //                                    0.02442971, 0.02443059, 0.02443088, 0.02443059, 0.02442971, 0.02442826,
 //                                    0.02442623, 0.02442361, 0.02442041, 0.02441664, 0.02441228, 0.02440734,
 //                                    0.02440183, 0.02439573, 0.02438906, 0.0243818,  0.02437397, 0.02436556,
 //                                    0.02435658, 0.02434702, 0.02433688, 0.02432617, 0.02431488);

vec3 outcol;
void main(void)
{
    outcol = vec3(0.0, 0.0, 0.0);
    vec2 pixelsize = 1.0/textureSize(texUnit, 0);
    for (int i = -kernelsize / 2; i < kernelsize / 2 + 1; i++){
        float weight = kernel[i + kernelsize / 2];
        vec2 coord = vec2(outTexCoord.x + pixelsize.x * float(i), outTexCoord.y);
        outcol += weight * vec3(texture(texUnit, coord));
    }
    out_Color = vec4(outcol, 1.0f);
}
