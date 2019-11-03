
var idConcat = 0;
var GL;
var size = 0.2;
var bet = 1;
var leng = 1;
var bool = true
var r2 = Math.sqrt(2) / 2;
var values = {
    left: [vec3(-0.2, -0, 0), 1],
    right: [vec3(0.2, 0, 0), 1],
    center: [vec3(0, 0, 0), 0],
    up: [vec3(0, 0.2, 0), 1],
    down: [vec3(0, -0.2, 0), 1],

    rightup: [vec3(0, 0, 0 + 0.2), 1],
    leftup: [vec3(0, 0, 0 - 0.2), 1]
};
var myObject;
var floor;

var keyState = {
    up: false,
    down: false,
    left: false,
    right: false,
    shift: false,
    near: false,
    far: false,
}

var centerPick = vec3(-1, -0, -1);

window.onload = () => {

    GL = PaleGL.getInstance(document.getElementById("gl-canvas"))
    floor = new Cube(vec3(-3, 0, -1), 4, idConcat++, true, false).setOneColor(
        vec4(0.1, 0.5, 0.5, 1)
    ).using()
    GL.add(floor)

    myObject = new Cube(vec3(-1 + 0.1, 0 - 0.5, -1 + 0.5), 0.2, idConcat++, true, false).setOneColor(
        vec4(1, 0, 0, 1)).setCallbackAction((_, element) => {
            GL.setAt(vec3(element.x, element.y, element.z))
            if (keyState.up && keyState.left) element.move(0, 0.02 * r2, -0.02 * r2)
            else if (keyState.up && keyState.right) element.move(0, -0.02 * r2, -0.02 * r2)
            else if (keyState.down && keyState.left) element.move(0, 0.02 * r2, 0.02 * r2)
            else if (keyState.down && keyState.right) element.move(0, -0.02 * r2, 0.02 * r2)
            else if (keyState.up) element.move(0, 0, -0.02)
            else if (keyState.down) element.move(0, 0, 0.02)
            else if (keyState.left) myObject.move(0, 0.02, 0)
            else if (keyState.right) myObject.move(0, -0.02, 0)
            if (keyState.shift) myObject.changeColor()
            if (keyState.far) GL.far()
            if (keyState.near) GL.near()

        }).setGravityAction((_, element) => {
            if ((element.y - element.size / 2) <= floor.y + floor.size / 2 &&
                (element.y + element.size / 2) >= floor.y - floor.size / 2 &&
                (element.z - element.size / 2) <= floor.z + floor.size / 2 &&
                (element.z + element.size / 2) >= floor.z - floor.size / 2 &&
                (element.x - element.size / 2) <= floor.x + floor.size / 2) {
                element.teleportX(floor.x + floor.size / 2 + element.size / 2)
            } else {
                element.move(-0.08, 0, 0)
            }

            if (element.x <= floor.x - floor.size / 2) {
                element.teleport(floor.x + floor.size / 2 + element.size / 2, floor.y, floor.z)
            }
        }).using()

    GL.add(myObject)


    //example(GL);
    setListener();

    GL.rendering();
}

function example(ad) {
    ad
        .add(new Cube(vec3(0, 0, 0), 1, idConcat++, true, true).using())
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

            if (element.z < -0.8 + 0 && bet == 1) {
                values.leftup[1] = -1
            } else if (element.z < -0.8 + 0 && bet == -1) {
                values.leftup[1] = 1
            }
            if (element.z > -0.2 + 0 && bet == 1) {
                values.leftup[1] = 1
            } else if (element.z > -0.2 + 0 && bet == -1) {
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

            if (element.z > 0.8 + 0 && bet == 1) {
                values.rightup[1] = -1
            } else if (element.z > 0.8 + 0 && bet == -1) {
                values.rightup[1] = 1
            }
            if (element.z < 0.2 + 0 && bet == 1) {
                values.rightup[1] = 1
            } else if (element.z < 0.2 + 0 && bet == -1) {
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
}

function setListener() {

    document.getElementById('up').addEventListener('mousedown', (e) => {
        keyState.up = true;
    });
    document.getElementById('up').addEventListener('mouseup', (e) => {
        keyState.up = false;
    });

    document.getElementById('down').addEventListener('mousedown', (e) => {
        keyState.down = true;
    });
    document.getElementById('down').addEventListener('mouseup', (e) => {
        keyState.down = false;
    });

    document.getElementById('left').addEventListener('mousedown', (e) => {
        keyState.left = true;
    });
    document.getElementById('left').addEventListener('mouseup', (e) => {
        keyState.left = false;
    });

    document.getElementById('right').addEventListener('mousedown', (e) => {
        keyState.right = true;
    });
    document.getElementById('right').addEventListener('mouseup', (e) => {
        keyState.right = false;
    });

    document.getElementById('shift').addEventListener('mousedown', (e) => {
        keyState.shift = true;
    });
    document.getElementById('shift').addEventListener('mouseup', (e) => {
        keyState.shift = false;
    });
    document.getElementById('space').addEventListener('mouseup', (e) => {
        myObject.jump(myObject.x + 0.5);
    });


    addKeyListener(document)
}

function addKeyListener(doc) {
    doc.addEventListener('keyup', (e) => {
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 87: // w
                //myObject.move(0, 0, -0.02)
                keyState.up = false;
                document.getElementById('up').style.backgroundColor = "white";
                break;
            case 65: // a
                keyState.left = false;
                document.getElementById('left').style.backgroundColor = "white";
                //myObject.move(0, 0.02, 0)
                break;
            case 83: // s
                keyState.down = false;
                document.getElementById('down').style.backgroundColor = "white";
                // myObject.move(0, 0, 0.02)
                break;
            case 68: // d
                keyState.right = false;
                document.getElementById('right').style.backgroundColor = "white";
                //myObject.move(0, -0.02, 0)
                break;
            case 32:
                //myObject.jump(myObject.x + 0.5);
                document.getElementById('space').style.backgroundColor = "white";
                break;
            case 16:
                keyState.shift = false;
                document.getElementById('shift').style.backgroundColor = "white";
                //myObject.move(-0.08, 0, 0)
                break;
            case 38: // up
                keyState.near = false;
                break;
            case 37: // left

                break;
            case 40: //down
                keyState.far = false;
                break;
            case 39: //right

                break;
        }
        true
    });
    doc.addEventListener('keydown', (e) => {
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 87: // w
                document.getElementById('up').style.backgroundColor = "#9999ff";
                keyState.up = true;
                break;
            case 65: // a
                keyState.left = true;
                document.getElementById('left').style.backgroundColor = "#9999ff";
                //myObject.move(0, 0.02, 0)
                break;
            case 83: // s
                keyState.down = true;
                document.getElementById('down').style.backgroundColor = "#9999ff";
                // myObject.move(0, 0, 0.02)
                break;
            case 68: // d
                keyState.right = true;
                document.getElementById('right').style.backgroundColor = "#9999ff";
                //myObject.move(0, -0.02, 0)
                break;
            case 32:
                document.getElementById('space').style.backgroundColor = "#9999ff";

                if (myObject.x - myObject.size / 2 == floor.x + floor.size / 2)
                    myObject.jump(myObject.x + 0.5);
                break;
            case 16:
                keyState.shift = true;
                document.getElementById('shift').style.backgroundColor = "#9999ff";
                //myObject.move(-0.08, 0, 0)
                break;
            case 38: // up
                keyState.near = true;
                break;
            case 37: // left

                break;
            case 40: //down
                keyState.far = true;
                break;
            case 39: //right

                break;
        }
        true
    });

    document.getElementById("radiusSlider").onchange = function (event) {
        PaleGL.state.radius = event.target.value;
        console.log("radius" + PaleGL.state.radius)
    };
    document.getElementById("thetaSlider").onchange = function (event) {
        PaleGL.state.theta = event.target.value * Math.PI / 180.0;
        console.log("theta" + PaleGL.state.theta)
    };
    document.getElementById("phiSlider").onchange = function (event) {
        PaleGL.state.phi = event.target.value * Math.PI / 180.0;
        console.log("phi" + PaleGL.state.phi)
    };
    // document.getElementById("fovSlider").onchange = function(event) {
    //     PaleGL.state.fovy = event.target.value;
    //     console.log("fovy" + PaleGL.state.fovy)
    // };
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