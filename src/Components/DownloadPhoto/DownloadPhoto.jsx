import React from "react";
import classes from "./DownloadPhoto.module.css";
import UploadPhotos from "./UploadPhotos/UploadPhotos";
import {connect} from "react-redux";
import {getLocations, getWells, getWellsInLocation} from "../../Reducers/locationReducer";
import {PhotoAPI} from "../../API/API";
import {confirmAlert} from "react-confirm-alert";

class DownloadPhoto extends React.Component {

    state = {
        firstValue: "",
        secondValue: "",
        showComponent: false,
        fileList: null,
        changed: false
    };

    componentDidMount() {

        this.props.getLocations();
        // this.props.getWells();
        this.props.getWellsInLocation(this.state.firstValue)
    }

    componentDidUpdate() {
        if (this.state.changed) {
            this.props.getWellsInLocation(this.state.firstValue);
            this.setState({changed: false});
        }
    };

    firstSelectHandler = (event) => {
        this.setState({firstValue: event.target.value, changed: true});
    };

    secondSelectHandler = (event) => {
        this.setState({secondValue: event.target.value});
    };

    _onButtonClick = (event) => {
        const f =  [...event.target.files];
        event.preventDefault();
        this.setState({
            ...this.state,
            showComponent: !this.state.showComponent,
            fileList: f.map((u, index) => ({
                file: u,
                light: 1,
                depth: "",
                index
            })),
        });
    };

    CloseUploadPhoto = () => {
        this.setState({
            showComponent: false
        })
    };

    changeLight = (index, light) => {
        this.setState(state => ({
            ...state,
            fileList: state.fileList.map(u => {
                if (u.index !== index)
                    return u;
                else
                    return {
                        ...u,
                        light
                    }
            })
        }))
    };

    changeDepth = (index, depth) => {
        this.setState(state => ({
            ...state,
            fileList: state.fileList.map(u => {
                if (u.index !== index)
                    return u;
                else
                    return {
                        ...u,
                        depth
                    }
            })
        }))
    };

    submit=()=>{
        this.state.fileList.forEach(f=>{
            // PhotoAPI.createPhoto(f.file, this.state.firstValue, this.state.secondValue, f.depth, f.light, this.props.currentUser.id)
        });
        confirmAlert({
            title: 'Success upload',
            message: `Фотографии были успешно загруженны`,
            buttons: [
                {
                    label: 'OK'
                }
            ]
        });
        this.CloseUploadPhoto();
    };

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
                        </datalist>
                    </div>
                    <div>
                        <input
                            className={classes.BtnDownload}
                            onChange={this._onButtonClick}
                            type="file"
                            id="input_file"
                            multiple
                        />
                        <label htmlFor="input_file">
                            <div className={classes.Input_photo}>
                                <span className={classes.Load_photo__text}>Открыть</span>
                            </div>
                        </label>
                        {this.state.showComponent ? (
                            <UploadPhotos
                                close={this.CloseUploadPhoto}
                                fileList={this.state.fileList}
                                changeLight={this.changeLight}
                                changeDepth={this.changeDepth}
                                submit={this.submit}
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
    well: state.location.well,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps, {getLocations, getWells, getWellsInLocation})(DownloadPhoto);
