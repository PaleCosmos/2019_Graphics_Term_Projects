// 201735829 박상현

var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);


    this.renderGround(); // render ground

    this.renderCircle(0.2, 0.5, 0.7, vec4(1, 1, 0, 1)) // render Moon


    // render trees
    this.renderTree(-0.5, 0.7); 
    this.renderTree(-0.1, 0.6);
    this.renderTree(0.9, 0.8);
    this.renderTree(0.6, 0.4);
    this.renderTree(0.8, 0);

    this.renderHouse(); // render my House

    this.renderTree(-0.8, 0); // render tree front of house

    this.renderCircle(0.02, 0.168, -0.72, vec4(1, 1, 0, 1)) // 문고리
};

function renderCircle(r, x, y, vec4_) {
    // 원을 그리는 함수입니다.
    // 반지름, 중간값, 색을 파라미터로 받습니다.

    var noOfFans = 200;
    var centerOfCircle = vec2(x, y);
    var anglePerFna = (2 * Math.PI) / noOfFans;

    var mVirtices = [

    ];


    mVirtices.push(centerOfCircle);

    for (var i = 0; i <= noOfFans; i++) {
        var angle = anglePerFna * (i + 1);
        mVirtices.push(
            vec2(
                x + Math.cos(angle) * r,
                y + Math.sin(angle) * r
            )
        );
    }


    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    var color = vec4_;

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");


    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);


    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVirtices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


    gl.drawArrays(gl.TRIANGLE_FAN, 0, mVirtices.length); // Fan을 많이그려 원으로 보이게합니다.

}


function renderGround() { // 땅을 과 하늘을 그립니다.
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    var color = vec4(0.2, 0.3, 0.5, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");

    var mVertices = [
        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, -0.2),
        vec2(-1, -0.1),
        vec2(1, -0.2),
        vec2(1, 1),
        vec2(-1, 1)
    ]

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    var color = vec4(0.1, 0.1, 0.1, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 3, 4);
}

function renderHouse() { // 집을 그립니다.
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var color = vec4(0.8, 0.8, 0.8, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");

    var mVertices = [ 
        vec2(-0.5, -0.9),
        vec2(0.3, -0.9),
        vec2(0.3, -0.2),
        vec2(-0.5, -0.2),

        vec2(0.1, -0.2),
        vec2(0.25, -0.2),
        vec2(0.25, 0.2),
        vec2(0.1, 0.2),

        vec2(-0.1, 0.3),
        vec2(-0.7, -0.2),
        vec2(0.5, -0.2),

        vec2(0.2, -0.9),
        vec2(0.2, -0.5),
        vec2(0, -0.5),
        vec2(0, -0.9),

        vec2(-0.31, -0.7),
        vec2(-0.4, -0.7),
        vec2(-0.4, -0.5),
        vec2(-0.31, -0.5),

        vec2(-0.2, -0.7),
        vec2(-0.29, -0.7),
        vec2(-0.29, -0.5),
        vec2(-0.2, -0.5)
    ]

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    var color = vec4(0.9, 0.2, 0.2, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLES, 8, 3);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    var color = vec4(0.5, 0.25, 0, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 11, 4);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    var color = vec4(0, 0.5, 0.8, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 15, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 19, 4); // 굉장한 하드코딩을 사용했습니다.
}

function renderTree(x, y) { 
    // 나무를 그립니다.
    // 나무의 center 값을 파라미터로 받습니다.
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var color = vec4(0.5, 0.25, 0, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");

    var mVertices = [
        vec2(x - 0.0625, y - 1),
        vec2(x + 0.0625, y - 1),
        vec2(x + 0.0625, y - 0.75),
        vec2(x - 0.0625, y - 0.75),

        vec2(x - 0.25, y - 0.75),
        vec2(x + 0.25, y - 0.75),
        vec2(x, y - 0.5),

        vec2(x - 0.25, y - 0.525),
        vec2(x + 0.25, y - 0.525),
        vec2(x, y - 0.275),

        vec2(x - 0.25, y - 0.3),
        vec2(x + 0.25, y - 0.3),
        vec2(x, y - 0.05)
    ]

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    this.renderTriangle(4, 0, 0.5, 0);
    this.renderTriangle(7, 0, 0.5, 0);
    this.renderTriangle(10, 0, 0.5, 0);
}


function renderTriangle(a, b, c, d) { 
    // 삼각형을 그립니다.
    // 색과 위치를 파라미터로 받습니다.
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var color = vec4(b, c, d, 1);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, color);

    this.gl.getUniformLocation(program, "vOffset");
    gl.drawArrays(gl.TRIANGLES, a, 3);
}
