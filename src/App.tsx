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
    game: any
    solveA: Function


}
class App extends Component<any, IGame > {
    constructor(props: any) {
        super(props);
        const game = new  Game(4);
        this.updateState = this.updateState.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            game: game,
            moves: game.getMoves(),
            moveTile: game.moveTile,
            state: game.getState(),
            states: game.states,
            endGame: game.endGame,
            solveA: game.solveA
        }
    }
    // @ts-ignore
    componentDidUpdate(prevProps, prevState) {
        // @ts-ignore
        if (this.state.game.getMoves() !== prevState.moves) {
           this.setState({moves: this.state.game.getMoves()})
        }
        if (this.state.game.endGame !== prevState.endGame) {
            this.setState({endGame: this.state.game.endGame})
        }
    }
    updateState(value: IGame) {
        this.setState(value);
    }
    onClick() {
        this.state.solveA(4);
    }

    render() {
        let gameState;
        // @ts-ignore
        if (!this.state.endGame) {
            gameState =
                <div className="Game__main">
                    <GameBoard dimension={4} state={this.state.state} moves={this.state.moves} clickHandler={this.state.moveTile} updateState={this.updateState}/>
                    <GameListState dimension={4} states={this.state.states} />
                    <div onClick={(e) => this.onClick()}>ClickMe</div>
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
