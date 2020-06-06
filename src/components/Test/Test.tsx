import React from 'react';
import Game from '../../logic/Game';
function Test() {
    function testA(){
        const game  = new Game(3);
        const state = game.getState();
        const solveStates = game.solveA(3);
        console.log(solveStates);
    }
    function testIDA(){
        const game  = new Game(3);
        const state = game.getState();
        const solveStates = game.solveIDA(3);
        console.log(solveStates);
    }
    // @ts-ignore
    function getTimeAlgorithms(alg: string) {
        let min = 0;
        let max = 0;
        const start = new Date().getTime();
        if (alg === 'A') {
            testA();
        } else {
            testIDA();
        }
        const end = new Date().getTime();
        const time = end - start;
        return time;
    }
    function mainTest(alg: string) {
        let min = getTimeAlgorithms(alg);
        let max = min;
        let count = min;
        for (let i = 1; i< 300; i++) {
            let time = getTimeAlgorithms(alg);
            if (time > max) {
                max = time;
            }
            if (time < min) {
                min = time;
            }
            count += time;
        }
        console.log('Среднее время: ' + count / 300 + 'ms');
        console.log('Мин. время: ' + min + 'ms');
        console.log('Макс. время: ' + max + 'ms');
    }
    return (
        <div>
            <div onClick={(e) => mainTest('A')}>
                test
            </div>
            <div onClick={(e) => mainTest('IDA')}>
                test2
            </div>
        </div>


    );
}

export default Test;