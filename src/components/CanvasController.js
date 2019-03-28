import React from 'react';
import {CanvasLineDrawer} from './CanvasLineDrawer.js';
import {CanvasShapeDragger} from './CanvasShapeDragger.js';

export class CanvasController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            strokes: []
        };
        this.passStrokesUp = this.passStrokesUp.bind(this);
        this.redrawStrokes = this.redrawStrokes.bind(this);
    }

    /* Passed down to child so we can get what was drawn on the canvas */
    passStrokesUp(newStrokes) {
        this.setState(prevState => ({
            strokes: [...prevState.strokes, ...newStrokes]
        }));
    }

    /* Called when a new view loads to draw the lines */
    redrawStrokes(canvas, context) {
        for (var i = 0; i < this.state.strokes.length; i++) {
            context.beginPath();
            context.moveTo(this.state.strokes[i].start[0], this.state.strokes[i].start[1]);
            for (var j = 0; j < this.state.strokes[i].points.length; j++) {
                context.lineTo(this.state.strokes[i].points[j][0], this.state.strokes[i].points[j][1]);
                context.stroke();
            }
        }
    }

    render() {
        let canvasComponent;
        if (this.props.mode === 'lineDrawer') {
            canvasComponent = <CanvasLineDrawer passStrokesUp={this.passStrokesUp} redrawStrokes={this.redrawStrokes}/>
        } else if (this.props.mode === 'shapeDragger') {
            canvasComponent = <CanvasShapeDragger redrawStrokes={this.redrawStrokes}/>
        }
        return(
            <div>
                {canvasComponent}
            </div>
        );
    }

}