import React, {Component} from 'react';
import './App.css';
import WonPage from "./components/WonPage/WonPage";
import PageGame from "./components/PageGame/PageGame";
// @ts-ignore
import sound from  "./sound/main.mp3";


interface IApp {
    isGame: boolean
    isWon: boolean
    dimension: number
}
class App extends Component<any, IApp> {
    constructor(props: any) {
        super(props);
        this.updateStateApp = this.updateStateApp.bind(this);
        this.state = {
            isGame: false,
            isWon: false,
            dimension: 3
        }
    }
    componentDidMount() {
        let audio=document.querySelector("audio");
        // @ts-ignore
        audio.play();
        // @ts-ignore
        audio.volume=0.2;
    }

    updateStateApp(value: any) {
        this.setState(value);
    }

    render() {
        let gameState;
        // @ts-ignore
        if (this.state.isGame && !this.state.isWon) {
            gameState =
               <PageGame dimension={this.state.dimension} updateStateApp={this.updateStateApp} />
        }
        else {
            gameState = <WonPage isWon={this.state.isWon} updateStateApp={this.updateStateApp}/>
        }
        return <div className="App">
            {gameState}
        </div>;
    }
}

export default App;
