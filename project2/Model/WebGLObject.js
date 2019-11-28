class WebGLObject {
    constructor(x, y, z, size, id, hasLine, trans) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.id = id;
        this.hasLine = hasLine;
        this.mColors = [];
        this.mVertices = [];
        this.mLineVertices = [];
        this.mLineColor = [];
        this.trans = trans;
    }
    textures = null;
    callbackAction(a, b) { }

    move(x, y, z) { }

    resizing(size) { }

    rotationAction(a, b) { }

    setCallbackAction(callback) {
        this.callbackAction = callback;

        return this;
    }

    setRotationByX() {
        return this;
    }

    setRotationByX() {
        return this;
    }

    setRotationByX() {
        return this;
    }

    // finally, You should call this method.
    using() {
        return this;
    }
}