class WebGLObject {
    constructor(x, y, z, size, id = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.id = id;
    }
    callbackAction(a, b) { }

    move(x, y, z) { }

    resizing(size) { }

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
    getObject() {
        return this;
    }
}