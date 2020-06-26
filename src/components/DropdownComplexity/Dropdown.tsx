import React, {Component} from 'react';
import '../Dropdown/Dropdown.css';

class DropdownDifficulty extends Component<any, Readonly<any>>{
    constructor(props: any) {
        super(props);

        this.state = {
            variables: {
                0: 'easy difficulty',
                1: 'medium difficulty',
                2: 'hard difficulty'
            },
            defaultValue: 0,
            expanded: false
        }
    }
    onChange(value: number) {
        this.setState({defaultValue: value});
        this.props.handleChangeDifficulty(value);
        this.setState({expanded: !this.state.expanded});
    }
    onExpandedChange() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        let value = this.state.variables[this.state.defaultValue];
        let stateMenu = this.state.expanded ? {display: 'flex'} : {display: 'none'};
        return (
            <div className="DropDown DropDown_difficulty">
                <div className="DropDown__main" onClick={(e) => this.onExpandedChange()}>
                    <div className="DropDown__value">{value}</div>
                    <div className="DropDown__expanded"></div>
                </div>
                <div className="DropDown__menu" style={stateMenu} >
                    <div className="DropDown__menu__item" onClick={(e) => this.onChange(0)}>
                        <div className="DropDown__dot"></div>
                        <div className="DropDown__menu__item__title">easy difficulty</div>
                    </div>
                    <div className="DropDown__menu__item" onClick={(e) => this.onChange(1)}>
                        <div className="DropDown__dot"></div>
                        <div className="DropDown__menu__item__title">medium difficulty</div>
                    </div>
                    <div className="DropDown__menu__item" onClick={(e) => this.onChange(2)}>
                        <div className="DropDown__dot"></div>
                        <div className="DropDown__menu__item__title">hard difficulty</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DropdownDifficulty;
