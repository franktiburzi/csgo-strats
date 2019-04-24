import React from 'react';
import {CanvasLineDrawer} from './CanvasLineDrawer.js';
import {CanvasShapeDragger} from './CanvasShapeDragger.js';
import {MapCanvas} from './MapCanvas.js';

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
        }));
    }

    /**
     * part of redrawing the canvas
     */
    redrawStrokes(context, strokesArray) {
        for (var i = 0; i < strokesArray.length; i++) {
            context.strokeStyle = strokesArray[i].color;
            context.beginPath();
            context.moveTo(strokesArray[i].start[0], strokesArray[i].start[1]);
            for (var j = 0; j < strokesArray[i].points.length; j++) {
                context.lineTo(strokesArray[i].points[j][0], strokesArray[i].points[j][1]);
                context.stroke();
            }
        }
    }

    /**
     * part of redrawing the canvas
     */
    redrawUtility(context, utilArray, utilSize) {
        for (let i = 0; i < utilArray.length; i++) {
            context.drawImage(utilArray[i].image, utilArray[i].topLeft[0], utilArray[i].topLeft[1], utilSize, utilSize);
        }
    }

    /**
     *  called when a new view loads to redraw the canvas
     *  This lets us go between utility and lines 
     *  also redraws the canvas to create the dragging effect of the utility
     */
    redrawCanvas(context, strokesArray, utilArray, utilSize) {
        this.redrawStrokes(context, strokesArray);
        this.redrawUtility(context, utilArray, utilSize);
    }

    render() {
        let canvasComponent;
        if (this.props.mode === 'lineDrawer') {
            canvasComponent = <CanvasLineDrawer 
                                passStrokesUp={this.passStrokesUp} 
                                redrawCanvas={this.redrawCanvas} 
                                oldStrokes={this.state.strokes} 
                                oldUtility={this.state.utility}
                                lineColor={this.props.color}
                                map={<MapCanvas />}/>
        } else if (this.props.mode === 'shapeDragger') {
            canvasComponent = <CanvasShapeDragger 
                                passUtilityUp={this.passUtilityUp} 
                                redrawCanvas={this.redrawCanvas} 
                                oldStrokes={this.state.strokes} 
                                oldUtility={this.state.utility}
                                map={this.props.map}/>
        }
        return(
            <div style={{position:'relative', minHeight: '620px'}}>
                {<MapCanvas map={this.props.map}/>}
                {canvasComponent}
            </div>
        );
    }

}