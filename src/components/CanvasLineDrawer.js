import React from 'react';

export class CanvasLineDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            context: null,
            mousePressed: false,
            strokes: [],
            tempStart: [],
            tempPoints: []
        };
        this.canvasRef = React.createRef();
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
        });
    }

    /* Draw to the canvas on initial click and record in the state
    *  that the mouse is pressed so we can listen for mouse movements
    */
    handleMouseDown(e) {
        //console.log(this.state.strokes);
        let rect = this.state.canvas.getBoundingClientRect()
        let xCord = e.clientX - rect.left;
        let yCord = e.clientY - rect.top;
        this.state.context.beginPath();
        this.state.context.moveTo(xCord, yCord);
        this.setState({
            tempStart: [xCord, yCord],
            mousePressed: true
        });
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
            this.setState(prevState =>({
                tempPoints: [...prevState.tempPoints, [xCord, yCord]] 
            }));
        }
    }

    /* Stop drawing when mouse is released*/
    handleMouseUp() {
        this.setState(prevState => ({
                strokes: [...prevState.strokes, {start: prevState.tempStart, points: prevState.tempPoints}],
                mousePressed: false
        }));
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