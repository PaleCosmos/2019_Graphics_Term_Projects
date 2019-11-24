class Others extends WebGLObject {

    constructor(nick, vec3_, size = 1, id = 0, hasLine = false, trans = false) {
        super(vec3_[0], vec3_[1], vec3_[2], size, id, hasLine, trans);
        this.mVertices = [];
        this.isJumping = false;
        this.mColors = [];
        this.colorState = 0;
        this.nickname=nick;
    }
    nickname="";
    count = 0;
    isDie = false;
    canJump = true;
    mVertices;
    mColors;
    movingContent = [0, 0, 0, 0];
    tempMoving = vec3(0, 0, 0);
    legSpeed = 0

    callbackAction(a, b) { }

    subAction(a, b) { }

    rotationAction(a, b) { }

    gravityAction(a, b) { }



    // No Gradation
    setColor(vec4List = 0) {
        this.mColors = [];
        if (vec4List != 0) {
            vec4List.forEach(element => {
                for (var k = 0; k < 6; k++) {
                    this.mColors.push(element)
                }
            });
        }
        return this;
    }

    setColor_GL(vec4List_List = 0) {
        this.mColors = [];
        if (vec4List_List != 0) {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 6; j++) {
                    this.mColors.push(vec4List_List[i][j]);
                }
            }
        }
        return this;
    }

    setOneColor(cr = 0, flag = false) {
        if (flag)
            this.mColors = [];
        if (cr != 0) {
            for (var k = 0; k < 36; k++) {
                this.mColors.push(cr)
            }
        }

        return this;
    }

    tempVertices = [];
    tempLines = [];

    quad(a, b, c, d) {


        this.tempVertices.push(vertices[a]);
        this.tempVertices.push(vertices[b]);
        this.tempVertices.push(vertices[c]);
        this.tempVertices.push(vertices[a]);
        this.tempVertices.push(vertices[c]);
        this.tempVertices.push(vertices[d]);

        this.count += 6;
    }

    colorCube(objectSize = vec3(1, 1, 1), vecter = vec3(0, 0, 0)) {
        this.quad(1, 0, 3, 2);
        this.quad(2, 3, 7, 6);
        this.quad(3, 0, 4, 7);
        this.quad(6, 5, 1, 2);
        this.quad(4, 5, 6, 7);
        this.quad(5, 4, 0, 1);

        this.tempVertices.forEach((element, index, _) => {
            this.tempVertices[index] = vec4(
                element[0] * this.size * objectSize[0] + this.x + vecter[0],
                element[1] * this.size * objectSize[1] + this.y + vecter[1],
                element[2] * this.size * objectSize[2] + this.z + vecter[2],
                element[3])
        });

        this.tempVertices.forEach(element => {
            this.mVertices.push(element)
        })

        this.tempVertices = [];

        if (this.hasLine && objectSize[0] == 1) {
            this.lining();
        }
    }

    seeVactor = vec3(0, 0, 0);

    setPlayer() {
        this.colorCube(vec3(0.16, 0.1, 0.1), vec3(0.06 - this.size / 2, -0.05, -0.1))
        this.setOneColor(playerBodyColor) // 36 - 71

        this.colorCube(vec3(0.16, 0.1, 0.1), vec3(0.06 - this.size / 2, -0.05, 0.1))
        this.setOneColor(playerBodyColor) // 72 -107

        this.colorCube(vec3(0.16, 0.1, 0.1), vec3(0.06 - this.size / 2, 0.05, -0.1))
        this.setOneColor(playerBodyColor) // 108 - 143

        this.colorCube(vec3(0.16, 0.1, 0.1), vec3(0.06 - this.size / 2, 0.05, 0.1))
        this.setOneColor(playerBodyColor) // 144 - 179


        this.colorCube(vec3(0.4, 0.8, 1), vec3(0.15 - this.size / 2, 0, 0))
        this.setOneColor(playerBodyColor) // 몸통 180 - 215

        this.colorCube(vec3(0.3, 0.6, 0.6), vec3(0.25 - this.size / 2, 0, -0.1))
        this.setOneColor(playerBodyColor) // 대가뤼 216 - 251

        this.colorCube(vec3(0.4, 0.6, 0.3), vec3(0.28 - this.size / 2, 0, -0.07))
        this.setOneColor(playerBodyColor) // 대가뤼 위에거

        this.colorCube(vec3(0.15, 0.15, 0.15), vec3(0.3 - this.size / 2, 0.03, -0.1))
        this.setOneColor(vec4(1, 1, 1, 1)) // 눈

        this.colorCube(vec3(0.15, 0.15, 0.15), vec3(0.3 - this.size / 2, -0.03, -0.1))
        this.setOneColor(vec4(1, 1, 1, 1)) // 눈

        this.colorCube(vec3(0.1, 0.1, 0.1), vec3(0.3 - this.size / 2, 0.03, -0.115))
        this.setOneColor(vec4(0, 0, 0, 1)) // 눈

        this.colorCube(vec3(0.1, 0.1, 0.1), vec3(0.3 - this.size / 2, -0.03, -0.115))
        this.setOneColor(vec4(0, 0, 0, 1)) // 눈

        this.colorCube(vec3(0.1, 0.1, 0.1), vec3(0.29 - this.size / 2, 0, -0.16))
        this.setOneColor(vec4(0, 0, 0, 1)) // 코

        this.colorCube(vec3(0.28, 0.22, 0.28), vec3(0.31 - this.size / 2, 0.05, -0.05))
        this.setOneColor(vec4(0.8, 0.5, 0, 1)) // 귀

        this.colorCube(vec3(0.28, 0.22, 0.28), vec3(0.31 - this.size / 2, -0.05, -0.05))
        this.setOneColor(vec4(0.8, 0.5, 0, 1)) // 귀

        this.colorCube(vec3(0.05, 0.1, 0.25), vec3(0.25 - this.size / 2, 0, -0.16))
        this.setOneColor(vec4(1, 0, 0, 1)) // 혀

        this.colorCube(vec3(0.055, 0.01, 0.13), vec3(0.25 - this.size / 2, 0, -0.17))
        this.setOneColor(vec4(0, 0, 0, 1)) // 혀계곡

        this.colorCube(vec3(0.15, 0.15, 0.15), vec3(0.15 - this.size / 2, 0, 0.11))
        this.setOneColor(vec4(0.8, 0.5, 0, 1)) // 꼬리; 12*(36)
    }

    lining() {
        for (let k = 0; k < 4; k++) {
            let aft = (k + 1) % 4;
            this.tempLines.push(vertices[k]);
            this.tempLines.push(vertices[aft]);
            this.tempLines.push(vertices[k + 4]);
            this.tempLines.push(vertices[aft + 4]);
            this.tempLines.push(vertices[k]);
            this.tempLines.push(vertices[k + 4]);
        }

        this.tempLines.forEach((element, index, arr) => {
            this.tempLines[index] = vec4(
                element[0] * this.size + this.x,
                element[1] * this.size + this.y,
                element[2] * this.size + this.z,
                element[3])
        })

        this.tempLines.forEach(element => {
            this.mLineVertices.push(element)
        })
        this.tempLines = [];
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

    setGravityAction(floors) {
        this.gravityAction = (_, element) => {
            let bool = true;
            let xf = -1;

            floors.forEach((floor, index, _) => {
                if ((element.y - element.size / 2) <= floor.y + floor.size / 2 &&
                    (element.y + element.size / 2) >= floor.y - floor.size / 2 &&
                    (element.z - element.size / 2) <= floor.z + floor.size / 2 &&
                    (element.z + element.size / 2) >= floor.z - floor.size / 2 &&
                    (element.x - element.size / 2) <= floor.x + floor.size / 2) {
                    // element.teleportX(floor.x + floor.size / 2 + element.size / 2)
                    bool = false;
                    xf = index;
                }
            })

            if (bool) {
                element.move(-0.08, 0, 0, true)
            } else {

                element.canJump = true;
                element.teleportX(floors[xf].x + floors[xf].size / 2 + element.size / 2)
            }

        }

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

    changeColor() {
        this.setOneColor(vertexColors[(this.colorState++) % 6])
    }

    teleport(x, y, z) {
        this.mVertices.forEach((element, index, _) => {
            this.mVertices[index] = vec4(
                element[0] - this.x + x,
                element[1] - this.y + y,
                element[2] - this.z + z,
                element[3])
        });

        if (this.hasLine) {
            this.mLineVertices.forEach((element, index, _) => {
                this.mLineVertices[index] = vec4(
                    element[0] - this.x + x,
                    element[1] - this.y + y,
                    element[2] - this.z + z,
                    element[3])
            });
        }

        this.x = x;
        this.y = y;
        this.z = z;
    }

    teleportX(x) {
        this.mVertices.forEach((element, index, _) => {
            this.mVertices[index] = vec4(
                element[0] - this.x + x,
                element[1],
                element[2],
                element[3])
        });

        if (this.hasLine) {
            this.mLineVertices.forEach((element, index, _) => {
                this.mLineVertices[index] = vec4(
                    element[0] - this.x + x,
                    element[1],
                    element[2],
                    element[3])
            });
        }

        this.x = x;
    }

    // finally, You should call this method.

    using() {
        if (this.mColors.length == 0) {
            this.setOneColor(vec4(1, 1, 1, 0))
        }

        this.colorCube();

        this.setPlayer();

        return this;
    }
}