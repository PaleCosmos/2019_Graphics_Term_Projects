const PI = Math.PI
function rt(i) { Math.sqrt(i) };
const r2 = Math.sqrt(2) / 2;

var infMin = 0.0001

var firstBirth = vec3(-1 + 0.1 + 3, 0 - 0.5, -1);

var externing = (a, b) => {
    let vec = vec3(
        (a[1] * b[2] - a[0 * b[1]]),
        (-a[0] * b[2] + a[2] * b[0]),
        (a[0] * b[1] - a[1] * b[0])
    )

    let square = Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2) + Math.pow(vec[2], 2));

    let vecA = vec3(
        vec[0] / square,
        vec[1] / square,
        vec[2] / square
    )

    return vecA;
}

var id = (str)=>{
    return document.getElementById(str)
}

var sizeOfVector = (a) => {
    return Math.sqrt(
        Math.pow(a[0], 2) +
        Math.pow(a[1], 2) +
        Math.pow(a[2], 2)
        , 2)
}

var interning = (a, b) => {
    return (a[0] * b[0] + a[1] * b[1] + a[2] * b[2])
}

var distanceOf = (a, b) => {

    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2), 2)
}

var checkPoints = [vec3(0.6, 5.3, -1),
vec3(1.6, 5 + 0.3, 7 + 0.3), vec3(1.6, -6, 7 + 0.3),
vec3(3.6, -3.3, 4.3 -6.8+1)];

var checkPointsBGM = [
    "./Audio/market.mp3",
    "./Audio/field.mp3",
    "./Audio/ele.mp3",
    "./Audio/rudi.mp3"
];

var vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),

    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0)
];

var vertexColors = [
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // cyan
];

var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

var texSize = 64;

var image1 = new Array()
for (let i = 0; i < texSize; i++)  image1[i] = new Array();
for (let i = 0; i < texSize; i++)
    for (let j = 0; j < texSize; j++)
        image1[i][j] = new Float32Array(4);
for (let i = 0; i < texSize; i++) for (let j = 0; j < texSize; j++) {
    let c = (((i & 0x8) == 0) ^ ((j & 0x8) == 0));
    image1[i][j] = [c, c, c, 1];
}

// Convert floats to ubytes for texture
var image2 = new Uint8Array(4 * texSize * texSize);

for (let i = 0; i < texSize; i++)
    for (let j = 0; j < texSize; j++)
        for (let k = 0; k < 4; k++)
            image2[4 * texSize * i + 4 * j + k] = 255 * image1[i][j][k];

//image0.crossOrigin = "Anonymous";

// var image = new Image();
// image.onload = function () {
//     configureTexture(image);
// }
// image.src = "SA2011_black.gif"