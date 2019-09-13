
var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }


    // Four Vertices

    var vertices = [
        vec2(-0.0625, -1),
        vec2(0.0625, -1),
        vec2(0.0625, -0.75),
        vec2(-0.0625, -0.75),


        vec2(-0.25, -0.75),
        vec2(0.25, -0.75),
        vec2(0, -0.5),

        vec2(-0.25, -0.525),
        vec2(0.25, -0.525),
        vec2(0, -0.225),

        vec2(-0.25, -0.3),
        vec2(0.25, -0.3),
        vec2(0, -0.05)
    ];

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    var color = vec4(0.5, 0.25, 0, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    renderSquare();

    this.renderTriangle(4, 0, 1, 0);
    this.renderTriangle(7, 0, 1, 0);
    this.renderTriangle(10, 0, 1, 0);
};


function renderSquare() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

}

function renderTriangle(a, b, c, d) {
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var color = vec4(b, c, d, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");
    gl.drawArrays(gl.TRIANGLES, a, 3);
}
