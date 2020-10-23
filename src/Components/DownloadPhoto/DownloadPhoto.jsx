import React from 'react';
import classes from "./DownloadPhoto.module.css";
import UploadPhotos from "./UploadPhotos/UploadPhotos";


class DownloadPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
      }
    
  render() {
    return (
      <div className={classes.DownloadPhoto}>
        <div className={classes.DownloadPhotoText}>Загрузка</div>
        <form onSubmit={this.handleSubmit}>
        <div className={classes.Container1}>
         <div className={classes.Text}>Месторождение:</div>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="1">Сибирское</option>
            <option value="2">Месторождение</option>
            <option value="3">3</option>
            <option value="4">Другое</option>
          </select>
        </div>
        <div className={classes.Container2}>
         <div className={classes.Text}>Скважина:</div>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="1">Скважина</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>


        
        <button className={classes.BtnDownload} onClick={this.upload} type="button"> Загрузить </button>
      </form>
     </div>
    );
  }
}

export default DownloadPhoto;

