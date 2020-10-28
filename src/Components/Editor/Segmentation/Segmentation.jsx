import React from "react";
import classes from "./Segmantation.module.css";
import Segment from "./Segment/Segment";

class Segmentation extends React.Component {
    state = {
        segments: []
    };

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

  ChangeColor = (id, color) => () => {
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

  ChangeValue = (id, value) => () => {
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

  render() {
    return (
      <div>
        {this.state.segments.map((u) => (
          <Segment
            id={u.id}
            key={u.id}
            color={u.color}
            name={u.name}
            value={u.value}
            changeColor={this.ChangeColor}
            deleteSegment={this.DeleteSegment}
            changeValue={this.ChangeValue}
          />
        ))}
        <div className={classes.Container__BTN}>
        <div className={classes.Add} onClick={this.newSegment}>
          Новый сегмент
        </div>
        <input
          type="button"
          className={classes.Save_button}
          value="Сохранить"
          disabled={!this.props.file}
        />
        </div>
      </div>
    );
  }
}

export default Segmentation;