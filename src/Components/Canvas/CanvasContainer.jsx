import React from "react";
import Canvas from "./Canvas";
import Panel from "./Panel";

class CanvasContainer extends React.Component {
    state = {
        color: "#FFFFFF",
        brush: 20
    };

    onColorChange = (e) => {
        this.setState({color: e.currentTarget.value})
    };

    onBrushChange = (e) => {
        this.setState({brush: e.currentTarget.value})
    };


    render() {
        return (
            <div>
                <Canvas color={this.state.color}
                        brush={this.state.brush}
                        height="750"
                        width="1024"
                        isDraw={true}/>
                <Panel onColorChange={this.onColorChange}
                       onBrushChange={this.onBrushChange}
                       brush={this.state.brush}
                       color={this.state.color}/>
            </div>
        )
    }
}

export default CanvasContainer;