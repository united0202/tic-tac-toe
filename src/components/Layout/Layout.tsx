import React from 'react';
import './Layout.css';
import {observer} from "mobx-react";
import Injector from "../../core/Injector/Injector";
import {Square} from '../Square/Square'

@observer
export class Layout extends React.Component {
    private gameStore: any;

    constructor(props: any) {
        super(props);
        this.gameStore = Injector.inject().getInstance();
    }

    private initLayout = () => {
        const squares = [];
        for (let i = 0; i < 9; i++) {
            squares.push(<Square key={i} squareIndex={i}/>);
        }
        return squares;
    }

    render() {
        return (
            <div className="Layout">
                {this.initLayout()}
                <div className="Layout-bottom">
                    <button onClick={() => this.gameStore.startNewGame()}> Start new game</button>
                    {
                        this.gameStore.currentIsWinner ?
                            <p>Winner is : <span>{this.gameStore.currentWinner}</span></p> :
                            null
                    }
                </div>
            </div>
        )
    }
}
