import {Coordinate} from "./Coordinate.ts";

export enum blockType{
    EMPTY,
    EDGE,
    SELECTED,
    BEACON,
    CENTER
}
export const blockStyle = {
    borderRadius: 2,
    aspectRatio: 1,
    width: 50
};
export class Block{
    location:Coordinate;
    type:blockType;
    constructor(location:Coordinate, type:blockType){
        this.location = location;
        this.type = type;
    }
    getYaw(location:Coordinate):number{
        let yaw = 0;
        const posX = location.posX;
        const posY = location.posY;
        yaw = posY/posX;
        return yaw;
    }
}

//<div id={location.posX + "_" + location.posY} className={type.toString().toLowerCase()} style={blockStyle}></div>