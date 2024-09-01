import {Block, blockType} from "./Block.ts";
import {Coordinate} from "./Coordinate.ts";
import {ReactElement} from "react";

export function Map(info:{minDistance:number, maxDistance:number}):ReactElement{
    const map:Block[][] = [];
    const selection = new Set<Block>();

    for (let i = 0; i <= (info.maxDistance + 1); i++) {
        map[i] = [];
        for (let j = 0; j <= (info.maxDistance + 1); j++) {
            /*if(j > i){
                map[i][j] = new Block(new Coordinate(0, 0), blockType.EMPTY);
                console.log("Nothing")
            }*/

            if (i == 0 && j == 0){
                console.log("Center")
                map[i][j] = new Block(new Coordinate(j, i), blockType.CENTER);
            } else if (Math.floor(Math.sqrt(i * i + j * j)) == info.minDistance || Math.floor(Math.sqrt(i * i + j * j)) == info.maxDistance){
                console.log("Edge")
                const block = new Block(new Coordinate(j, i), blockType.EDGE);
                map[i][j] = block;
                selection.add(block);
            } else if (Math.floor(Math.sqrt(i * i + j * j)) > info.minDistance && Math.floor(Math.sqrt(i * i + j * j)) < info.maxDistance){
                console.log("Selected")
                const block = new Block(new Coordinate(j, i), blockType.SELECTED);
                map[i][j] = block;
                selection.add(block);
            } else {
                console.log("Empty")
                map[i][j] = new Block(new Coordinate(j, i), blockType.EMPTY);
            }
        }
    }

    for(let i = 0; i <= 96/8; i++){
        let minDelta = Number.MAX_VALUE;
        let closest:Block = new Block(new Coordinate(0, 0), blockType.CENTER);
        console.log(Math.tan(Math.PI * i / 96 * 2));
        console.log(i)
        for(const block of selection){
            if(Math.abs(block.getYaw() - Math.tan(Math.PI * i / 96 * 2)) < minDelta){
                minDelta = Math.abs(block.getYaw() - Math.tan(Math.PI * i / 96 * 2));
                closest = block;
            }
        }
        map[closest.location.posY][closest.location.posX].type = blockType.BEACON;
        closest.type = blockType.BEACON;
        console.log(map[closest.location.posY][closest.location.posX].type)
    }

    const size = 2 * (info.maxDistance + 1) + 1;
    const blocks: ReactElement[][] = Array.from({ length: size }, () => Array(size).fill(<div></div>));

    for (let i = 0; i <= (info.maxDistance + 1); i++) {
        for (let j = 0; j <= (info.maxDistance + 1); j++) {
            const type = map[i][j].getStyle();
            if(type == "beacon"){
                console.log("debug")
            }
            if(j < i){
                continue;
            }
            blocks[(info.maxDistance + 1) + i][(info.maxDistance + 1) + j] = <div className={"block " + type}></div>;
            blocks[(info.maxDistance + 1) + i][(info.maxDistance + 1) - j] = <div className={"block " + type}></div>;
            blocks[(info.maxDistance + 1) + j][(info.maxDistance + 1) + i] = <div className={"block " + type}></div>;
            blocks[(info.maxDistance + 1) + j][(info.maxDistance + 1) - i] = <div className={"block " + type}></div>;
            blocks[(info.maxDistance + 1) - i][(info.maxDistance + 1) + j] = <div className={"block " + type}></div>;
            blocks[(info.maxDistance + 1) - i][(info.maxDistance + 1) - j] = <div className={"block " + type}></div>;
            blocks[(info.maxDistance + 1) - j][(info.maxDistance + 1) + i] = <div className={"block " + type}></div>;
            blocks[(info.maxDistance + 1) - j][(info.maxDistance + 1) - i] = <div className={"block " + type}></div>;
        }
    }

    return (
        <>
            <div style={{"aspectRatio":1, "width": 1000, "display": "grid", "gridTemplateColumns": "1fr ".repeat(2 * (info.maxDistance + 1) + 1)}}>
                {blocks}
            </div>
        </>
    )
}

export default Map;