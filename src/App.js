import React from 'react';
import './App.css';
import MainPage from "./Components/MainPage/MainPage";

import {isAuth} from "./Reducers/userReducer";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import Login from "./Components/Login/Login";

class App extends React.Component {


    constructor(props) {
        super(props);
        this.props.isAuth();
    }

    render() {
        return (
            <div className="Content">
                {!this.props.isFetching &&
                <MainPage/>}
                {!this.props.isFetching &&
                <Route path="/auth"
                       render={() => <Login/>}/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isFetching: state.user.isFetching,
    isAuth: state.user.isAuth
});


export default connect(mapStateToProps, {isAuth})(App)
