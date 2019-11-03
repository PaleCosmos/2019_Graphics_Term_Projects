class PaleGL {
    static instance = null;

    static information = {
        canvas: null,
        gl: null,
        at: vec3(0.0, 0.0, 0.0), // vector!
        up: vec3(1, 0, 0), // vector
        eye: vec3(1, 1, 1), // point
        numVertices: 0,
        view_speed: Math.PI * 0.01,
        move_speed: 0.01,
    }

    static state = {
        near: 0.001,
        far: 30.0,
        radius: 6.65,
        theta: 0.17453292519943295,
        phi: 0.5235987755982988,
        dr: 5.0 * Math.PI / 180.0,
        fovy: 30.0,
        aspect: 1.0
    }

    setAt(at) {
        PaleGL.information.at = at;
    }

    near() {
        PaleGL.state.fovy -= 0.1;
    }

    far() {
        PaleGL.state.fovy += 0.1;
    }

    view_up() {
        let pi = PaleGL.information;
        let temp = pi.at;
        let speed = pi.view_speed;

        PaleGL.information.at = vec3(
            temp[0],
            Math.sin(-speed) * temp[2] + Math.cos(-speed) * temp[1],
            -Math.sin(-speed) * temp[1] + Math.cos(-speed) * temp[2]
        );

        console.log(PaleGL.information.at)
    }

    view_down() {
        let pi = PaleGL.information;
        let temp = pi.at;
        let speed = pi.view_speed;

        PaleGL.information.at = vec3(
            temp[0],
            Math.sin(speed) * temp[2] + Math.cos(speed) * temp[1],
            -Math.sin(speed) * temp[1] + Math.cos(speed) * temp[2]
        );

        console.log(PaleGL.information.at)
    }

    view_left() {
        let pi = PaleGL.information;
        let temp = pi.at;
        let speed = -pi.view_speed;

        PaleGL.information.at = vec3(
            Math.sin(speed) * temp[2] + Math.cos(speed) * temp[0],
            temp[1],
            -Math.sin(speed) * temp[0] + Math.cos(speed) * temp[2]
        );

        console.log(PaleGL.information.at)
    }

    view_right() {
        let pi = PaleGL.information;
        let temp = pi.at;
        let speed = -pi.view_speed;

        PaleGL.information.at = vec3(
            Math.sin(-speed) * temp[2] + Math.cos(-speed) * temp[0],
            temp[1],
            -Math.sin(-speed) * temp[0] + Math.cos(-speed) * temp[2]
        );

        console.log(PaleGL.information.at)
    }

    move_front() {
        let pi = PaleGL.information;
        let temp = pi.eye;
        let value = pi.at;
        let speed = pi.move_speed;

        PaleGL.information.eye = vec3(
            temp[0] + value[0] * -speed,
            temp[1] + value[1] * -speed,
            temp[2] + value[2] * -speed,
        )

        console.log(PaleGL.information.eye)
    }

    move_back() {
        let pi = PaleGL.information;
        let temp = pi.eye;
        let value = pi.at;
        let speed = pi.move_speed;

        PaleGL.information.eye = vec3(
            temp[0] + value[0] * speed,
            temp[1] + value[1] * speed,
            temp[2] + value[2] * speed,
        )

        console.log(PaleGL.information.eye)
    }

    move_right() {
        let pi = PaleGL.information;
        let temp = pi.eye;

        let value = externing(pi.up, pi.at);
        let speed = pi.move_speed;

        PaleGL.information.eye = vec3(
            temp[0] + value[0] * -speed,
            temp[1] + value[1] * -speed,
            temp[2] + value[2] * -speed,
        )
        console.log(PaleGL.information.eye)

    }

    move_left() {
        let pi = PaleGL.information;
        let temp = pi.eye;

        let value = externing(pi.up, pi.at);
        let speed = pi.move_speed;

        PaleGL.information.eye = vec3(
            temp[0] + value[0] * speed,
            temp[1] + value[1] * speed,
            temp[2] + value[2] * speed,
        )
        console.log(PaleGL.information.eye)

    }

    static objects = [];

    static program;

    static modelView;

    static mvMatrix;

    static pmMatrix;

    static getInstance(canvas) {
        if (PaleGL.instance == null) {
            PaleGL.instance = new PaleGL(canvas);
        }
        return PaleGL.instance;
    }

    constructor(canvas) {
        var information = PaleGL.information;
        information.canvas = canvas;

        var gl = WebGLUtils.setupWebGL(canvas);
        if (!gl) { alert("WebGL isn't available"); }

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);

        gl.enable(gl.DEPTH_TEST);
        //gl.enable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.lineWidth(5);

        information.gl = gl;

        PaleGL.state.aspect = canvas.width / canvas.height;

        PaleGL.program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(PaleGL.program);
    }

    add(mObject) {
        PaleGL.information.numVertices += mObject.count;
        PaleGL.objects.push(mObject)
        return PaleGL.instance;
    }


    rendering() {
        PaleGL.render();
    }

    static render() {

        let vertices = [];
        let colors = [];
        let gl = PaleGL.information.gl;

        PaleGL.objects.forEach(element1 => {
            element1.gravityAction(null, element1)
            if (!element1.trans) {
                element1.mVertices.forEach((element, index, arr) => {
                    vertices.push(vec4(
                        element[0],
                        element[1] * (PaleGL.information.canvas.height / PaleGL.information.canvas.width),
                        element[2],
                        element[3]
                    ))
                });
                element1.mColors.forEach(element => {
                    colors.push(element)
                });
            }
            element1.callbackAction(null, element1)
            element1.subAction(null, element1)
        });

        let mCount = vertices.length;

        PaleGL.objects.forEach(element1 => {
            element1.mLineVertices.forEach((element, index, arr) => {
                vertices.push(element);
                colors.push(vec4(0, 0, 0, 1));
            });
        });

        let modelViewMatrixLoc = gl.getUniformLocation(PaleGL.program, "modelViewMatrix");
        let projectionMatrixLoc = gl.getUniformLocation(PaleGL.program, "projectionMatrix");



        let cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

        let vColor = gl.getAttribLocation(PaleGL.program, "vColor");
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);

        let vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

        let vPosition = gl.getAttribLocation(PaleGL.program, "vPosition");
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        //PaleGL.modelView = gl.getUniformLocation(PaleGL.program, "modelView");

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        let pi = PaleGL.information;

        // let atVec = vec3(
        //     pi.eye[0] + pi.at[0],
        //     pi.eye[1] + pi.at[1],
        //     pi.eye[2] + pi.at[2],
        // );

        let s = PaleGL.state;

        pi.eye = vec3(s.radius * Math.sin(s.phi), s.radius * Math.sin(s.theta),
            s.radius * Math.cos(s.phi));

        PaleGL.mvMatrix = lookAt(pi.eye, pi.at, pi.up);
        PaleGL.pmMatrix = perspective(s.fovy, s.aspect, s.near, s.far);


        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(PaleGL.mvMatrix))
        gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(PaleGL.pmMatrix))
        gl.drawArrays(gl.TRIANGLES, 0, mCount);

        if (mCount != vertices.length) {
            console.log(mCount)
            gl.drawArrays(gl.LINES, mCount, vertices.length - mCount)
        }

        requestAnimationFrame(PaleGL.render);
    }
}

function externing(a, b) {
    let vec = vec3(
        (a[1] * b[2] - a[0 * b[1]]),
        (-a[0] * b[2] + a[2] * b[0]),
        (a[0] * b[1] - a[1] * b[0])
    )

    let square = Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2) + Math.pow(vec[2], 2));

    let vecA = vec3(
        vec[0] / square,
        vec[1] / square,
        vec[2] / square
    )

    return vecA;
}