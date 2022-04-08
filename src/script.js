import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { NearestFilter, Vector3 } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

import groundVertexShader from './shaders/ground/vertex.glsl'
import groundFragmentShader from './shaders/ground/fragment.glsl'

import flagVertexShader from './shaders/flag/vertex.glsl'
import flagFragmentShader from './shaders/flag/fragment.glsl'

import fiveFragmentShader from './shaders/numberShaders/fiveFragment.glsl'
import eightFragmentShader from './shaders/numberShaders/eightFragment.glsl'
import nineFragmentShader from './shaders/numberShaders/nineFragment.glsl'

import numberVertexShader from './shaders/numberShaders/vertex.glsl'



import gsap from 'gsap'



// Canvas
const canvas = document.querySelector('canvas.webgl')
const body = document.querySelector('body')

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
let lengthdiv = 1
let abouter = document.getElementById("AboutStatement")
let abouter2 = document.getElementById("AboutStatement2")
let donater = document.getElementById("DonateStatement")
let donater2 = document.getElementById("DonateStatement2")
let donateBuffer = document.getElementById("DonateBuffer")
let section = document.getElementById("finalSection")
let buttonSVG1 = document.getElementById("button_svg1")
let buttonSVG2 = document.getElementById("button_svg2")
let button1 = document.getElementById("button1")
let button2 = document.getElementById("button2")
let buttonGrid = document.getElementById("HousesButtons")



if(sizes.width < 700)
{
    lengthdiv = 2.2;
    sizes.height = window.screen.height
    abouter.setAttribute('class', "AboutStatementSmall")
    abouter2.setAttribute('class', "AboutStatementSmall")
    donater.setAttribute('class', "DonateStatementSmall")
    donater2.setAttribute('class', "DonateStatementSmall")
    donateBuffer.setAttribute('class', "DonateBuffer")
    section.setAttribute('class', "section")
    buttonSVG1.setAttribute('class', "button__svg_small")
    buttonSVG2.setAttribute('class', "button__svg_small")
    button1.setAttribute('class', "button_small")
    button2.setAttribute('class', "button_small")
}

else
{
    buttonGrid.setAttribute('class', "DonateStatementLarge")

}

/**
 * Debug
 */
const gui = new dat.GUI({ width: 350, title: 'Controls - Reload to Reverse Changes' })
gui.close()
const debugRenderObject = {}



/**
 * Base
 */


// Scene
const scene = new THREE.Scene()

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
debugRenderObject.clearColor = '#000000'
renderer.setClearColor(debugRenderObject.clearColor)
gui.addColor(debugRenderObject, 'clearColor').onChange(() => {
    renderer.setClearColor(debugRenderObject.clearColor)
}).name("Render BG Color")


/**
 * Objects
 */
// Textures
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
const particleTexture = textureLoader.load('textures/particles/star.png')

gradientTexture.magFilter = THREE.NearestFilter


const poleColorTexture = textureLoader.load('/textures/flagpole/panelBaseColor.jpg')
const poleHeightTexture = textureLoader.load('/textures/flagpole/panelHeight.jpg')
const poleNormalTexture = textureLoader.load('/textures/flagpole/panelNormal.jpg')
const poleAmbientOcclusionTexture = textureLoader.load('/textures/flagpole/panelAmbientOcclusion.jpg')
const poleMetalnessTexture = textureLoader.load('/textures/flagpole/panelMetallic.jpg')
const poleRoughnessTexture = textureLoader.load('/textures/flagpole/panelRoughness.jpg')


// Mesh
const objectsDistances = 4
// const mesh1 = new THREE.Mesh(
//     new THREE.TorusGeometry(1, 0.4, 16, 60),
//     material
// )

// mesh1.position.y = - objectsDistances * 0
// mesh2.position.y = - objectsDistances * 1
// mesh3.position.y = - objectsDistances * 2

// mesh1.position.x = 2

// scene.add(mesh1)
// const sectionMeshes = [ mesh1 ]

// Barrier
const barrierGeometry = new THREE.PlaneGeometry(10, 1, 7, 7)
const barrierCount = barrierGeometry.attributes.position.count
const barrierRandoms = new Float32Array(barrierCount)

for(let i = 0; i < barrierCount; i++){
    barrierRandoms[i] = Math.random()
}
barrierGeometry.setAttribute('aRandom', new THREE.BufferAttribute(barrierRandoms, 1))

const barrierMaterial = new THREE.ShaderMaterial({
    vertexShader: groundVertexShader,
    fragmentShader: groundFragmentShader,
    wireframe: true,
})

const barrierMesh = new THREE.Mesh(barrierGeometry, barrierMaterial)

barrierMesh.position.y = - objectsDistances * .5
barrierMesh.rotation.x = Math.PI * 0.5
scene.add(barrierMesh)

// Barrier2
const barrierGeometry2 = new THREE.PlaneGeometry(10, 1, 7, 7)
const barrierRandoms2 = new Float32Array(barrierCount)

for(let i = 0; i < barrierCount; i++){
    barrierRandoms2[i] = Math.random()
}
barrierGeometry2.setAttribute('aRandom', new THREE.BufferAttribute(barrierRandoms2, 1))


const barrierMesh2 = new THREE.Mesh(barrierGeometry2, barrierMaterial)

barrierMesh2.position.y = - objectsDistances * 1.5
barrierMesh2.rotation.x = Math.PI * 0.5
scene.add(barrierMesh2)

// Barrier3
const barrierGeometry3 = new THREE.PlaneGeometry(10, 1, 7, 7)
const barrierRandoms3 = new Float32Array(barrierCount)

for(let i = 0; i < barrierCount; i++){
    barrierRandoms3[i] = Math.random()
}
barrierGeometry3.setAttribute('aRandom', new THREE.BufferAttribute(barrierRandoms3, 1))


const barrierMesh3 = new THREE.Mesh(barrierGeometry3, barrierMaterial)

barrierMesh3.position.y = - objectsDistances * 2.5
barrierMesh3.rotation.x = Math.PI * 0.5
scene.add(barrierMesh3)


gui.add(barrierGeometry.attributes.position, 'count').min(0).max(80).step(1).onChange(() => {
    const barrierCount = barrierGeometry.attributes.position.count
    const barrierRandoms = new Float32Array(barrierCount)
    const barrierRandoms2 = new Float32Array(barrierCount)


    for(let i = 0; i < barrierCount; i++){
        barrierRandoms[i] = Math.random()
        barrierRandoms2[i] = Math.random()

    }
    barrierGeometry.setAttribute('aRandom', new THREE.BufferAttribute(barrierRandoms, 1))
    barrierGeometry2.setAttribute('aRandom', new THREE.BufferAttribute(barrierRandoms, 1))


    const barrierMesh = new THREE.Mesh(barrierGeometry, barrierMaterial)

    barrierMesh.position.y = - objectsDistances * .5
    barrierMesh.rotation.x = Math.PI * 0.5
    scene.add(barrierMesh)

    const barrierMesh2 = new THREE.Mesh(barrierGeometry2, barrierMaterial)

    barrierMesh2.position.y = - objectsDistances * 1.5
    barrierMesh2.rotation.x = Math.PI * 0.5
    scene.add(barrierMesh2)

}).name("Barrier Segment Count")

// Flag
const flagGeometry = new THREE.PlaneGeometry(1.5, 1, 32, 40)

const flagTexture = textureLoader.load('/images/falkon_flag.jpg')
console.log(flagTexture);

const flagMaterial = new THREE.ShaderMaterial({
    vertexShader: flagVertexShader,
    fragmentShader: flagFragmentShader,
    uniforms:
    {
        uFrequency: { value: new THREE.Vector2(7, 5) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('orange') },
        uTexture: { value: flagTexture },
        uLengthDiv: { value: lengthdiv }
    }
    //wireframe: true,
})

const flagMesh = new THREE.Mesh(flagGeometry, flagMaterial)


const poleGeometry = new THREE.CylinderGeometry(.12, .12, 2.4, 32)
const poleMaterial = new THREE.MeshStandardMaterial({
    //color: '#B2B5B5',
    map: poleColorTexture,
    transparent: true,
    aoMap: poleAmbientOcclusionTexture,
    displacementMap: poleHeightTexture,
    displacementScale: 1,
    normalMap: poleNormalTexture,
    metalnessMap: poleMetalnessTexture,
    roughnessMap: poleRoughnessTexture
})
const pole = new THREE.Mesh(poleGeometry, poleMaterial)

const poleTopGeometry = new THREE.SphereGeometry(0.15, 15, 15)
const poleTopMaterial = new THREE.MeshBasicMaterial({
    color: '#FFD700'
})

const poleTop = new THREE.Mesh(poleTopGeometry, poleTopMaterial)
gui.addColor(poleTopMaterial, "color").name("Pole Top Color")





if(lengthdiv > 1)
{
    flagMesh.scale.y /= (lengthdiv - 0.5)
    flagMesh.scale.x /= (lengthdiv - 0.5)
    pole.scale.y /= (lengthdiv - 0.5)
    pole.scale.x /= (lengthdiv - 0.5)
    poleTop.scale.y /= (lengthdiv - 0.5)
    poleTop.scale.x /= (lengthdiv - 0.5)

    flagMesh.position.y = - objectsDistances + 0.1+ lengthdiv / 4
    flagMesh.position.x = - 2.1  + lengthdiv / 1.3
    flagMesh.position.z = -1
    pole.position.x = - 2.5 + lengthdiv / 1.3
    pole.position.z = -1.4
    pole.position.y = - objectsDistances - 0.6 + lengthdiv / 2.5
    poleTop.position.x = - 2.5 + lengthdiv / 1.3
    poleTop.position.z = -1.4
    poleTop.position.y = - objectsDistances +0.1 + lengthdiv / 2.5


}

else
{
    flagMesh.position.y = - objectsDistances + 0.6
    flagMesh.position.x = - 2.1
    flagMesh.position.z = -1
    pole.position.x = - 2.9
    pole.position.z = -1.4
    pole.position.y = - objectsDistances - 0.1
    poleTop.position.x = - 2.9
    poleTop.position.z = -1.4
    poleTop.position.y = - objectsDistances + 1.2

}
scene.add(flagMesh)
scene.add(poleTop)
scene.add(pole)

const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/BM_Pixel_Regular.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            `Falkon Robotics`,
            {
                font: font,
                size: 0.3 / lengthdiv,
                height: 0.1,
                curveSegments: 5
                // bevelEnabled: true,
                // bevelThickness: 0.03,
                // bevelSize: 0.02,
                // bevelOffset: 0,
                // bevelSegments: 4
            }     
        )
        textGeometry.center()

        const textMaterial = new THREE.MeshStandardMaterial({})
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.y += 1.2;
        scene.add(text)
        })

// Text Light
const pointLightText = new THREE.PointLight('blue', 10, 3)
pointLightText.position.set(0, 0, -0.5)
scene.add(pointLightText)

gui.addColor(pointLightText, 'color').name('Text Light Color')



// Five Particles
const fiveParticleGeometry = new THREE.BufferGeometry()

let fiveParticleCount = 4000

const fivePositions = new Float32Array(fiveParticleCount * 3)
const fiveScales = new Float32Array(fiveParticleCount * 1)

const fiveRandom = new Float32Array(fiveParticleCount * 3)

const fiveColor = new Float32Array(fiveParticleCount * 3)


for(let i = 0; i < fiveParticleCount; i++)
{
    const i3 = i * 3
    let randomZ = (Math.random()) - 4

    if(i3 < fiveParticleCount * 3 / 1.5) // Five Circle Shape
    {
        let fiveAngle = (i % 8)
        fiveAngle = ((fiveAngle * Math.PI) / 8) * 2
        const fiveRandomNum = (Math.random())
        if(i % 8 !== 3)
        {
            
            fivePositions[i3   ] = Math.cos(fiveAngle + fiveRandomNum) * 0.75
            fivePositions[i3 + 1] = Math.sin(fiveAngle + fiveRandomNum) * 0.75
            fivePositions[i3 + 2] = randomZ
            
        }
        if(i % 8 === 3)
        {
            fivePositions[i3   ] = Math.cos(fiveAngle) * 0.75
            fivePositions[i3 + 1] = Math.sin(fiveAngle) * 0.75
            fivePositions[i3 + 2] = randomZ
        }
        
    }
    else // Five Top and Side Line
    {
        let fred = Math.random()
        if (fred < 0.5)
        {
            fivePositions[i3   ] = ((Math.random() - 0.5) * 1.3)
            fivePositions[i3 + 1] = 1.7
            fivePositions[i3 + 2] = randomZ
        }
        else
        {
            fivePositions[i3   ] = -0.7
            fivePositions[i3 + 1] = ((Math.random()) * 1.2) + .5
            fivePositions[i3 + 2] = randomZ
        }
        
    }
    // Translate
    fivePositions[i3] = fivePositions[i3] - 2.3
    fivePositions[i3 + 1] = fivePositions[i3 + 1] - 0.7

    // Div
    fivePositions[i3] /= lengthdiv
    fivePositions[i3 + 1] /= lengthdiv



    // Scale
    fiveScales[i] = Math.random()

    // Random
    fiveRandom[i3   ] = (Math.random() - 0.5) * 3
    fiveRandom[i3 + 1] = (Math.random() - 0.5) * 3
    fiveRandom[i3 + 2] = (Math.random() - 0.5) * 3

    // Color
    fiveColor[i3   ] = Math.random() / 2
    fiveColor[i3 + 1] = Math.random() / 2
    fiveColor[i3 + 2] = Math.random()
    
}

fiveParticleGeometry.setAttribute('position', new THREE.BufferAttribute(fivePositions, 3)) // MUST be named position
fiveParticleGeometry.setAttribute('aScale', new THREE.BufferAttribute(fiveScales, 1))
fiveParticleGeometry.setAttribute('aRandom', new THREE.BufferAttribute(fiveRandom, 3))
fiveParticleGeometry.setAttribute('aColor', new THREE.BufferAttribute(fiveColor, 3))



const fiveParticleMaterial = new THREE.ShaderMaterial({
    vertexShader: numberVertexShader,
    fragmentShader: fiveFragmentShader,
    vertexColors: true,

    uniforms:
    {
        uSize: { value: 2.6 * renderer.getPixelRatio() },
        uTime: { value: 0 },
        uMultiplier: {value: lengthdiv}
    }   
})
const fivePoints = new THREE.Points(fiveParticleGeometry, fiveParticleMaterial)
scene.add(fivePoints)



// Eight Particles
const eightParticleGeometry = new THREE.BufferGeometry()

let eightParticleCount = 4000

const eightPositions = new Float32Array(eightParticleCount * 3)
const eightScales = new Float32Array(eightParticleCount * 1)
const eightRandom = new Float32Array(eightParticleCount * 3)

const eightColor = new Float32Array(eightParticleCount * 3)



for(let i = 0; i < eightParticleCount; i++)
{
    const i3 = i * 3
    let randomZ = (Math.random()) - 4

    if(i3 < eightParticleCount * 3 / 1.5) // Bottom Bigger Circle
    {
                   
        eightPositions[i3   ] = Math.cos(i3) * 0.75
        eightPositions[i3 + 1] = Math.sin(i3) * 0.75
        eightPositions[i3 + 2] = randomZ
    }
    else // Top Smaller Circle
    {
        eightPositions[i3   ] = Math.cos(i3) * 0.5
        eightPositions[i3 + 1] = Math.sin(i3) * 0.5 + 1.25
        eightPositions[i3 + 2] = randomZ
    }

    // Translate
    eightPositions[i3 + 1] = eightPositions[i3 + 1] - 0.7

    // Div
    eightPositions[i3   ] /= lengthdiv
    eightPositions[i3 + 1] /= lengthdiv

    // Scale
    eightScales[i] = Math.random()

    // Random
    eightRandom[i3   ] = (Math.random() - 0.5) * 3
    eightRandom[i3 + 1] = (Math.random() - 0.5) * 3
    eightRandom[i3 + 2] = (Math.random() - 0.5) * 3

    // Color
    eightColor[i3   ] = Math.random() / 3
    eightColor[i3 + 1] = Math.random() / 1.5
    eightColor[i3 + 2] = Math.random() / 2 + 0.5
    
}

eightParticleGeometry.setAttribute('position', new THREE.BufferAttribute(eightPositions, 3)) // MUST be named position
eightParticleGeometry.setAttribute('aScale', new THREE.BufferAttribute(eightScales, 1))
eightParticleGeometry.setAttribute('aRandom', new THREE.BufferAttribute(eightRandom, 3))
eightParticleGeometry.setAttribute('aColor', new THREE.BufferAttribute(eightColor, 3))




const eightParticleMaterial = new THREE.ShaderMaterial({
    vertexShader: numberVertexShader,
    fragmentShader: eightFragmentShader,
    uniforms:
    {
        uSize: { value: 2.6 * renderer.getPixelRatio() },
        uTime: { value: 0 },
        uMultiplier: {value: lengthdiv}
    }
    // size: 0.05,
    // sizeAttenuation: true,
    // depthWrite: false,
    // blending: THREE.AdditiveBlending,
    // color: 'green'
    
})
const eightPoints = new THREE.Points(eightParticleGeometry, eightParticleMaterial)
scene.add(eightPoints)



// Nine Particles
const nineParticleGeometry = new THREE.BufferGeometry()

let nineParticleCount = 3000

const ninePositions = new Float32Array(nineParticleCount * 3)
const nineScales = new Float32Array(nineParticleCount * 1)
const nineRandom = new Float32Array(nineParticleCount * 3)

const nineColors = new Float32Array(nineParticleCount * 3)


for(let i = 0; i < nineParticleCount; i++)
{
    const i3 = i * 3
    let randomZ = (Math.random()) - 4

    if(i3 < nineParticleCount * 3 / 1.5) // Nine Circle
    {
                   
        ninePositions[i3   ] = Math.cos(i3) * 0.6
        ninePositions[i3 + 1] = Math.sin(i3) * 0.6 + 1.25
        ninePositions[i3 + 2] = randomZ
    }
    else
    {
        ninePositions[i3   ] = .6
        ninePositions[i3 + 1] = ((Math.random()) * 1.8) - 0.8
        ninePositions[i3 + 2] = randomZ
    }
    // Translate
    ninePositions[i3] = ninePositions[i3] + 2
    ninePositions[i3 + 1] = ninePositions[i3 + 1] - 0.7

    //Div
    ninePositions[i3] /= lengthdiv
    ninePositions[i3 + 1] /= lengthdiv


    // Scale
    nineScales[i] = Math.random()

    // Random
    nineRandom[i3   ] = (Math.random() - 0.5) * 3
    nineRandom[i3 + 1] = (Math.random() - 0.5) * 3
    nineRandom[i3 + 2] = (Math.random() - 0.5) * 3

    // Color
    nineColors[i3   ] = 0
    nineColors[i3 + 1] = 0
    nineColors[i3 + 2] = (Math.random() / 3) + 0.6
    
}

nineParticleGeometry.setAttribute('position', new THREE.BufferAttribute(ninePositions, 3)) // MUST be named position
nineParticleGeometry.setAttribute('aScale', new THREE.BufferAttribute(nineScales, 1))
nineParticleGeometry.setAttribute('aRandom', new THREE.BufferAttribute(nineRandom, 3))
nineParticleGeometry.setAttribute('aColor', new THREE.BufferAttribute(nineColors, 3))


const nineParticleMaterial = new THREE.ShaderMaterial({
    vertexShader: numberVertexShader,
    fragmentShader: nineFragmentShader,
    uniforms:
    {
        uSize: { value: 2.6 * renderer.getPixelRatio() },
        uTime: { value: 0 },
        uMultiplier: {value: lengthdiv}
    }
    // size: 0.05,
    // sizeAttenuation: true,
    // depthWrite: false,
    // blending: THREE.AdditiveBlending,
    // color: 'blue'
    
})
const ninePoints = new THREE.Points(nineParticleGeometry, nineParticleMaterial)
scene.add(ninePoints)

// Random Particles
const randomParticlesCount = 1000
const randomPositions = new Float32Array(randomParticlesCount * 3)
const randomColor = new Float32Array(randomParticlesCount * 3)


for (let i = 0; i< randomParticlesCount; i++) {
    randomPositions[i * 3 + 0] = (Math.random() - 0.5) * 10
    randomPositions[i * 3 + 1] = objectsDistances * 0.4 - Math.random() * objectsDistances * 4
    randomPositions[i * 3 + 2] = (Math.random() - 0.5) * 10

    randomColor[i * 3 + 0] = Math.random()
    randomColor[i * 3 + 1] = Math.random()
    randomColor[i * 3 + 2] = Math.random()
}
const randomParticlesGeometry = new THREE.BufferGeometry()
randomParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(randomPositions, 3))
randomParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(randomColor, 3))


const randomParticlesMaterial = new THREE.PointsMaterial({
    sizeAttenuation: true,
    size: 0.20,
    vertexColors: true,
    map: particleTexture,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
})

const randomParticles = new THREE.Points(randomParticlesGeometry, randomParticlesMaterial)
scene.add(randomParticles)


// Light
const directionalLight = new THREE.DirectionalLight('#27DEDE', 1.5)
directionalLight.position.set(-2, 2, -.00001)
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight('#27DEDE', 1.5)
directionalLight2.position.set(2, 2, -.00001)
scene.add(directionalLight2)

// const helper = new THREE.DirectionalLightHelper(directionalLight, 1)
// scene.add(helper)

// GUI EXTRA
debugRenderObject.aboutStyleColor = "#ffffff"
gui.addColor(debugRenderObject, 'aboutStyleColor').onChange(() => {
    document.getElementById("AboutStatement").style.color = debugRenderObject.aboutStyleColor;
    document.getElementById("AboutHeader").style.color = debugRenderObject.aboutStyleColor;
    document.getElementById("AboutStatement2").style.color = debugRenderObject.aboutStyleColor;
}).name("About Statement Styling")

debugRenderObject.donateStyleColor = "#ffffff"
gui.addColor(debugRenderObject, 'donateStyleColor').onChange(() => {
    document.getElementById("DonateStatement").style.color = debugRenderObject.donateStyleColor;
    document.getElementById("DonateHeader").style.color = debugRenderObject.donateStyleColor;
    document.getElementById("DonateStatement2").style.color = debugRenderObject.donateStyleColor;
}).name("Donate Statement Styling")


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    if(lengthdiv > 1)
    {
        sizes.height = window.screen.height
    }
    else
    {
        sizes.height = window.innerHeight
    }

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Donate
// const torusGeometry = new THREE.TorusGeometry( 0.8 / lengthdiv, 0.1 / lengthdiv, 50, 200 );
// const torusMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const torus = new THREE.Mesh( torusGeometry, torusMaterial );
// if(lengthdiv <=1)
// {
//     torus.position.x = 0.6
//     torus.position.y =  - objectsDistances * 3 - 0.5
// }
// else
// {
//     torus.position.x = 0.3
//     torus.position.y =  - objectsDistances * 3 + 0.5
// }

// scene.add( torus );

// gui.addColor(torusMaterial, 'color').name("Dougnut")

// Torus Particles
// const torusParticlesCount = 10000
// const torusPositions = new Float32Array(randomParticlesCount * 3)
// const torusColor = new Float32Array(randomParticlesCount * 3)


// for (let i = 0; i< torusParticlesCount; i++) {
//     torusPositions[i * 3 + 0] = Math.sin(i) + 1
//     torusPositions[i * 3 + 1] = ((Math.cos(i)) + -objectsDistances * 3)
//     torusPositions[i * 3 + 2] = (Math.random() - 0.5) * 2

//     torusColor[i * 3 + 0] = Math.random()
//     torusColor[i * 3 + 1] = Math.random()
//     torusColor[i * 3 + 2] = Math.random()
// }
// const torusParticlesGeometry = new THREE.BufferGeometry()
// torusParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(torusPositions, 3))
// torusParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(torusColor, 3))


// const torusParticlesMaterial = new THREE.PointsMaterial({
//     sizeAttenuation: true,
//     size: 0.20,
//     vertexColors: true,
//     map: particleTexture,
//     depthWrite: false,
//     blending: THREE.AdditiveBlending,
// })

// const torusParticles = new THREE.Points(torusParticlesGeometry, torusParticlesMaterial)
// scene.add(torusParticles)






// Scroll
let scrollY = window.scrollY
let currentSection = 0
let aboutGSAP = gsap.to(
    "#AboutHeader",
    {rotate: 360, duration: 2.5, ease: "back"},
)
aboutGSAP.pause()
let projectGSAP = gsap.to(
    "#ProjectHeader",
    {rotate: -360, duration: 2.5, ease: "back"}
)
projectGSAP.pause()

let donateGSAP = gsap.to(
    "#DonateHeader",
    {rotate: -360, y: 0, duration: 2.5, ease: "back"}
)
donateGSAP.pause()

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if(newSection != currentSection)
    {
        currentSection = newSection

        console.log('changed', currentSection)
        if(currentSection === 1)
        {
            if(aboutGSAP.progress() >= 1)
            {
                aboutGSAP.restart()
            }
            else if(aboutGSAP.paused() == true)
            {
                aboutGSAP.play()
            }
            
        }
        else if(currentSection === 2)
        {
            if(projectGSAP.progress() >= 1)
            {
                projectGSAP.restart()
            }
            else if(projectGSAP.paused() == true)
            {
                projectGSAP.play()
            }
        }

        else if(currentSection === 3)
        {
            if(donateGSAP.progress() >= 1)
            {
                donateGSAP.restart()
            }
            else if(donateGSAP.paused() == true)
            {
                donateGSAP.play()
            }
        }

        
    }
})

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)




// Cursor
const cursor = {}
cursor.x = 0
cursor.y = 0
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})


/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
let newTime = 0
let counter = 0


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    flagMaterial.uniforms.uTime.value = elapsedTime


    fiveParticleMaterial.uniforms.uTime.value = elapsedTime % 24
    eightParticleMaterial.uniforms.uTime.value = elapsedTime % 24
    nineParticleMaterial.uniforms.uTime.value = elapsedTime % 24
    if(elapsedTime > 2 && elapsedTime < 6 )
    {
        newTime+=deltaTime
        pointLightText.position.z = Math.abs(Math.sin(newTime * 0.25))
    }
    else if(elapsedTime > 8)
    {
        pointLightText.position.z = 1

    }

    // torus.rotation.x += Math.sin(elapsedTime) * 0.01
    // torus.rotation.z += Math.sin(elapsedTime) * 0.01
    // torus.rotation.y += Math.cos(elapsedTime) * 0.01



    // Animate Camera
    camera.position.y = - (scrollY / sizes.height) * objectsDistances
    const parallaxX = cursor.x * 0.5
    const parallaxY = -cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    for(let i = 0; i < randomParticlesCount; i++) {
        const i3 = i * 3
        const x = randomParticlesGeometry.attributes.position.array[i3]
        //randomParticlesGeometry.attributes.position.array[i3] = x + Math.sin(elapsedTime)
        randomParticlesGeometry.attributes.position.array[i3 + 2] = Math.pow(Math.sin((elapsedTime*0.25 + x)) * 3, 1)

    }
    randomParticlesGeometry.attributes.position.needsUpdate = true

    

    // Render
    renderer.render(scene, camera)
    renderer.needsUpdate = true

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()