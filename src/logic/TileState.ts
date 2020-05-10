export class TileState{
    private _g: number = -1;
    private _h: number = -1;
    private _parent: TileState|null = null;
    private readonly _state: Array<Array<string|number>> = [];

    constructor(state: Array<Array<string | number>>) {
        this._state = this.arrayClone(state);
    }

    protected arrayClone(obj: any[]): any[]{
        const res: any[] = [];
        obj.forEach((array) => {
            res.push([...array])
        })
        return res;
    }

    get state(): Array<Array<string | number>> {
        return this._state;
    }

    get g(): number {
        return this._g;
    }

    set g(value: number) {
        this._g = value;
    }

    get h(): number {
        return this._h;
    }

    set h(value: number) {
        this._h = value;
    }

    get parent(): TileState | null {
        return this._parent;
    }

    set parent(value: TileState | null) {
        this._parent = value;
    }
}