varying float xPosition;
varying float yPosition;
varying float zPosition;

varying vec3 vColor;

void main()
{
    gl_FragColor = vec4(vColor, 1.0);
}