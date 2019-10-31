
var idConcat = 0;
var GL;

var size = 0.2;
var bet = 1;

var bool = true

window.onload = () => {
    GL = PaleGL.getInstance(document.getElementById("gl-canvas"))
        .add(new Cube(-0.2, -0, -0.5, 0.2, idConcat++).setOneColor(
            vec4(1, 0, 0, 1)
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(-0.001*bet, 0, 0)
            }
            element.setRotationByX(1 / 10);
        }).getObject())
        .add(new Cube(0, 0, -0.5, 0.2, idConcat++).setOneColor(
            vec4(0, 1, 0, 1)
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.resizing(size);
                size += 0.0005*bet;
            }
        }).getObject())
        .add(new Cube(0.2, 0, -0.5, 0.2, idConcat++).setOneColor(
            vec4(0, 0, 1, 1)
        ).setCallbackAction((vertice, element) => {
            if (bool) {
                element.move(+0.001*bet, 0, 0)
            }
            element.setRotationByX(-1 / 10);
        }).getObject())
        .add(new Cube(0, 0.2, -0.5, 0.2, idConcat++).setOneColor(
            vec4(1, 1, 0, 1)
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0, +0.001*bet, 0)
            }
            element.setRotationByY(1 / 10);
        }).getObject())
        .add(new Cube(0, -0.2, -0.5, 0.2, idConcat++).setOneColor(
            vec4(0, 1, 1, 1)
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0, -0.001*bet, 0)
            }
            element.setRotationByY(-1 / 10);
        }).getObject())

    document.getElementById("Button1").onclick = function () { GL.setRadius(0.05) };
    document.getElementById("Button2").onclick = function () { GL.setRadius(-0.05); };
    document.getElementById("Button3").onclick = function () { GL.setTheta(PaleGL.state.dr) };
    document.getElementById("Button4").onclick = function () { GL.setTheta(-PaleGL.state.dr) };
    document.getElementById("Button5").onclick = function () { GL.setPhi(PaleGL.state.dr) };
    document.getElementById("Button6").onclick = function () { GL.setPhi(-PaleGL.state.dr) };
    document.getElementById("left").onclick = function () { bool = true; bet = -1 };
    document.getElementById("stop").onclick = function () { bool = false };
    document.getElementById("right").onclick = function () { bool = true; bet = 1 };

    GL.rendering();
}