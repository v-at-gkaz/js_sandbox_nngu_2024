
export default class Square {
    constructor(w) {
        this.width = w;
    }

    area() {
        return Math.pow(this.width, 2);
    }
}

export const PI = Math.PI;