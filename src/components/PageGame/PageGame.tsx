import React, {Component} from 'react';
import '../../App.css';
import './PageGame.css';
import Game from '../../logic/Game';
import GameBoard from "../GameBoard/GameBoard";
import GameListState from "../GameListState/GameListState";
import Button from "../Button/Button";
import Test from "../Test/Test";
import Tile from "../Tile/Tile";
interface IGame {
    states: Array<Array<Array<number | string>>>
    state: Array<Array<number | string>>
    moves: number
    moveTile: Function
    endGame: boolean
    game: any
    solveA: Function
    solveIDA: Function
    dimension: number,
    expanded: boolean


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
            dimension: props.dimension,
            expanded: true
        }
    }
    // @ts-ignore
    componentDidUpdate(prevProps, prevState) {
        // @ts-ignore
        if (this.state.game.getMoves() !== prevState.moves) {
            this.setState({moves: this.state.game.getMoves()});
            this.scrollBottom();
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
        let statesA = this.state.solveA(this.state.dimension);
        this.setState({states:  statesA, moves: statesA.length - 1, state: statesA[statesA.length -1], expanded: false});
    }
    onClickIDA() {
        let statesIDA = this.state.solveIDA(this.state.dimension);
        this.setState({states: statesIDA, moves: statesIDA.length - 1, state: statesIDA[statesIDA.length -1], expanded: false});
    }
    onBackHome() {
        this.props.updateStateApp({isWon: false, isGame: false});
    }
    scrollBottom() {
        const element = document.querySelector('.TilesList__last');
        // @ts-ignore
        element.scrollIntoView();
    }



    render() {
        let styleExpandedGame = this.state.expanded ? {} : {display: 'none'};
        return (
            <div className="App">
                <div className="Game">
                    <div className="Game__header">
                        <div className="Game__back" onClick={() => this.onBackHome()}><span className="Game__back__icon"></span> </div>
                        <div className="Fern__title">Fern puzzle</div>
                    </div>
                    <div className="Game__main">
                        <GameBoard style={styleExpandedGame} dimension={this.state.dimension} state={this.state.state} moves={this.state.moves} clickHandler={this.state.moveTile} updateState={this.updateState}/>
                        <GameListState dimension={this.state.dimension} states={this.state.states} />
                    </div>
                    <div className="Game__buttons" style={styleExpandedGame}>
                        <div className="Game__button" onClick={(e) => this.onClickA()}>
                            <Button caption={'Solve A*'}/>
                        </div>
                        <div className="Game__button" onClick={(e) => this.onClickIDA()}>
                            <Button caption={'Solve IDA'}/>
                        </div>
                        <Test />
                    </div>
                </div>
            </div>
        );
    }
}

export default PageGame;
