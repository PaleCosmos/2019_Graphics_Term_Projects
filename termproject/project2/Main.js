
var idConcat = 0;
var GL;
var size = 0.2;
var bet = 1;
var leng = 1;
var bool = true
var values = {
    left: [vec3(-0.2, -0, -0.5), -1],
    right: [vec3(0.2, 0, -0.5), 1],
    center: [vec3(0, 0, -0.5), 0],
    up: [vec3(0, 0.2, -0.5), 1],
    down: [vec3(0, -0.2, -0.5), -1],
};

window.onload = () => {
    GL = PaleGL.getInstance(document.getElementById("gl-canvas"))
        .add(new Cube(values.left[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0.01 * bet * values.left[1], 0, 0)
                element.setRotationByX(1 / 20 * bet);
                element.setRotationByY(-1 / 20 * bet);
                element.setRotationByZ(-1 / 20 * bet);
            }

            if (element.x < -0.8 && bet == 1) {
                values.left[1] = 1
            } else if (element.x < -0.8 && bet == -1) {
                values.left[1] = -1
            }
            if (element.x > -0.2 && bet == 1) {
                values.left[1] = -1
            } else if (element.x > -0.2 && bet == -1) {
                values.left[1] = 1
            }

        }).using())
        .add(new Cube(values.center[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.resizing(size);
                size += 0.01 * bet * leng;

                if (size > 0.3 && bet == 1) {
                    leng = -1;
                } else if (size > 0.3 && bet == -1) {
                    leng = 1;
                }
                if (size < 0.1 && bet == 1) {
                    leng = 1;
                } else if (size < 0.1 && bet == -1) {
                    leng = -1
                }

                element.setRotationByX(1 / 20 * bet);
                element.setRotationByY(1 / 20 * bet);
                element.setRotationByZ(1 / 20 * bet);
            }
        }).using())
        .add(new Cube(values.right[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((vertice, element) => {
            if (bool) {
                element.move(+0.01 * bet * values.right[1], 0, 0)
                element.setRotationByX(-1 / 20 * bet);
                element.setRotationByY(1 / 20 * bet);
                element.setRotationByZ(1 / 20 * bet);
            }

            if (element.x > 0.8 && bet == 1) {
                values.right[1] = -1
            } else if (element.x > 0.8 && bet == -1) {
                values.right[1] = 1
            }
            if (element.x < 0.2 && bet == 1) {
                values.right[1] = 1
            } else if (element.x < 0.2 && bet == -1) {
                values.right[1] = -1
            }
        }).using())
        .add(new Cube(values.up[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0, +0.01 * bet * values.up[1], 0)
                element.setRotationByX(-1 / 20 * bet);
                element.setRotationByY(1 / 20 * bet);
                element.setRotationByZ(-1 / 20 * bet);
            }
            if (element.y > 0.8 && bet == 1) {
                values.up[1] = -1
            } else if (element.x > 0.8 && bet == -1) {
                values.up[1] = 1
            }
            if (element.y < 0.2 && bet == 1) {
                values.up[1] = 1
            } else if (element.x < 0.2 && bet == -1) {
                values.up[1] = -1
            }
        }).using())
        .add(new Cube(values.down[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0, 0.01 * bet * values.down[1], 0)
                element.setRotationByX(1 / 20 * bet);
                element.setRotationByY(-1 / 20 * bet);
                element.setRotationByZ(1 / 20 * bet);
            }
            if (element.y < -0.8 && bet == 1) {
                values.down[1] = 1
            } else if (element.x < -0.8 && bet == -1) {
                values.down[1] = -1
            }
            if (element.y > -0.2 && bet == 1) {
                values.down[1] = -1
            } else if (element.x > -0.2 && bet == -1) {
                values.down[1] = 1
            }
        }).using())


    setListener();

    GL.rendering();
}

function setListener() {
    document.getElementById("Button1").onclick = function () { GL.setRadius(0.05) };
    document.getElementById("Button2").onclick = function () { GL.setRadius(-0.05); };
    document.getElementById("Button3").onclick = function () { GL.setTheta(PaleGL.state.dr) };
    document.getElementById("Button4").onclick = function () { GL.setTheta(-PaleGL.state.dr) };
    document.getElementById("Button5").onclick = function () { GL.setPhi(PaleGL.state.dr) };
    document.getElementById("Button6").onclick = function () { GL.setPhi(-PaleGL.state.dr) };
    document.getElementById("left").onclick = function () { bool = true; bet = -1 };
    document.getElementById("stop").onclick = function () { bool = false };
    document.getElementById("right").onclick = function () { bool = true; bet = 1 };
}

function setValue() {
    let colors = [];
    for (let bar = 0; bar < 6; bar++) {
        let color = [];
        for (let cl = 0; cl < 6; cl++) {
            color.push(vertexColors[Math.floor(Math.random() * 6)])
        }
        colors.push(color);
    }
    return colors;
}

var vertexColors = [
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // cyan
];