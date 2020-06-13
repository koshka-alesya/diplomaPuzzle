import React from 'react';
import './GameListState.css';
import TilesList from "./Tiles/Tiles";
interface IGameListState {
    // плохое решение, надо оптимизировать
    dimension: number
    states: Array<Array<Array<number | string>>>
}
function GameListState(props: IGameListState) {
    let states: any[] = [];
    let lastIndex = props.states.length - 1;
    props.states.forEach((item, index) => states.push(<TilesList dimension={props.dimension} state={item} class={index === lastIndex ? 'TilesList TilesList__last': 'TilesList'}/>));
    return (
            <div className="GameListState__wrapper">
                <div className="GameListState__title">Steps</div>
                <div className="GameListState__list">
                    <div className="GameListState">
                        {states}
                    </div>
                </div>
            </div>
    );
}

export default GameListState;