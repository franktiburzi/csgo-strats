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
        this.currentUtility = [...this.props.oldUtility];
        this.canvasRef = React.createRef();
        this.utilSize = 50;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
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
        }, () =>  this.props.redrawCanvas(context, this.props.oldStrokes, this.currentUtility, this.utilSize));
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
        let smokeImg = new Image(50,50);
        let centerX = this.state.canvas.width/2;
        let centerY = this.state.canvas.height/2;
        smokeImg.src = smokeSrc;
        smokeImg.onload = function() {
            this.state.context.drawImage(smokeImg, centerX-this.utilSize/2, centerY-this.utilSize/2, this.utilSize, this.utilSize);
            let topLeft = [centerX-this.utilSize/2,centerY-this.utilSize/2];
            let topRight = [centerX+this.utilSize/2,centerY-this.utilSize/2];
            let bottomLeft = [centerX-this.utilSize/2,centerY+this.utilSize/2];
            let bottomRight = [centerX+this.utilSize/2,centerY+this.utilSize/2];
            this.currentUtility.push({
                layer: this.currentUtility.length,
                topLeft: topLeft,
                topRight: topRight,
                bottomLeft: bottomLeft,
                bottomRight: bottomRight,
                image: smokeImg
            });
        }.bind(this);
    }

    /* When the mouse is pressed check if we have clicked into a utility object*/
    handleMouseDown(e) {
        let rect = this.state.canvas.getBoundingClientRect()
        let xCord = e.clientX - rect.left-3;
        let yCord = e.clientY - rect.top-3;
        //loop through all utility looking if we are inside
        for (let i = 0; i < this.currentUtility.length; i++) {
            let inside = this.checkInside(this.currentUtility[i].topRight, 
                        this.currentUtility[i].bottomLeft, 
                        [xCord,yCord]);
            if (inside) {
                this.currentUtility[i].active = true;
            }
        }
        this.setState({
            mousePressed: true
        });
    }

    /**
     * When moving the mouse we first check if the mouse is pressed down.
     * If pressed down then we see if any utility is active(clicked on)
     * If moving while on top of a utility redraw the image and clear the canvas to create the dragging effect
     * redraw everyting else on the canvas after clearing
     */
    handleMouseMove(e) {
        let rect = this.state.canvas.getBoundingClientRect()
        let xCord = e.clientX - rect.left-3;
        let yCord = e.clientY - rect.top-3;
        if (this.state.mousePressed) {
            //when moving the mouse with mouse pressed find which util we are moving
            for (let i = 0; i < this.currentUtility.length; i++) {
                if (this.currentUtility[i].active) {
                    this.currentUtility[i].topLeft = [xCord-this.utilSize/2, yCord-this.utilSize/2];
                    this.currentUtility[i].topRight = [xCord+this.utilSize/2, yCord-this.utilSize/2];
                    this.currentUtility[i].bottomLeft = [xCord-this.utilSize/2, yCord+this.utilSize/2];
                    this.currentUtility[i].bottomRight = [xCord+this.utilSize/2, yCord+this.utilSize/2];
                    this.state.context.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
                    this.props.redrawCanvas(this.state.context, this.props.oldStrokes, this.currentUtility, this.utilSize);
                }
            }
        }
    }

    /**
     * When mouse is released set mouse pressed to false so we dont perform anything on dragging
     * and set that all the utility is inactive meaning we aren't clicking any
     */
    handleMouseUp() {
        this.setState({
            mousePressed: false
        });
        for (let i = 0; i < this.currentUtility.length; i++) {
                this.currentUtility[i].active = false;
        }
        this.props.passUtilityUp(this.currentUtility);
    }

    render() {
        return(
            <div>
                <div>
                    <canvas 
                    ref={this.canvasRef} 
                    style={{borderStyle: 'solid'}}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    />
                </div>
                <button onClick={() => this.addUtility()}>
                    Add Utility
                </button>
            </div>
        );
    }
}