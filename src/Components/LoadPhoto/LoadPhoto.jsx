import React from "react";
import classes from "./LoadPhoto.module.css"
import load from "../../assets/img/LoadPhoto/Load.svg"
import Editor from "../Editor/Editor";

class LoadPhoto extends React.Component {

    state = {
        file: null,
        imagePreviewUrl: null,
    };

    onPhotoLoad = (e) => {

        let file = e.target.files[0];
        if (file) {
            this.setState({
                file: file,
                imagePreviewUrl: URL.createObjectURL(file)
            });
        } else
            this.setState({
                file: null,
                imagePreviewUrl: null
            })
    };


    render() {

        return (
            <div>
                <input id="input_file"
                       type="file"
                       accept="image"
                       onChange={this.onPhotoLoad}/>
                <div className={classes.Buttons_container}>
                    <label htmlFor="input_file">
                        <div className={classes.Input_photo}>
                        <span className={classes.Load_photo__text}>
                            Загрузить изображение керна
                        </span>
                            <div className={classes.Load_photo__slice}/>
                            <img className={classes.Input_photo__logo} src={load} alt="load"/>
                        </div>
                    </label>
                    <input type="button" className={classes.Save_button} value="Сохранить"
                           disabled={!this.state.file}/>
                </div>

                {this.state.imagePreviewUrl &&
                    <Editor src={this.state.imagePreviewUrl}/>
                }
            </div>
        )
    }
}

export default LoadPhoto;