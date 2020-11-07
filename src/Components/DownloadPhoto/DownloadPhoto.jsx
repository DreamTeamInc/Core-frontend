import React from "react";
import classes from "./DownloadPhoto.module.css";
import UploadPhotos from "./UploadPhotos/UploadPhotos";
import {connect} from "react-redux";
import {getLocations, getWellsInLocation} from "../../Reducers/locationReducer";
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
    id = 0;

    componentDidMount() {

        this.props.getLocations();
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
            fileList: f.map((u) => ({
                file: u,
                light: 1,
                depth: "",
                id: this.id++
            })),
        }); 
    };

    CheckAlert = () => {
        if (this.state.firstValue === "" || this.state.secondValue === "")
            alert("Введите все данные");
    }

    CloseUploadPhoto = () => {
        this.setState({
            showComponent: false
        })
    };

    changeLight = (id, light) => {
        this.setState(state => ({
            ...state,
            fileList: state.fileList.map(u => {
                if (u.id !== id)
                    return u;
                else
                    return {
                        ...u,
                        light
                    }
            })
        }))
    };

    changeDepth = (id, depth) => {
        this.setState(state => ({
            ...state,
            fileList: state.fileList.map(u => {
                if (u.id !== id)
                    return u;
                else
                    return {
                        ...u,
                        depth
                    }
            })
        }))
    };

    deleteField = (id) => {
        this.setState(state => ({
            ...state,
            fileList: state.fileList.filter(u=>u.id!==id)
        }))
    };

    submit=()=>{
        this.state.fileList.forEach(f=>{
            PhotoAPI.createPhoto(f.file, this.state.firstValue, this.state.secondValue, f.depth, f.light, this.props.currentUser.id)
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
                    {this.state.firstValue!== "" && this.state.secondValue !== "" ? (
                        <input
                            className={classes.BtnDownload}
                            onChange={this._onButtonClick}
                            type="file"
                            id="input_file"
                            multiple
                            
                        />) : 
                        null}
                        <label htmlFor="input_file">
                            <div className={classes.Input_photo}>
                                <span className={classes.Load_photo__text} onClick={this.CheckAlert}>Открыть</span>
                            </div>
                        </label>
                        {this.state.showComponent && this.state.fileList ? (
                            <UploadPhotos
                                close={this.CloseUploadPhoto}
                                fileList={this.state.fileList}
                                changeLight={this.changeLight}
                                changeDepth={this.changeDepth}
                                submit={this.submit}
                                deleteField={this.deleteField}
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
    well: state.location.well,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps, {getLocations, getWellsInLocation})(DownloadPhoto);
