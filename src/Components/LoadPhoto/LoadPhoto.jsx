import React from "react";
import classes from "./LoadPhoto.module.css"
import load from "../../assets/img/LoadPhoto/Load.svg"
import Editor from "../Editor/Editor";
import withAuthRedirect from "../../hoc/withAuthRedirect";

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
        imagePreviewUrl: URL.createObjectURL(file),
      });
    } else
      this.setState({
        file: null,
        imagePreviewUrl: null,
      });
  };

  render() {
    return (
      <div className={classes.LoadPhoto}>
        <input
          id="input_file"
          type="file"
          accept="image"
          onChange={this.onPhotoLoad}
        />
        <div className={classes.Buttons_container}>
          <label htmlFor="input_file">
            <div className={classes.Input_photo}>
              <span className={classes.Load_photo__text}>Загрузить</span>
              {/* <div className={classes.Load_photo__slice} />
              <img
                className={classes.Input_photo__logo}
                src={load}
                alt="load"
              /> */}
            </div>
          </label>
          {/* <input
            type="button"
            className={classes.Save_button}
            value="Сохранить"
            disabled={!this.state.file}
          /> */}

          <div className={classes.NamePhoto}>
            Месторождение: <span className={classes.Name}>Месторождение1 {this.props.name_photo}</span>
            Скважина: <span className={classes.Name}> Скважина1 </span>
            Глубина: <span className={classes.Name}>5км </span>
          </div>
          <div className={classes.NameUser}>
            Разметчик: <span className={classes.Name}>Иван Иванов{this.props.name_user}</span>
          </div>
        </div>

        {this.state.imagePreviewUrl && (
          <div className={classes.Moves}>
            <Editor
              src={this.state.imagePreviewUrl}
              className={classes.Editor}
              file={this.state.file}
            />
          </div>
        )}
      </div>
    );
  }
}

export default LoadPhoto;