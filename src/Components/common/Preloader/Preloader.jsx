import React from "react";
import Loader from "./Loader.svg"
import classes from "./Preloader.module.css"

class Preloader extends React.Component {

    state = {
        wait: false
    };

    timer = null;

    componentDidMount() {
        this.timer = setTimeout(()=>{this.setState({wait: true})}, 400)
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {

        if (!this.state.wait) {
            return <></>;
        }

        return (
            <div className={classes.Preloader +' '+this.props.className}>
                <img className={classes.Preloader__img} src={Loader} alt='Loader'/>
            </div>
        )
    }
}

export default Preloader;