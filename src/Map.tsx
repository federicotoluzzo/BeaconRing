import {Block, blockType} from "./Block.ts";
import {Coordinate} from "./Coordinate.ts";

export function Map(size:number, minDistance:number, maxDistance:number){
    const map:Block[][] = [];
    const selection = new Set<Block>();

    for (let i = -size; i <= size; i++) {
        map[i] = [];
        for (let j = -size; j <= size; j++) {
            if (i == 0 && j == 0){
                map[i][j] = new Block(new Coordinate(0, 0), blockType.CENTER);
            } else if (Math.floor(Math.sqrt(i * i + j * j)) == minDistance || Math.floor(Math.sqrt(i * i + j * j)) == maxDistance){
                map[i][j] = new Block(new Coordinate(0, 0), blockType.EDGE);
                selection.add()
            } else if (Math.floor(Math.sqrt(i * i + j * j)) > minDistance && Math.floor(Math.sqrt(i * i + j * j)) < maxDistance){
                map[i][j] = new Block(new Coordinate(0, 0), blockType.SELECTED);
            } else {
                map[i][j] = new Block(new Coordinate(0, 0), blockType.EMPTY);
            }
        }
    }

    for(let i = 0; i < 96/8; i++){
        let minDelta = 10000;
        let closest:Block = new Block(new Coordinate(0, 0), blockType.CENTER);
        for(const block of selection){
            if(Math.abs(block.getYaw - Math.tan(Math.PI/4/i)) < minDelta){
                minDelta = Math.abs(block.getYaw - Math.tan(Math.PI/4/i));
                closest = block;
            }
        }
        map[closest.location.posY][closest.location.posX].type = blockType.BEACON;
    }

    return (
        <>
            
        </>
    )
}