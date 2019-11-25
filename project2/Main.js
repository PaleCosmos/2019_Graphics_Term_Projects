
var idConcat = 0;
var GL;
var myObject;
var floors = [];
var movingObject = [];
var checks = [];
var players = [];
var playersObject = [];

var mainColor = null;

var entrance = true;

var fps = 80;
var isBug = true;

var bows = [];
var bow0;

var nick = "";

var isBowing = false;
/////////////////////////////  DEBUG MODE
var isDebug = false
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

var socket = null;

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
        id('starting').setAttribute('class', 'button2')
        id('gl-canvas').setAttribute('class', 'canvas2')
        id('textArea').setAttribute('class', 'debuging')

        doWork();
    } else {
        id('textArea').setAttribute('class', 'nodebuging')

        id('starting').addEventListener('click', (e) => {
            let names = id('name').value
            let red = id('red').value
            let green = id('green').value
            let blue= id('blue').value
           
            if (names != "") {
                if(red>=0&&red<=255&&
                    green>=0&&green<=255&&
                    blue>=0&&blue<=255&&red!=""&&green!=""&&blue!=""){
                        socketFunction(names, vec4(red/255,green/255,blue/255,1));
                    }else{
                        alert('색상이 잘못되었습니다.')
                    }
            }
        });
    }
}

function idnit(){
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
   
    id('peoples').setAttribute('class', 'chaton')
    id('starting').setAttribute('class', 'button2')
    id('gl-canvas').setAttribute('class', 'canvas2')
    id('chat').setAttribute('class', 'chaton')
    id('nick').setAttribute('class', 'chatoff')

    doWork();
}

function socketFunction(names, rgb) {
    socket = io.connect("http://34.85.51.251:3000")
    socket.emit('joinRoom', {
        roomName: 'myroom',
        nickname: names, x: firstBirth[0], y: firstBirth[1], z: firstBirth[2],
        red:rgb[0],green:rgb[1],blue:rgb[2]
    })

    socket.on('no',function(data){
        alert(data.comment);
    })

    socket.on('pointInit', function (data) {
        
        if (data.new.nickname ==  names) {
            nick = names;
            mainColor = vec4(data.new.red, data.new.green, data.new.blue,1)
            console.log(mainColor)
            idnit();
            players = data.initation;
            let char = "";
            players.forEach(e => {
                playersObject.push(new Others(e.nickname,
                    vec3(e.x, e.y, e.z), 0.2, idConcat++, false, false
                ).setBodyColor(vec4(e.red,e.green,e.blue,1)).setOneColor(
                    vec4(1, 1, 1, 0)).using())
            })
        } else {
            players.push(data.new)
            playersObject.push(new Others(data.new.nickname,
                vec3(data.new.x, data.new.y, data.new.z), 0.2, idConcat++, false, false
            ).setOneColor(
                vec4(1, 1, 1, 0)).setBodyColor(vec4(data.new.red,data.new.green,data.new.blue,1)).using())
        }
        
        setInterval(()=>{
            let str = "";
            players.forEach(e=>{
                str += e.nickname +"\n\n";
            })
            id('peoples').value = str;
        }, 3000)
    })
    socket.on('quit', function (data) {
        let idx = playersObject.findIndex((a) => { return data.nickname == a.nickname })
        id('chat1').append(data.nickname + "님이 퇴장하셨습니다.\n");
        playersObject.splice(idx, 1);
    })
    socket.on('point', function (data) {
        playersObject.forEach(e => {
            if (e.nickname == data.nickname) {
                e.move(data.x - e.x, data.y - e.y, data.z - e.z);
            }
        })
    })

    socket.on('recMsg', function (data) {
        console.log(data.comment)
        id('chat1').append(data.comment);
    });

    id('chat3').addEventListener('click', (e) => {
        chat();
    });
    id('chat2').addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            chat();
        }
    })
}

function chat() {
    let msg = id('chat2').value;
    id('chat2').value = "";

    socket.emit('reqMsg', { comment: msg });
}

function putData(dataname, data) {
    socket.emit(dataname, data);
}

function doWork() {
    GL = PaleGL.getInstance(id("gl-canvas"))
    addFloorObject();

    myObject = new Player(firstBirth, 0.2, idConcat++, false, false).setOneColor(
        vec4(1, 1, 1, 0)).setBodyColor(mainColor).setCallbackAction(playerObjectCallbackAction).setGravityAction(floors).using()

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
    id('up').addEventListener('mousedown', (e) => {
        keyState.up = true;
    });
    id('up').addEventListener('mouseup', (e) => {
        keyState.up = false;
    });

    id('down').addEventListener('mousedown', (e) => {
        keyState.down = true;
    });
    id('down').addEventListener('mouseup', (e) => {
        keyState.down = false;
    });

    id('left').addEventListener('mousedown', (e) => {
        keyState.left = true;
    });
    id('left').addEventListener('mouseup', (e) => {
        keyState.left = false;
    });
    id('viewUp').addEventListener('mousedown', (e) => {
        keyState.viewUp = true;
    });
    id('viewUp').addEventListener('mouseup', (e) => {
        keyState.viewUp = false;
    });

    id('viewDown').addEventListener('mousedown', (e) => {
        keyState.viewDown = true;
    });
    id('viewDown').addEventListener('mouseup', (e) => {
        keyState.viewDown = false;
    });

    id('leftView').addEventListener('mousedown', (e) => {
        keyState.viewLeft = true;
    });
    id('leftView').addEventListener('mouseup', (e) => {
        keyState.viewLeft = false;
    });

    id('leftView2').addEventListener('mousedown', (e) => {
        keyState.viewLeft2 = true;
    });
    id('leftView2').addEventListener('mouseup', (e) => {
        keyState.viewLeft2 = false;
    });

    id('rightView').addEventListener('mousedown', (e) => {
        keyState.viewRight = true;
    });
    id('rightView').addEventListener('mouseup', (e) => {
        keyState.viewRight = false;
    });

    id('rightView2').addEventListener('mousedown', (e) => {
        keyState.viewRight2 = true;
    });
    id('rightView2').addEventListener('mouseup', (e) => {
        keyState.viewRight2 = false;
    });

    id('right').addEventListener('mousedown', (e) => {
        keyState.right = true;
    });
    id('right').addEventListener('mouseup', (e) => {
        keyState.right = false;
    });

    id('viewClose').addEventListener('mousedown', (e) => {
        keyState.near = true;
    });
    id('viewClose').addEventListener('mouseup', (e) => {
        keyState.near = false;
    });
    id('viewFar').addEventListener('mousedown', (e) => {
        keyState.far = true;
    });
    id('viewFar').addEventListener('mouseup', (e) => {
        keyState.far = false;
    });
    id('shift').addEventListener('mousedown', (e) => {
        keyState.shift = true;
    });
    id('shift').addEventListener('mouseup', (e) => {
        keyState.shift = false;
    });
    id('space').addEventListener('mouseup', (e) => {
        myObject.jump(myObject.x + jumpHeight);
    });

    id('reset').addEventListener('click', (e) => {
        myObject.teleport(firstBirth[0], firstBirth[1], firstBirth[2])
    });


    addKeyListener(document)
};

function addKeyListener(doc) {
    doc.addEventListener('keyup', (e) => {
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 82: //r
                id('reset').style.backgroundColor = "white";

                myObject.teleport(firstBirth[0], firstBirth[1], firstBirth[2])
                break;
            case 87: // w
                keyState.up = false;
                id('up').style.backgroundColor = "white";
                break;
            case 65: // a
                keyState.left = false;
                id('left').style.backgroundColor = "white";
                break;
            case 83: // s
                keyState.down = false;
                id('down').style.backgroundColor = "white";
                break;
            case 68: // d
                keyState.right = false;
                id('right').style.backgroundColor = "white";
                break;
            case 79://o
                keyState.viewUp = false;
                id('viewUp').style.backgroundColor = "white";
                break;
            case 75://o
                keyState.viewDown = false;
                id('viewDown').style.backgroundColor = "white";
                break;
            case 32:
                id('space').style.backgroundColor = "white";
                break;
            case 16:
                keyState.shift = false;
                id('shift').style.backgroundColor = "white";
                break;
            case 38: // up
                id('viewClose').style.backgroundColor = "white";
                keyState.near = false;
                break;
            case 37: // left
                id('leftView').style.backgroundColor = "white";
                keyState.viewLeft = false;
                break;
            case 40: //down
                id('viewFar').style.backgroundColor = "white";
                keyState.far = false;
                break;
            case 39: //right
                id('rightView').style.backgroundColor = "white";
                keyState.viewRight = false;
                break;
            case 219: // [
                id('leftView2').style.backgroundColor = "white";
                keyState.viewLeft2 = false;
                break;
            case 221: // ]
                id('rightView2').style.backgroundColor = "white";
                keyState.viewRight2 = false;
                break;
        }
        true
    });

    doc.addEventListener('keydown', (e) => {
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 82: //r
                id('reset').style.backgroundColor = "#9999ff";
                break;
            case 87: // w
                id('up').style.backgroundColor = "#9999ff";
                keyState.up = true;
                break;
            case 65: // a
                keyState.left = true;
                id('left').style.backgroundColor = "#9999ff";
                break;
            case 79://o
                keyState.viewUp = true;
                id('viewUp').style.backgroundColor = "#9999ff";
                break;
            case 75://o
                keyState.viewDown = true;
                id('viewDown').style.backgroundColor = "#9999ff";
                break;
            case 83: // s
                keyState.down = true;
                id('down').style.backgroundColor = "#9999ff";
                break;
            case 68: // d
                keyState.right = true;
                id('right').style.backgroundColor = "#9999ff";
                break;
            case 32:
                id('space').style.backgroundColor = "#9999ff";
                myObject.jump(myObject.x + 0.5);
                break;
            case 16:
                keyState.shift = true;
                id('shift').style.backgroundColor = "#9999ff";
                break;
            case 38: // up
                id('viewClose').style.backgroundColor = "#9999ff";
                keyState.near = true;
                break;
            case 37: // left
                id('leftView').style.backgroundColor = "#9999ff";
                keyState.viewLeft = true;
                break;
            case 40: //down
                id('viewFar').style.backgroundColor = "#9999ff";
                keyState.far = true;
                break;
            case 39: //right
                id('rightView').style.backgroundColor = "#9999ff";
                keyState.viewRight = true;
                break;
            case 219: // [
                id('leftView2').style.backgroundColor = "#9999ff";
                keyState.viewLeft2 = true;
                break;
            case 221: // ]
                id('rightView2').style.backgroundColor = "#9999ff";
                keyState.viewRight2 = true;
                break;
        }
        true
    });
};