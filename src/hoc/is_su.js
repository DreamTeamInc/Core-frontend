import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const is_su = (Component) => {
    return (props) => {
        if (!props.is_su) return <Redirect to='/'/>;
        return <Component{...props}/>;
    };
};

const mapStateToProps = (state) => ({
    is_su: state.user.currentUser.is_su
});

export default (Component)=>connect(mapStateToProps)(is_su(Component));