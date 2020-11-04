import React from "react";
import classes from "./DownloadPhoto.module.css";
import UploadPhotos from "./UploadPhotos/UploadPhotos";
import { connect } from "react-redux";
import { getLocations } from "../../Reducers/locationReducer";
import { getWells } from "../../Reducers/locationReducer";
import { getWellsInLocation } from "../../Reducers/locationReducer";

class DownloadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.startValue = "Peterhoff";
    this.state = {
      firstValue: this.startValue,
      secondValue: "",
      showComponent: false,
      fileList: null,
      changed: false
    };

    this.firstSelectHandler = this.firstSelectHandler.bind(this);
    this.secondSelectHandler = this.secondSelectHandler.bind(this);
  }

  componentDidMount() {

    this.props.getLocations();
    // this.props.getWells();
    console.log(this.state.firstValue);
    this.props.getWellsInLocation(this.state.firstValue)
   
  }
  componentDidUpdate() {
    if(this.state.changed){
      this.props.getWellsInLocation(this.state.firstValue)
      this.setState({changed: false });
    }
  }

  firstSelectHandler(event) {
    this.setState({ firstValue: event.target.value, changed: true });
  }
  secondSelectHandler(event) {
    this.setState({ secondValue: event.target.value });
  }

  _onButtonClick = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      showComponent: !this.state.showComponent,
      fileList: [...event.target.files],
    });
  };

  CloseUploadPhoto = () => {
    this.setState({
      showComponent: false,
    });
  }

  render() {
    return (
      <div className={classes.DownloadPhoto}>
        <div className={classes.DownloadPhotoText}>Загрузка</div>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.Container1}>
            <div className={classes.Text}>Месторождение:</div>

            <input list="fields" onChange={this.firstSelectHandler} required/>
            <datalist id="fields">
              {this.props.locations.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </datalist>
          </div>
          <div className={classes.Container2}>
            <div className={classes.Text}>Скважина:</div>

            <input list="wells" onChange={this.secondSelectHandler} required/>
            <datalist id="wells">
            {this.props.well && this.props.well.map((el) => {
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                );
              })}
              {/* {this.props.wells.map((item) => {
                if (item.name === this.state.firstValue) {
                  return item.nodes.map((el, index) => {
                    return (
                      <option value={el.name} key={index}>
                        {el.name}
                      </option>
                    );
                  });
                }
              })} */}
            </datalist>
          </div>
          <div>
            <input
              className={classes.BtnDownload}
              onChange={this._onButtonClick}
              type="file"
              id="input_file"
              multiple
            ></input>
            <label htmlFor="input_file">
              <div className={classes.Input_photo}>
                <span className={classes.Load_photo__text}>Открыть</span>
              </div>
            </label>
            {this.state.showComponent && this.state.fileList ? (
              <UploadPhotos
                close={this.CloseUploadPhoto}
                fileList={this.state.fileList}
              />
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locations: state.location.locations,
  wells: state.location.wells,
  well: state.location.well
});

export default connect(mapStateToProps, { getLocations, getWells, getWellsInLocation })(DownloadPhoto);
