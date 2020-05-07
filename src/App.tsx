import React, {Component} from 'react';
import './App.css';
import Game from './logic/Game';
import GameBoard from "./components/GameBoard/GameBoard";
import GameListState from "./components/GameListState/GameListState";
interface IGame {
    states: Array<Array<Array<number | string>>>
    state: Array<Array<number | string>>
    moves: number
    moveTile: Function
    endGame: boolean


}
class App extends Component<any, IGame > {
    constructor(props: any) {
        super(props);
        const game = new  Game(3);
        this.updateState = this.updateState.bind(this);
        this.state = {
            moves: game.getMoves(),
            moveTile: game.moveTile,
            state: game.getState(),
            states: game.states,
            endGame: game.endGame
        }
    }
    // @ts-ignore
    componentDidUpdate(prevProps, prevState) {
        // @ts-ignore
        if (this.state.state !== prevState.state) {
           console.log('vlz');
        }
    }
    updateState(value: IGame) {
        this.setState(value);
    }

    render() {
        let gameState;
        // @ts-ignore
        if (!this.state.endGame) {
            gameState =
                <div className="Game__main">
                    <GameBoard dimension={3} state={this.state.state} moves={this.state.moves} clickHandler={this.state.moveTile} updateState={this.updateState}/>
                    <GameListState dimension={3} states={this.state.states} />
                </div>
        }
        else {
            gameState = <div>win</div>
        }
        return (
            <div className="App">
                {gameState}
            </div>
        );
    }
}

export default App;
