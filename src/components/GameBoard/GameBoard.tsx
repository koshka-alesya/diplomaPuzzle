import React from 'react';
import Tiles from '../Tiles/Tiles';
import Timer from '../Timer/Timer';
import './GameBoard.css';
interface IBoardType {
    dimension: number
    state: Array<Array<number | string>>
    moves: number
    clickHandler: Function
    updateState: Function
}
function GameBoard(props: IBoardType) {
    return (
        <div className="GameBoard">
            <div className="GameBoard__timer">
                <div className="GameBoard__timer__icon"></div>
                <Timer />
            </div>
            <Tiles dimension={props.dimension} state={props.state} clickHandler={props.clickHandler} updateState={props.updateState}/>
            <div className="GameBoard__moves">
                <span className="GameBoard__moves__text">number of moves:</span>
                <span className="GameBoard__moves__count">{props.moves}</span>
            </div>
        </div>
    );
}

export default GameBoard;