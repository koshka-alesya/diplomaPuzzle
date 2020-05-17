import React from 'react';
import './Button.css';
interface IButton {
    caption: string
}
function Button(props: IButton) {
    return (
        <div className="Button">
            {props.caption}
        </div>
    );
}

export default Button;