// 201735829 박상현
var canvas;
var gl;
window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    var clearColor = vec4(0.0, 0.0, 0.0, 1.0);
    gl = loadGL(canvas, clearColor);
    initView();
};
function initView() {
    drawBackground();
    drawTreeBar( 
        [vec2(-0.9, -0.73),
         vec2(-0.925, -0.73),
         vec2(-0.925, -0.88),
         vec2(-0.9, -0.88),], 143, 54, 20);
    drawTree(-0.91, -0.74, 1, 0,0.025);
    
    drawTreeBar( 
        [vec2(0.945, -0.82),
        vec2(0.96, -0.82),
        vec2(0.96, -0.88),
        vec2(0.945, -0.88),], 143, 54, 20);    
    drawTree(0.95, -0.82, 0.5, 0,0.02);

    drawMainTower(0.83, -0.88, 0.2);
  
    drawMainTower(0.55, -0.88 - 0.005, 0.4);
    drawTreeBar( 
        [vec2(0.386, -0.79),
        vec2(0.372, -0.79),
        vec2(0.372, -0.88),
        vec2(0.386, -0.88),], 143, 54, 20); 
    drawTree(0.38, -0.79, 0.8, 0,0.02);

    drawMainTower(0.1, -0.88 - 0.005 * 2, 0.6);
    drawTreeBar( 
        [vec2(0.94-1.1, -0.75),
        vec2(0.96-1.1, -0.75),
        vec2(0.96-1.1, -0.88),
        vec2(0.94-1.1, -0.88),], 143, 54, 20); 
    
    drawTree(0.95-1.1, -0.77, 0.9, 0,0.022);
     
    drawMainTower(-0.5, -0.88 - 0.005 * 3, 0.8);
    drawTreeBar( 
        [vec2(0.94-1.75, -0.75),
        vec2(0.96-1.75, -0.75),
        vec2(0.96-1.75, -0.88),
        vec2(0.94-1.75, -0.88),], 143, 54, 20); 
    drawTree(0.94-1.73, -0.77, 1, 0,0.020);
}
;

function drawTree(x, y, mult, theta, radi) {
    if (theta === void 0) { theta = PI * (0); }
    var mVertices = [
        vec2(0.0, 0.0),
        vec2(0.025, -0.023),
        vec2(-0.024, -0.022),
        vec2(0.024, 0.023),
        vec2(-0.02, 0.02),
        vec2(-0.032, 0),
        vec2(0.032, 0),
        vec2(0, -0.03),
        vec2(0, 0.03),
        vec2(0.035, 0.03)
        ,vec2(0.038,-0.036 )
        ,vec2(-0.039, 0.038)
        ,vec2(0, 0.05)
        ,vec2(-0.045, 0.001)
        ,vec2(-0.05, -0.032)
        ,vec2(-0.01, -0.036)
        ,vec2(0.01, -0.036)
        ,vec2(0.05, 0)

    ];
    var radiuses = [
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi+0.008, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        vec2(radi, 1),
        
        
        
        
    ];
    var mVertices2 = [];
    for (var d = 0; d < radiuses.length; d++) {
        mVertices2.push(vec2(-1 * mVertices[d][0], mVertices[d][1]));
    }
    // resize
    for (var count = 0; count < mVertices.length; count++) {
        var vec2_ = rotated(mVertices[count], theta);
        mVertices[count][0] = vec2_[0] * mult + x;
        mVertices[count][1] = vec2_[1] * mult + y;
        if (count < mVertices2.length) {
            var vec2k_ = rotated(mVertices2[count], theta);
            mVertices2[count][0] = vec2k_[0] * mult + x;
            mVertices2[count][1] = vec2k_[1] * mult + y;
        }
        if (count < radiuses.length)
            radiuses[count][0] *= mult;
    }
    for (var x = 0; x < radiuses.length; x++) {
        drawCircle(gl, radiuses[x][0], mVertices[x], vec4(138/255, 159/255, 40/255, 1), radiuses[x][1], theta);
        //drawCircle(gl, radiuses[x][0], mVertices2[x], vec4(1, 1, 1, 1), -1 * radiuses[x][1], -1 * theta);
    }
};

function drawTreeBar(vertex,r,g,b){
    drawRectangle(gl,vertex,0,getColorValue(r,g,b,255));
};

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
        vec2(-1, -1 + (1 / 20)),
        vec2(1, -1 + (1 / 8)),
        vec2(-1, -1 + (1 / 8)),
        vec2(-1,-1 + (1 / 8)+0.01),
        vec2(1,-1 + (1 / 8)+0.01)        
    ];
    drawRectangle(gl, mVertices, 0, getColorValue(30, 30, 30, 255));
    drawRectangle(gl, mVertices, 4, getColorValue(173, 201, 94, 255));
    drawRectangle(gl, mVertices, 8, getColorValue(141, 152, 54, 255));
    drawRectangle(gl, mVertices, 12, getColorValue(174, 105, 68, 255));
    drawRectangle(gl, mVertices, 16, getColorValue(154, 88, 47, 255));
    drawRectangle(gl, mVertices, 20, getColorValue(255, 255, 255, 255));
}
;
function drawMainTower(x, y, mult, theta) {
    if (theta === void 0) { theta = 0; }
    drawHarfTower(x, y, mult, true, theta);
}
;
function drawHarfTower(x, y, mult, isLeft, theta) {
    var devideValue = 1.0;
    var center_x = 0;
    var center_y = 12.4 / 11;
    var circleValue = 3.9;
    var height = 0.4 / 11;
    var width = 0.5 / 11;
    var rat = 0.05 / 11;
    var radius = 0.05;
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
        circleValue = 2;
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
    drawCircle(gl, mult * (1 / 11), mVertices[50], getColorValue(92, 83, 85, 255 / devideValue), circleValue);
    // 원 중점 리턴
    return vec4(mVertices[51][0], mVertices[51][1], mult, radius);
}
;

