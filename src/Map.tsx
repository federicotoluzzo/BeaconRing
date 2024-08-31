import {Block, blockType} from "./Block.ts";
import {Coordinate} from "./Coordinate.ts";
import {ReactElement} from "react";

export function Map(size:number, minDistance:number, maxDistance:number){
    const map:Block[][] = [];
    const selection = new Set<Block>();

    for (let i = 0; i <= size; i++) {
        map[i] = [];
        for (let j = 0; j <= size; j++) {
            if(j < i){
                map[i][j] = new Block(new Coordinate(0, 0), blockType.EMPTY);
            }
            if (i == 0 && j == 0){
                map[i][j] = new Block(new Coordinate(j, i), blockType.CENTER);
            } else if (Math.floor(Math.sqrt(i * i + j * j)) == minDistance || Math.floor(Math.sqrt(i * i + j * j)) == maxDistance){
                map[i][j] = new Block(new Coordinate(j, i), blockType.EDGE);
                selection.add()
            } else if (Math.floor(Math.sqrt(i * i + j * j)) > minDistance && Math.floor(Math.sqrt(i * i + j * j)) < maxDistance){
                map[i][j] = new Block(new Coordinate(j, i), blockType.SELECTED);
            } else {
                map[i][j] = new Block(new Coordinate(j, i), blockType.EMPTY);
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

    const blocks:ReactElement[][] = [];

    for (let i = 0; i <= size; i++) {
        blocks[i] = [];
        for (let j = 0; j <= size; j++) {
            if(j >= i){
                const type = map[i][j].type.toString().toLowerCase();
                blocks[size + i + 1][size + j + 1] = <div className={"block " + type}></div>;
                blocks[size + i + 1][size - j + 1] = <div className={"block " + type}></div>;
                blocks[size + j + 1][size + i + 1] = <div className={"block " + type}></div>;
                blocks[size + j + 1][size - i + 1] = <div className={"block " + type}></div>;
                blocks[size - i + 1][size + j + 1] = <div className={"block " + type}></div>;
                blocks[size - i + 1][size - j + 1] = <div className={"block " + type}></div>;
                blocks[size - j + 1][size + i + 1] = <div className={"block " + type}></div>;
                blocks[size - j + 1][size - i + 1] = <div className={"block " + type}></div>;
            }
        }
    }

    return (
        <>
            <div style={{"display": "grid", "gridTemplateColumns": "1fr ".repeat(2 * size + 1)}}>
                {blocks}
            </div>
        </>
    )
}