
var canvas;
var gl;

var numVertices  = 36;
var speed = 0.003;

var axis = 0;
var xAxis = 0;
var yAxis =1;
var zAxis = 2;
var theta = [ 0, 0, 0 ];
var thetaLoc;

const third = Math.sqrt(3)/2;

    var vertices = [
        vec3( -0.5, -0.5,  0.5 ),
        vec3( -0.5,  0.5,  0.5 ),
        vec3(  0.5,  0.5,  0.5 ),
        vec3(  0.5, -0.5,  0.5 ),
        vec3( -0.5, -0.5, -0.5 ),
        vec3( -0.5,  0.5, -0.5 ),
        vec3(  0.5,  0.5, -0.5 ),
        vec3(  0.5, -0.5, -0.5 )
    ];

    var vertexColors = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];

    var vertices1 = [];
    var vertices2 = [];
// indices of the 12 triangles that compise the cube

var indices = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];

window.onload = function init()
{
    var mult = 1;
    vertices.forEach(function(value, index, arr){
        vertices[index][0] *= mult;
        vertices[index][1] *= mult;
        vertices[index][2] *= mult;

        vertices1.push(vec3(value[0]+0.3, value[1]+0.3, value[2]+0.3)); 
        vertices2.push(vec3(value[0]-0.3, value[1], value[2]));
    });

    


    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);;

    //
    //  Load shaders and initialize attribute buffers
    //
    
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

    
    //render1();
   // render2();
   render3();
}

function render1()
{
    vertices.forEach(function(value, index, arr){
        if(arr[index][0]>0){
            arr[index][0]+=speed
        }else{
         arr[index][0]-=speed
        }
        if(arr[index][1]>0){
           arr[index][1]+=speed
        }else{
         arr[index][1]-=speed
        }
        if(vertices[index][2]>0){
            arr[index][2]+=speed
        }else{
         arr[index][2]-=speed
        }
    });

var xxx =Math.abs(vertices[0][0])
    if(xxx>0.5 ||xxx<0.01 )
    {
        speed *=-1;
    }

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // array element buffer
    
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
    
    // color array atrribute buffer
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // vertex array attribute buffer
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

    requestAnimFrame( render1 );
}
function render2()
{

    vertices1.forEach(function(value, index, arr){
        if(arr[index][0]>0){
            arr[index][0]+=speed
        }else{
         arr[index][0]-=speed
        }
        if(arr[index][1]>0){
           arr[index][1]+=speed
        }else{
         arr[index][1]-=speed
        }
        if(vertices[index][2]>0){
            arr[index][2]+=speed
        }else{
         arr[index][2]-=speed
        }
    });

var xxx =Math.abs(vertices[0][0])
    if(xxx>0.5 ||xxx<0.01 )
    {
        speed *=-1;
    }

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // array element buffer
    
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
    
    // color array atrribute buffer
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // vertex array attribute buffer
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices1), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

    requestAnimFrame( render2 );
}
function render3()
{
    vertices.forEach(function(value, index, arr){
        if(arr[index][0]>0){
            arr[index][0]+=speed
        }else{
         arr[index][0]-=speed
        }
        if(arr[index][1]>0){
           arr[index][1]+=speed
        }else{
         arr[index][1]-=speed
        }
        if(vertices[index][2]>0){
            arr[index][2]+=speed
        }else{
         arr[index][2]-=speed
        }
    });

    vertices1.forEach(function(value, index, arr){
        if(arr[index][0]>0){
            arr[index][0]+=speed
        }else{
         arr[index][0]-=speed
        }
        if(arr[index][1]>0){
           arr[index][1]+=speed
        }else{
         arr[index][1]-=speed
        }
        if(vertices[index][2]>0){
            arr[index][2]+=speed
        }else{
         arr[index][2]-=speed
        }
    });

    vertices2.forEach(function(value, index, arr){
        if(arr[index][0]>0){
            arr[index][0]+=speed
        }else{
         arr[index][0]-=speed
        }
        if(arr[index][1]>0){
           arr[index][1]+=speed
        }else{
         arr[index][1]-=speed
        }
        if(vertices[index][2]>0){
            arr[index][2]+=speed
        }else{
         arr[index][2]-=speed
        }
    });

var xxx =Math.abs(vertices[0][0])
    if(xxx>0.5 ||xxx<0.01 )
    {
        speed *=-1;
    }

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // array element buffer
    
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
    
    // color array atrribute buffer
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // vertex array attribute buffer
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

    requestAnimFrame( render3 );
}

function render()
{
    vertices.forEach(function(value, index, arr){
        if(arr[index][0]>0){
            arr[index][0]+=speed
        }else{
         arr[index][0]-=speed
        }
        if(arr[index][1]>0){
           arr[index][1]+=speed
        }else{
         arr[index][1]-=speed
        }
        if(vertices[index][2]>0){
            arr[index][2]+=speed
        }else{
         arr[index][2]-=speed
        }
    });

    vertices1.forEach(function(value, index, arr){
        if(arr[index][0]>0){
            arr[index][0]+=speed
        }else{
         arr[index][0]-=speed
        }
        if(arr[index][1]>0){
           arr[index][1]+=speed
        }else{
         arr[index][1]-=speed
        }
        if(vertices[index][2]>0){
            arr[index][2]+=speed
        }else{
         arr[index][2]-=speed
        }
    });

    vertices2.forEach(function(value, index, arr){
        if(arr[index][0]>0){
            arr[index][0]+=speed
        }else{
         arr[index][0]-=speed
        }
        if(arr[index][1]>0){
           arr[index][1]+=speed
        }else{
         arr[index][1]-=speed
        }
        if(vertices[index][2]>0){
            arr[index][2]+=speed
        }else{
         arr[index][2]-=speed
        }
    });

var xxx =Math.abs(vertices[0][0])
    if(xxx>0.5 ||xxx<0.01 )
    {
        speed *=-1;
    }

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // array element buffer
    
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
    
    // color array atrribute buffer
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // vertex array attribute buffer
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

 requestAnimFrame( render );
    //setTimeout(render, 100)
}

