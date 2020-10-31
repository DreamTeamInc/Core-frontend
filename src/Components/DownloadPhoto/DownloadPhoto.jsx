import React from "react";
import { show_menu } from "../../Data";
import classes from "./DownloadPhoto.module.css";
import UploadPhotos from "./UploadPhotos/UploadPhotos";

class DownloadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.startValue = "Выберите";
    this.state = {
      firstValue: this.startValue,
      secondValue: "Скважина",
      showComponent: false,
      fileList: null
    };

    this.firstSelectHandler = this.firstSelectHandler.bind(this);
    this.secondSelectHandler = this.secondSelectHandler.bind(this);
  }

  firstSelectHandler(event) {
    this.setState({ firstValue: event.target.value });
  }
  secondSelectHandler(event) {
    this.setState({ secondValue: event.target.value });
  }

  _onButtonClick = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      showComponent: !this.state.showComponent,
      fileList: [...event.target.files]
    });
  }

  render() {
    return (
      <div className={classes.DownloadPhoto}>
        <div className={classes.DownloadPhotoText}>Загрузка</div>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.Container1}>
            <div className={classes.Text}>Месторождение:</div>
            <select onChange={this.firstSelectHandler}>
              <option hidden value={this.state.firstValue}>
                {this.state.firstValue}
              </option>
              {show_menu.map((item, index) => {
                return (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.Container2}>
            <div className={classes.Text}>Скважина:</div>
            <select
              onChange={this.secondSelectHandler}
              disabled={
                this.state.firstValue === this.startValue ? true : false
              }
            >
              <option hidden value={this.state.secondValue}>
                {this.state.secondValue}
              </option>
              {show_menu.map((item) => {
                if (item.name === this.state.firstValue) {
                  console.log(item.name);
                  return item.nodes.map((el, index) => {
                    return (
                      <option value={el.name} key={index}>
                        {el.name}
                      </option>
                    );
                  });
                }
              })}
            </select>
          </div>
          <div>
            <input
              className={classes.BtnDownload}
              onChange={this._onButtonClick}
              type="file"
              id="input_file"
              multiple
            >
            </input>
            <label htmlFor="input_file">
            <div className={classes.Input_photo}>
              <span className={classes.Load_photo__text}>Открыть</span>
            </div>
          </label>
            {this.state.showComponent ? (
              <UploadPhotos showComponent={this.state.showComponent} fileList = {this.state.fileList}/>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

export default DownloadPhoto;
