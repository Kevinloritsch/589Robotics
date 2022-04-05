uniform float uTime;
uniform vec2 uFrequency;
uniform float uLengthDiv;

//attribute vec2 uv;

varying vec2 vUv;


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    if(uLengthDiv > 1.0)
    {
        if(modelPosition.x > -0.65)
        {
            modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * (0.15);
            modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * (0.15);
        }
        else
        {
            modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * (0.05);
            modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * (0.05);
        }
    }
    else
    {
        if(modelPosition.x > -2.6)
        {
            modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * (0.13);
            modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * (0.13);
        }
        else
        {
            modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * (0.03);
            modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * (0.03);
        }
    }

    
    

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;


    gl_Position = projectionPosition;

    vUv = uv;

}