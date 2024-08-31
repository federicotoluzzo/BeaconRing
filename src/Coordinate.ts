export class Coordinate{
    _posX:number;
    _posY:number;
    constructor(posX:number, posY:number) {
        this._posX = posX;
        this._posY = posY;
    }

    get posX(): number {
        return this._posX;
    }

    set posX(value: number) {
        this._posX = value;
    }

    get posY(): number {
        return this._posY;
    }

    set posY(value: number) {
        this._posY = value;
    }
}
