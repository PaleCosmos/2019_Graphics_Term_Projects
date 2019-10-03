// 201735829 박상현
var canvas
var gl;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    var clearColor = vec4(0.0, 0.0, 0.0, 1.0);
    gl = loadGL(canvas, clearColor);

    initView();
};

function initView() {
    drawBackground();

    // y = -0.88이 가장 적당
    drawMainTower(-0.5, -0.88, 0.5);
    drawMainTower(0, -0.88, 0.5);
    drawMainTower(0.5, -0.88, 0.5);

    drawMainTower(-0.25, -0.3, 0.5,2*PI*getRandomArbitrary());
    drawMainTower(0.25, -0.3, 0.5,2*PI*getRandomArbitrary());

    drawMainTower(0, 0.28, 0.5, 2*PI*getRandomArbitrary());
}

// 땅을 그리자
function drawBackground() {
    var mVertices = [
        // background
        vec2(1, 1),
        vec2(-1, 1),
        vec2(-1, -1),
        vec2(1, -1),

        // ground green
        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, -1 + (1 / 8)),
        vec2(-1, -1 + (1 / 8)),

        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, -1 + (1 / 10)),
        vec2(-1, -1 + (1 / 10)),

        // ground brown
        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, -1 + (1 / 12)),
        vec2(-1, -1 + (1 / 12)),

        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, -1 + (1 / 20)),
        vec2(-1, -1 + (1 / 20))
    ];
    drawRectangle(gl, mVertices, 0, getColorValue(206, 236, 236, 255));
    drawRectangle(gl, mVertices, 4, getColorValue(173, 201, 94, 255));
    drawRectangle(gl, mVertices, 8, getColorValue(141, 152, 54, 255));
    drawRectangle(gl, mVertices, 12, getColorValue(174, 105, 68, 255));
    drawRectangle(gl, mVertices, 16, getColorValue(154, 88, 47, 255));
};

// x, y는 좌표, mult는 배율, theta는 회전각
function drawMainTower(x, y, mult, theta = 0) {
    drawHarfTower(x, y, mult, true, theta);
    drawHarfTower(x, y, mult, false, theta);
};

function drawHarfTower(x, y, mult, isLeft, theta) {
    var devideValue = 1.0;
    const center_x = 0;
    const center_y = 12.4 / 11;

    const height = 0.4 / 11;
    const width = 0.5 / 11;
    const rat = 0.05 / 11;

    var mVertices = [
        //base
        vec2(0, 0),
        vec2(0.75 / 2, 0),
        vec2(0.75 / 2, 1 / 22),
        vec2(0, 1 / 22),

        vec2(0.75 / 2 - 0.01, 1 / 22),
        vec2(0.75 / 2 - 0.01, 1 / 11),
        vec2(0, 1 / 11),

        vec2(0.75 / 2 - 0.025, 1 / 11),
        vec2(0.75 / 2 - 0.025, 4.7 / 11),
        vec2(0, 4.7 / 11),

        vec2(0.75 / 2 - 0.025, 4.7 / 11),
        vec2(0.75 / 2 - 0.06, 6.1 / 11),
        vec2(0, 6.1 / 11),

        vec2(0.75 / 2 - 0.06, 6.1 / 11),
        vec2(0.75 / 2 - 0.06, 6.7 / 11),
        vec2(0, 6.7 / 11),

        vec2(0.75 / 2 - 0.09, 6.7 / 11),
        vec2(0.75 / 2 - 0.14, 11.2 / 11),
        vec2(0, 11.2 / 11),

        vec2(0.75 / 2 - 0.14, 11.2 / 11),
        vec2(0.75 / 2 - 0.14, 11.7 / 11),
        vec2(0, 11.7 / 11),

        vec2(0.75 / 2 - 0.14, 11.7 / 11),
        vec2(0.75 / 2 - 0.14, 12.55 / 11),
        vec2(0, 12.55 / 11),

        vec2(0, 12.55 / 11),
        vec2(0.75 / 2 - 0.14, 12.55 / 11),
        vec2(0, 13.35 / 11),

        vec2(0, 12.55 / 11),
        vec2(0.75 / 2 - 0.14, 12.55 / 11),
        vec2(0, 13.08 / 11),

        vec2(center_x + 0.2 / 11, 12.125 / 11 + height / 2),
        vec2(center_x + 0.2 / 11, 12.125 / 11 - height / 2),
        vec2(center_x + 0.2 / 11 + width, 12.125 / 11 - height / 2),
        vec2(center_x + 0.2 / 11 + width, 12.125 / 11 + height / 2),

        vec2(center_x + 0.2 / 11 + rat + width, 12.125 / 11 + height / 2),
        vec2(center_x + 0.2 / 11 + rat + width, 12.125 / 11 - height / 2),
        vec2(center_x + 0.2 / 11 + rat + width * 2, 12.125 / 11 - height / 2),
        vec2(center_x + 0.2 / 11 + rat + width * 2, 12.125 / 11 + height / 2),

        vec2(center_x + 0.2 / 11 + rat * 2 + width * 2, 12.125 / 11 + height / 2),
        vec2(center_x + 0.2 / 11 + rat * 2 + width * 2, 12.125 / 11 - height / 2),
        vec2(center_x + 0.2 / 11 + rat * 2 + width * 3, 12.125 / 11 - height / 2),
        vec2(center_x + 0.2 / 11 + rat * 2 + width * 3, 12.125 / 11 + height / 2),

        vec2(center_x + 0.2 / 11 + rat * 3 + width * 3, 12.125 / 11 + height / 2),
        vec2(center_x + 0.2 / 11 + rat * 3 + width * 3, 12.125 / 11 - height / 2),
        vec2(center_x + 0.2 / 11 + rat * 3 + width * 4, 12.125 / 11 - height / 2),
        vec2(center_x + 0.2 / 11 + rat * 3 + width * 4, 12.125 / 11 + height / 2),

        vec2(center_x, center_y)
    ];



    // decalcomanie
    if (isLeft) {
        // isLeft가 true이면 alpha를 1/devideValue로 한다
        devideValue = 1.05;
        for (var count = 0; count < mVertices.length; count++) {
            var value = mVertices[count];
            mVertices[count] = vec2(-1 * value[0], value[1]);
        }
    }


    // resize
    for (var count = 0; count < mVertices.length; count++) {
        var x_ = mVertices[count][0];
        var y_ = mVertices[count][1];

        var x__ = x_*Math.cos(theta) - y_*Math.sin(theta);
        var y__ = x_*Math.sin(theta) + y_ *Math.cos(theta);

        mVertices[count][0] = x__ * mult + x;
        mVertices[count][1] = y__ * mult + y;
    }

    drawRectangle(gl, mVertices, 0, getColorValue(163, 153, 152, 255 / devideValue));
    drawRectangle(gl, mVertices, 3, getColorValue(186, 177, 170, 255 / devideValue));
    drawRectangle(gl, mVertices, 6, getColorValue(170, 156, 117, 255 / devideValue));
    drawRectangle(gl, mVertices, 9, getColorValue(221, 213, 200, 255 / devideValue));
    drawRectangle(gl, mVertices, 12, getColorValue(163, 153, 154, 255 / devideValue));
    drawRectangle(gl, mVertices, 15, getColorValue(216, 92, 58, 255 / devideValue));
    drawRectangle(gl, mVertices, 18, getColorValue(170, 156, 117, 255 / devideValue));
    drawRectangle(gl, mVertices, 21, getColorValue(211, 205, 188, 255 / devideValue));
    drawTriangle(gl, mVertices, 25, getColorValue(211, 205, 188, 255 / devideValue));
    drawTriangle(gl, mVertices, 28, getColorValue(170, 156, 117, 255 / devideValue));
    drawRectangle(gl, mVertices, 31, getColorValue(170, 156, 117, 255 / devideValue));
    drawRectangle(gl, mVertices, 35, getColorValue(170, 156, 117, 255 / devideValue));
    drawRectangle(gl, mVertices, 39, getColorValue(170, 156, 117, 255 / devideValue));
    drawRectangle(gl, mVertices, 43, getColorValue(170, 156, 117, 255 / devideValue));

    // isLeft가 true일때만 원을 랜더링
    if (!isLeft) {
        drawCircle(gl, 0.06, mVertices[47], getColorValue(218, 203, 189, 255), 1);
        drawCircle(gl, 0.04, mVertices[47], getColorValue(170, 156, 117, 255), 1);
    }
}