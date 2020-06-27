import React from 'react';
import Game from '../../logic/Game';
function Test() {
    let fail = 0;
    function testA(): number{
        const game  = new Game(3, 0);
        const state = game.getState();
        console.log(state);
        const start = new Date().getTime();
        const solveStates = game.solveA(3);
        const end = new Date().getTime();
        console.log(solveStates);
        return end - start;
    }
    function testIDA(): number{
        const game  = new Game(5, 2);
        const state = game.getState();
        const start = new Date().getTime();
        const solveStates = game.solveIDA(5);
        const end = new Date().getTime();
        console.log(solveStates);
        return end - start;
    }
    function testBFS(): number{
        const game  = new Game(5, 1);
        const state = game.getState();
        const start = new Date().getTime();
        const solve = game.bfs(5);
        const end = new Date().getTime();
        console.log(solve);
        if (solve === 'fail') {
            fail++;
        }
        return end - start;
    }
    // @ts-ignore
    function getTimeAlgorithms(alg: string) {
        let time;
        if (alg === 'A') {
            time = testA();
        } else if (alg === 'IDA') {
            time = testIDA();
        } else {
            time = testBFS();
        }
        return time;
    }
    function mainTest(alg: string) {
        let min = getTimeAlgorithms(alg);
        let max = min;
        let count = min;
        let timeC = 0;
        for (let i = 1; i< 100; i++) {
            let time = getTimeAlgorithms(alg);
            console.log(time);
            timeC++;
            console.log(timeC)
            if (time > max) {
                max = time;
            }
            if (time < min) {
                min = time;
            }
            count += time;
        }
        console.log('Среднее время: ' + count / 100 + 'ms');
        console.log('Мин. время: ' + min + 'ms');
        console.log('Макс. время: ' + max + 'ms');
        console.log(fail);
    }
    return (
        <div className="Test">
            <div onClick={(e) => mainTest('A')}>
                test
            </div>
            <div onClick={(e) => mainTest('IDA')}>
                test2
            </div>
            <div onClick={(e) => mainTest('BFS')}>
                test2
            </div>
        </div>


    );
}

export default Test;