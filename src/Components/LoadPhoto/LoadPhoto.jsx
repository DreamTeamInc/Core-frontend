import React from "react";
import classes from "./LoadPhoto.module.css"
import Editor from "../Editor/Editor";

class LoadPhoto extends React.Component {


    render() {
        return (
            <div className={classes.LoadPhoto}>

                <div className={classes.Buttons_container}>

                    <div className={classes.ContainerName}>
                        <div className={classes.NamePhoto}>
                            Месторождение: <span className={classes.Name}>{this.props.photo.location} </span>
                            Скважина: <span className={classes.Name}>{this.props.photo.well}</span>
                            Глубина: <span className={classes.Name}>{this.props.photo.depth} </span>
                            {this.props.photo.kind === 1 ? "ДС":"УФ"}
                        </div>
                        {/*<div className={classes.NameUser}>*/}
                        {/*    Разметчик: <span className={classes.Name}>Иван Иванов</span>*/}
                        {/*</div>*/}
                    </div>
                </div>

                <div className={classes.Moves}>
                    <Editor
                        photo={this.props.photo}
                        mask={this.props.mask}
                        classification={this.props.classification}/>;
                    />
                </div>
            </div>
        );
    }
}

export default LoadPhoto;