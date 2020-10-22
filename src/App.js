import React from 'react';
import './App.css';
import MainPage from "./Components/MainPage/MainPage";
import {isAuth} from "./Reducers/user";
import {connect} from "react-redux";

class App extends React.Component {

    componentDidMount() {
        this.props.isAuth();
    }


    render() {
        return (
            <div className="Content">
                <MainPage/>
            </div>
        );
    }
}

export default connect((state)=>({}), {isAuth})(App);