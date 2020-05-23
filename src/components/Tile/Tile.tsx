import React from 'react';
import './Tile.css';
interface ITileType {
    tile: number | string
    x: number
    y: number
    clickHandler: Function
    updateState: Function
    dimension: number
}
function Tile(props: ITileType) {
    let posTop = props.x === 0 ? 0 : (props.x*80) + 'px';
    let posLeft = props.y === 0 ? 0 : (props.y*80) + 'px';
    const posStyle = {
        top: posTop,
        left: posLeft
    };
    const classTile = props.tile === '' ? 'Tile__cactus' : 'Tile__number';

    function onClick() {
        props.updateState(props.clickHandler(props.dimension, props.tile))
    }
    return (
        <div className="Tile" style={posStyle} onClick={(e) => onClick()}>
            <div className={classTile} >
                {props.tile}
            </div>
        </div>
    );
}

export default Tile;