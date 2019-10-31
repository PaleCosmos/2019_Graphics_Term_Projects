
var idConcat = 0;
var GL;
window.onload = () => {
    GL = PaleGL.getInstance(document.getElementById("gl-canvas"))
    .add(new Cube(-0.5, -0, -0, 0.5, idConcat++).setOneColor(
        vec4(1,0,0,0.5)
    ).getObject())
    .add(new Cube(0, 0, 0, 0.5, idConcat++).setOneColor(
        vec4(0,1,0,0.5)
    ).getObject())
    .add(new Cube(0.5, 0, 0, 0.5, idConcat++).setOneColor(
        vec4(0,0,1,0.5)
    ).getObject())
    .add(new Cube(0, 0.5, 0, 0.5, idConcat++).setOneColor(
        vec4(0.5,0.5,0.5,0.8)
    ).getObject())
    


    document.getElementById("Button1").onclick = function () { GL.setRadius(1.1) };
    document.getElementById("Button2").onclick = function () { GL.setRadius(0.9); };
    document.getElementById("Button3").onclick = function () { GL.setTheta(PaleGL.state.dr)};
    document.getElementById("Button4").onclick = function () { GL.setTheta(-PaleGL.state.dr) };
    document.getElementById("Button5").onclick = function () { GL.setPhi(PaleGL.state.dr) };
    document.getElementById("Button6").onclick = function () { GL.setPhi(-PaleGL.state.dr) };

    GL.rendering();
}