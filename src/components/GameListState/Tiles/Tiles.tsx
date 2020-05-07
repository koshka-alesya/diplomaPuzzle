// @ts-ignore
import React from 'react';
import TileList from '../Tile/Tile';
import './Tiles.css';
interface ITilesListType {
    dimension: number
    state: Array<Array<number | string>>
}
function TilesList(props: ITilesListType) {
    let tiles = [];
    for (let i=0; i< props.dimension; i++) {
        for (let j=0; j<props.dimension; j++) {
            tiles.push(<TileList tile={props.state[i][j]} x={i} y={j}  />)
        }
    }
    const length = (props.dimension*40 + (props.dimension - 1)*10)+'px';
    const styles = {
        width: length,
        height: length
    };
    return (
        <div className="TilesList" style={styles}>
            {tiles}
        </div>
    );
}

// @ts-ignore
export default TilesList;