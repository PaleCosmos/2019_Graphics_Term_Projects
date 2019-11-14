const PI = Math.PI
function rt(i){Math.sqrt(i)};
const r2 = Math.sqrt(2) / 2;

var infMin = 0.0001

var firstBirth = vec3(-1 + 0.1 + infMin+3, 0 - 0.5, -1 );

var externing = (a, b) =>{
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