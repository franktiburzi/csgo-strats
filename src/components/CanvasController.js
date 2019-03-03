import React from 'react';
import {CanvasLineDrawer} from './CanvasLineDrawer.js';

export class CanvasController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    render() {
        let canvasComponent;
        if (this.props.mode === 'lineDrawer') {
            canvasComponent = <CanvasLineDrawer />
        }
        return(
            <div>
                {canvasComponent}
            </div>
        );
    }

}