import React from 'react';
import './Button.css';
import useSound from 'use-sound';

// @ts-ignore
import boopSfx from '../../sound/cloth2.mp3';
interface IButton {
    caption: string
}
function Button(props: IButton) {
    const [playActive] = useSound(
        boopSfx
    );
    function play() {
        playActive();
    }
    return (
        <div className="Button" onMouseEnter={(e) => play()}>
            {props.caption}
        </div>
    );
}

export default Button;