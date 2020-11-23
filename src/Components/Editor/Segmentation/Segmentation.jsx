import React from "react";
import classes from "./Segmantation.module.css";
import Segment from "./Segment/Segment";

class Segmentation extends React.Component {

    render() {
        return (
            <div>
                {this.props.segments.map((u) => (
                    <Segment
                        id={u.id}
                        key={u.id}
                        color={u.color}
                        name={u.name}
                        value={u.value}
                        values={this.props.values}
                        changeColor={this.props.ChangeColor}
                        deleteSegment={this.props.DeleteSegment}
                        changeValue={this.props.ChangeValue}
                    />
                ))}
                <div className={classes.Container__BTN}>
                    <div className={classes.Add} onClick={this.props.newSegment}>
                        Новый сегмент
                    </div>
                </div>
            </div>
        );
    }
}

export default Segmentation;