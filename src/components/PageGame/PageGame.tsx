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
    bfs: Function
    dimension: number,
    expanded: boolean,
    canMoveTile: Function


}
class PageGame extends Component<any, IGame > {
    constructor(props: any) {
        super(props);
        const game = new Game(props.dimension, props.difficulty);
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
            bfs: game.bfs,
            dimension: props.dimension,
            expanded: true,
            canMoveTile: game.canMoveTile,
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
        this.animationSolve(statesA);
        // this.setState({states:  statesA, moves: statesA.length - 1, state: statesA[statesA.length -1], expanded: false});
    }
    onClickIDA() {
        let statesIDA = this.state.solveIDA(this.state.dimension);
        this.animationSolve(statesIDA);
        // this.setState({states: statesIDA, moves: statesIDA.length - 1, state: statesIDA[statesIDA.length -1], expanded: false});
    }
    onClickBFS() {
       let statesBFS = this.state.bfs(this.state.dimension);
        this.animationSolve(statesBFS);
       // this.setState({states: statesBFS, moves: statesBFS.length - 1, state: statesBFS[statesBFS.length -1], expanded: false});
    }
    onBackHome() {
        this.props.updateStateApp({isWon: false, isGame: false});
    }
    scrollBottom() {
        const element = document.querySelector('.TilesList__last');
        // @ts-ignore
        element.scrollIntoView();
    }
    animationSolve(states: Array<Array<Array<number | string>>>) {
        // @ts-ignore
        let statesAnimation = [];
        statesAnimation.push(states[0]);
        this.setState({states: statesAnimation, moves: 0, state: states[states.length -1], expanded: false});
        let i = 1;
        let timerId = setInterval(() => {
            statesAnimation.push(states[i]);
            this.setState({moves: i});
            // @ts-ignore
            this.setState({states: statesAnimation});
            i++;
            if (i === states.length) {
                clearInterval(timerId);
            }
        }, 500);
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
                        <GameBoard style={styleExpandedGame} dimension={this.state.dimension} state={this.state.state} moves={this.state.moves} clickHandler={this.state.moveTile} updateState={this.updateState} canMoveTile={this.state.canMoveTile}/>
                        <GameListState dimension={this.state.dimension} states={this.state.states} />
                    </div>
                    <div className="Game__buttons" style={styleExpandedGame}>
                        <div className="Game__button" onClick={(e) => this.onClickA()}>
                            <Button caption={'Solve A*'}/>
                        </div>
                        <div className="Game__button" onClick={(e) => this.onClickIDA()}>
                            <Button caption={'Solve IDA'}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageGame;
