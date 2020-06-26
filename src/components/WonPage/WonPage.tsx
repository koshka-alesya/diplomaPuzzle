import React, {Component} from 'react';
// @ts-ignore
import Sparkle from 'react-sparkle';
// @ts-ignore
import { tada } from 'react-animations';
// @ts-ignore
import Radium, {StyleRoot} from 'radium';
import './WonPage.css';
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import DropdownDifficulty from "../DropdownComplexity/Dropdown"



const styles = {
    tada: {
        animation: 'x 1s',
        animationName: Radium.keyframes(tada, 'tada')
    }
}
const options = [
    { value: 3, label: '3x3' },
    { value: 4, label: '4x4' }
]
const customStyles = {
    borderBottom: '1px dotted pink',
    color: 'Forest',
}

interface IWonPage {
    isWon: boolean
    updateStateApp: Function
}
interface IPageState {
    dimension: number
    isWon: boolean
    updateStateApp: Function,
    difficulty: number
}
class WonPage extends Component<IWonPage, Readonly<IPageState>> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
        this.state = {
            dimension: 3,
            isWon: this.props.isWon,
            updateStateApp: this.props.updateStateApp,
            difficulty: 0
        }
    }
    handleChange = (value: number) => {
        this.setState({dimension: value})
    };
    handleChangeDifficulty = (value: number) => {
        this.setState({difficulty: value})
    };
    onClick() {
        this.props.updateStateApp({isGame: true, isWon: false, dimension: this.state.dimension, difficulty: this.state.difficulty});
    }
    render() {
        let title = this.props.isWon ? 'You won!' : 'Start game';
        // @ts-ignore
        let sparkle = this.props.isWon ? <Sparkle color={'rgba(255,203,73,0.95)'} minSize={10} maxSize={15}/> : <div style={{display: "none"}}></div>;

        return (
            <div className="WonPage">
                {sparkle}
                <div className="WonPage__content">
                    <div className="Fern__title">Fern puzzle</div>
                    <div className="WonPage__icon"></div>
                    <StyleRoot>
                        <div className="WonPage__text">
                            <div className="test" style={styles.tada}>
                                <div className="WonPage__title">{title}</div>
                            </div>
                            <div className="dropdowns">
                                <Dropdown handleChange={this.handleChange}/>
                                <DropdownDifficulty handleChangeDifficulty={this.handleChangeDifficulty}/>
                            </div>
                            <div className="WonPage__button" onClick={(e) => this.onClick()}>
                                <Button caption={'Play'}/>
                            </div>
                        </div>
                    </StyleRoot>
                </div>
            </div>
        );
    }
}

export default WonPage;