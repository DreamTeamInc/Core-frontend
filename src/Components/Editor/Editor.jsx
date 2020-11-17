import React from "react";
import classes from "./Editor.module.css";
import Canvas from "../Canvas/Canvas";
import Panel from "../Canvas/Panel";
import {connect} from "react-redux";
import Segmentation from "./Segmentation/Segmentation";
import {getModels} from "../../Reducers/modelReducer";
import {PhotoAPI} from "../../API/API";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class Editor extends React.Component {
    state = {
        width: null,
        height: null,
        color: "#FFFFFF",
        brush: 100,
        segments: [],
        mask: null
    };
    ref = React.createRef();
    id = 0;

    newSegment = () => {
        this.setState({
            segments: [...this.state.segments, {
                id: this.id++,
                color: "white",
                name: "Порода",
                value: "Песчаник"
            }]
        })
    };

    DeleteSegment = (id) => () => {
        this.setState({
            segments: this.state.segments.filter((u) => u.id !== id),
        });
    };

    ChangeSegmentColor = (id, color) => () => {
        this.setState({
            segments: this.state.segments.map((u) => {
                if (u.id === id)
                    return {
                        ...u,
                        color,
                    };
                else return u;
            }),
        });
    };

    ChangeSegmentValue = (id, value) => () => {
        this.setState({
            segments: this.state.segments.map((u) => {
                if (u.id === id)
                    return {
                        ...u,
                        value,
                    };
                else return u;
            }),
        });
    };


    componentDidMount() {
        setTimeout(() => {
            this.setState({
                width: this.ref.current.width,
                height: this.ref.current.height,
            });
        }, 10);
    }

    componentDidUpdate(prevProps, prevState, s) {
        if (this.props.src !== prevProps.src) {
            setTimeout(() => {
                this.setState({
                    width: this.ref.current.width,
                    height: this.ref.current.height,
                });
            }, 10);
        }
    }

    saveCanvas = (canvas) => {
        this.setState({mask: canvas});
    };

    dataURLtoFile(dataurl, filename) {

        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    }

    onSave = () => {
        let segments = {};
        this.state.segments.forEach(u => {
            segments[u.id] = u.value
        });
        const s = JSON.stringify(segments).toString();
        const mask = this.state.mask.toDataURL('image/png');

        const data = this.dataURLtoFile(mask, "bla.png");

        PhotoAPI.createMask(s, data, 0, this.props.currentUser.id, this.props.photo.id);
        window.location = "/gallery/";
    };

    render() {
        return (
            <div className={classes.Editor}>
                <div className={classes.Field}>
                    {this.state.height && (
                        <Canvas
                            className={classes.Canvas}
                            height={this.state.height}
                            width={this.state.width}
                            color={this.state.color}
                            brush={this.state.brush}
                            isDraw={true}
                            save={this.saveCanvas}
                        />
                    )}
                    <img
                        className={classes.Img}
                        ref={this.ref}
                        src={"data:image/jpg;base64, " + this.props.photo.photo}
                        alt="kern"
                    />
                </div>
                <div className={classes.ContainerEdit}>
                    <div className={classes.AutoMarkup}>
                        <div className={classes.AutoMarkup__Text}>
                            Авторазметка
                        </div>
                        <div className={classes.Model__Text}>Модели:</div>
                        <select onChange={this.firstSelectHandler} className={classes.SelectModels}>
                            <option value="1" className={classes.OptionItem}>Default_model</option>
                            {this.props.models.map((item, index) => {
                                return (
                                    <option value={index}>{item.name}</option>
                                );
                            })}
                        </select>
                        <button
                            className={classes.Auto}
                            onClick={this.AutoSegmentation}
                            type="button"
                        >
                            {" "}
                            Запустить{" "}
                        </button>


                    </div>
                    <div className={classes.Palette}>
                        <div className={classes.Brush__Text}>
                            Кисть
                        </div>
                        <Panel
                            color={this.state.color}
                            brush={this.state.brush}
                            onColorChange={(color) => {
                                this.setState({color});
                            }}
                            onBrushChange={(e) => {
                                this.setState({brush: e.currentTarget.value});
                            }}
                        />


                    </div>
                    <div className={classes.Segmentation}>
                        <Segmentation segments={this.state.segments}
                                      newSegment={this.newSegment}
                                      DeleteSegment={this.DeleteSegment}
                                      ChangeColor={this.ChangeSegmentColor}
                                      ChangeValue={this.ChangeSegmentValue}/>
                        <input
                            type="button"
                            className={classes.Save_button}
                            value="Сохранить"
                            onClick={this.onSave}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    models: state.model.models,
});

export default compose(
    connect(mapStateToProps, {getModels}),
    withRouter)(Editor);
