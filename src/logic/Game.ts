// @ts-ignore
class Game {
    constructor(dimension: number) {
        this.states = [];
        this.createInitialTile(dimension);
        this.moveTile = this.moveTile.bind(this);
        this.endGame = false;
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
    protected createInitialTile(dimension: number): void {
        this.state = dimension === 3 ? this._finalState3 : this._finalState4;
        const emptyCoords = this.getCoordsTile(dimension, '');
        this.indexXEmpty = emptyCoords.x;
        this.indexYEmpty = emptyCoords.y;
        // будем рандомно перемещать элементы итоговой доски
        let i = 100;
        while (i > 0) {
            this.moveTile(dimension, this.randomInteger(1, dimension * dimension - 1));
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
       return this.state.toString()  === this._finalState31.toString() ;
    }
    public moveTile (dimension: number, tile: number | string): Array<Array<number | string>> {
        // проверяем, можем ли мы двигать плитку
        if (!this.canMoveTile(dimension, tile)) {
            return this.state;
        }
        const tileCoords = this.getCoordsTile(dimension, tile);
        this.state[this.indexXEmpty][this.indexYEmpty] = tile;
        this.indexXEmpty = tileCoords.x;
        this.indexYEmpty = tileCoords.y;
        this.state[this.indexXEmpty][this.indexYEmpty] = '';
        this.moves++;
        if (this.isEndGame(dimension)) {
            this.endGame = true;
        }
        this.states.push(this.arrayClone(this.state));
        return this.state;
    }

}
export default Game;