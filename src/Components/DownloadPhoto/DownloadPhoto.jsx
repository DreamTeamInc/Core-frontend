import React from "react";
import classes from "./DownloadPhoto.module.css";
import UploadPhotos from "./UploadPhotos/UploadPhotos";

class DownloadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.startValue = 'Выберите'
    this.state = {
      firstValue: this.startValue,
      secondValue: "Скважина",
      showComponent: false
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
  

  _onButtonClick (event){
    event.preventDefault();
    this.setState({
        ...this.state,
        showComponent:  !this.state.showComponent
    })
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
              <option value="2">Месторождение</option>
              <option value="3">3</option>
              <option value="4">Другое</option>
            </select>
          </div>
          <div className={classes.Container2}>
            <div className={classes.Text}>Скважина:</div>
            <select onChange={this.secondSelectHandler} disabled={this.state.firstValue === this.startValue ? true: false}>
              <option hidden value={this.state.secondValue}>
                {this.state.secondValue}
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        <div>
          <button
            className={classes.BtnDownload}
            onClick={(event) => this._onButtonClick(event)}
            type="button"
          >
            {" "}
            Загрузить{" "}
          </button>
          {this.state.showComponent ?<UploadPhotos showComponent={this.state.showComponent}/> : null}
          </div>
        </form>
      </div>
    );
  }
}

export default DownloadPhoto;
