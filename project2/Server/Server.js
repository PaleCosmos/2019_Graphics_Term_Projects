// app.js의 본문내에 삽입하시면 된다.
var io = require('socket.io').listen(3000);
var roomName;
var dogs = [];

var socketStatus = [];



io.on('connection', function (socket) {
    console.log('connect');
    let instanceId = socket.id;
    let nickname = "";

    socket.on('joinRoom', function (data) {
        console.log(data);

        let fff = true;

        dogs.forEach(e => {
            if (e.nickname == data.nickname) {
                fff = false;
            }
        })

        if (fff) {
            socket.join(data.roomName);
            roomName = data.roomName;
            nickname = data.nickname;

            let me = {
                nickname: nickname,
                x: data.x,
                y: data.y,
                z: data.z,
                date: new Date()
            };

            io.sockets.in(roomName).emit('pointInit', { initation: dogs, new: me });

            dogs.push(me);
            socketStatus.push({
                nickname: data.nickname,
                soc: socket.id
            })
            io.sockets.in(roomName).emit('recMsg', { comment: nickname + "님이 입장하셨습니다.\n" });
        }else{
            socket.emit('no',{comment: '닉네임이 중복됩니다.'});
        }
        // socketStatusCheck();
    });

    socket.on('reqMsg', function (data) {
        //socketStatusCheck();
        console.log(data);
        io.sockets.in(roomName).emit('recMsg', { comment: nickname + " : " + data.comment + '\n' });
    });

    socket.on('move', function (data) {
        //console.log(data);
        // socketStatusCheck();
        io.sockets.in(roomName).emit('point', { nickname: nickname, x: data.x, y: data.y, z: data.z });
    })
});

setInterval(socketStatusCheck, 2000);

function socketStatusCheck() {
    let failures = [];
    socketStatus.forEach(e => {
        if (!io.sockets.connected[e.soc]) {
            failures.push(e)
        }
    })

    failures.forEach(e => {
        let idx1 = socketStatus.findIndex((a) => { return e.nickname == a.nickname })
        let idx2 = dogs.findIndex((a) => { return e.nickname == a.nickname })

        if (idx1 > -1) {
            socketStatus.splice(idx1, 1)
        }
        if (idx2 > -1) {
            io.sockets.in('myroom').emit('quit', { nickname: dogs[idx2].nickname });
            dogs.splice(idx2, 1)
            console.log('disconnected :' + e.nickname)
        }
    })
}