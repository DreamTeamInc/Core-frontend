import React from "react";
import classes from "./Editor.module.css"
import Canvas from "../Canvas/Canvas";
import Panel from "../Canvas/Panel";

class Editor extends React.Component {

    state = {
        width: null,
        height: null,
        color: "#FFFFFF",
        brush: 20
    };

    ref = React.createRef();

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                width: this.ref.current.width,
                height: this.ref.current.height
            });
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState, s) {
        if (this.props.src !== prevProps.src) {
            setTimeout(() => {
                this.setState({
                    width: this.ref.current.width,
                    height: this.ref.current.height
                });
            }, 1000);
        }
    }

    render() {
        return (
            <div className={classes.Editor}>
                <div className={classes.Palette}>
                    <Panel color={this.state.color}
                           brush={this.state.brush}
                           onColorChange={(color) => {
                               this.setState({color})
                           }}
                           onBrushChange={(e) => {
                               this.setState({brush: e.currentTarget.value})
                           }}/>
                </div>
                <div className={classes.Field}>
                    {this.state.height &&
                    <Canvas className={classes.Canvas}
                            height={this.state.height}
                            width={this.state.width}
                            color={this.state.color}
                            brush={this.state.brush}
                            isDraw={true}/>}
                    <img className={classes.Img}
                         ref={this.ref}
                         src={this.props.src}
                         alt="kern"/>
                </div>
                <div className={classes.Segmentation}>
                    сегментация
                </div>
            </div>
        )
    }
}

export default Editor;