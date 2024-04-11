
const Square =  class Square {
    constructor(w) {
        this.width = w;
    }

    area() {
        return Math.pow(this.width, 2);
    }
};

const PI = Math.PI;

module.exports = {
    Square,
    PI
}