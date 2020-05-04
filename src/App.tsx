import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './logic/Game';
import GameBoard from "./components/GameBoard/GameBoard";

class App extends Component {
    constructor(props: any) {
        super(props);
        const game = new  Game(3);
        this.updateState = this.updateState.bind(this);
        this.state = {
            startGame: game,
            state: game.getState()
        }
    }
    // @ts-ignore
    componentDidUpdate(prevProps, prevState) {
        // @ts-ignore
        if (this.state.state !== prevState.state) {
           console.log('vlz');
        }
    }
    updateState(value: Array<Array<number | string>>) {
        this.setState(value);
    }

    render() {
        let gameState;
        // @ts-ignore
        if (!this.state.startGame.endGame) {
            gameState =
                // @ts-ignore
                <GameBoard dimension={3} state={this.state.state} moves={this.state.startGame.getMoves()} clickHandler={this.state.startGame.moveTile} updateState={this.updateState}/>
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
