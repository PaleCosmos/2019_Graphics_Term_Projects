
var idConcat = 0;
var GL;
var myObject;
var floors = [];

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
    viewLeft2: false
}

const centerPick = vec3(-1, -0, -1);

window.onload = () => {

    GL = PaleGL.getInstance(document.getElementById("gl-canvas"))

    addFloorObject();

    myObject = new Player(firstBirth, 0.2, idConcat++, false, false).setOneColor(
        vec4(1, 1, 1, 0)).setCallbackAction(playerObjectCallbackAction).setGravityAction(floors).using()

    setListener();

    GL.addFloor(floors)
    .add(new Cube(vec3(-3, 0, -1), 20, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 0.5)
    ).using())
        .add(myObject)
        .rendering();
}

const playerObjectCallbackAction = (_, element) => {
    GL.setAt(vec3(element.x, element.y, element.z))
    if (keyState.up && keyState.left) element.move(0, 0.02 * r2, -0.02 * r2,false,floors)
    else if (keyState.up && keyState.right) element.move(0, -0.02 * r2, -0.02 * r2,false,floors)
    else if (keyState.down && keyState.left) element.move(0, 0.02 * r2, 0.02 * r2,false,floors)
    else if (keyState.down && keyState.right) element.move(0, -0.02 * r2, 0.02 * r2,false,floors)
    else if (keyState.up) element.move(0, 0, -0.02,false,floors)
    else if (keyState.down) element.move(0, 0, 0.02,false,floors)
    else if (keyState.left) element.move(0, 0.02, 0,false,floors)
    else if (keyState.right) element.move(0, -0.02, 0,false,floors)
    if (keyState.shift) element.changeColor()
    if (keyState.far) GL.far()
    if (keyState.near) GL.near()
    if (keyState.viewLeft) element.viewLeft()
    if (keyState.viewRight) element.viewRight()
    if (keyState.viewLeft2) element.viewLeft(false)
    if (keyState.viewRight2) element.viewRight(false)
}

function addFloorObject() {
    floors.push(new Cube(vec3(-1+0.1, 0, -1), 0.2, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).using());
    floors.push(new Cube(vec3(-1+0.1, 0.2, -1), 0.2, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).using());
    floors.push(new Cube(vec3(-1+0.3, 0.2, -1), 0.2, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).using());

    floors.push(new Cube(vec3(-3, 0, -1), 4, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).using());

    // floors.push(new Cube(vec3(-3, 0, 3 + 0.3), 4, idConcat++, true, false).setOneColor(
    //     vec4(1, 0.5, 0, 1)
    // ).using());

    // floors.push(new Cube(vec3(-3, 0, 7 + 0.6), 4, idConcat++, true, false).setOneColor(
    //     vec4(1, 1, 0, 1)
    // ).using());

    floors.push(new Cube(vec3(-3, 4 + 0.3, -1), 4, idConcat++, true, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).using());

    floors.push(new Cube(vec3(-3, 8 + 0.6, -1), 4, idConcat++, true, false).setOneColor(
        vec4(0, 0, 1, 1)
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
        myObject.jump(myObject.x + 0.5);
    });


    addKeyListener(document)
};

function addKeyListener(doc) {
    doc.addEventListener('keyup', (e) => {
        console.log(e.keyCode)
        switch (e.keyCode) {
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
            case 87: // w
                document.getElementById('up').style.backgroundColor = "#9999ff";
                keyState.up = true;
                break;
            case 65: // a
                keyState.left = true;
                document.getElementById('left').style.backgroundColor = "#9999ff";
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