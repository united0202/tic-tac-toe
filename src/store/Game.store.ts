import {observable, reaction, computed, action} from 'mobx';

type Square = {
    isWinner: boolean;
    value: null | string;
}

class GameStore {
    @observable squares: Square[] = [];
    @observable winner: string | null = null;
    @observable isX: boolean = true;
    @observable isWinner: boolean = false;

    constructor() {
        this.initGame();
        reaction(() => this.isX, () => this.calculateWinner());
    }

    private initGame = () => {
        this.squares = [];
        this.isX = true;
        this.isWinner = false;
        this.winner = '';
        for (let i = 0; i < 10; i++) {
            this.squares.push({
                isWinner: false,
                value: null
            })
        }
    }

    private calculateWinner() {
        const lines = this.lines;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (this.squares[a].value &&
                this.squares[a].value === this.squares[b].value &&
                this.squares[a].value === this.squares[c].value) {
                this.isWinner = true;
                this.winner = this.squares[a].value;
                this.squares[a].isWinner = true;
                this.squares[b].isWinner = true;
                this.squares[c].isWinner = true;
            }
        }
    }

    private get lines() {
        return [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    }

    @computed get currentSquares() {
        return this.squares.slice();
    }

    @computed get currentIsX() {
        return this.isX;
    }

    @computed get currentIsWinner() {
        return this.isWinner;
    }

    @computed get currentWinner() {
        return this.winner;
    }

    @action('update squares')
    addValue(index: number) {
        this.isX ? this.squares[index].value = 'X' : this.squares[index].value = 'O';
        this.isX = !this.isX;
    }

    @action('start new game')
    startNewGame() {
        this.initGame();
    }
}

const gameStore = new GameStore();
export default gameStore as GameStore;
