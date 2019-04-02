import React from 'react';
import {CanvasLineDrawer} from './CanvasLineDrawer.js';
import {CanvasShapeDragger} from './CanvasShapeDragger.js';

export class CanvasController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            strokes: [],
            utility: []
        };
        this.passStrokesUp = this.passStrokesUp.bind(this);
        this.passUtilityUp = this.passUtilityUp.bind(this);
        this.redrawCanvas = this.redrawCanvas.bind(this);
    }

    /* Passed down to child so we can get what was drawn on the canvas */
    passStrokesUp(newStrokes) {
        this.setState(prevState => ({
            strokes: [...newStrokes]
        }));
    }

    /*passed down to shape dragger so we can get utility added to the canvas */
    passUtilityUp(newUtility) {
        this.setState(prevState => ({
            utility: [...newUtility]
        }), ()=>console.log(this.state.utility));
    }

    /* Called when a new view loads to draw the lines */
    redrawStrokes(context, strokesArray) {
        for (var i = 0; i < strokesArray.length; i++) {
            context.beginPath();
            context.moveTo(strokesArray[i].start[0], strokesArray[i].start[1]);
            for (var j = 0; j < strokesArray[i].points.length; j++) {
                context.lineTo(strokesArray[i].points[j][0], strokesArray[i].points[j][1]);
                context.stroke();
            }
        }
    }

    /**
     * called when a new view loads to redraw all the utility
     * also draws the current utility we are dragging
     */
    redrawUtility(context, utilArray, utilSize) {
        for (let i = 0; i < utilArray.length; i++) {
            context.drawImage(utilArray[i].image, utilArray[i].topLeft[0], utilArray[i].topLeft[1], utilSize, utilSize);
        }
    }

    redrawCanvas(context, strokesArray, utilArray, utilSize) {
        this.redrawStrokes(context, strokesArray);
        this.redrawUtility(context, utilArray, utilSize);
    }

    render() {
        let canvasComponent;
        if (this.props.mode === 'lineDrawer') {
            canvasComponent = <CanvasLineDrawer passStrokesUp={this.passStrokesUp} redrawCanvas={this.redrawCanvas} oldStrokes={this.state.strokes} oldUtility={this.state.utility}/>
        } else if (this.props.mode === 'shapeDragger') {
            canvasComponent = <CanvasShapeDragger passUtilityUp={this.passUtilityUp} redrawCanvas={this.redrawCanvas} oldStrokes={this.state.strokes} oldUtility={this.state.utility}/>
        }
        return(
            <div>
                {canvasComponent}
            </div>
        );
    }

}