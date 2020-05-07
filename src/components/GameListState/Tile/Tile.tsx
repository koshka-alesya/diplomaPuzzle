import React from 'react';
import './Tile.css';
import '../../Tile/Tile.css'
interface ITileType {
    tile: number | string
    x: number
    y: number
}
function TileList(props: ITileType) {
    let posTop = props.x === 0 ? 0 : (props.x*50) + 'px';
    let posLeft = props.y === 0 ? 0 : (props.y*50) + 'px';
    const posStyle = {
        top: posTop,
        left: posLeft
    };
    const classTile = props.tile === '' ? 'GameListState__Tile__cactus' : 'GameListState__Tile__number';

    return (
        <div className="GameListState__Tile" style={posStyle} >
            <div className={classTile} >
                {props.tile}
            </div>
        </div>
    );
}

export default TileList;