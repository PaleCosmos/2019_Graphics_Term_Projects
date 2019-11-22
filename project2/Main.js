
var idConcat = 0;
var GL;
var myObject;
var floors = [];
var movingObject = [];
var checks = [];

var fps = 80;

var bows = [];
var bow0;

var isBowing = false;
/////////////////////////////  DEBUG MODE
var isDebug = true
var DebugSwitcher = 0
/////////////////////////////

var jumpHeight = 0.5;

var playerSpeed = 0.003;

var keyState = {
    up: false,
    down: false,
    left: false,
    right: false,
    shift: false,
    near: false,
    far: false,
    viewRight: false,
    viewLeft: false,
    viewRight2: false,
    viewLeft2: false,
    viewUp: false,
    viewDown: false
}

var BGM = null;

const centerPick = vec3(-1, -0, -1);

window.onload = () => {
    if (isDebug) {

        if (DebugSwitcher != 0) {
            firstBirth = checkPoints[DebugSwitcher - 1];
        }
        bows = [
            new Audio('./Audio/bow1.mp3'),
            new Audio('./Audio/bow2.wav'),
            new Audio('./Audio/bow3.wav'),
            new Audio('./Audio/bow4.mp3'),
            new Audio('./Audio/bow5.wav'),
            new Audio('./Audio/bow6.wav')
        ];
        bow0 = bows[0];
        BGM = new Audio('./Audio/henesis.mp3')
        BGM.loop = true;
        BGM.play();
        document.getElementById('starting').setAttribute('class', 'button2')
        document.getElementById('gl-canvas').setAttribute('class', 'canvas2')
        document.getElementById('textArea').setAttribute('class', 'debuging')

        doWork();
    } else {
        document.getElementById('starting').addEventListener('click', (e) => {
            bows = [
                new Audio('./Audio/bow1.mp3'),
                new Audio('./Audio/bow3.wav'),
                new Audio('./Audio/bow4.mp3'),
                new Audio('./Audio/bow5.wav'),
                new Audio('./Audio/bow6.wav')
            ];
            bow0 = bows[0];
            BGM = new Audio('./Audio/henesis.mp3')
            BGM.loop = true;
            BGM.play();
            document.getElementById('starting').setAttribute('class', 'button2')
            document.getElementById('gl-canvas').setAttribute('class', 'canvas2')
            document.getElementById('textArea').setAttribute('class', 'nodebuging')

            doWork();
        });
    }
}

function doWork() {
    GL = PaleGL.getInstance(document.getElementById("gl-canvas"))
    addFloorObject();

    myObject = new Player(firstBirth, 0.2, idConcat++, false, false).setOneColor(
        vec4(1, 1, 1, 0)).setCallbackAction(playerObjectCallbackAction).setGravityAction(floors).using()

    setListener();

    let BACKGROUND = vec4(0.3, 1, 1, 1)

    GL.addFloor(floors)
        .addChecks(checks)
        .addMovingObject(movingObject)
        .add(new Cube(vec3(-83, 0, -1), 80, idConcat++, true, false).setOneColor(
            vec4(0.5, 0.25, 0, 1)
        ).using()) // floor

        .add(new Cube(vec3(77, 0, -1), 80, idConcat++, true, false).setOneColor(
            BACKGROUND
        ).using()) // top
        //////////
        .add(new Cube(vec3(-3, 80, -1), 80, idConcat++, true, false).setOneColor(
            BACKGROUND
        ).using())
        .add(new Cube(vec3(-3, -80, -1), 80, idConcat++, true, false).setOneColor(
            BACKGROUND
        ).using())
        .add(new Cube(vec3(-3, 0, 79), 80, idConcat++, true, false).setOneColor(
            BACKGROUND
        ).using())
        .add(new Cube(vec3(-3, 0, -81), 80, idConcat++, true, false).setOneColor(
            BACKGROUND
        ).using())
        .add(new Cube(vec3(-3, 10, -10), 2, idConcat++, true, false).setOneColor(
            vec4(1, 0.5, 0.5, 1)
        ).using())

        .add(new Tree(vec3(-15, -9, -9.3), 0.85, idConcat++, true, false)
            .using().setRotationByX(Math.PI / 4))
        .add(new Tree(vec3(-15, 9, -9), 0.7, idConcat++, true, false)
            .using().setRotationByX(Math.PI / 5))
        .add(new Tree(vec3(-12, -14, 16), 1, idConcat++, true, false)
            .using().setRotationByX(Math.PI / 6))
        .add(new Tree(vec3(-13, 19.3, 2), 0.75, idConcat++, true, false)
            .setLeafColor(vec4(1, 0.8, 1, 1)).setBallColor(vec4(1, 0.4, 1, 1)).using().setRotationByX(Math.PI / 2))
        ////////////
        .add(myObject)
        .rendering();

    // if (isDebug) {박상현최고
    //     myObject.teleport(1, -0.2, 7 + 0.3);
    // }
}

const playerObjectCallbackAction = (_, element) => {
    GL.setAt(vec3(element.x, element.y, element.z))
    if (keyState.up && keyState.left) element.move(0, playerSpeed * r2, -playerSpeed * r2, false, floors)
    else if (keyState.up && keyState.right) element.move(0, -playerSpeed * r2, -playerSpeed * r2, false, floors)
    else if (keyState.down && keyState.left) element.move(0, playerSpeed * r2, playerSpeed * r2, false, floors)
    else if (keyState.down && keyState.right) element.move(0, -playerSpeed * r2, playerSpeed * r2, false, floors)
    else if (keyState.up) element.move(0, 0, -playerSpeed, false, floors)
    else if (keyState.down) element.move(0, 0, playerSpeed, false, floors)
    else if (keyState.left) element.move(0, playerSpeed, 0, false, floors)
    else if (keyState.right) element.move(0, -playerSpeed, 0, false, floors)
    if (keyState.shift) bow0.play();
    if (keyState.far) GL.far()
    if (keyState.near) GL.near()
    if (keyState.viewLeft2) element.viewLeft()
    if (keyState.viewRight2) element.viewRight()
    if (keyState.viewLeft) element.viewLeft(false)
    if (keyState.viewRight) element.viewRight(false)
    if (keyState.viewUp) element.viewUp()
    if (keyState.viewDown) element.viewDown()
}

function fallingCallback(_, element) {
    if ((element.y + element.size / 2 >= myObject.y - myObject.size / 2 &&
        element.y - element.size / 2 <= myObject.y + myObject.size / 2) &&
        (element.z + element.size / 2 >= myObject.z - myObject.size / 2 &&
            element.z - element.size / 2 <= myObject.z + myObject.size / 2) &&
        (Math.abs(element.x - myObject.x)) < 0.01 + (myObject.size / 2 + element.size / 2)) {
        element.setOneColor(vec4(1, 0, 0, 1))
        element.move(-0.1, 0, 0)
    } else {
        element.setOneColor(vec4(0.5, 0, 0.5, 1))
    }
}

function addFloorObject() {

    //purple square
    floors.push(new Cube(vec3(-2 + 0.15, 1.5, -1), 0.3, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).using());

    floors.push(new Cube(vec3(-2 + 0.3, 1.8, -1), 0.3, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).setCallbackAction(fallingCallback).using());

    floors.push(new Cube(vec3(-2 + 0.45, 2.1, -1), 0.3, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).setCallbackAction(fallingCallback).using());

    floors.push(new Cube(vec3(-2 + 0.6, 2.4, -1), 0.3, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).using());

    floors.push(new Cube(vec3(-2 + 0.75, 2.7, -1), 0.3, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).using());

    floors.push(new Cube(vec3(-3.5, 0, -1), 3, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).using());

    //green square

    floors.push(new Cube(vec3(-3, 5 + 0.3, -1), 4, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());
    floors.push(new Cube(vec3(-1, 5 + 0.3, -1), 1, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    checks.push(new Cube(vec3(-0.4, 5 + 0.3, -1), 0.1, idConcat++, true, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-1, 5 + 0.3, 1.5), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-0.8, 4.6, 1.7), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-0.3, 5, 1.9), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-0.6, 5.3, 2.4), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    let superSpeed = 0.08;
    movingObject.push(new Cube(vec3(-0.4, 5.3, 2.4), 0.2, idConcat++, false, false).setOneColor(
        vec4(1, 0, 0, 1)
    ).setCallbackAction((_, element) => {
        if (element.y >= (5.3 + 2) || element.y <= (5.3 - 2)) {
            superSpeed *= -1;
        }
        element.setOneColor(vec4(1, 0, 0, 1))
        element.move(0, superSpeed, 0)
        if (distanceOf(vec3(element.x, element.y, element.z), vec3(myObject.x, myObject.y, myObject.z)) <= ((element.size / 2) + (myObject.size / 2)) + 0.001) {
            myObject.move(0, superSpeed, 0, true)
        }
    }).using());

    floors.push(new Cube(vec3(-0.6, 5.3, 2.9), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-0.6, 4.7, 3.4), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-0.3, 4.9, 3.9), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-0.3, 4.9, 4.5), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-0.1, 4.9, 4.9), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    // blue squares
    floors.push(new Cube(vec3(0, 5 + 0.3, 7 + 0.3), 1, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());
    checks.push(new Cube(vec3(0.6, 5 + 0.3, 7 + 0.3), 0.1, idConcat++, true, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-2, 5 + 0.3, 7 + 0.3), 4, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());

    floors.push(new Cube(vec3(-1, 2 + 0.3, 7 + 0.3), 0.3, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());

    floors.push(new Cube(vec3(0, 2 + 0.8, 7 + 0.3), 0.3, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using())


    //moveObejct
    let sspeed = 0.08;
    floors.push(new Cube(vec3(-1, 1.6, 6.5 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setCallbackAction((_, element) => {
        if ((element.y + element.size / 2 >= myObject.y - myObject.size / 2 &&
            element.y - element.size / 2 <= myObject.y + myObject.size / 2) &&
            (element.z + element.size / 2 >= myObject.z - myObject.size / 2 &&
                element.z - element.size / 2 <= myObject.z + myObject.size / 2) &&
            (Math.abs(element.x - myObject.x)) < 0.01 + (myObject.size / 2 + element.size / 2)) {
            element.setOneColor(vec4(1, 0, 0, 1))

        } else {
            element.setOneColor(vec4(0, 0, 1, 1))
        }
        if (element.x >= -1 + 1 || element.x <= -1 - 0.5) {
            sspeed *= -1;
        }
        element.move(sspeed, 0, 0)
    }).using());


    floors.push(new Cube(vec3(0, 1.3, 7 + 0.3), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());
    floors.push(new Cube(vec3(0 + 0.2, 0.8, 7 + 0.3), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());

    let sspeed3 = 0.08;
    floors.push(new Cube(vec3(0.2, 0.3, 7.3 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setCallbackAction((_, element) => {
        if ((element.y + element.size / 2 >= myObject.y - myObject.size / 2 &&
            element.y - element.size / 2 <= myObject.y + myObject.size / 2) &&
            (element.z + element.size / 2 >= myObject.z - myObject.size / 2 &&
                element.z - element.size / 2 <= myObject.z + myObject.size / 2) &&
            (Math.abs(element.x - myObject.x)) < 0.01 + (myObject.size / 2 + element.size / 2)) {
            if (element.y >= 0.5 + 1 || element.y <= 0.5 - 1) {
                sspeed3 *= -1;
            }
            element.setOneColor(vec4(1, 0, 0, 1))
            element.move(0, sspeed3, 0)
        } else {
            element.setOneColor(vec4(0, 0, 1, 1))
        }
    }).using());

    floors.push(new Cube(vec3(0.2, 0.3, 6.7 + 0.3), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());

    floors.push(new Cube(vec3(0.7, -0.2, 7 + 0.3), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());

    floors.push(new Cube(vec3(0.2, -0.8, 7 + 0.3), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());

    let speed2 = 0.08

    movingObject.push(new Cube(vec3(0.4, -0.8, 7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(1, 0, 0, 1)
    ).setCallbackAction((_, element) => {
        if (element.z >= (7 + 0.3 + 2) || element.z <= (7 + 0.3 - 2)) {
            speed2 *= -1;
        }
        element.setOneColor(vec4(1, 0, 0, 1))
        element.move(0, 0, speed2)
        if (distanceOf(vec3(element.x, element.y, element.z), vec3(myObject.x, myObject.y, myObject.z)) <= ((element.size / 2) + (myObject.size / 2)) + 0.001) {
            myObject.move(0, 0, speed2, true)
        }
    }).using());

    floors.push(new Cube(vec3(0.7, -1.2, 7 + 0.3), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).using());

    let speed4 = -0.007

    floors.push(new Cube(vec3(0.2, -1.4 - 0.01, 7 + 0.3), 0.2, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setCallbackAction((_, element) => {
        if ((element.y + element.size / 2 >= myObject.y - myObject.size / 2 &&
            element.y - element.size / 2 <= myObject.y + myObject.size / 2) &&
            (element.z + element.size / 2 >= myObject.z - myObject.size / 2 &&
                element.z - element.size / 2 <= myObject.z + myObject.size / 2) &&
            (Math.abs(element.x - myObject.x)) < 0.01 + (myObject.size / 2 + element.size / 2)) {

            if (element.y >= -1.4 - 2) {
                element.move(0, speed4, 0)
                myObject.move(0, speed4, 0, true)
            }
            element.setOneColor(vec4(1, 0, 0, 1))

        } else {
            if (element.y <= -1.4 - 0.01) {
                element.move(0, -speed4, 0)
            }
            element.setOneColor(vec4(0, 0, 1, 1))
        }
    }).using());


    // pink
    floors.push(new Cube(vec3(0, -6, 7 + 0.3), 1, idConcat++, true, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).using());
    checks.push(new Cube(vec3(0.6, -6, 7 + 0.3), 0.1, idConcat++, true, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-2, -6, 7 + 0.3), 4, idConcat++, true, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).using());
};

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
    document.getElementById('viewUp').addEventListener('mousedown', (e) => {
        keyState.viewUp = true;
    });
    document.getElementById('viewUp').addEventListener('mouseup', (e) => {
        keyState.viewUp = false;
    });

    document.getElementById('viewDown').addEventListener('mousedown', (e) => {
        keyState.viewDown = true;
    });
    document.getElementById('viewDown').addEventListener('mouseup', (e) => {
        keyState.viewDown = false;
    });

    document.getElementById('leftView').addEventListener('mousedown', (e) => {
        keyState.viewLeft = true;
    });
    document.getElementById('leftView').addEventListener('mouseup', (e) => {
        keyState.viewLeft = false;
    });

    document.getElementById('leftView2').addEventListener('mousedown', (e) => {
        keyState.viewLeft2 = true;
    });
    document.getElementById('leftView2').addEventListener('mouseup', (e) => {
        keyState.viewLeft2 = false;
    });

    document.getElementById('rightView').addEventListener('mousedown', (e) => {
        keyState.viewRight = true;
    });
    document.getElementById('rightView').addEventListener('mouseup', (e) => {
        keyState.viewRight = false;
    });

    document.getElementById('rightView2').addEventListener('mousedown', (e) => {
        keyState.viewRight2 = true;
    });
    document.getElementById('rightView2').addEventListener('mouseup', (e) => {
        keyState.viewRight2 = false;
    });

    document.getElementById('right').addEventListener('mousedown', (e) => {
        keyState.right = true;
    });
    document.getElementById('right').addEventListener('mouseup', (e) => {
        keyState.right = false;
    });

    document.getElementById('viewClose').addEventListener('mousedown', (e) => {
        keyState.near = true;
    });
    document.getElementById('viewClose').addEventListener('mouseup', (e) => {
        keyState.near = false;
    });
    document.getElementById('viewFar').addEventListener('mousedown', (e) => {
        keyState.far = true;
    });
    document.getElementById('viewFar').addEventListener('mouseup', (e) => {
        keyState.far = false;
    });
    document.getElementById('shift').addEventListener('mousedown', (e) => {
        keyState.shift = true;
    });
    document.getElementById('shift').addEventListener('mouseup', (e) => {
        keyState.shift = false;
    });
    document.getElementById('space').addEventListener('mouseup', (e) => {
        myObject.jump(myObject.x + jumpHeight);
    });

    document.getElementById('reset').addEventListener('click', (e) => {
        myObject.teleport(firstBirth[0], firstBirth[1], firstBirth[2])
    });


    addKeyListener(document)
};

function addKeyListener(doc) {
    doc.addEventListener('keyup', (e) => {
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 82: //r
                document.getElementById('reset').style.backgroundColor = "white";

                myObject.teleport(firstBirth[0], firstBirth[1], firstBirth[2])
                break;
            case 87: // w
                keyState.up = false;
                document.getElementById('up').style.backgroundColor = "white";
                break;
            case 65: // a
                keyState.left = false;
                document.getElementById('left').style.backgroundColor = "white";
                break;
            case 83: // s
                keyState.down = false;
                document.getElementById('down').style.backgroundColor = "white";
                break;
            case 68: // d
                keyState.right = false;
                document.getElementById('right').style.backgroundColor = "white";
                break;
            case 79://o
                keyState.viewUp = false;
                document.getElementById('viewUp').style.backgroundColor = "white";
                break;
            case 75://o
                keyState.viewDown = false;
                document.getElementById('viewDown').style.backgroundColor = "white";
                break;
            case 32:
                document.getElementById('space').style.backgroundColor = "white";
                break;
            case 16:
                keyState.shift = false;
                document.getElementById('shift').style.backgroundColor = "white";
                break;
            case 38: // up
                document.getElementById('viewClose').style.backgroundColor = "white";
                keyState.near = false;
                break;
            case 37: // left
                document.getElementById('leftView').style.backgroundColor = "white";
                keyState.viewLeft = false;
                break;
            case 40: //down
                document.getElementById('viewFar').style.backgroundColor = "white";
                keyState.far = false;
                break;
            case 39: //right
                document.getElementById('rightView').style.backgroundColor = "white";
                keyState.viewRight = false;
                break;
            case 219: // [
                document.getElementById('leftView2').style.backgroundColor = "white";
                keyState.viewLeft2 = false;
                break;
            case 221: // ]
                document.getElementById('rightView2').style.backgroundColor = "white";
                keyState.viewRight2 = false;
                break;
        }
        true
    });

    doc.addEventListener('keydown', (e) => {
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 82: //r
                document.getElementById('reset').style.backgroundColor = "#9999ff";
                break;
            case 87: // w
                document.getElementById('up').style.backgroundColor = "#9999ff";
                keyState.up = true;
                break;
            case 65: // a
                keyState.left = true;
                document.getElementById('left').style.backgroundColor = "#9999ff";
                break;
            case 79://o
                keyState.viewUp = true;
                document.getElementById('viewUp').style.backgroundColor = "#9999ff";
                break;
            case 75://o
                keyState.viewDown = true;
                document.getElementById('viewDown').style.backgroundColor = "#9999ff";
                break;
            case 83: // s
                keyState.down = true;
                document.getElementById('down').style.backgroundColor = "#9999ff";
                break;
            case 68: // d
                keyState.right = true;
                document.getElementById('right').style.backgroundColor = "#9999ff";
                break;
            case 32:
                document.getElementById('space').style.backgroundColor = "#9999ff";
                myObject.jump(myObject.x + 0.5);
                break;
            case 16:
                keyState.shift = true;
                document.getElementById('shift').style.backgroundColor = "#9999ff";
                break;
            case 38: // up
                document.getElementById('viewClose').style.backgroundColor = "#9999ff";
                keyState.near = true;
                break;
            case 37: // left
                document.getElementById('leftView').style.backgroundColor = "#9999ff";
                keyState.viewLeft = true;
                break;
            case 40: //down
                document.getElementById('viewFar').style.backgroundColor = "#9999ff";
                keyState.far = true;
                break;
            case 39: //right
                document.getElementById('rightView').style.backgroundColor = "#9999ff";
                keyState.viewRight = true;
                break;
            case 219: // [
                document.getElementById('leftView2').style.backgroundColor = "#9999ff";
                keyState.viewLeft2 = true;
                break;
            case 221: // ]
                document.getElementById('rightView2').style.backgroundColor = "#9999ff";
                keyState.viewRight2 = true;
                break;
        }
        true
    });
};