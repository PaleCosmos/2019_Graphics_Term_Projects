function loadGL(canvas, vec4_) {
    var gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(vec4_[0], vec4_[1], vec4_[2], vec4_[3]);

    // 주석을 지우면 alpha를 사용했을때 뒤에가 비친다.
    // gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return gl;
};

function setGL(gl, mVertices, vec4Arr) {
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vec4Arr), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
};

function drawTriangle(gl, mVertices, start, vec4_) {
    setGL(gl, mVertices, getColorArray(mVertices.length, vec4_));

    gl.drawArrays(gl.TRIANGLES, start, 3);
};

function drawTriangleGR(gl, mVertices, start, vec4Arr) {
    setGL(gl, mVertices, vec4Arr);

    gl.drawArrays(gl.TRIANGLES, start, 3);
};

function drawRectangle(gl, mVertices, start, vec4_) {
    setGL(gl, mVertices, getColorArray(mVertices.length, vec4_));

    gl.drawArrays(gl.TRIANGLE_FAN, start, 4);
};

function drawRectangleGR(gl, mVertices, start, vec4Arr) {
    setGL(gl, mVertices, vec4Arr);

    gl.drawArrays(gl.TRIANGLE_FAN, start, 4);
};

function drawCircle(gl, r, vec2_, vec4_, t = 1, subAngle = 0) {
    const noOfFans = 200; // Vertice의 개수

    const centerOfCircle = vec2_;

    const anglePerFna = (2 * Math.PI) / noOfFans;

    var x = vec2_[0];

    var y = vec2_[1];

    var t_;

    var flag = t >= 0;

    if (t < 1 && t > -1) t_ = 1;
    else t_ = Math.abs(t);

    const mVertices = [

    ];

    mVertices.push(centerOfCircle);


    if (flag)
        for (var i = 0; i <= noOfFans; i++) {
            var angle = anglePerFna * (i + 1);
            mVertices.push(
                vec2(
                    x + Math.cos(angle + subAngle) * r,
                    y + Math.sin(angle + subAngle) * r
                )
            );
        }
    else
        for (var i = 0; i <= noOfFans; i++) {
            var angle = anglePerFna * (i + 1);
            mVertices.push(
                vec2(
                    x - Math.cos(angle + subAngle) * r,
                    y + Math.sin(angle + subAngle) * r
                )
            );
        }

    setGL(gl, mVertices, getColorArray(mVertices.length, vec4_));

    gl.drawArrays(gl.TRIANGLE_FAN, 0, mVertices.length / t_);
};