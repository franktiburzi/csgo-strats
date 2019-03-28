import React, { Component } from 'react';
import {CanvasController} from './components/CanvasController';
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'lineDrawer'
        };
      }

    //Save the mode which determines what the user can do
    setMode(mode) { 
        this.setState({
            mode: mode
        });
    }

    render() {
        return(
        <div className="App">
            <header>
                Click and drag to draw
            </header>
            <CanvasController
                mode={this.state.mode}
            />
            <button onClick={() => this.setMode('lineDrawer')}>
                draw lines
            </button>
            <button onClick={() => this.setMode('shapeDragger')}>
                draw lines 2
            </button>
        </div>
        );
    }
}