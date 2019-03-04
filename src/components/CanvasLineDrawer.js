import React from 'react';

export class CanvasLineDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.currentStroke = {
            start: [],
            points: []
        }; 
        this.state = {
            canvas: null,
            context: null,
            mousePressed: false,
            strokes: []
        };
        this.canvasRef = React.createRef();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    //helper method to clear the currentStroke object
    resetCurrentStroke() {
        this.currentStroke.start = [];
        this.currentStroke.points = [];
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
    }

    /* Draw to the canvas on initial click and record in the state
    *  that the mouse is pressed so we can listen for mouse movements
    */
    handleMouseDown(e) {
        this.setState({
            mousePressed: true
        })
        let rect = this.state.canvas.getBoundingClientRect()
        let xCord = e.clientX - rect.left;
        let yCord = e.clientY - rect.top;
        this.state.context.beginPath();
        this.state.context.moveTo(xCord, yCord);
        //add starting point to the currentStroke
        this.currentStroke.start = this.currentStroke.start.concat(xCord,yCord);
    }

    /* Draw to the canvas on mouse movement
    *  only works if mouse is pressed
    */
    handleMouseMove(e) {
        if (this.state.mousePressed) {
            let rect = this.state.canvas.getBoundingClientRect()
            let xCord = e.clientX - rect.left;
            let yCord = e.clientY - rect.top;
            this.state.context.lineTo(xCord, yCord);
            this.state.context.stroke();
            //add point we just drew to currentStroke
            this.currentStroke.points.push([xCord,yCord]);
        }
    }

    /* Stop drawing when mouse is released*/
    handleMouseUp() {
        this.setState({
            mousePressed: false,
            strokes: [...this.state.strokes, this.currentStroke]
        });
    }

    render() {
        return(
            <div>
                <canvas 
                ref={this.canvasRef} 
                style={{borderStyle: 'solid'}}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                />
            </div>
        );
    }
}