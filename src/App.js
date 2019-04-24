import React, { Component } from 'react';
import {CanvasController} from './components/CanvasController';
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'lineDrawer',
            map: null,
            color: null
        };
      }

    //Save the mode which determines what the user can do
    setMode(mode) { 
        this.setState({
            mode: mode
        });
    }

    //save the map
    setMap(map) { 
        this.setState({
            map: map
        });
    }

    //save the color
    setColor(color) { 
        this.setState({
            color: color
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
                map={this.state.map}
                color={this.state.color}
            />
            <div style={{position: "absolute", top: 0}}>
                <div className="yellow" onClick={() => {this.setMode('lineDrawer'); this.setColor('yellow')}}></div>
                <div className="blue" onClick={() => {this.setMode('lineDrawer'); this.setColor('blue')}}></div>
                <div className="green" onClick={() => {this.setMode('lineDrawer'); this.setColor('green')}}></div>
                <div className="orange" onClick={() => {this.setMode('lineDrawer'); this.setColor('orange')}}></div>
                <div className="purple" onClick={() => {this.setMode('lineDrawer'); this.setColor('purple')}}></div>
            </div>
            <div onClick={() => this.setMode('shapeDragger')}>
                    draw lines 2
            </div>
            <div>
                <button onClick={() => this.setMap('cache')}>
                    Cache
                </button>
            </div>
        </div>
        );
    }
}