import React from 'react';
import Game from '../../logic/Game';
function Test() {
    function testA(){
        const game  = new Game(3);
        const state = game.getState();
        const solveStates = game.solveA(3);
        console.log(solveStates);
    }
    // @ts-ignore
    function getTimeAlgorithms(test) {
        const start = new Date().getTime();
        test();
        const end = new Date().getTime();
        console.log('SecondWay: ${end - start}ms');
    }
    function mainTest() {
        const start = new Date().getTime();
        testA();
        const end = new Date().getTime();
        const time = start - end;
        console.log('Time:' + time + 'ms');
    }
    return (
        <div onClick={(e) => mainTest()}>
                   test
        </div>
    );
}

export default Test;