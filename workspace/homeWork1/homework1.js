// 201735829 박상현

var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);


    renderGround(); // 땅을 그립니다.

    renderCircle(0.2, 0.5, 0.7, vec4(1, 1, 0, 1)) // 달을 그립니다.

    // 집 뒤에 있는 나무를 그립니다.
    renderTree(-0.5, 0.7);
    renderTree(0.65, 0.45);


    renderHouse(); // 내 집을 그립니다.
    renderCircle(0.02, 0.168, -0.72, vec4(1, 1, 0, 1)); // 문고리입니다.

    // 집 앞에 있는 나무를 그립니다.
    renderTree(0.8, 0);
    renderTree(-0.8, 0);
    renderTree(0.4, -0.6);



    renderSnow(300); // 눈입니다.
};

function renderMountain() {
    // 산을 그리는 함수입니다.

    var mVertices = [
        vec2(-2, -0.5),
        vec2(1.5, -0.5),
        vec2(0, 0.7),

        vec2(-0.4, -0.1),
        vec2(1, 0.5),
        vec2(2, -0.1)
    ]

    renderTriangle(mVertices, 3, vec4(0, 0.2, 0, 1)); // 뒷산이라 색이 더 어둡습니다.
    renderTriangle(mVertices, 0, vec4(0, 0.3, 0, 1));
}

function renderSnow(size) {
    // 눈을 그리는 함수입니다.
    // 눈의 개수를 파라미터로 받습니다.

    for (var i = 0; i <= size; i++) {
        renderCircle(0.004, getRandomArbitrary(), getRandomArbitrary(), vec4(1, 1, 1, 1));
    }
};

function getRandomArbitrary() {
    // -1 부터 1 사이의 랜덤 숫자를 리턴합니다.
    return Math.random() * (2) - 1;
};

function renderTree(x, y) {
    // 나무를 그리는 함수입니다.
    // 나무의 center 값을 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    var k = 0.05;

    var mVertices = [
        vec2(x - 0.0625, y - 1),
        vec2(x + 0.0625, y - 1),
        vec2(x + 0.0625, y - 0.75),
        vec2(x - 0.0625, y - 0.75),

        vec2(x - 0.25, y - 0.75),
        vec2(x + 0.25, y - 0.75),
        vec2(x, y - 0.5),

        vec2(x - 0.25, y - 0.525 - k),
        vec2(x + 0.25, y - 0.525 - k),
        vec2(x, y - 0.275 - k),

        vec2(x - 0.25, y - 0.3 - k*2),
        vec2(x + 0.25, y - 0.3- k*2),
        vec2(x, y - 0.05- k*2)
    ]

    // 사각형하나와 삼각형 세개로 이루어져있습니다.

    renderRectangle(mVertices, 0, vec4(0.5, 0.25, 0, 1)) // 밑둥

    renderTriangle(mVertices, 4, vec4(0, 0.5, 0)); // 첫번째 칸
    renderTriangle(mVertices, 7, vec4(0, 0.5, 0)); // 두번째 칸
    renderTriangle(mVertices, 10, vec4(0, 0.5, 0)); // 세번째 칸
};

function renderGround() { // 땅을 과 하늘을 그립니다.

    var mVertices = [
        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, -0.2),
        vec2(-1, -0.1),
        vec2(1, -0.2),
        vec2(1, 1),
        vec2(-1, 1)
    ]


    renderRectangle(mVertices, 3, vec4(0.1, 0.1, 0.1, 1)); // 배경

    renderMountain(); // 산을 그립니다.

    renderRectangle(mVertices, 0, vec4(1, 1, 1, 1)); // alpha를 주기위한 바닥의 뒷배경
    renderRectangle(mVertices, 0, vec4(0.2, 0.3, 0.5, 0.6)); // 바닥
};

function renderHouse() { // 집을 그립니다.

    var mVertices = [
        vec2(-0.5, -0.9),
        vec2(0.3, -0.9),
        vec2(0.3, -0.3),
        vec2(-0.5, -0.3),

        vec2(0.1, -0.3),
        vec2(0.225, -0.3),
        vec2(0.225, 0.2),
        vec2(0.1, 0.2),

        vec2(-0.1, 0.25),
        vec2(-0.7, -0.3),
        vec2(0.5, -0.3),

        vec2(0.2, -0.9),
        vec2(0.2, -0.5),
        vec2(0, -0.5),
        vec2(0, -0.9),

        vec2(-0.2, -0.7),
        vec2(-0.4, -0.7),
        vec2(-0.4, -0.5),
        vec2(-0.2, -0.5),

        vec2(-0.2, -0.595),
        vec2(-0.4, -0.595),
        vec2(-0.4, -0.605),
        vec2(-0.2, -0.605),

        vec2(-0.295, -0.7),
        vec2(-0.305, -0.7),
        vec2(-0.305, -0.5),
        vec2(-0.295, -0.5)
    ]

    // 집 본체
    renderRectangle(mVertices, 0, vec4(0.8, 0.8, 0.8, 1));

    // 굴뚝
    renderRectangle(mVertices, 4, vec4(0.8, 0.8, 0.8, 1));

    // 지붕
    renderTriangle(mVertices, 8, vec4(0.9, 0.2, 0.2, 1));

    // 문
    renderRectangle(mVertices, 11, vec4(0.5, 0.25, 0, 1));

    // 창문
    renderRectangle(mVertices, 15, vec4(0, 0.5, 0.8, 1));

    // 창문 틀
    renderRectangle(mVertices, 19, vec4(0.8, 0.8, 0.8, 1)); // 가로
    renderRectangle(mVertices, 23, vec4(0.8, 0.8, 0.8, 1)); // 세로
};

function renderTriangle(mVertices, a, vec4_) {
    // 삼각형을 그리는 함수입니다.
    // 색과 위치(array와 시작점))를 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var colorLoc = gl.getUniformLocation(program, "color");
    this.gl.uniform4fv(colorLoc, vec4_);

    this.gl.getUniformLocation(program, "vOffset");
    gl.drawArrays(gl.TRIANGLES, a, 3);
};


function renderCircle(r, x, y, vec4_) {
    // 원을 그리는 함수입니다.
    // 반지름, center, 색을 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.
    // 원은 구글을 참고했습니다.

    var noOfFans = 200;

    var centerOfCircle = vec2(x, y);

    var anglePerFna = (2 * Math.PI) / noOfFans;

    var mVertices = [

    ];


    mVertices.push(centerOfCircle);

    for (var i = 0; i <= noOfFans; i++) {
        var angle = anglePerFna * (i + 1);
        mVertices.push(
            vec2(
                x + Math.cos(angle) * r,
                y + Math.sin(angle) * r
            )
        );
    }

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var colorLoc = gl.getUniformLocation(program, "color");
    gl.uniform4fv(colorLoc, vec4_);

    gl.getUniformLocation(program, "vOffset");


    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);


    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, mVertices.length); // Fan을 많이그려 원으로 보이게합니다.
};

function renderRectangle(mVertices, a, vec4_) {
    // 사각형을 그리는 함수입니다.
    // 색과 위치(array와 시작점))를 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var colorLoc = gl.getUniformLocation(program, "color");
    gl.uniform4fv(colorLoc, vec4_);

    gl.getUniformLocation(program, "vOffset");

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);


    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, a, 4);
};