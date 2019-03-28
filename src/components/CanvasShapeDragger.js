import React from 'react';
import smokeSrc from '../images/smoke.png';

export class CanvasShapeDragger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            context: null,
            mousePressed: false,
        };
        this.currentUtility = [];
        this.canvasRef = React.createRef();
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    /* set up the canvas when it mounts by setting size*/
    componentDidMount() {
        let canvas = this.canvasRef.current;
        let context = canvas.getContext('2d');
        canvas.width  = 800;
        canvas.height = 600;

        //save context and canvas to state so we can draw with it
        this.setState({
            canvas: canvas,
            context: context
        });
        this.props.redrawStrokes(canvas, context);
    }
    
    //helper to see if we clicked in a utility
    checkInside(topRight, bottomLeft, mousePress) {
        if (mousePress[0] > bottomLeft[0] &&
            mousePress[0] < topRight[0] &&
            mousePress[1] < bottomLeft[1] && 
            mousePress[1] > topRight[1]) { 
                return true;
            }
        return false;
    }

    /*create a utility on the screen */
    addUtility() {
        const utilSize = 50;
        let smokeImg = new Image(50,50);
        let centerX = this.state.canvas.width/2;
        let centerY = this.state.canvas.height/2;
        smokeImg.src = smokeSrc;
        smokeImg.onload = function() {
            this.state.context.drawImage(smokeImg, centerX-utilSize/2, centerY-utilSize/2, utilSize, utilSize);
            let topLeft = [centerX-utilSize/2,centerY-utilSize/2];
            let topRight = [centerX+utilSize/2,centerY-utilSize/2];
            let bottomLeft = [centerX-utilSize/2,centerY+utilSize/2];
            let bottomRight = [centerX+utilSize/2,centerY+utilSize/2];
            this.currentUtility.push({
                layer: this.currentUtility.length,
                topLeft: topLeft,
                topRight: topRight,
                bottomLeft: bottomLeft,
                bottomRight: bottomRight
            });
        }.bind(this);
    }

    handleMouseDown(e) {
        let rect = this.state.canvas.getBoundingClientRect()
        let xCord = e.clientX - rect.left-3;
        let yCord = e.clientY - rect.top-3;
        for (let i = 0; i < this.currentUtility.length; i++) {
            console.log(this.currentUtility[i].bottomLeft);
            console.log(this.currentUtility[i].topRight);
            console.log([xCord,yCord]);
            let inside = this.checkInside(this.currentUtility[i].topRight, 
                        this.currentUtility[i].bottomLeft, 
                        [xCord,yCord]);
                        console.log(inside);
        }
    }

    render() {
        return(
            <div>
                <div>
                    <canvas 
                    ref={this.canvasRef} 
                    style={{borderStyle: 'solid'}}
                    onMouseDown={this.handleMouseDown}
                    />
                </div>
                <button onClick={() => this.addUtility()}>
                    Add Utility
                </button>
            </div>
        );
    }
}