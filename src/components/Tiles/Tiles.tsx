import React from 'react';
import Tile from '../Tile/Tile';
import './Tiles.css';
interface ITilesType {
    dimension: number
    state: Array<Array<number | string>>
    clickHandler: Function
    updateState: Function
    canMoveTile: Function
}
function Tiles(props: ITilesType) {
    let tiles = [];
    for (let i=0; i< props.dimension; i++) {
        for (let j=0; j<props.dimension; j++) {
            tiles.push(<Tile tile={props.state[i][j]} x={i} y={j} clickHandler={props.clickHandler} updateState={props.updateState} dimension={props.dimension} canMoveTile={props.canMoveTile}/>)
        }
    }
    const dim = props.dimension === 5 ? 50 : 60;
    let padding = props.dimension === 5 ? 10 : 20;
    const length = (props.dimension*dim + (props.dimension - 1)*padding)+'px';
    const styles = {
        width: length,
        height: length
    };
    return (
        <div className="Tiles" style={styles}>
            {tiles}
        </div>
    );
}

export default Tiles;