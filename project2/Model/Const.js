const PI = Math.PI
function rt(i) { Math.sqrt(i) };
const r2 = Math.sqrt(2) / 2;

var infMin = 0.0001

var firstBirth = vec3(-1 + 0.1 + 3, 0 - 0.5, -1);

var playerBodyColor = vec4(0.9, 0.8, 0, 1)
var otherBodyColor = vec4(0.45, 0.4, 0, 1)

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
vec3(1.6, 5 + 0.3, 7 + 0.3), vec3(1.6, -6, 7 + 0.3)];

var checkPointsBGM = [
    "./Audio/market.mp3",
    "./Audio/field.mp3",
    "./Audio/ele.mp3"
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