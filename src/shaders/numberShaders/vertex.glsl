uniform float uSize;
uniform float uTime;
uniform float uMultiplier;

attribute float aScale;
attribute vec3 aRandom;
attribute vec3 aColor;

varying float xPosition;
varying float yPosition;
varying float zPosition;

varying vec3 vColor;

void main()
{
    /**
    * Position
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float delayedUTime = uTime / 2.0;


    if(delayedUTime < 6.0)
    {
        modelPosition.x += aRandom.x / uMultiplier / (delayedUTime * 2.5);
        modelPosition.y += aRandom.y / uMultiplier / (delayedUTime * 2.5);
        modelPosition.z += aRandom.z / uMultiplier / (delayedUTime * 2.5);
    }
    

    else if (delayedUTime >= 6.0)
    {
        float newTime = 12.0 - delayedUTime;

        modelPosition.x += aRandom.x / uMultiplier / (newTime * 2.5);
        modelPosition.y += aRandom.y / uMultiplier / (newTime * 2.5);
        modelPosition.z += aRandom.z / uMultiplier / (newTime * 2.5);
    }


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
    * Size
    */
    gl_PointSize = uSize * aScale;
    //gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    xPosition = modelPosition.x;
    yPosition = modelPosition.y;
    zPosition = modelPosition.z;
    vColor = aColor;

}