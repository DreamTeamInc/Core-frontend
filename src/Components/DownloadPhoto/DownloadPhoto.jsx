import React from "react";
import classes from "./DownloadPhoto.module.css";
import UploadPhotos from "./UploadPhotos/UploadPhotos";
import { connect } from "react-redux";
import { getLocations } from "../../Reducers/locationReducer";
import { getWells } from "../../Reducers/locationReducer";

class DownloadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.startValue = "Выберите";
    this.state = {
      firstValue: this.startValue,
      secondValue: "Скважина",
      showComponent: false,
      fileList: null,
    };

    this.firstSelectHandler = this.firstSelectHandler.bind(this);
    this.secondSelectHandler = this.secondSelectHandler.bind(this);
  }

  componentDidMount() {
    this.props.getLocations();
    this.props.getWells();
   
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
      fileList: [...event.target.files],
    });
  };

  render() {
    return (
      <div className={classes.DownloadPhoto}>
        <div className={classes.DownloadPhotoText}>Загрузка</div>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.Container1}>
            <div className={classes.Text}>Месторождение:</div>

            <input list="fields" onChange={this.firstSelectHandler} />
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

            <input list="wells" onChange={this.secondSelectHandler} />
            <datalist id="wells">
            {this.props.wells.map((el) => {
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
            {this.state.showComponent ? (
              <UploadPhotos
                showComponent={this.state.showComponent}
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
  wells: state.location.wells
});

export default connect(mapStateToProps, { getLocations, getWells })(DownloadPhoto);
