
var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) { alert("WebGL isn't available"); }

    var vv = new Float32Array([-0.25, -0.5, -0.25, 0.5, 0.25, -0.5, 0.25, -0.5, -0.25, 0.5, 0.25, 0.5, -0.5, 0.25, 0, 0.75, 0.5, 0.25])
    var xx = new Float32Array([-0.5, 0.25, 0, 0.75, 0.5, 0.25])



    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader2");
    gl.useProgram(program);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vv, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    renderSquare();



    var program2 = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program2);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, xx, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program2, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    render2();

};



function renderSquare() {
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function render2() {
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
