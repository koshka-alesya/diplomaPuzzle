import React, {Component} from 'react';
import './Timer.css';
class Timer extends Component {
    private timerID: any;
    constructor(props: any) {
        super(props);
        this.state = {
            value: 0
        }
    }
    increment(){
        // @ts-ignore
        this.setState({value: this.state.value + 1});
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.increment(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        // @ts-ignore
        const value = this.state.value;
        const min = Math.floor(value / 60) < 10 ? '0' + Math.floor(value / 60) : Math.floor(value / 60);
        const sec = value < 10 ? '0' + value : (value % 60 < 10 ? '0' + value % 60 : value % 60);
        return (
            <div className="Timer">
                <div className="Timer__text">{min}</div>:
                <div className="Timer__text">{sec}</div>
            </div>
        );
    }
}

export default Timer;
