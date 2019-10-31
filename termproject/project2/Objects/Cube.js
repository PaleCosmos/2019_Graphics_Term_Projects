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