// 201735829 박상현
var canvas
var gl;
var rot = [
    vec2(PI * (1 / 4), 0.15),
    vec2(PI * (1 / 3), 0.13),
    vec2(PI * (1 / 6), 0.09),
    vec2(PI * (1 / 2), 0.11)
]

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    var clearColor = vec4(0.0, 0.0, 0.0, 1.0);
    gl = loadGL(canvas, clearColor);

    initView();
};

function initView() {

    drawRotateObject(drawMainTower(0.83, -0.88, 0.2), rot[3][0]);
    drawRotateObject(drawMainTower(0.55, -0.88 - 0.005, 0.4), rot[2][0]);
    drawRotateObject(drawMainTower(0.1, -0.88 - 0.005 * 2, 0.6), rot[1][0]);
    drawRotateObject(drawMainTower(-0.5, -0.88 - 0.005 * 3, 0.8), rot[0][0]);


    rot.forEach(function (value, index, _) {
        rot[index][0] = value[0] + value[1];
    });

    setTimeout(initView, 100);
};

// x, y는 좌표, mult는 배율, theta는 회전각
function drawMainTower(x, y, mult, theta = 0) {
    drawHarfTower(x, y, mult, true, theta);
    return drawHarfTower(x, y, mult, false, theta);
};

function drawHarfTower(x, y, mult, isLeft, theta) {
    var devideValue = 1.0;
    const center_x = 0;
    const center_y = 12.4 / 11;
    var circleValue = 3.9;

    const height = 0.4 / 11;
    const width = 0.5 / 11;
    const rat = 0.05 / 11;

    const radius = 0.05;

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

        vec2(0, 7 / 11),
        vec2(1 / 11, 7 / 11),
        vec2(1 / 11, 8.58 / 11),
        vec2(0, 8.5 / 11),

        vec2(center_x, center_y)
    ];

    // decalcomanie
    if (isLeft) {
        // isLeft가 true이면 alpha를 1/devideValue로 한다
        devideValue = 1.05;
        circleValue=2;
        for (var count = 0; count < mVertices.length; count++) {
            var value = mVertices[count];
            mVertices[count] = vec2(-1 * value[0], value[1]);
        }
    }
    // resize
    for (var count = 0; count < mVertices.length; count++) {
        var vec2_ = rotated(mVertices[count], theta);

        mVertices[count][0] = vec2_[0] * mult + x;
        mVertices[count][1] = vec2_[1] * mult + y;
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

    drawRectangle(gl, mVertices, 47, getColorValue(92, 83, 85, 255 / devideValue));

    drawCircle(gl, mult * (1 / 11), mVertices[50], getColorValue(92, 83, 85, 255 / devideValue), circleValue)
    // 원 중점 리턴
    return vec4(mVertices[51][0], mVertices[51][1], mult, radius);
};

function drawRotateObject(vec4_, theta = PI * 2) {
    var x = vec4_[0];
    var y = vec4_[1];
    var mult = vec4_[2] * 0.9;
    var radius = vec4_[3];

    var color = getColorValue(200, 96, 42, 255);

    var width = 1 / 28;
    var width2 = 2.7 / 22;

    var height = 0.24;

    var mVertices = [
        // 기둥
        vec2(-width / 2, -1),
        vec2(-width / 2, 1),
        vec2(width / 2, 1),
        vec2(width / 2, -1),

        vec2(-1, -width / 2),
        vec2(1, -width / 2),
        vec2(1, width / 2),
        vec2(-1, width / 2),
    ];

    var mVertices2 = [
        // 옆에 조금 삐져나온거
        vec2(width / 2, height),
        vec2(width, height),
        vec2(width, 1),
        vec2(width / 2, 1),
    ];

    var mVertices3 = [
        // 돛
        vec2(width, height),
        vec2(width + width2, height),
        vec2(width + width2 * 3 / 2, 1),
        vec2(width, 1),
    ];

    // 좌표돌려쓰기
    for (var i = 0; i < 2 * PI; i += PI / 2) {
        mVertices2.forEach(function (item, index, array) {
            mVertices.push(rotated(item, i));
        });
    }
    for (var i = 0; i < 2 * PI; i += PI / 2) {
        mVertices3.forEach(function (item, index, array) {
            mVertices.push(rotated(item, i));
        });
    }

    for (var count = 0; count < mVertices.length; count++) {
        var vec2_ = rotated(mVertices[count], theta);

        mVertices[count][0] = vec2_[0] * mult + x;
        mVertices[count][1] = vec2_[1] * mult + y;
    }

    drawRectangle(gl, mVertices, 0, color);
    drawRectangle(gl, mVertices, 4, color);

    for (var i = 0; i < 4; i++) {
        drawRectangle(gl, mVertices, 8 + i * 4, getColorValue(218, 218, 205, 255));
        drawRectangle(gl, mVertices, 24 + i * 4, getColorValue(254, 254, 246, 255));
    }

    drawCircle(gl, radius * mult, vec2(x, y), getColorValue(218, 203, 189, 255), 1);
    drawCircle(gl, (radius - 0.02) * mult, vec2(x, y), getColorValue(170, 156, 117, 255), 1);
};
