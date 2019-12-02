const PI = Math.PI
function rt(i) { Math.sqrt(i) };
const r2 = Math.sqrt(2) / 2;

const starNumber = 150;

var SCREEN_HEIGHT = 512;
var SCREEN_WIDTH = 512;
var CANVAS_HEIGHT = 512;
var CANVAS_WIDTH = 512;


var infMin = 0.0001

const sphereNumber = 3000;
var sphereVertices = [];

var spheres = []

var jumpHeight = 0.5;

const playerSpeed = 0.004;

var fps = 80;

var firstBirth = vec3(-1 + 0.1 + 3, 0 - 0.5, -1);

var starring = [];
var starPosition = [];

const BACKGROUND = vec4(0, 0, 0, 1)

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

var id = (str) => {
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
vec3(3.6, -3.3, 4.3 - 6.8 + 1)];

var checkPointsBGM = [
    "./Audio/henesis-dot.mp3",
    "./Audio/orbit-dot.mp3",
    "./Audio/digi-dot.mp3",
    "./Audio/cash-dot.mp3"
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

var idConcat = 0;
var GL;
var myObject;
var floors = [];
var movingObject = [];
var checks = [];
var players = [];
var playersObject = [];

var tempEye = null;

var mainColor = vec4(0.9, 0.8, 0, 1);

var entrance = true;

var isBug = false;

var bows = [];
var bow0;

var nick = "";

var isBowing = false;

var keyState = {
    up: false,
    down: false,
    left: false,
    right: false,
    shift: false,
    near: false,
    far: false,
    viewRight: false,
    viewLeft: false,
    viewRight2: false,
    viewLeft2: false,
    viewUp: false,
    viewDown: false
}
var image0;

var socket = null;

var BGM = null;

var mImage = null;

const centerPick = vec3(-1, -0, -1);

const hexToRgb = (hex) => {
    var bigint = parseInt(hex.replace('#', ''), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r, g, b];
}