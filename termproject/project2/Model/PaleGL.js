class PaleGL {
    static instance = null;

    constructor(canvas) {
        var information = PaleGL.information;
        information.canvas = canvas;
       

        var gl = WebGLUtils.setupWebGL(canvas);
        if ( !gl ) { alert( "WebGL isn't available" ); }

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);

        gl.enable(gl.DEPTH_TEST);
        //gl.enable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        information.gl = gl;

        PaleGL.program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(PaleGL.program);
        //console.log(PaleGL.information.canvas)
    }

    add(mObject) {
        PaleGL.information.numVertices += mObject.count;
        PaleGL.objects.push(mObject)
        return PaleGL.instance;
    }

    setRadius(ing){
        PaleGL.state.radius *= ing
    }

    setTheta(ing){
        PaleGL.state.theta  += ing
    }

    setPhi(ing){
        PaleGL.state.phi  += ing
    }

    static information = {
        canvas: null,
        gl: null,
        at: vec3(0.0, 0.0, 0.0),
        up: vec3(0.0, 1.0, 0.0),
        numVertices: 0,
    }

    static state = {
        radius: 1.0,
        theta: 0.0,
        phi: 0.0,
        dr: 5.0 * Math.PI / 180.0
    }

    static eye;

    static objects = [];

    static getInstance(canvas) {
        if (PaleGL.instance == null) {
            PaleGL.instance = new PaleGL(canvas);
        }
        return PaleGL.instance;
    }

    static program;

    static modelView;

    static mvMatrix;

    rendering(){
        PaleGL.render();
    }

    static render() {

        var vertices = [];
        var colors = [];
        var gl = PaleGL.information.gl;

        PaleGL.objects.forEach(element1 => {
            element1.mVertices.forEach(element => {
                vertices.push(element)
            });
            element1.mColors.forEach(element => {
                colors.push(element)
            });
        });

        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

        var vColor = gl.getAttribLocation(PaleGL.program, "vColor");
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);

        var vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(PaleGL.program, "vPosition");
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        PaleGL.modelView = gl.getUniformLocation(PaleGL.program, "modelView");

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        var state = PaleGL.state;

        PaleGL.eye = vec3(state.radius * Math.sin(state.phi), state.radius * Math.sin(state.theta),
            state.radius * Math.cos(state.phi)); // eye point

        PaleGL.mvMatrix = lookAt(PaleGL.eye, PaleGL.information.at, PaleGL.information.up);

        gl.uniformMatrix4fv(PaleGL.modelView, false, flatten(PaleGL.mvMatrix))
        gl.drawArrays(gl.TRIANGLES, 0, PaleGL.information.numVertices);
        requestAnimationFrame(PaleGL.render);
    }
}