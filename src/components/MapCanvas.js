import React from 'react';

export class MapCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        let canvas = this.canvasRef.current;
        let context = canvas.getContext('2d');
        canvas.width  = 800;
        canvas.height = 600;
        this.setState({
            context: context
        });
    }

    componentDidUpdate() {
        if (this.props.map) {
            let mapImg= new Image();
            mapImg.src = require('../images/'+this.props.map+'.png');
            mapImg.onload = function() {
                this.state.context.drawImage(mapImg, 0, 0);
            }.bind(this);
        }
    }

    render() {
        let canvasStyle = {
            borderStyle: 'solid',
        };
        let divStyle = {
            position: 'absolute',
            top:0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto'
        }
        
        return(
            <div style={divStyle}>
                <canvas 
                ref={this.canvasRef} 
                style={canvasStyle}
                />
            </div>
        );
    }
}