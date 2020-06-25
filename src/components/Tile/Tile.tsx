import React from 'react';
import './Tile.css';
import useSound from 'use-sound';

// @ts-ignore
import boopSfx from '../../sound/cloth2.mp3';
interface ITileType {
    tile: number | string
    x: number
    y: number
    clickHandler: Function
    updateState: Function
    dimension: number
    canMoveTile: Function
}
function Tile(props: ITileType) {
    let length = props.dimension === 5 ? 50 : 60;
    let padding = props.dimension === 5 ? 10 : 20;
    let posTop = props.x === 0 ? 0 : (props.x*(length+padding)) + 'px';
    let posLeft = props.y === 0 ? 0 : (props.y*(length+padding)) + 'px';
    const posStyle = {
        top: posTop,
        left: posLeft,
        width: length,
        height: length

    };
    const classTile = props.tile === '' ? 'Tile__cactus' : 'Tile__number';
    const [play] = useSound(boopSfx);

    function onClick() {
        if (props.canMoveTile(props.dimension, props.tile)) {
            props.updateState(props.clickHandler(props.dimension, props.tile));
            play();
        }
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