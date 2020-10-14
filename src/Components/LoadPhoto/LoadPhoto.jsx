import React from "react";
import Preloader from "../common/Preloader/Preloader";
import classes from "./LoadPhoto.module.css"
import Canvas from "../Canvas/Canvas";
import Panel from "../Canvas/Panel";

class LoadPhoto extends React.Component {

    state = {
        file: null,
        imagePreviewUrl: null,
        height: 1,
        width: 1,
        isFetching: false,
        isLoaded: false,
        isEdit: false,
        color: "#FFFFFF",
        brush: 20
    };

    ref = React.createRef();

    onPhotoLoad = (e) => {

        let file = e.target.files[0];
        if (file) {
            this.setState({
                file: file,
                imagePreviewUrl: URL.createObjectURL(file),
                isFetching: true
            });
            setTimeout(() => {
                this.setState({
                    isFetching: false,
                    isLoaded: true,
                    height: this.ref.current.height,
                    width: this.ref.current.width
                })
            }, 4000)
        } else
            this.setState({
                file: null,
                imagePreviewUrl: null
            })
    };


    render() {

        return (
            <div>
                {!this.state.imagePreviewUrl &&
                <input type="file" accept="image" onChange={this.onPhotoLoad}/>}

                {this.state.imagePreviewUrl &&
                <div>
                    {this.state.isFetching &&
                    <Preloader className={classes.Preloader}/>}
                    {this.state.isLoaded &&
                    <Canvas className={classes.Canvas}
                            height={this.state.height}
                            width={this.state.width}
                            isDraw={this.state.isEdit}
                            color={this.state.color}
                            brush={this.state.brush}/>}
                    <img ref={this.ref} src={this.state.imagePreviewUrl} alt="not"/>
                    {this.state.isLoaded && !this.state.isEdit &&
                    <span className={classes.ButtonEdit}
                          onClick={() => {
                              this.setState({isEdit: true})
                          }}>
                        Изменить Сегментацию
                    </span>}
                    {this.state.isEdit &&
                    <Panel onColorChange={(e)=>{this.setState({color: e.currentTarget.value})}}
                           onBrushChange={(e)=>{this.setState({brush: e.currentTarget.value})}}
                           brush={this.state.brush}
                           color={this.state.color}/>}
                </div>}
            </div>
        )
    }
}

export default LoadPhoto;