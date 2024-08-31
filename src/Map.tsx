import {Block, blockType} from "./Block.ts";
import {Coordinate} from "./Coordinate.ts";
import {ReactElement} from "react";

export function Map(info:{size:number, minDistance:number, maxDistance:number}):ReactElement{
    const map:Block[][] = [];
    const selection = new Set<Block>();

    for (let i = 0; i <= info.size; i++) {
        map[i] = [];
        for (let j = 0; j <= info.size; j++) {
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

    for(let i = 0; i < 96/8; i++){
        let minDelta = 100000000;
        let closest:Block = new Block(new Coordinate(0, 0), blockType.CENTER);
        for(const block of selection){
            console.log(block.getYaw());
            console.log(Math.tan(Math.PI/4.0/i));
            if(Math.abs(block.getYaw() - Math.tan(Math.PI/4.0/i)) < minDelta){
                minDelta = Math.abs(block.getYaw() - Math.tan(Math.PI/4.0/i));
                closest = block;
            }
        }
        map[closest.location.posY][closest.location.posX].type = blockType.BEACON;
    }

    const size = 2 * info.size + 1;
    const blocks: ReactElement[][] = Array.from({ length: size }, () => Array(size).fill(<div></div>));

    for (let i = 0; i <= info.size; i++) {
        for (let j = 0; j <= info.size; j++) {
            const type = map[i][j].getStyle();
            blocks[info.size + i][info.size + j] = <div className={"block " + type}></div>;
            blocks[info.size + i][info.size - j] = <div className={"block " + type}></div>;
            blocks[info.size + j][info.size + i] = <div className={"block " + type}></div>;
            blocks[info.size + j][info.size - i] = <div className={"block " + type}></div>;
            blocks[info.size - i][info.size + j] = <div className={"block " + type}></div>;
            blocks[info.size - i][info.size - j] = <div className={"block " + type}></div>;
            blocks[info.size - j][info.size + i] = <div className={"block " + type}></div>;
            blocks[info.size - j][info.size - i] = <div className={"block " + type}></div>;
        }
    }

    return (
        <>
            <div style={{"aspectRatio":1, "width": 505, "display": "grid", "gridTemplateColumns": "1fr ".repeat(2 * info.size + 1)}}>
                {blocks}
            </div>
        </>
    )
}

export default Map;