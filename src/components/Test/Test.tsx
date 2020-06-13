import React from 'react';
import Game from '../../logic/Game';
function Test() {
    function testA(): number{
        const game  = new Game(5);
        const state = game.getState();
        console.log(state);
        const start = new Date().getTime();
        const solveStates = game.solveA(5);
        const end = new Date().getTime();
        console.log(solveStates);
        return end - start;
    }
    function testIDA(): number{
        const game  = new Game(5);
        const state = game.getState();
        const start = new Date().getTime();
        const solveStates = game.solveIDA(5);
        const end = new Date().getTime();
        console.log(solveStates);
        return end - start;
    }
    // @ts-ignore
    function getTimeAlgorithms(alg: string) {
        let time;
        if (alg === 'A') {
            time = testA();
        } else {
            time = testIDA();
        }
        return time;
    }
    function mainTest(alg: string) {
        let min = getTimeAlgorithms(alg);
        let max = min;
        let count = min;
        for (let i = 1; i< 10; i++) {
            let time = getTimeAlgorithms(alg);
            console.log(time);
            if (time > max) {
                max = time;
            }
            if (time < min) {
                min = time;
            }
            count += time;
        }
        console.log('Среднее время: ' + count / 10 + 'ms');
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