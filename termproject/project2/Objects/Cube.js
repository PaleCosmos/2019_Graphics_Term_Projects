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

    constructor(vec3_, size = 1, id = 0, hasLine = false) {
        super(vec3_[0], vec3_[1], vec3_[2], size, id);
        this.hasLine = hasLine;
        this.mColors = [];
        this.mVertices = [];
        this.mLineVertices = [];
        this.mLineColor = [];
    }

    count = 0;

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

    setColor_GL(vec4List_List) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                this.mColors.push(vec4List_List[i][j]);
            }
        }
        return this;
    }

    setOneColor(cr = 0) {
        if (cr != 0) {
            for (var k = 0; k < 36; k++) {
                this.mColors.push(cr)
            }
        }

        return this;
    }

    quad(a, b, c, d) {
        this.mVertices.push(vertices[a]);
        this.mVertices.push(vertices[b]);
        this.mVertices.push(vertices[c]);
        this.mVertices.push(vertices[a]);
        this.mVertices.push(vertices[c]);
        this.mVertices.push(vertices[d]);

        this.count += 6;
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

        if (this.hasLine) {
            this.lining();
        }
    }

    lining() {
        for (let k = 0; k < 4; k++) {
            let aft = (k + 1) % 4;
            this.mLineVertices.push(vertices[k]);
            this.mLineVertices.push(vertices[aft]);
            this.mLineVertices.push(vertices[k + 4]);
            this.mLineVertices.push(vertices[aft + 4]);
            this.mLineVertices.push(vertices[k]);
            this.mLineVertices.push(vertices[k + 4]);
        }

        this.mLineVertices.forEach((element, index, arr) => {
            this.mLineVertices[index] = vec4(
                element[0] * this.size + this.x,
                element[1] * this.size + this.y,
                element[2] * this.size + this.z,
                element[3])

        })
    }

    resizing(size) {
        this.mVertices.forEach((element, index, _) => {
            this.mVertices[index] = vec4(
                ((element[0] - this.x) / this.size) * size + this.x,
                ((element[1] - this.y) / this.size) * size + this.y,
                ((element[2] - this.z) / this.size) * size + this.z,
                element[3])
        });
        if (this.hasLine) {
            this.mLineVertices.forEach((element, index, arr) => {
                this.mLineVertices[index] = vec4(
                    ((element[0] - this.x) / this.size) * size + this.x,
                    ((element[1] - this.y) / this.size) * size + this.y,
                    ((element[2] - this.z) / this.size) * size + this.z,
                    element[3])
            })
        }
        this.size = size
    }

    setCallbackAction(callback) {
        this.callbackAction = callback;

        return this;
    }

    setRotationByX(speed = 0) {
        this.mVertices.forEach((element, index, _) => {
            let mx = element[0];
            let my = element[1] - this.y;
            let mz = element[2] - this.z;

            let mY = (my * Math.cos(speed) - mz * Math.sin(speed)) + this.y

            let mZ = (my * Math.sin(speed) + mz * Math.cos(speed)) + this.z

            this.mVertices[index] = vec4(
                mx,
                mY,
                mZ,
                element[3])
        });
        if (this.hasLine) {
            this.mLineVertices.forEach((element, index, _) => {
                let mx = element[0];
                let my = element[1] - this.y;
                let mz = element[2] - this.z;

                let mY = (my * Math.cos(speed) - mz * Math.sin(speed)) + this.y

                let mZ = (my * Math.sin(speed) + mz * Math.cos(speed)) + this.z

                this.mLineVertices[index] = vec4(
                    mx,
                    mY,
                    mZ,
                    element[3])
            });
        }
    }

    setRotationByY(speed = 0) {
        this.mVertices.forEach((element, index, _) => {

            let mx = element[0] - this.x;
            let my = element[1];
            let mz = element[2] - this.z;

            let mZ = (mz * Math.cos(speed) - mx * Math.sin(speed)) + this.z
            let mX = (mz * Math.sin(speed) + mx * Math.cos(speed)) + this.x

            this.mVertices[index] = vec4(
                mX,
                my,
                mZ,
                element[3])
        });
        if (this.hasLine) {
            this.mLineVertices.forEach((element, index, _) => {

                let mx = element[0] - this.x;
                let my = element[1];
                let mz = element[2] - this.z;

                let mZ = (mz * Math.cos(speed) - mx * Math.sin(speed)) + this.z
                let mX = (mz * Math.sin(speed) + mx * Math.cos(speed)) + this.x

                this.mLineVertices[index] = vec4(
                    mX,
                    my,
                    mZ,
                    element[3])
            });
        }
    }
    setRotationByZ(speed = 0) {
        this.mVertices.forEach((element, index, _) => {

            let mx = element[0] - this.x;
            let my = element[1] - this.y;
            let mz = element[2];

            let mX = (mx * Math.cos(speed) - my * Math.sin(speed)) + this.x
            let mY = (mx * Math.sin(speed) + my * Math.cos(speed)) + this.y

            this.mVertices[index] = vec4(
                mX,
                mY,
                mz,
                element[3])
        });
        if (this.hasLine) {
            this.mLineVertices.forEach((element, index, _) => {

                let mx = element[0] - this.x;
                let my = element[1] - this.y;
                let mz = element[2];

                let mX = (mx * Math.cos(speed) - my * Math.sin(speed)) + this.x
                let mY = (mx * Math.sin(speed) + my * Math.cos(speed)) + this.y

                this.mLineVertices[index] = vec4(
                    mX,
                    mY,
                    mz,
                    element[3])
            });
        }
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

        if (this.hasLine) {
            this.mLineVertices.forEach((element, index, _) => {
                this.mLineVertices[index] = vec4(
                    element[0] + x,
                    element[1] + y,
                    element[2] + z,
                    element[3])
            });
        }
    }

    // finally, You should call this method.
    using() {
        if (this.mColors.length == 0) {
            this.setOneColor(vec4(1, 1, 1, 0))
        }

        this.colorCube();

        return this;
    }
}