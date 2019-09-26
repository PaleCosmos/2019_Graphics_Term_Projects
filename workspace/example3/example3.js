
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var vertices = new Float32Array([10, 20,  80, 20, 10, 30, 10, 30, 80, 20, 80, 30]);
    var colors = [
        vec4(1.0,0.0,0.0,1.0),
        vec4(1.0,0.0,0.0,1.0),
        vec4(1.0,0.0,0.0,1.0),
        vec4(1.0,0.0,0.0,1.0),
        vec4(1.0,0.0,0.0,1.0),
        vec4(1.0,0.0,0.0,1.0)
    ];

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vResolution = gl.getUniformLocation(program, "vResolution");
    gl.uniform2f(vResolution, gl.canvas.width, gl.canvas.height);

    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );			

    var vColor = gl.getAttribLocation(program, "vColor");	
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );	
	gl.enableVertexAttribArray( vColor );  

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}
