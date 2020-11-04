import React from "react";
import classes from "./DropDown.module.css"


class DropDown extends React.Component {
    state = {
        isDrop: false
    };


    Drop = () => {
        this.setState({
            isDrop: !this.state.isDrop
        })
    };

    render() {
        return (
            <div  {...this.props}>
                <div onClick={this.Drop}>
                    {this.props.childs}
                </div>
                {this.state.isDrop &&
                <div className={classes.DropDown + ' ' + this.props.dropclassname}
                     onClick={this.Drop}>
                    {this.props.children}
                </div>}
            </div>
        )
    }
}

export default DropDown;