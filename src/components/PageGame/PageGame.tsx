import React, {Component} from 'react';
import '../../App.css';
import './PageGame.css';
import Game from '../../logic/Game';
import GameBoard from "../GameBoard/GameBoard";
import GameListState from "../GameListState/GameListState";
import Button from "../Button/Button";
interface IGame {
    states: Array<Array<Array<number | string>>>
    state: Array<Array<number | string>>
    moves: number
    moveTile: Function
    endGame: boolean
    game: any
    solveA: Function
    solveIDA: Function
    dimension: number


}
class PageGame extends Component<any, IGame > {
    constructor(props: any) {
        super(props);
        const game = new  Game(props.dimension);
        this.updateState = this.updateState.bind(this);
        this.onClickA = this.onClickA.bind(this);
        this.state = {
            game: game,
            moves: game.getMoves(),
            moveTile: game.moveTileInGame,
            state: game.getState(),
            states: game.states,
            endGame: game.endGame,
            solveA: game.solveA,
            solveIDA: game.solveIDA,
            dimension: props.dimension
        }
    }
    // @ts-ignore
    componentDidUpdate(prevProps, prevState) {
        // @ts-ignore
        if (this.state.game.getMoves() !== prevState.moves) {
            this.setState({moves: this.state.game.getMoves()})
        }
        if (this.state.game.endGame !== prevState.endGame) {
            this.setState({endGame: this.state.game.endGame});
            this.props.updateStateApp({isWon: true})
        }
    }
    updateState(value: IGame) {
        this.setState(value);
    }
    onClickA() {
        this.state.solveA(this.state.dimension);
    }
    onClickIDA() {
        this.state.solveIDA(this.state.dimension);
    }

    render() {
        return (
            <div className="App">
                <div className="Game">
                    <div className="Fern__title">Fern puzzle</div>
                    <div className="Game__main">
                        <GameBoard dimension={this.state.dimension} state={this.state.state} moves={this.state.moves} clickHandler={this.state.moveTile} updateState={this.updateState}/>
                        <GameListState dimension={this.state.dimension} states={this.state.states} />
                    </div>
                    <div className="Game__buttons">
                        <div className="Game__button" onClick={(e) => this.onClickA()}>
                            <Button caption={'Solve A*'}/>
                        </div>
                        <div className="Game__button" onClick={(e) => this.onClickA()}>
                            <Button caption={'Solve IDA'}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageGame;
