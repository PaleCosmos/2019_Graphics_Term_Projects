var vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0)
];

var vertexColors = [
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // cyan
];
class Cube extends WebGLObject {

    constructor(x, y, z, size = 1, id = 0) {
        super(x, y, z, size, id);
        this.mColors = [];
        this.mVertices = [];
    }

    count = 36;

    mVertices;
    mColors;

    callbackAction(a, b) { }

    // No Gradation
    setColor(vec4List) {
        vec4List.forEach(element => {
            for (var k = 0; k < 6; k++) {
                this.mColors.push(element)
            }
        });
        return this;
    }

    setOneColor(cr) {
        for (var k = 0; k < 36; k++) {
            this.mColors.push(cr)
        }
        return this;
    }

    move(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    quad(a, b, c, d) {
        this.mVertices.push(vertices[a]);
        this.mVertices.push(vertices[b]);
        this.mVertices.push(vertices[c]);
        this.mVertices.push(vertices[a]);
        this.mVertices.push(vertices[c]);
        this.mVertices.push(vertices[d]);
    }

    colorCube() {
        this.quad(1, 0, 3, 2);
        this.quad(2, 3, 7, 6);
        this.quad(3, 0, 4, 7);
        this.quad(6, 5, 1, 2);
        this.quad(4, 5, 6, 7);
        this.quad(5, 4, 0, 1);

        this.mVertices.forEach((element, index, _) => {
            this.mVertices[index] = vec4(
                element[0] * this.size + this.x,
                element[1] * this.size + this.y,
                element[2] * this.size + this.z,
                element[3])
        });
    }

    resizing(size) {
        this.mVertices.forEach((element, index, _) => {
            this.mVertices[index] = vec4(
                ((element[0] - this.x) / this.size) * size + this.x,
                ((element[1] - this.y) / this.size) * size + this.y,
                ((element[2] - this.z) / this.size) * size + this.z,
                element[3])
        });
        this.size = size
    }

    setCallbackAction(callback) {
        this.callbackAction = callback;

        return this;
    }

    setRotationByX(speed = 0) {
        this.mVertices.forEach((element, index, _) => {

            var mx = element[0];
            var my = element[1] - this.y;
            var mz = element[2] - this.z;

            var mY = (my * Math.cos(speed) - mz * Math.sin(speed)) + this.y

            var mZ = (my * Math.sin(speed) + mz * Math.cos(speed)) + this.z

            this.mVertices[index] = vec4(
                mx,
                mY,
                mZ,
                element[3])
        });
    }

    setRotationByY(speed = 0) {
        this.mVertices.forEach((element, index, _) => {

            var mx = element[0] - this.x;
            var my = element[1];
            var mz = element[2] - this.z;

            var mZ = (mz * Math.cos(speed) - mx * Math.sin(speed)) + this.z
            var mX = (mz * Math.sin(speed) + mx * Math.cos(speed)) + this.x

            this.mVertices[index] = vec4(
                mX,
                my,
                mZ,
                element[3])
        });
    }
    setRotationByZ(speed = 0) {
        this.mVertices.forEach((element, index, _) => {

            var mx = element[0] - this.x;
            var my = element[1] - this.y;
            var mz = element[2];

            var mX = (mx * Math.cos(speed) - my * Math.sin(speed)) + this.x
            var mY = (mx * Math.sin(speed) + my * Math.cos(speed)) + this.y

            this.mVertices[index] = vec4(
                mX,
                mY,
                mz,
                element[3])
        });
    }

    move(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        this.mVertices.forEach((element, index, _) => {
            this.mVertices[index] = vec4(
                element[0] + x,
                element[1] + y,
                element[2] + z,
                element[3])
        });
    }

    // finally, You should call this method.
    getObject() {

        if (this.mColors.length == 0) {
            this.setColor(vertexColors)
        }

        this.colorCube();

        //alert(this.mVertices)
        return this;
    }
}