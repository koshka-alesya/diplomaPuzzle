import React, {Component} from 'react';
import './Dropdown.css';

class Dropdown extends Component<any, Readonly<any>>{
    constructor(props: any) {
        super(props);

        this.state = {
            variables: {
                3: '3 x 3',
                4: '4 x 4'
            },
            defaultValue: 3,
            expanded: false
        }
    }
    onChange(value: number) {
        this.setState({defaultValue: value});
        this.props.handleChange(value);
        this.setState({expanded: !this.state.expanded});
    }
    onExpandedChange() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        let value = this.state.variables[this.state.defaultValue];
        let stateMenu = this.state.expanded ? {display: 'flex'} : {display: 'none'};
        return (
            <div className="DropDown">
                <div className="DropDown__main" onClick={(e) => this.onExpandedChange()}>
                    <div className="DropDown__value">{value}</div>
                    <div className="DropDown__expanded"></div>
                </div>
                <div className="DropDown__menu" style={stateMenu} >
                    <div className="DropDown__menu__item" onClick={(e) => this.onChange(3)}>
                        <div className="DropDown__dot"></div>
                        <div className="DropDown__menu__item__title">3 x 3</div>
                    </div>
                    <div className="DropDown__menu__item" onClick={(e) => this.onChange(4)}>
                        <div className="DropDown__dot"></div>
                        <div className="DropDown__menu__item__title">4 x 4</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dropdown;
