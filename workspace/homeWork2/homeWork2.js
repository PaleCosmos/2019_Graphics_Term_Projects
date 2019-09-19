
var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    // 루트3/2
    const rootValue = Math.sqrt(3) / 2;

    // 예제와 가장 유사한 회전각
    const Theta = -Math.PI * 2 / 3 - 0.11;

    // 점
    const vertices = [
        vec2(0, 0),
        vec2(-0.25, 0.5 * rootValue),
        vec2(0.25, 0.5 * rootValue),
        vec2(0.5, 0),
        vec2(0.25, -0.5 * rootValue),
        vec2(-0.25, -0.5 * rootValue),
        vec2(-0.5, 0),
        vec2(-0.25, 0.5 * rootValue)
    ];


    // 회전
    for (var i = 0; i < vertices.length; i++) {
        var x = vertices[i][0];
        var y = vertices[i][1];

        vertices[i][0] = x * Math.cos(Theta) - y * Math.sin(Theta);
        vertices[i][1] = x * Math.sin(Theta) + y * Math.cos(Theta);
    }

    vertices.push(vertices[1]);

    // 색상
    const colors = [
        vec4(1.0, 1, 1, 1.0),
        vec4(0, 1, 0.0, 1.0),
        vec4(1.0, 1.0, 0, 1.0),
        vec4(1.0, 0, 0, 1.0),
        vec4(1, 0, 1, 1.0),
        vec4(0, 0, 1, 1.0),
        vec4(0, 1, 1, 1.0)
    ];

    colors.push(colors[1]);


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
};
