import React from "react";
import './Square.css';
import {observer} from 'mobx-react';
import Injector from "../../core/Injector/Injector";

interface SquareDto {
    squareIndex: number;
}

@observer
export class Square extends React.Component<SquareDto> {
    private gameStore: any;

    constructor(props: SquareDto) {
        super(props);
        this.gameStore = Injector.inject().getInstance();
    }

    private squareClicked = () => {
        if (!this.gameStore.currentSquares[this.props.squareIndex].value &&
            !this.gameStore.currentIsWinner) {

            this.gameStore.addValue(this.props.squareIndex);
        }
    }

    render() {
        return (
            <div
                className={
                    this.gameStore.currentSquares[this.props.squareIndex].isWinner ?
                        "Square winner" :
                        "Square"
                }>
                <button onClick={() => this.squareClicked()}>
                    {
                        this.gameStore.currentSquares[this.props.squareIndex].value ?
                        this.gameStore.currentSquares[this.props.squareIndex].value :
                        ''
                    }
                </button>
            </div>
        )
    }
}
