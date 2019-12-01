/////////////////////////////  DEBUG MODE
var isDebug = true
var DebugSwitcher = 0
/////////////////////////////

window.onload = function () {

    mImage = new Image();
    ready();


    mImage.onload = () => {
        start();
    }

    mImage.crossOrigin = "";
    mImage.src = "./Image/snow.png"
}

function ready() {

  SCREEN_HEIGHT = screen.height;
  SCREEN_WIDTH = screen.width;
  CANVAS_HEIGHT = SCREEN_HEIGHT*4/5;
  CANVAS_WIDTH = SCREEN_HEIGHT*4/5;

    id('mTable').setAttribute('width', SCREEN_WIDTH);

    id('peoples').setAttribute('height', `${SCREEN_HEIGHT*4/5}px`);
    
    id('chat1').setAttribute('style', `height:${SCREEN_HEIGHT*4/5}px; width:${SCREEN_WIDTH*9/25}px; text-align:start;`)
    id('chat2').setAttribute('style', `height:${20}px; width:${SCREEN_WIDTH*9/25 -30}px; text-align:start;`)
    id('chat3').setAttribute('style', `height:${20}px; width:${30}px; text-align:start;`)


    id('gl-canvas').setAttribute('width', CANVAS_WIDTH);
    id('gl-canvas').setAttribute('height', CANVAS_HEIGHT);


    for (let vv = 0; vv < starNumber; vv++) {
        starring.push(Math.floor(Math.random() * 50) / 1000)
    }

    for (let a1 = 0; a1 < starNumber / 5; a1++) {
        let random1 = Math.random() * 70 - 35;
        let random2 = Math.random() * 70 - 35;
        starPosition.push(vec3(random1, random2, 35));
    }
    for (let a1 = 0; a1 < starNumber / 5; a1++) {
        let random1 = Math.random() * 70 - 35;
        let random2 = Math.random() * 70 - 35;
        starPosition.push(vec3(random1, random2, -35));
    }
    for (let a1 = 0; a1 < starNumber / 5; a1++) {
        let random1 = Math.random() * 70 - 35;
        let random2 = Math.random() * 70 - 35;
        starPosition.push(vec3(random1, 35, random2));
    }
    for (let a1 = 0; a1 < starNumber / 5; a1++) {
        let random1 = Math.random() * 70 - 35;
        let random2 = Math.random() * 70 - 35;
        starPosition.push(vec3(random1, -35, random2));
    }
    for (let a1 = 0; a1 < starNumber / 5; a1++) {
        let random1 = Math.random() * 70 - 35;
        let random2 = Math.random() * 70 - 35;
        starPosition.push(vec3(35, random2, random1));
    }

    for(let x0 = 0; x0<sphereNumber; x0++)
    {
        let mx =  Math.random()*2 - 1;
        let my = (Math.random()*2-1) *Math.sqrt(1 - Math.pow(mx,2),2);
        let mz = Math.sqrt(
           1- Math.pow(mx,2) - Math.pow(my,2)
            ,2)
        sphereVertices.push(
            vec4(
               mx,
                my,
                mz,
                1
            )
        )
        sphereVertices.push(
            vec4(
               mx,
                my,
                -1*mz,
                1
            )
        )
    }
    let moonSpeed = 0.01
    spheres.push(new Sphere(moon,1,idConcat++,false,false).setCallbackAction((_,e)=>{
        let my = e.y*Math.cos(moonSpeed) - e.z*Math.sin(moonSpeed)
        let mz = e.y*Math.sin(moonSpeed) + e.z*Math.cos(moonSpeed)
        e.teleport(e.x,my,mz)
    }).using())
}

function start() {

    if (isDebug) {
        if (DebugSwitcher != 0) {
            firstBirth = checkPoints[DebugSwitcher - 1];
        }
        //alert('debug')
        bow0 = bows[0];
        BGM = new Audio('./Audio/henesis.mp3')
        BGM.loop = true;
        //   BGM.play();
        id('starting').setAttribute('class', 'button2')
        id('gl-canvas').setAttribute('class', 'canvas2')
        id('textArea').setAttribute('class', 'debuging')
        id('nick').setAttribute('class', 'chatoff')

        doWork();
    } else {

        id('textArea').setAttribute('class', 'nodebuging')

        id('starting').addEventListener('click', (e) => {
            let names = id('name').value
            let colors = hexToRgb(id('colorpicker').value);

            if(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))
            {
                if (names != "") {
                    socketFunction(names, vec4(colors[0] / 255, colors[1] / 255, colors[2] / 255, 1));
                }
            }else{
                alert('크롬으로 오세요')
            }
        });
    }
}

function idnit() {
    bows = [
        new Audio('./Audio/bow1.mp3'),
        new Audio('./Audio/bow3.wav'),
        new Audio('./Audio/bow4.mp3'),
        new Audio('./Audio/bow5.wav'),
        new Audio('./Audio/bow6.wav')
    ];
    bow0 = bows[0];
    BGM = new Audio('./Audio/lisport-dot.mp3')
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
        red: rgb[0], green: rgb[1], blue: rgb[2]
    })

    socket.on('no', function (data) {
        alert(data.comment);
    })

    socket.on('pointInit', function (data) {

        if (data.new.nickname == names) {
            nick = names;
            mainColor = vec4(data.new.red, data.new.green, data.new.blue, 1)

            idnit();
            players = data.initation;

            players.forEach(e => {
                playersObject.push(new Others(e.nickname,
                    vec3(e.x, e.y, e.z), 0.2, idConcat++, false, false
                ).setBodyColor(vec4(e.red, e.green, e.blue, 1)).setOneColor(
                    vec4(1, 1, 1, 0)).using())
            })
        } else {
            players.push(data.new)
            playersObject.push(new Others(data.new.nickname,
                vec3(data.new.x, data.new.y, data.new.z), 0.2, idConcat++, false, false
            ).setOneColor(
                vec4(1, 1, 1, 0)).setBodyColor(vec4(data.new.red, data.new.green, data.new.blue, 1)).using())
        }

        let str = nick + "\n\n";
        playersObject.forEach(e => {
            str += e.nickname + "\n\n";
        })
        id('peoples').value = str;
    })
    socket.on('quit', function (data) {
        let idx1 = playersObject.findIndex((a) => { return data.nickname == a.nickname })
        let idx2 = players.findIndex((a) => { return data.nickname == a.nickname })
        id('chat1').append(data.nickname + "님이 퇴장하셨습니다.\n");
        playersObject.splice(idx1, 1);
        players.splice(idx2, 1);

        let str = nick + "\n\n";
        playersObject.forEach(e => {
            str += e.nickname + "\n\n";
        })
        id('peoples').value = str;
    })
    socket.on('point', function (data) {
        playersObject.forEach(e => {
            if (e.nickname == data.nickname) {
                e.move(data.x - e.x, data.y - e.y, data.z - e.z);
            }
        })
    })

    socket.on('recMsg', function (data) {
        let ch = id('chat1')
        ch.append(data.comment);
        ch.scrollTop = ch.scrollHeight;
    });

    id('chat3').addEventListener('click', (e) => {
        chat();
    });

}

function chat() {
    let msg = id('chat2').value + " ";
    id('chat2').value = "";

    socket.emit('reqMsg', { comment: msg });
}

function putData(dataname, data) {
    if (socket != null)
        socket.emit(dataname, data);
}

function doWork() {
    GL = PaleGL.getInstance(id("gl-canvas"))
    addFloorObject();

    myObject = new Player(firstBirth, 0.2, idConcat++, false, false).setOneColor(
        vec4(1, 1, 1, 0)).setBodyColor(mainColor).setCallbackAction(playerObjectCallbackAction).setGravityAction(floors).using()

    setListener();

    GL.addFloor(floors)
        .addChecks(checks)
        .addMovingObject(movingObject)
        .add(new Cube(vec3(-83, 0, -1), 80, idConcat++, false, false).setOneColor(
            vec4(0.5, 0.25, 0, 1)
        ).setTexture().using()) // floor
        .add(new Cube(vec3(77, 0, -1), 80, idConcat++, false, false).setOneColor(
            BACKGROUND
        ).using()) // top
        //////////
        .add(new Cube(vec3(-3, 80, -1), 80, idConcat++, false, false).setOneColor(
            BACKGROUND
        ).using())
        .add(new Cube(vec3(-3, -80, -1), 80, idConcat++, false, false).setOneColor(
            BACKGROUND
        ).using())
        .add(new Cube(vec3(-3, 0, 79), 80, idConcat++, false, false).setOneColor(
            BACKGROUND
        ).using())
        .add(new Cube(vec3(-3, 0, -81), 80, idConcat++, false, false).setOneColor(
            BACKGROUND
        ).using())
        .add(new Tree(vec3(-15, -15, -15.3), 0.85, idConcat++, false, false)
            .setTexture().using().setRotationByX(Math.PI / 4))
        .add(new Tree(vec3(-15, 15, -15), 0.7, idConcat++, false, false)
            .setTexture().using().setRotationByX(Math.PI / 5))
        .add(new Tree(vec3(-12, -22, 28), 1, idConcat++, false, false)
            .setTexture().using().setRotationByX(Math.PI / 6))
        .add(new Tree(vec3(-13, 25, 10), 0.75, idConcat++, false, false)
            .setLeafColor(vec4(1, 0.8, 1, 1)).setBallColor(vec4(1, 0.4, 1, 1)).setTexture().using().setRotationByX(Math.PI / 2))
        .add(myObject)
        .rendering();
}

const playerObjectCallbackAction = (_, element) => {
    GL.setAt(vec3(element.x, element.y, element.z))
    if (id('chat2') !== document.activeElement) {
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

function stars() {
    for (let kg = 0; kg < starNumber; kg++) {
        GL.add(
            new Star(starPosition[kg], 0.2, idConcat++, false, false).setOneColor(vec4(1, 1, 0.5, 1))
                .setCallbackAction((_, element) => {
                    element.setRotationByX(starring[kg]);
                }).using()
        )
    }
}

function purpleObject() {
    floors.push(new Cube(vec3(-2 + 0.15, 1.5, -1), 0.3, idConcat++, true, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-2 + 0.3, 1.8, -1), 0.3, idConcat++, false, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).setTexture().setCallbackAction(fallingCallback).using());

    floors.push(new Cube(vec3(-2 + 0.45, 2.1, -1), 0.3, idConcat++, false, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).setTexture().setCallbackAction(fallingCallback).using());

    floors.push(new Cube(vec3(-2 + 0.6, 2.4, -1), 0.3, idConcat++, false, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-2 + 0.75, 2.7, -1), 0.3, idConcat++, false, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-3.5, 0, -1), 3, idConcat++, false, false).setOneColor(
        vec4(0.5, 0, 0.5, 1)
    ).setTexture().using());
}

function greenObject() {
    floors.push(new Cube(vec3(-3, 5 + 0.3, -1), 4, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());
    floors.push(new Cube(vec3(-1, 5 + 0.3, -1), 1, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    checks.push(new Cube(vec3(-0.4, 5 + 0.3, -1), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-1, 5 + 0.3, 1.5), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-0.8, 4.6, 1.7), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-0.3, 5, 1.9), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-0.6, 5.3, 2.4), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    let superSpeed = 0.08;
    movingObject.push(new Cube(vec3(-0.4, 5.3, 2.4), 0.2, idConcat++, false, false).setOneColor(
        vec4(1, 0, 0, 1)
    ).setTexture().setCallbackAction((_, element) => {
        if (element.y >= (5.3 + 2) || element.y <= (5.3 - 2)) {
            superSpeed *= -1;
        }
        element.setOneColor(vec4(1, 0, 0, 1))
        element.move(0, superSpeed, 0)
        if (distanceOf(vec3(element.x, element.y, element.z), vec3(myObject.x, myObject.y, myObject.z)) <= ((element.size / 2) + (myObject.size / 2)) + 0.001) {
            myObject.move(0, superSpeed, 0, true)
        }
    }).using());

    floors.push(new Cube(vec3(-0.6, 5.3, 2.9), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-0.6, 4.7, 3.4), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-0.3, 4.9, 3.9), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-0.3, 4.9, 4.5), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-0.1, 4.9, 4.9), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 1, 0, 1)
    ).setTexture().using());
}

function blueObject() {
    floors.push(new Cube(vec3(0, 5 + 0.3, 7 + 0.3), 1, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());
    checks.push(new Cube(vec3(0.6, 5 + 0.3, 7 + 0.3), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-2, 5 + 0.3, 7 + 0.3), 4, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-1, 2 + 0.3, 7 + 0.3), 0.3, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(0, 2 + 0.8, 7 + 0.3), 0.3, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using())


    //moveObejct
    let sspeed = 0.08;
    floors.push(new Cube(vec3(-1, 1.6, 6.5 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().setCallbackAction((_, element) => {
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


    floors.push(new Cube(vec3(0, 1.3, 7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());
    floors.push(new Cube(vec3(0 + 0.2, 0.8, 7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());

    let sspeed3 = 0.08;
    floors.push(new Cube(vec3(0.2, 0.3, 7.3 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().setCallbackAction((_, element) => {
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

    floors.push(new Cube(vec3(0.2, 0.3, 6.7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(0.7, -0.2, 7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(0.2, -0.8, 7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());

    let speed2 = 0.08

    movingObject.push(new Cube(vec3(0.4, -0.8, 7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(1, 0, 0, 1)
    ).setTexture().setCallbackAction((_, element) => {
        if (element.z >= (7 + 0.3 + 2) || element.z <= (7 + 0.3 - 2)) {
            speed2 *= -1;
        }
        element.setOneColor(vec4(1, 0, 0, 1))
        element.move(0, 0, speed2)
        if (distanceOf(vec3(element.x, element.y, element.z), vec3(myObject.x, myObject.y, myObject.z)) <= ((element.size / 2) + (myObject.size / 2)) + 0.001) {
            myObject.move(0, 0, speed2, true)
        }
    }).using());

    floors.push(new Cube(vec3(0.7, -1.2, 7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().using());

    let speed4 = -0.007

    floors.push(new Cube(vec3(0.2, -1.4 - 0.01, 7 + 0.3), 0.2, idConcat++, false, false).setOneColor(
        vec4(0, 0, 1, 1)
    ).setTexture().setCallbackAction((_, element) => {
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

}

function pinkObject() {
    floors.push(new Cube(vec3(0, -6, 7 + 0.3), 1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());
    checks.push(new Cube(vec3(0.6, -6, 7 + 0.3), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(-2, -6, 7 + 0.3), 4, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(0, -6, 7.3 - 2.5), 0.7, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(0.65, -6, 4.3 - 0.8), 0.4, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(1.2, -6, 2.5), 0.3, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(1.8, -6, 2), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(1.8, -5.5, 1.75), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(1.8, -5.25, 1.5), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());


    floors.push(new Cube(vec3(1.8, -5, 1.3), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(1.8, -4.5, 1.3), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(1.8, -4, 1), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    let speed5 = -0.07
    movingObject.push(new Cube(vec3(1.9, -4, 4.3 - 4.4), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 0, 1)
    ).setTexture().setCallbackAction((_, element) => {
        if (element.z >= (4.3 - 4.4 + 2) || element.z <= (4.3 - 4.4 - 2)) {
            speed5 *= -1;
        }
        element.setOneColor(vec4(1, 0, 0, 1))
        element.move(0, 0, speed5)
        if (distanceOf(vec3(element.x, element.y, element.z), vec3(myObject.x, myObject.y, myObject.z)) <= ((element.size / 2) + (myObject.size / 2)) + 0.001) {
            myObject.move(0, 0, speed5, true)
        }
    }).using());

    floors.push(new Cube(vec3(2.2, -3.3, 4.3 - 4.7 + 1.2), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(2.2, -3.3, 4.3 - 5.2 + 1), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 0, 1, 1)
    ).setTexture().using());

}

function yellowObject() {
    floors.push(new Cube(vec3(1.2, -3.3, 4.3 - 6.8 + 1), 2, idConcat++, false, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).setTexture().using());

    floors.push(new Cube(vec3(2, -3.3, 4.3 - 6.8 + 1), 1, idConcat++, false, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).setTexture().using());

    checks.push(new Cube(vec3(2.6, -3.3, 4.3 - 6.8 + 1), 0.1, idConcat++, false, false).setOneColor(
        vec4(1, 1, 0, 1)
    ).setTexture().using());
}

function addFloorObject() {
    //purple square
    purpleObject();

    //green square
    greenObject();

    // blue squares
    blueObject();

    // pink
    pinkObject();

    // yellow
    yellowObject();

    // star
    stars();
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
        PaleGL.information.eye = tempEye;
        myObject.teleport(firstBirth[0], firstBirth[1], firstBirth[2])
    });


    addKeyListener(document)
};
/// 한글이 문제였네 이런
function addKeyListener(doc) {

    doc.addEventListener('keypress', (e) => {
        if (e.keyCode == 13) {
            if (id('chat2') != document.activeElement) {
                id('chat2').focus();
            } else if (id('chat2') == document.activeElement) {
                if (id('chat2').value != "") {
                    chat();
                } else {
                    id('chat2').blur();
                }
            }
        }
    })

    doc.addEventListener('keyup', (e) => {
        // console.log(e.keyCode)
        switch (e.keyCode) {
            case 82:
                id('reset').style.backgroundColor = "white";
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
        //console.log(e.keyCode)
        switch (e.keyCode) {
            case 82: //r
                if (id('chat2') != document.activeElement) {
                    id('reset').style.backgroundColor = "#9999ff";
                    PaleGL.information.eye = tempEye;
                    myObject.teleport(firstBirth[0], firstBirth[1], firstBirth[2])
                }
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
                if (id('chat2') != document.activeElement) {
                    id('space').style.backgroundColor = "#9999ff";
                    myObject.jump(myObject.x + jumpHeight);
                }
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