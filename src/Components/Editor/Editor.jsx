import React from "react";
import classes from "./Editor.module.css";
import Canvas from "../Canvas/Canvas";
import Panel from "../Canvas/Panel";
import Segmentation from "./Segmentation/Segmentation";

class Editor extends React.Component {
  state = {
    width: null,
    height: null,
    color: "#FFFFFF",
    brush: 20,
  };

  ref = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        width: this.ref.current.width,
        height: this.ref.current.height,
      });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState, s) {
    if (this.props.src !== prevProps.src) {
      setTimeout(() => {
        this.setState({
          width: this.ref.current.width,
          height: this.ref.current.height,
        });
      }, 1000);
    }
  }

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
            />
          )}
          <img
            className={classes.Img}
            ref={this.ref}
            src={this.props.src}
            alt="kern"
          />
        </div>
        <div className={classes.ContainerEdit}>
          <div className={classes.AutoMarkup}>
            <div className={classes.AutoMarkup__Text}>
              Авторазметка
            </div>
            <div className={classes.Model__Text}>Модели: </div>
            <select onChange={this.firstSelectHandler} className={classes.SelectModels} >
              <option value="1">Default</option>
              <option value="2">Модель1</option>
              <option value="3">Модель2</option>
              <option value="4">Модель3</option>
            </select>
            <button
              className={classes.Auto}
              onClick={this.AutoSegmentation}
              type="button"
            >
              {" "}
              Запустить{" "}
            </button>
            {/* <div className={classes.AutoMarkup__Text}>
              Автоклассификация
            </div>
            <div className={classes.Model__Text}>Модели: </div>
            <select onChange={this.firstSelectHandler} className={classes.SelectModels} >
              <option value="1">Default</option>
              <option value="2">Модель1</option>
              <option value="3">Модель2</option>
              <option value="4">Длинное_название_модели_3</option>
            </select>
            <button
              className={classes.Auto}
              onClick={this.AutoSegmentation}
              type="button"
            >
              {" "}
              Запустить{" "}
            </button> */}

          </div>
          <div className={classes.Palette}>
          <div className={classes.Brush__Text}>
              Кисть
            </div>
            <Panel
              color={this.state.color}
              brush={this.state.brush}
              onColorChange={(color) => {
                this.setState({ color });
              }}
              onBrushChange={(e) => {
                this.setState({ brush: e.currentTarget.value });
              }}
            />

            
          </div>
          <div className={classes.Segmentation}>
            <Segmentation file={this.props.file} />
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
