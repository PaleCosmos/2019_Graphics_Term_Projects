const PI = Math.PI;

function verticies(mVertices, s, l) {
    // 특정 구간의 vertice를 가진 배열을 리턴하는 함수

    const mV = [];

    for (var i = s; i < s + l; i++) {
        mV.push(mVertices[i]);
    }

    return mV;
};

function getColorArray(len, vec4_) {
    // lenth만큼의 color를 가진 배열을 리턴하는 함수

    const mColor = [];

    for (var i = 0; i < len; i++) {
        mColor.push(vec4_)
    }

    return mColor;
};

function getRandomArbitrary() {
    // -1 부터 1 사이의 랜덤 숫자를 리턴합니다.
    return Math.random() * (2) - 1;
};

function getColorValue(r, g, b, a) {
    return vec4(r / 255, g / 255, b / 255, a / 255)
};

function changeCoordinates(input) {
    for (var i in input) {
        var X = input[i][0];
        var Y = input[i][1];
        input[i][0] = (X / 512) * 2.0 - 1.0;
        input[i][1] = -((Y / 512) * 2.0 - 1.0);
    }
    output = input;
    return output;
};