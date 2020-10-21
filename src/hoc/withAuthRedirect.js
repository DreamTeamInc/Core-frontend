import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const withAuthRedirect = (Component) => {
    return (props) => {
        if (!props.isAuth) return <Redirect to='/auth'/>;
        return <Component{...props}/>;
    };
};

const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
});

export default (Component)=>connect(mapStateToProps)(withAuthRedirect(Component));