import React from "react";
import classes from "./Editor.module.css";
import Canvas from "../Canvas/Canvas";
import Panel from "../Canvas/Panel";
import { connect } from "react-redux";
import Segmentation from "./Segmentation/Segmentation";
import {getModels} from "../../Reducers/modelReducer";
import {PhotoAPI} from "../../API/API";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {Colors, segments_value_ds, segments_value_uf} from "../../Data";

class Editor extends React.Component {
    state = {
        width: null,
        height: null,
        color: "#FFFFFF",
        brush: 100,
        segments: [],
        mask: null,
        currentModel: null,
        models: [],
        data: this.props.mask,
        isFetching:false
    };
    ref = React.createRef();
    id = 0;
    segments = this.props.classification? JSON.parse( this.props.classification.split("'").join('"')):null;

    newSegment = () => {
        this.setState({
            segments: [...this.state.segments, {
                id: this.id++,
                color: "white",
                name: this.props.photo.kind === 1 ?"Порода":"Свечение",
                value: this.props.photo.kind === 1 ?"Песчанник":"Насыщенное",
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
        this.props.getModels(this.props.currentUser.id);
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

        if (this.props.models !== prevProps.models){
            this.setState({
                models:this.props.models.filter(i=>i.kind===this.props.photo.kind),
                currentModel:this.props.models.filter(i=>i.kind===this.props.photo.kind)[0].id
            })
        }

    }


  saveCanvas = (canvas) => {
    this.setState({ mask: canvas });
  };

  dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(","),
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
            let c = Colors.find(color=>color.color===u.color);
            segments[c.r] = u.value
        });

        const s = JSON.stringify(segments).toString();
        const mask = this.state.mask.toDataURL('image/png');

        const data = this.dataURLtoFile(mask, "blaB.png");


        PhotoAPI.createMask(s.split('"').join("'"), data, 0, this.props.currentUser.id, this.props.photo.id);
        window.location = "/gallery/";
    };

    changeModel = (e) => {
        this.setState({currentModel: e.target.value});
    };


    AutoSegmentation = async () => {
        let data;
        this.setState({ isFetching:true});

        if (this.props.photo.kind===1){
            data = await PhotoAPI.getDLMask(this.props.photo.id, this.state.currentModel);
        } else {
            data = await PhotoAPI.getUFMask(this.props.photo.id, this.state.currentModel);
        }
        this.setState({data:data.mask});
        this.setState({ isFetching:false});
        if (data.message) return;

        this.segments = JSON.parse(data.classification.split("'").join('"'));
    };

    setColorMap = (colorMap) => {
        let s = [];
        colorMap.forEach(c=>{
            s.push({
                        id: this.id++,
                        color: c.color,
                        name: this.props.photo.kind===1?"Порода":"Свечение",
                        value: this.segments[c.r]})
        });
        this.setState({segments:s})
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
                            data={this.state.data}
                            setColorMap={this.setColorMap}
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
                        <select onChange={this.changeModel} value={this.state.currentModel} className={classes.SelectModels}>
                            {this.state.models.filter(u=>!u.is_active).map((item, index) => {
                                return (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                );
                            })}
                        </select>
                        {!this.state.isFetching &&
                        <button
                            className={classes.Auto}
                            onClick={this.AutoSegmentation}
                            type="button"
                        >
                            {" "}Запустить{" "}
                        </button>}


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
                                      values={this.props.photo.kind === 1? segments_value_ds: segments_value_uf}
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
  activeModel: state.model.activeModel,
});

export default compose(
  connect(mapStateToProps, { getModels }),
  withRouter
)(Editor);
