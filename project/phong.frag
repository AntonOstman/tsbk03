#version 150

// Simplified Phong: No materials, only one, hard coded light source
// (in view coordinates) and no ambient

// Note: Simplified! In particular, the light source is given in view
// coordinates, which means that it will follow the camera.
// You usually give light sources in world coordinates.

out vec4 outColor;
in vec3 viewNormal; // Phong
in vec3 worldNormal; // Phong (specular)
in vec3 exSurface; // Phong (specular)

uniform vec3 ka;

void main(void)
{
	const vec3 light = 1.1f * vec3(0.58, 0.58, 0.58); // Given in VIEW coordinates! You usually specify light sources in world coordinates.
	float diffuse, specular, shade;
    vec3 ambient;

    ambient = vec3(normalize(worldNormal));

	// Diffuse
	diffuse = dot(normalize(viewNormal), light);
	diffuse = max(0.0, diffuse); // No negative light
	
	// Specular
	vec3 r = reflect(-light, normalize(viewNormal));
	vec3 v = normalize(-exSurface); // View direction
	specular = dot(r, v);
	if (specular > 0.0)
		specular = 1.0 * pow(specular, 150.0);
	specular = max(specular, 0.0);
	//specular = min(specular, 1.0);
	shade = 0.7*diffuse + 1.0*specular;
	// outColor = vec4(shade, shade, shade, 1.0) + vec4(ambient, 0.0);
	outColor = vec4(ka, 1.0);
}
