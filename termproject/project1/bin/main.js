// 201735829 박상현
var canvas
var gl;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


    renderView(); // view를 그립니다.
};

function renderView() {
    // renderBackground(); // 땅을 그립니다.

    // renderCircle(0.15, 0.5, 0.7, vec4(1, 1, 0, 1)); // 달을 그립니다.
    // renderCircle(0.15, 0.42, 0.78, vec4(0.1, 0.1, 0.1, 1)); // 초승달 구현을 위한 달 그림자 입니다.

    // // 집 뒤에 있는 나무를 그립니다.
    // renderTree(-0.5, -0.3, 0.3);
    // renderTree(0.3, -0.3,0.4);

    // //renderSnowman(); // 눈사람

    // // renderSmoke(); // 굴뚝 연기 입니다.

    // renderHouse(0.0, -0.2, 0.4); // 내 집을 그립니다.

    // // 집 앞에 있는 나무를 그립니다.
    // renderTree(0.8, 0, 0.9);
    // renderTree(-0.8, 0, 0.8);
    // renderTree(0.4, -0.6, 0.7);

   

    renderSnow(); // 눈입니다.
};

function renderSnow() {
    // 눈을 그리는 함수입니다.
    // 눈의 개수를 파라미터로 받습니다.

    for (var i = 0; i <= 100; i++) {
        renderCircle(0.004,
            getRandomArbitrary(),
            getRandomArbitrary(),
            vec4(1, 1, 1, 0.3));
    }

    setTimeout(renderSnow, 100);
};

function renderSnowman() {
    const x = 0.53

    const sColor = vec4(1, 1, 1, 1);
    const oColor = vec4(0.7, 0.7, 0.7, 1);

    const smallR = 0.01;

    const bottom = vec2(x, -0.8);
    const bottomR = 0.12;

    const top = vec2(x, -0.6);

    var topR = top[1] - bottom[1] - bottomR + 0.02;

    const mValue = 0.013;
    const distance = 0.008;

    const mVertices = [
        vec2(x - 0.08, bottom[1] + 0.07),
        vec2(x - 0.08 - 0.1, bottom[1] + 0.15),
        vec2(x - 0.1, bottom[1] + 0.05 + 0.05),

        vec2(x - 0.03 + distance, top[1] - 0.04),
        vec2(x - 0.03 + distance, top[1] - 0.04 - mValue),
        vec2(x - 0.03 + distance + mValue, top[1] - 0.04 - mValue),
        vec2(x - 0.03 + distance + mValue, top[1] - 0.04),

        vec2(x - 0.03 - distance, top[1] - 0.04),
        vec2(x - 0.03 - distance, top[1] - 0.04 - mValue),
        vec2(x - 0.03 - distance - mValue, top[1] - 0.04 - mValue),
        vec2(x - 0.03 - distance - mValue, top[1] - 0.04),

        vec2(x - 0.03 - 0.01, top[1] + 0.003),
        vec2(x - 0.1 - 0.01, top[1] - 0.02),
        vec2(x - 0.03 - 0.01, top[1] - 0.03 + 0.003),
    ];

    // 팔
    renderTriangle(mVertices, 0, vec4(0.5, 0.25, 0, 1));

    // 아래 눈덩이
    renderCircle(bottomR + 0.01, x, bottom[1], oColor);
    renderCircle(bottomR, x, bottom[1], sColor);

    // 윗 눈덩이
    renderCircle(topR + 0.01, x, top[1], oColor);
    renderCircle(topR, x, top[1], sColor);

    // 단추
    renderCircle(smallR, x - 0.03, bottom[1] + 0.05, vec4(0, 0, 0, 1));
    renderCircle(smallR, x - 0.03, bottom[1], vec4(0, 0, 0, 1));
    renderCircle(smallR, x - 0.03, bottom[1] - 0.05, vec4(0, 0, 0, 1));

    // 입
    renderCircle(0.04, x - 0.03, top[1] - 0.04, vec4(1, 0.1, 0.2, 1));
    renderCircle(0.04, x - 0.03, top[1] - 0.04, vec4(1, 1, 1, 1), 2);

    // 이빨
    renderRectangle(mVertices, 3, vec4(1, 1, 1, 1));
    renderRectangle(mVertices, 7, vec4(1, 1, 1, 1));

    // 눈
    renderCircle(smallR - 0.0044, x - 0.03 - 0.038, top[1] + 0.022, vec4(0, 0, 0, 1));
    renderCircle(smallR - 0.0044, x - 0.03 + 0.038, top[1] + 0.022, vec4(0, 0, 0, 1));

    // 코
    renderTriangle(mVertices, 11, vec4(1, 0.5, 0, 1));
};

function renderSmoke() {
    // 굴뚝 연기를 그리는 함수입니다.

    renderCircle(0.03, 0.1625, 0.22, vec4(0.5, 0.5, 0.5, 0.4));

    renderCircle(0.07, 0.1625, 0.38, vec4(0.5, 0.5, 0.5, 0.25));

    renderCircle(0.12, 0.1625, 0.65, vec4(0.5, 0.5, 0.5, 0.1));

    renderCircle(0.25, 0.1625, 1.1, vec4(0.5, 0.5, 0.5, 0.03));
};

function renderMountain() {
    // 산을 그리는 함수입니다.

    const backColor = vec4(0, 0.2, 0, 1);
    const frontColor = vec4(0, 0.3, 0, 1);

    const backColor_GR = [
        backColor,
        vec4(0.8, 1, 0.8, 1),
        backColor
    ];

    const frontColor_GR = [
        frontColor,
        vec4(1, 1, 1, 1),
        frontColor
    ];

    const mVertices = [
        vec2(-0.4, -0.1), // y = 3/7 * x + 1/14
        vec2(1, 0.5),
        vec2(2, -0.1), // y = -3/5 * x + 11/10

        vec2(0.3, 0.2),
        vec2(1, 0.5),
        vec2(3 / 2, 0.2),

        vec2(-2, -0.5), // y = 3/5 * x + 0.7
        vec2(0, 0.7),
        vec2(1.5, -0.5), // y = -4/5 * x + 0.7

        vec2(-1, 0.1),
        vec2(0, 0.7),
        vec2(0.75, 0.1)
    ];

    renderTriangle(mVertices, 0, backColor); // 뒷산이라 색이 더 어둡습니다.
    renderTriangle_GR(verticies(mVertices, 3, 3), 0, backColor_GR); // 눈 그라데이션 (1/2 지점)

    renderTriangle(mVertices, 6, frontColor); // 앞산
    renderTriangle_GR(verticies(mVertices, 9, 3), 0, frontColor_GR); // 눈 그라데이션 (1/2 지점)
};

function renderTree(xl, yl, mult = 1.0) {
    // 나무를 그리는 함수입니다.
    // 나무의 center 값을 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    const k = 0.05; // term

    var x = xl / mult;
    var y = yl / mult;
    const mVertices = [
        vec2(x - 0.0625, y - 1),
        vec2(x + 0.0625, y - 1),
        vec2(x + 0.0625, y - 0.75),
        vec2(x - 0.0625, y - 0.75),

        vec2(x - 0.28, y - 0.75),
        vec2(x + 0.28, y - 0.75),
        vec2(x, y - 0.5),

        vec2(x - 0.25, y - 0.525 - k),
        vec2(x + 0.25, y - 0.525 - k),
        vec2(x, y - 0.275 - k),

        vec2(x - 0.20, y - 0.3 - k * 2),
        vec2(x + 0.20, y - 0.3 - k * 2),
        vec2(x, y - 0.05 - k * 2)
    ];

    mVertices.forEach(element => {
        element[0] = element[0] * mult;
        element[1] = element[1] * mult;
    });

    const colorIn = [
        vec4(1, 1, 1, 1),
        vec4(1, 1, 1, 1),
        vec4(0, 0.5, 0, 0.8)
    ];

    const colorTop = [
        vec4(0, 0.5, 0, 1),
        vec4(0, 0.5, 0, 1),
        vec4(1, 1, 1, 1)
    ];

    // 사각형하나와 삼각형 세개로 이루어져있습니다.

    renderRectangle(mVertices, 0, vec4(0.5, 0.25, 0, 1)); // 밑둥

    renderTriangle_GR(verticies(mVertices, 4, 3), 0, colorIn); // 첫번째 칸

    renderTriangle_GR(verticies(mVertices, 7, 3), 0, colorIn); // 두번째 칸

    renderTriangle_GR(verticies(mVertices, 10, 3), 0, colorTop); // 세번째 칸 (눈이 왔습니다)
};

function renderBackground() { // 땅을 과 하늘을 그립니다.

    const riverColor = vec4(0.05, 0.3, 0.55, 1);
    const groundColor = vec4(0.4, 0.6, 0.4, 1);

    const mVertices = [
        vec2(1, -0.2),
        vec2(1, 1),
        vec2(-1, 1),

        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, -0.2),
        vec2(-1, -0.1),

        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, -0.5),
        vec2(-1, -0.4),

        vec2(-1, -0.4),
        vec2(1, -0.44),
        vec2(1, -0.2),
        vec2(-1, -0.1)
    ];

    const groundColors = [
        vec4(1, 1, 1, 1),
        vec4(1, 1, 1, 1),
        groundColor,
        groundColor
    ];


    renderRectangle(mVertices, 0, vec4(0.1, 0.1, 0.1, 1)); // 배경

    renderMountain(); // 산을 그립니다.

    renderRectangle(mVertices, 3, groundColor); // 바닥
    renderRectangle_GR(verticies(mVertices, 7, 4), 0, groundColors);

    renderRectangle(mVertices, 11, riverColor); // 강

    renderCircle(0.06, 0.5, -0.33, vec4(1, 1, 0, 0.3)); // 강에 비친 달을 그립니다.

    renderCircle(0.06, 0.47, -0.36, riverColor); // 초승달 구현을 위한 달 그림자 입니다.
};

function renderHouse(x, y, mult) { // 집을 그립니다.

    const mVertices = [
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
        vec2(-0.295, -0.5),
    ];

    mVertices.forEach(element => {
        element[0] = element[0] * mult + x;
        element[1] = element[1] * mult + y;
    });

    // 집 본체
    renderRectangle(mVertices, 0, vec4(0.8, 0.8, 0.8, 1));

    // 굴뚝
    renderRectangle(mVertices, 4, vec4(0.8, 0.8, 0.8, 1));

    const colordd = [
        vec4(1, 1, 1, 1),
        vec4(1, 0, 0, 1),
        vec4(1, 0, 0, 1)
    ];

    // 눈 덮힌 지붕
    renderTriangle_GR(verticies(mVertices, 8, 3), 0, colordd);

    // 문
    renderRectangle(mVertices, 11, vec4(0.5, 0.25, 0, 1));

    // 문고리
    renderCircle(0.02 * mult, 0.04 * mult + x, -0.72 * mult + y, vec4(1, 1, 0, 1));
    renderCircle(0.0037 * mult, 0.038 * mult + x, -0.7204 * mult + y, vec4(0, 0, 0, 0.7));


    // 창문
    renderRectangle(mVertices, 15, vec4(0, 0.5, 0.8, 1));

    // 창문 틀
    renderRectangle(mVertices, 19, vec4(0.8, 0.8, 0.8, 1)); // 가로
    renderRectangle(mVertices, 23, vec4(0.8, 0.8, 0.8, 1)); // 세로
};

function renderStrip(mVertices, a, b, vec4_) {
    // 줄을 그리는 함수입니다.
    // 색과 위치(array와 시작점))를 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    settings(mVertices, getColorArray(mVertices.length, vec4_));

    gl.drawArrays(gl.LINE_STRIP, a, b);
}

function renderTriangle(mVertices, a, vec4_) {
    // 삼각형을 그리는 함수입니다.
    // 색과 위치(array와 시작점))를 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    settings(mVertices, getColorArray(mVertices.length, vec4_));

    gl.drawArrays(gl.TRIANGLES, a, 3);
};

function renderTriangle_GR(mVertices, a, vec4Arr) {
    // 그라데이션 삼각형을 그리는 함수입니다.
    // 색배열과 위치(array와 시작점))를 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    settings(mVertices, vec4Arr);

    gl.drawArrays(gl.TRIANGLES, a, 3);
}


function renderRectangle(mVertices, a, vec4_) {
    // 사각형을 그리는 함수입니다.
    // 색과 위치(array와 시작점))를 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    settings(mVertices, getColorArray(mVertices.length, vec4_));

    gl.drawArrays(gl.TRIANGLE_FAN, a, 4);
};

function renderRectangle_GR(mVertices, a, vec4Arr) {
    // 그라데이션 사각형을 그리는 함수입니다.
    // 색 배열과 위치(array와 시작점))를 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.

    settings(mVertices, vec4Arr);

    gl.drawArrays(gl.TRIANGLE_FAN, a, 4)
}

function renderCircle(r, x, y, vec4_, t = 1) {
    // 원을 그리는 함수입니다.
    // 반지름, center, 색을 파라미터로 받습니다.
    // 모듈화를 시킴으로써 코드의 양을 줄입니다.
    // 원은 구글을 참고했습니다.

    const noOfFans = 200; // Vertice의 개수

    const centerOfCircle = vec2(x, y);

    const anglePerFna = (2 * Math.PI) / noOfFans;

    const mVertices = [

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

    settings(mVertices, getColorArray(mVertices.length, vec4_))

    gl.drawArrays(gl.TRIANGLE_FAN, 0, mVertices.length / t); // Fan을 많이그려 원으로 보이게합니다.
};

function getRandomArbitrary() {
    // -1 부터 1 사이의 랜덤 숫자를 리턴합니다.
    return Math.random() * (2) - 1;
};

function verticies(mVertices, s, l) {
    // 특정 구간의 vertice를 가진 배열을 리턴하는 함수

    const mV = [];

    for (var i = s; i < s + l; i++) {
        mV.push(mVertices[i]);
    }

    return mV;
};

function getColorArray(len, vec4_) {
    // lenth만큼의 color를 가진 배열을 리턴하는 함수

    const mColor = [];

    for (var i = 0; i < len; i++) {
        mColor.push(vec4_)
    }

    return mColor;
};

function settings(mVertices, vec4Arr) {
    // 중복되는 코드를 제거하기 위해 만든 함수입니다.

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