import React from 'react';
import Tiles from '../Tiles/Tiles';
import Timer from '../Timer/Timer';
// @ts-ignore
import Select from 'react-select';
import './GameBoard.css';
interface IBoardType {
    dimension: number
    state: Array<Array<number | string>>
    moves: number
    clickHandler: Function
    updateState: Function
    style: any
}
const options = [
    { value: '3x3', label: '3x3' },
    { value: '4x4', label: '4x4' }
]
const customStyles = {
        borderBottom: '1px dotted pink',
        color: 'Forest',
    }
function GameBoard(props: IBoardType) {
    return (
        <div className="GameBoard" style={props.style}>
            <div className="GameBoard__title">Game</div>
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