// @ts-ignore
import {TileState} from "./TileState";

const INFINITY = Number.MAX_SAFE_INTEGER;

class Game {
    constructor(dimension: number) {
        this.states = [];
        this.createInitialTile(dimension);
        this.moveTile = this.moveTile.bind(this);
        this.moveTileInGame = this.moveTileInGame.bind(this);
        this.endGame = false;
        this.solveA = this.solveA.bind(this);
        this.solveIDA = this.solveIDA.bind(this);
    }

    public _finalState3: Array<Array<number | string>> = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, '']
    ];
    public _finalState31: Array<Array<number | string>> = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, '']
    ];
    public _finalState4: Array<Array<number | string>> = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, '']
    ];
    public _finalState5: Array<Array<number | string>> = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, '']
    ];
    public endGame: boolean = false;
    protected moves: number = 0;
    public states: Array<Array<Array<number | string>>> = [];

    public getMoves(): number {
        return this.moves;
    }

    // @ts-ignore
    protected state: Array<Array<number | string>>;

    public getState(): Array<Array<number | string>> {
        return this.state;
    }

    // @ts-ignore
    protected indexXEmpty: number;
    // @ts-ignore
    protected indexYEmpty: number;

    // @ts-ignore
    protected getCoordsTile(dimension: number, tile: number | string): { x: number, y: number } {
        for (let i = 0; i < dimension; i++) {
            if (this.state[i].indexOf(tile) !== -1) {
                return {x: i, y: this.state[i].indexOf(tile)};
            }
        }
    }

    // @ts-ignore
    protected getCoordsTileInState(state: TileState, dimension: number, tile: number | string): { x: number, y: number } {
        for (let i = 0; i < dimension; i++) {
            if (state.state[i].indexOf(tile) !== -1) {
                return {x: i, y: state.state[i].indexOf(tile)};
            }
        }
    }

    protected createInitialTile(dimension: number): void {
        this.state = dimension === 3 ? this.arrayClone(this._finalState3) : (dimension === 4 ? this.arrayClone(this._finalState4) : this.arrayClone(this._finalState5));
        const emptyCoords = this.getCoordsTile(dimension, '');
        this.indexXEmpty = emptyCoords.x;
        this.indexYEmpty = emptyCoords.y;
        // будем рандомно перемещать элементы итоговой доски
        let i = 30;
        while (i > 0) {
            let iniState = this.arrayClone(this.state);
            this.state = this.moveTileInMatrix(this.state, dimension, this.randomInteger(1, dimension * dimension - 1));
            if (!this.arrayCompare(iniState, this.state)) {
                i--;
            }
        }
        this.moves = 0;
        this.states = [];

        this.states.push(this.arrayClone(this.state));
    }

    protected arrayClone(obj: any[]): any[] {
        const res: any[] = [];
        obj.forEach((array) => {
            res.push([...array])
        })
        return res;
    }

    protected arrayCompare(obj1: any[], obj2: any[]): boolean {
        for (let i = 0; i < obj1.length; i++) {
            for (let j = 0; j < obj1[i].length; j++) {
                if (obj2[i][j] !== obj1[i][j]) {
                    return false
                }
            }
        }
        return true;
    }

    protected isIncludeArray(array1: any[], array2: any[]) {
        for (let i = 0; i < array1.length; i++) {
            if (this.arrayCompare(array1[i], array2)) {
                return i;
            }
        }
        return false;
    }

    protected indexOfArray(array1: any[], array2: any[]): number {
        for (let i = 0; i < array1.length; i++) {
            if (this.arrayCompare(array1[i], array2))
                return i;
        }
        return 0;
    }

    protected randomInteger(min: number, max: number): number {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    protected canMoveTile(dimension: number, tile: number | string): boolean {
        const tileCoords = this.getCoordsTile(dimension, tile);
        // если находятся в одной строке и разница 1 или в одном столбце и разница 1
        return (tileCoords.y === this.indexYEmpty && Math.abs(tileCoords.x - this.indexXEmpty) === 1) || (tileCoords.x === this.indexXEmpty && Math.abs(tileCoords.y - this.indexYEmpty) === 1);
    }

    public isEndGame(dimension: number): boolean {
        let finalState = dimension === 3 ? this.arrayClone(this._finalState3) : (dimension === 4 ? this.arrayClone(this._finalState4) : this.arrayClone(this._finalState5));
        return this.state.toString() === finalState.toString();
    }

    public isEndGameIDA(dimension: number, state: any[]): boolean {
        let finalState = dimension === 3 ? this.arrayClone(this._finalState3) : (dimension === 4 ? this.arrayClone(this._finalState4) : this.arrayClone(this._finalState5));
        return state.toString() === finalState.toString();
    }

    protected canMoveTileState(state: TileState, dimension: number, tile: number | string): boolean {
        const tileCoords = this.getCoordsTileInState(state, dimension, tile);
        let emptyCoords = this.getCoordsTileInState(state, dimension, '');
        // если нвходятся в одной строке и разница 1 или в одном столбце и разница 1
        return (tileCoords.y === emptyCoords.y && Math.abs(tileCoords.x - emptyCoords.x) === 1) || (tileCoords.x === emptyCoords.x && Math.abs(tileCoords.y - emptyCoords.y) === 1);
    }

    public moveTile(state: TileState, dimension: number, tile: number | string): TileState {
        let newState = new TileState(state.state);

        // проверяем, можем ли мы двигать плитку
        if (!this.canMoveTileState(newState, dimension, tile)) {
            return newState;
        }

        let emptyCoords = this.getCoordsTileInState(newState, dimension, '');
        const tileCoords = this.getCoordsTileInState(newState, dimension, tile);
        newState.state[emptyCoords.x][emptyCoords.y] = tile;
        this.indexXEmpty = tileCoords.x;
        this.indexYEmpty = tileCoords.y;
        newState.state[tileCoords.x][tileCoords.y] = '';
        this.moves++;
        if (this.isEndGame(dimension)) {
            this.endGame = true;
        }
        return newState;
    }

    public moveTileInGame(dimension: number, tile: number | string): Array<Array<string | number>> {
        // проверяем, можем ли мы двигать плитку
        if (!this.canMoveTile(dimension, tile)) {
            return this.state;
        }
        let emptyCoords = this.getCoordsTile(dimension, '');
        const tileCoords = this.getCoordsTile(dimension, tile);
        this.state[emptyCoords.x][emptyCoords.y] = tile;
        this.indexXEmpty = tileCoords.x;
        this.indexYEmpty = tileCoords.y;
        this.state[tileCoords.x][tileCoords.y] = '';
        this.moves++;
        if (this.isEndGame(dimension)) {
            this.endGame = true;
        }
        this.states.push(this.arrayClone(this.state));
        return this.state;
    }

    public moveTileInMatrix(state: Array<Array<string | number>>, dimension: number, tile: number | string): Array<Array<string | number>> {
        let newState = this.arrayClone(state);
        // проверяем, можем ли мы двигать плитку
        if (!this.canMoveTile(dimension, tile)) {
            return newState;
        }
        let emptyCoords = this.getCoordsTile(dimension, '')
        const tileCoords = this.getCoordsTile(dimension, tile);
        newState[emptyCoords.x][emptyCoords.y] = tile;
        this.indexXEmpty = tileCoords.x;
        this.indexYEmpty = tileCoords.y;
        newState[tileCoords.x][tileCoords.y] = '';
        this.moves++;
        if (this.isEndGame(dimension)) {
            this.endGame = true;
        }
        this.states.push(newState);
        return newState;
    }

    private getPossibleTileForMove(state: Array<Array<number | string>>, dimension: number): Array<number | string> {
        let tiles = [];
        if (this.indexYEmpty !== dimension - 1) {
            tiles.push(state[this.indexXEmpty][this.indexYEmpty + 1]);
        }
        if (this.indexYEmpty !== 0) {
            tiles.push(state[this.indexXEmpty][this.indexYEmpty - 1]);
        }
        if (this.indexXEmpty !== dimension - 1) {
            tiles.push(state[this.indexXEmpty + 1][this.indexYEmpty]);
        }
        if (this.indexXEmpty !== 0) {
            tiles.push(state[this.indexXEmpty - 1][this.indexYEmpty]);
        }
        return tiles;
    }

    private getPossibleTileForMoveInState(state: TileState, dimension: number): Array<number | string> {
        let emptyCoords = this.getCoordsTileInState(state, dimension, '');
        let tiles = [];
        if (emptyCoords.y !== dimension - 1) {
            tiles.push(state.state[emptyCoords.x][emptyCoords.y + 1]);
        }
        if (emptyCoords.y !== 0) {
            tiles.push(state.state[emptyCoords.x][emptyCoords.y - 1]);
        }
        if (emptyCoords.x !== dimension - 1) {
            tiles.push(state.state[emptyCoords.x + 1][emptyCoords.y]);
        }
        if (emptyCoords.x !== 0) {
            tiles.push(state.state[emptyCoords.x - 1][emptyCoords.y]);
        }
        return tiles;
    }

    // получаем возможные состояния 2-4
    private getPossibleStatesForMove(state: TileState, dimension: number): Array<TileState> {
        let statesMove: Array<TileState> = [];

        let tiles = this.getPossibleTileForMoveInState(state, dimension);
        tiles.forEach((item) => {
            let posState = this.moveTile(state, dimension, item);
            statesMove.push(posState);
            let emptyCoords = this.getCoordsTile(dimension, '');
            this.indexXEmpty = emptyCoords.x;
            this.indexYEmpty = emptyCoords.y;
            this.moves--;
        })
        return statesMove
    }

    // эвристика - считаем наименьший вес - простая - не эффективная
    private getCountTileOutOfPlace(state: Array<Array<number | string>>, dimension: number): number {
        let count = 0;
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                if (state[i][j] !== this._finalState31[i][j]) {
                    count++;
                }
            }
        }
        return count;
    }

    // @ts-ignore
    private getRightCoordsTile(tile: number | string, dimension: number): { x: number, y: number } {
        let finalState = dimension === 3 ? this.arrayClone(this._finalState3) : (dimension === 4 ? this.arrayClone(this._finalState4) : this.arrayClone(this._finalState5));
        for (let m = 0; m < dimension; m++) {
            for (let d = 0; d < dimension; d++) {
                if (finalState[m][d] === tile) {
                    return {x: m, y: d}
                }
            }
        }
    }

    private getManhattanDistance(state: Array<Array<number | string>>, dimension: number): number {
        let distance = 0;
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                let coordsRight = this.getRightCoordsTile(state[i][j], dimension);
                let localDistance = Math.abs(i - coordsRight.x) + Math.abs(j - coordsRight.y);
                distance += localDistance;

            }
        }
        return distance;
    }

    // получаем состояние с наименьшим весом
    private getStateForMoveWithLeastWeight(states: Array<TileState>, dimension: number): { state: TileState, minIndex: number, minWeight: number } {
        let min: number = 0;
        let minWeight = states[0].h + states[0].g;
        for (let i = 1; i < states.length; i++) {
            let weightState = states[i].h + states[i].g;
            if (weightState < minWeight) {
                minWeight = weightState;
                min = i;
            }
        }
        return {state: states[min], minIndex: min, minWeight: minWeight};
    }

    private completeSolutionList(completeState: TileState): TileState[] {
        let resList: TileState[] = [];
        let s = completeState;
        while (s.parent) {
            resList.unshift(s);
            s = s.parent;
        }
        resList.unshift(s);
        return resList;
    }

    // Реализация алгоритмов
    protected _listStateA = [];
    // список открытых вершин, которые не надо проверять
    protected _listOpenStateA: Array<TileState> = [];
    protected _listCloseStateA: Array<TileState> = [];

    public getListTileA(dimension: number): Array<Array<number | string>> | null {
        const startState = new TileState(this.state);
        startState.g = 0;
        startState.h = this.getManhattanDistance(startState.state, dimension);
        this._listOpenStateA.push(startState);
        while (this._listOpenStateA.length !== 0) {
            let minF = this.getStateForMoveWithLeastWeight(this._listOpenStateA, dimension);
            let currentState = minF.state;
            this.state = this.arrayClone(currentState.state);
            if (this.isEndGame(dimension)) {
                let solution = this.completeSolutionList(currentState);
                console.log("Solution");
                let solutionA: Array<Array<number | string>> = [];
                solution.forEach((item) => {
                    console.log(item.state);
                    // @ts-ignore
                    solutionA.push(item.state);
                })
                return solutionA
            }

            this._listOpenStateA.splice(minF.minIndex, 1);
            this._listCloseStateA.push(currentState);

            let posStates = this.getPossibleStatesForMove(currentState, dimension);
            for (let i = 0; i < posStates.length; i++) {
                let neighbor = posStates[i];
                neighbor.h = this.getManhattanDistance(neighbor.state, dimension);
                let sameInClose = this._listCloseStateA.filter((item) => {
                    return this.arrayCompare(item.state, neighbor.state);
                });
                let sameInOpen = this._listOpenStateA.filter((item) => {
                    return this.arrayCompare(item.state, neighbor.state);
                });
                if (this.isEndGameIDA(dimension, neighbor.state)) {
                    let distance = currentState.g + 1;
                    neighbor.parent = currentState;
                    neighbor.g = distance;
                    let solution = this.completeSolutionList(neighbor);
                    console.log("Solution");
                    let solutionA: Array<Array<number | string>> = [];
                    solution.forEach((item) => {
                        console.log(item.state);
                        // @ts-ignore
                        solutionA.push(item.state)
                    })
                    return solutionA;
                }
                let distance = currentState.g + 1;
                if (sameInOpen.length !== 0 && distance > sameInOpen[0].g) {
                    continue;
                }
                if (!(sameInClose.length !== 0 && distance > sameInClose[0].g)) {
                    neighbor.g = distance;
                    neighbor.parent = currentState;
                    this._listOpenStateA.push(neighbor);
                }
            }

        }
        console.log("Closed: ");
        console.log(this._listCloseStateA);
        return null;
    }

    public solveA(dimension: number): Array<Array<number | string>> | null {
        return this.getListTileA(dimension);
    }

    protected path: Array<Array<Array<number | string>>> = [];

    private search(node: TileState, g: number, threshold: number | string, dimension: number): number | string {
        let f = g + this.getManhattanDistance(node.state, dimension);
        if (f > threshold) {
            return f;
        }
        if (this.isEndGameIDA(dimension, node.state)) {
            return 'FOUND';
        }
        let min = INFINITY;

        let posStates = this.getPossibleStatesForMove(node, dimension);
        for (let i = 0; i < posStates.length; i++) {
            let neighbor = posStates[i];
            if (!this.isIncludeArray(this.path, neighbor.state)) {
                let distance = node.g + 1;
                neighbor.parent = node;
                neighbor.g = distance;
                neighbor.h = this.getManhattanDistance(neighbor.state, dimension);
                this.path.push(neighbor.state);

                let temp = this.search(neighbor, g + 1, threshold, dimension);
                if (temp === 'FOUND') {
                    return 'FOUND';
                }
                if (temp < min) {
                    // @ts-ignore
                    min = temp;
                }
                this.path.pop()
            }
        }
        return min;
    }

    // @ts-ignore
    public solveIDA(dimension: number): Array<Array<Array<number | string>>> | undefined {
        this.path.push(this.arrayClone(this.state));
        const startState = new TileState(this.state);
        startState.g = 0;
        startState.h = this.getManhattanDistance(startState.state, dimension);
        let threshold: number | string = startState.h;
        while (1) {
            let temp = this.search(startState, 0, threshold, dimension);
            if (temp === 'FOUND') {
                return this.path;

            }
            if (temp === INFINITY)
                return;
            threshold = temp;
        }
    }

}

export default Game;