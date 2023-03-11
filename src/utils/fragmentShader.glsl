uniform vec2 u_resolution;
uniform float u_pos;

float gaussian(float z, float u, float o) {
	return (1.0 / (o * sqrt(4.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
}

//gl_FragColor
out vec4 outColor;

void main() {
	vec3 c;
	float l, z = u_pos;

	for(int i = 0; i < 3; i++) {
		vec2 uv, p = gl_FragCoord.xy / u_resolution;
		//screenspace texture projection
		uv = p;
		p -= .5;
		p.x *= u_resolution.x / u_resolution.y;
		z += .1;
		l = length(p);
		uv += p / l * (cos(z) + 0.5) * abs(cos(l * 5. - z - z));
		c[i] = .025 / length(mod(uv, 1.) - .5);
	}

	vec4 colours = vec4(c / l * float(2), abs(cos(u_pos)));
	outColor = colours;

	// noise
	vec2 uv = vec2(gl_FragCoord.x, gl_FragCoord.y) * (vec2(1.0) / u_resolution.xy);
	float seed = dot(uv * vec2(1000.0), vec2(12.0, 52.0));
	float noise = fract(sin(seed) * 43758.5453 + u_pos);
	noise = gaussian(noise, float(0.0), float(0.5) * float(0.5));
	vec3 grain = vec3(noise) * (1.0 - outColor.rgb);
	outColor.rgb -= grain * 0.075; //noise strength
}