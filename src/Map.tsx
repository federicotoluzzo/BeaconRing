import {Block, blockType} from "./Block.ts";
import {Coordinate} from "./Coordinate.ts";

export function Map(size:number, minDistance:number, maxDistance:number){
    const map:(typeof Block)[][] = [];
    for (let i = -size; i <= size; i++) {
        map[i] = [];
        for (let j = -size; j <= size; j++) {
            if (i == 0 && j == 0){
                map[i][j] = Block(new Coordinate(0, 0), blockType.CENTER);
            } else if (Math.floor(Math.sqrt(i * i + j * j)) == minDistance || Math.floor(Math.sqrt(i * i + j * j)) == maxDistance){
                map[i][j] = Block(new Coordinate(0, 0), blockType.EDGE);
            } else if (Math.floor(Math.sqrt(i * i + j * j)) > minDistance && Math.floor(Math.sqrt(i * i + j * j)) < maxDistance){
                map[i][j] = Block(new Coordinate(0, 0), blockType.SELECTED);
            } else {
                map[i][j] = Block(new Coordinate(0, 0), blockType.EMPTY);
            }
        }
    }

    const yaws:number[][] = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if(j > i){
                continue;
            }
            yaws[i][j] = map[i][j].
        }
    }
}