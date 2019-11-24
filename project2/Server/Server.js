// app.js의 본문내에 삽입하시면 된다.
var io = require('socket.io').listen(3000);
var roomName;
var dogs = [];

io.on('connection', function (socket) {
    console.log('connect');
    let instanceId = socket.id;
    let nickname = "";
    
    socket.on('joinRoom',function (data) {
        console.log(data);

        let fff = true;

        dogs.forEach(e=>{
            if(e.nickname == data.nickname){
                fff=false;
            }
        })

        if(fff){
            socket.join(data.roomName);
            roomName = data.roomName;
            nickname = data.nickname;
    
            let me = {
                nickname:nickname,
                x:data.x,
                y:data.y,
                z:data.z,
                date: new Date()
            };
            
            io.sockets.in(roomName).emit('pointInit', {initation:dogs, new:me});
            
            dogs.push(me);
        }
    });

    socket.on('reqMsg', function (data) {
        console.log(data);
        io.sockets.in(roomName).emit('recMsg', {comment: nickname + " : " + data.comment+'\n'});
    });

    socket.on('move', function(data){
        //console.log(data);
        io.sockets.in(roomName).emit('point', {nickname:nickname, x:data.x, y:data.y, z:data.z});
    })
});