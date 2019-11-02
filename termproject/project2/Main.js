
var idConcat = 0;
var GL;
var size = 0.2;
var bet = 1;
var leng = 1;
var bool = true
var r2 = Math.sqrt(2) / 2;
var values = {
    left: [vec3(-0.2, -0, 1.5), 1],
    right: [vec3(0.2, 0, 1.5), 1],
    center: [vec3(0, 0, 1.5), 0],
    up: [vec3(0, 0.2, 1.5), 1],
    down: [vec3(0, -0.2, 1.5), 1],

    rightup: [vec3(0, 0, 1.5+0.2), 1],
    leftup: [vec3(0, 0, 1.5-0.2), 1]
};

window.onload = () => {
    GL = PaleGL.getInstance(document.getElementById("gl-canvas"))
        .add(new Cube(vec3(0, 0, 1.5), 1, idConcat++, true,true).using())
        .add(new Cube(values.left[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0.01 * bet * values.left[1], 0, 0)
                element.setRotationByY(1 / 20 * bet * values.left[1]);
                //element.setColor_GL(setValue())
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
        .add(new Cube(values.leftup[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0,
                    0,
                    -0.01 * bet * values.leftup[1])
                element.setRotationByX(1 / 20 * bet * values.leftup[1] * r2);
                element.setRotationByY(1 / 20 * bet * values.leftup[1] * r2);
                //element.setColor_GL(setValue())
            }

            if (element.z < -0.8 +1.5 && bet == 1) {
                values.leftup[1] = -1
            } else if (element.z < -0.8 +1.5&& bet == -1) {
                values.leftup[1] = 1
            }
            if (element.z > -0.2 +1.5&& bet == 1) {
                values.leftup[1] = 1
            } else if (element.z > -0.2+1.5 && bet == -1) {
                values.leftup[1] = -1
            }
        }).using())
        .add(new Cube(values.rightup[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0,
                    0
                    , 0.01 * bet * values.rightup[1])
                element.setRotationByX(1 / 20 * bet * values.rightup[1] * r2);
                element.setRotationByY(-1 / 20 * bet * values.rightup[1] * r2);
            }

            if (element.z > 0.8+1.5 && bet == 1) {
                values.rightup[1] = -1
            } else if (element.z > 0.8+1.5 && bet == -1) {
                values.rightup[1] = 1
            }
            if (element.z < 0.2+1.5 && bet == 1) {
                values.rightup[1] = 1
            } else if (element.z < 0.2+1.5 && bet == -1) {
                values.rightup[1] = -1
            }
        }).using())
        .add(new Cube(values.center[0], 0.2, idConcat++, true, true).setColor_GL(
            //setValue()
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
                element.setRotationByY(1 / 20 * bet * values.right[1]);
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
                element.setRotationByX(1 / 20 * bet * values.up[1]);
            }
            if (element.y > 0.8 && bet == 1) {
                values.up[1] = -1
            } else if (element.y > 0.8 && bet == -1) {
                values.up[1] = 1
            }
            if (element.y < 0.2 && bet == 1) {
                values.up[1] = 1
            } else if (element.y < 0.2 && bet == -1) {
                values.up[1] = -1
            }
        }).using())
        .add(new Cube(values.down[0], 0.2, idConcat++, false).setColor_GL(
            setValue()
        ).setCallbackAction((_, element) => {
            if (bool) {
                element.move(0, 0.01 * bet * values.down[1], 0)
                element.setRotationByX(1 / 20 * bet * values.down[1]);
            }
            if (element.y < -0.8 && bet == 1) {
                values.down[1] = 1
            } else if (element.y < -0.8 && bet == -1) {
                values.down[1] = -1
            }
            if (element.y > -0.2 && bet == 1) {
                values.down[1] = -1
            } else if (element.y > -0.2 && bet == -1) {
                values.down[1] = 1
            }
        }).using())


    setListener();

    GL.rendering();
}

function setListener() {
    var start = document.getElementById("stop");

    document.getElementById("left").onclick = function () { bet = -1 };
    start.onclick = function () {
        if (bool) {
            start.textContent = "START"
        } else {
            start.textContent = "STOP"
        }
        bool = !bool
    };
    document.getElementById("right").onclick = function () { bet = 1 };
    addKeyListener(document)
}

function addKeyListener(doc) {
    // doc.addEventListener('keydown', (e) => {
    //     switch (e.keyCode) {
    //         case 87: // w
    //             GL.move_front();
    //             break;
    //         case 65: // a
    //             GL.move_left();
    //             break;
    //         case 83: // s
    //             GL.move_back();
    //             break;
    //         case 68: // d
    //             GL.move_right();
    //             break;
    //         case 38: // up
    //             GL.view_up();
    //             break;
    //         case 37: // left
    //             GL.view_left();
    //             break;
    //         case 40: //down
    //             GL.view_down();
    //             break;
    //         case 39: //right
    //             GL.view_right();
    //             break;
    //     }
    // });

    document.getElementById("radiusSlider").onchange = function(event) {
        PaleGL.state.radius = event.target.value;
    };
    document.getElementById("thetaSlider").onchange = function(event) {
        PaleGL.state.theta = event.target.value* Math.PI/180.0;
    };
    document.getElementById("phiSlider").onchange = function(event) {
        PaleGL.state.phi = event.target.value* Math.PI/180.0;
    };
    document.getElementById("aspectSlider").onchange = function(event) {
        PaleGL.state.aspect = event.target.value;
    };
    document.getElementById("fovSlider").onchange = function(event) {
        PaleGL.state.fovy = event.target.value;
    };
};

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