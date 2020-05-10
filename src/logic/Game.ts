// @ts-ignore
import {TileState} from "./TileState";

class Game {
    constructor(dimension: number) {
        this.states = [];
        this.createInitialTile(dimension);
        this.moveTile = this.moveTile.bind(this);
        this.endGame = false;
        this.solveA = this.solveA.bind(this);
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
    public endGame: boolean = false;
    protected moves:number = 0;
    public states: Array<Array<Array<number | string>>> = [];
    public getMoves():number {
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
    protected getCoordsTile(dimension: number, tile: number | string): {x: number, y: number} {
        for (let i=0; i<dimension; i++ ) {
            if (this.state[i].indexOf(tile) !== -1) {
                return {x: i, y: this.state[i].indexOf(tile)};
            }
        }
    }
    // @ts-ignore
    protected getCoordsTileInState(state: TileState, dimension: number, tile: number | string): {x: number, y: number} {
        for (let i=0; i<dimension; i++ ) {
            if (state.state[i].indexOf(tile) !== -1) {
                return {x: i, y: state.state[i].indexOf(tile)};
            }
        }
    }
    protected createInitialTile(dimension: number): void {
        this.state = dimension === 3 ? this.arrayClone(this._finalState3) : this.arrayClone(this._finalState4);
        const emptyCoords = this.getCoordsTile(dimension, '');
        this.indexXEmpty = emptyCoords.x;
        this.indexYEmpty = emptyCoords.y;
        // будем рандомно перемещать элементы итоговой доски
        let i = 100;
        while (i > 0) {
            this.state = this.moveTileInMatrix(this.state, dimension, this.randomInteger(1, dimension * dimension - 1));
            i--;
        }
        this.moves = 0;
        this.states = [];

        this.states.push(this.arrayClone(this.state));
    }

    protected arrayClone(obj: any[]): any[]{
        const res: any[] = [];
        obj.forEach((array) => {
            res.push([...array])
        })
        return res;
    }

    protected arrayCompare(obj1: any[], obj2: any[]): boolean{
        for (let i = 0; i<obj1.length; i++){
            for (let j = 0; j<obj1[i].length; j++){
                if (obj2[i][j] !== obj1[i][j]){
                    return false
                }
            }
        }
        return true;
    }

    protected isIncludeArray(array1: any[], array2: any[]) {
        for (let i = 0; i< array1.length; i++) {
            if (this.arrayCompare(array1[i], array2))
                return i;
        }
        return false;
    }
    protected indexOfArray(array1: any[], array2: any[]): number {
        for (let i = 0; i< array1.length; i++) {
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
        // если нвходятся в одной строке и разница 1 или в одном столбце и разница 1
        return ( tileCoords.y === this.indexYEmpty && Math.abs(tileCoords.x - this.indexXEmpty) === 1) || (tileCoords.x === this.indexXEmpty && Math.abs(tileCoords.y - this.indexYEmpty) === 1);
    }
    public isEndGame (dimension: number): boolean {
        let finalState = dimension === 3 ? this.arrayClone(this._finalState3) : this.arrayClone(this._finalState4);
       return this.state.toString()  === finalState.toString() ;
    }

    protected canMoveTileState(state: TileState, dimension: number, tile: number | string): boolean {
        const tileCoords = this.getCoordsTileInState(state, dimension, tile);
        let emptyCoords = this.getCoordsTileInState(state, dimension, '');
        // если нвходятся в одной строке и разница 1 или в одном столбце и разница 1
        return ( tileCoords.y === emptyCoords.y && Math.abs(tileCoords.x - emptyCoords.x) === 1) || (tileCoords.x === emptyCoords.x && Math.abs(tileCoords.y - emptyCoords.y) === 1);
    }

    public moveTile (state: TileState, dimension: number, tile: number | string): TileState {
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
        this.states.push(this.arrayClone(newState.state));
        return newState;
    }

    public moveTileInMatrix (state: Array<Array<string|number>>, dimension: number, tile: number | string): Array<Array<string|number>> {
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
    private getCountTileOutOfPlace(state: Array<Array<number | string>>, dimension: number): number{
        let count = 0;
        for (let i=0; i< dimension; i++) {
            for (let j=0; j < dimension; j++) {
                if (state[i][j] !== this._finalState31[i][j]) {
                    count++;
                }
            }
        }
        return count;
    }
    // @ts-ignore
    private getRightCoordsTile (tile: number | string, dimension: number): {x: number, y: number} {
        let finalState = dimension === 3 ? this.arrayClone(this._finalState3) : this.arrayClone(this._finalState4)
        for (let m=0; m<dimension;m++) {
            for (let d=0; d<dimension; d++) {
                if (finalState[m][d] === tile) {
                    return {x: m, y: d}
                }
            }
        }
    }
    private getManhattanDistance(state: Array<Array<number | string>>, dimension: number): number {
        let distance = 0;
        for (let i=0; i< dimension; i++) {
            for (let j=0; j < dimension; j++) {
                let coordsRight = this.getRightCoordsTile(state[i][j], dimension);
                let localDistance = Math.abs(i - coordsRight.x) + Math.abs(j - coordsRight.y);
                distance+=localDistance;

            }
        }
        return distance;
    }
    // получаем состояние с наименьшим весом
    private getStateForMoveWithLeastWeight( states: Array<TileState>, dimension: number):{ state: TileState, minIndex: number, minWeight: number }  {
        let min: number = 0;
        let minWeight = states[0].h + states[0].g;
        for (let i=1; i< states.length; i++) {
            let weightState = states[i].h + states[i].g;
            if (weightState < minWeight) {
                minWeight = weightState;
                min = i;
            }
        }
        return {state: states[min], minIndex: min, minWeight: minWeight};
    }

    private completeSolutionList(completeState: TileState): TileState[]{
        let resList: TileState[] = [];
        let s = completeState;
        while(s.parent){
            resList.unshift(s);
            s = s.parent;
        }
        resList.unshift(s);
        return resList;
    }

    // Реализация алгоритмов
    protected _listStateA = [];
    // список открытых вершин, которые не надо проверять
    protected _listOpenStateA:Array<TileState> = [];
    protected _listCloseStateA:Array<TileState> = [];
    public getListTileA(dimension: number): TileState[]|null {
        const startState = new TileState(this.state);
        startState.g = 0;
        startState.h = this.getManhattanDistance(startState.state, dimension);
        this._listOpenStateA.push(startState);

        console.log("Start state:");
        console.log(startState.state);

        while (this._listOpenStateA.length !== 0) {
            let minF = this.getStateForMoveWithLeastWeight(this._listOpenStateA, dimension);
            let currentState = minF.state;
            this.state = this.arrayClone(currentState.state);
            if (this.isEndGame(dimension)) {
                let solution = this.completeSolutionList(currentState);
                console.log("Solution");
                solution.forEach((item) => {
                    console.log(item.state);
                })
                return solution
            }

            this._listOpenStateA.splice(minF.minIndex, 1);
            this._listCloseStateA.push(currentState);

            let posStates = this.getPossibleStatesForMove(currentState, dimension);
            posStates.forEach((neighbor) => {
                if (!this._listCloseStateA.includes(neighbor)) {
                    let distance = currentState.g + 1;
                    let isLightweight = false;
                    let same = this._listOpenStateA.filter((item) => {
                        return this.arrayCompare(item.state, neighbor.state);
                    });
                    if (same.length === 0) {
                        neighbor.h = this.getManhattanDistance(neighbor.state, dimension);
                        this._listOpenStateA.push(neighbor);
                        isLightweight = true;
                    } else {
                        isLightweight = distance < same[0].g;
                    }
                    if (isLightweight) {
                        neighbor.parent = currentState;
                        neighbor.g = distance;
                    }
                }
            });
        }
        console.log("Closed: ");
        console.log(this._listCloseStateA);
        return null;
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //     for (let i=1; i< this._listOpenStateA.length; i++) {
        //         let isMin = this.getStateForMoveWithLeastWeight(this._listOpenStateA[i], dimension);
        //         if (isMin.minWeight < minF.minWeight){
        //             minF = isMin;
        //             gen = i;
        //         }
        //     }
        //     this.state = minF.state;
        //
        //     if (this.isEndGame(dimension))
        //         return;
        //
        //
        //     this._listOpenStateA[gen].splice(minF.minIndex, 1);
        //     this._listCloseStateA.push(this.arrayClone(this.state));
        //
        //
        //
        //     // находим возможные состояния из текущей вершины
        //     //let posStates = this.getPossibleStatesForMove(this.state, dimension);
        //     if (posStates.length === 0 ) {
        //         console.log('sorry');
        //         break;
        //     }
        //     else {
        //         let posStates = this.getPossibleStatesForMove(this.state, dimension);
        //         for (let i=0; i< this._listCloseStateA.length; i++) {
        //             const index = this.isIncludeArray(posStates, this._listCloseStateA[i]);
        //             if (index /*&& count >= i*/){
        //                 console.log("Delete" + index)
        //                 posStates.splice(index, 1);
        //             }
        //         }
        //
        //         let dataLeastWeight = this.getStateForMoveWithLeastWeight(posStates, dimension);
        //         this.state = dataLeastWeight.state;
        //         posStates.splice(dataLeastWeight.min, 1);
        //
        //         // пока хз
        //         let flag = 0;
        //         for (let i=0; i< this._listOpenStateA.length; i++) {
        //             if (this.isIncludeArray(this._listOpenStateA[i],this.state) && count > i) {
        //                 // откатываем до i удаляем из списка открытых этот стейт и откатываем до i список закрытых
        //                 const findIndex = this.indexOfArray(this._listOpenStateA[i], this.state)
        //                 count = i;
        //
        //                 // this._listCloseStateA.splice(i);
        //                 this._listOpenStateA[i].splice(findIndex,1);
        //                 flag = i;
        //
        //                 console.log("Revert to " + i)
        //                 // console.log("Closed: ");
        //                 // console.log(this._listCloseStateA);
        //                 // console.log("Open: ");
        //                 // console.log(this._listOpenStateA);
        //                 break;
        //             }
        //         }
        //         // если не содержится - добавляем в список закрытых и идем дальше
        //         let emptyCoords = this.getCoordsTile(dimension, '');
        //         this.indexXEmpty = emptyCoords.x;
        //         this.indexYEmpty = emptyCoords.y;
        //         this.moves++;
        //         console.log(count + ":");
        //         console.log(this.arrayClone(this.state));
        //         this._listCloseStateA.push(this.arrayClone(this.state));
        //         this._listOpenStateA.push(posStates);
        //     }
        // }
}
    public solveA(dimension: number): void {
        this.getListTileA(dimension);
    }

}
export default Game;