import React, {Component} from 'react';
// @ts-ignore
import Sparkle from 'react-sparkle';
// @ts-ignore
import { tada } from 'react-animations';
// @ts-ignore
import Radium, {StyleRoot} from 'radium';
import './WonPage.css';
import Button from "../Button/Button";
// @ts-ignore
import Select from 'react-select';


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
    updateStateApp: Function
}
class WonPage extends Component<IWonPage, Readonly<IPageState>> {
    constructor(props: any) {
        super(props);
        this.state = {
            dimension: 3,
            isWon: this.props.isWon,
            updateStateApp: this.props.updateStateApp
        }
    }
    handleChange = (selectedOption: any) => {
        this.setState({dimension: selectedOption.value})
    };
    onClick() {
        this.props.updateStateApp({isGame: true, isWon: false, dimension: this.state.dimension});
        // this.props.updateStateApp({isWon: false});
        // this.props.updateStateApp({dimension: this.state.dimension});
    }
    render() {
        let title = this.props.isWon ? 'You won!' : 'Start game';
        // @ts-ignore
        let sparkle = this.props.isWon ? <Sparkle color={'rgba(255,203,73,0.95)'} minSize={10} maxSize={15}/> : <div style={{display: "none"}}></div>;

        return (
            <div className="WonPage">
                {sparkle}
                <div className="WonPage__content">
                    <div className="WonPage__icon"></div>
                    <StyleRoot>
                        <div className="WonPage__text">
                            <div className="test" style={styles.tada}>
                                <div className="WonPage__title">{title}</div>
                            </div>
                            <div className="WonPage__dimension">
                                <Select options={options} onChange={this.handleChange} theme={(theme: any) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#E5FFED',
                                        primary: '#7CB777',
                                        primary75: '#7CB777',
                                        primary50: '#7CB777'
                                    },
                                })} defaultValue={options[0]}/>
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