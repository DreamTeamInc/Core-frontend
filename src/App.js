import React from 'react';
import './App.css';
import MainPage from "./Components/MainPage/MainPage";
import {isAuth} from "./Reducers/userReducer";
import {connect} from "react-redux";

class App extends React.Component {

    componentDidMount() {
        this.props.isAuth();
    }

    render() {
        return (
            <div className="Content">
                {!this.props.isFetching &&
                <MainPage/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isFetching: state.user.isFetching
});



export default connect(mapStateToProps, {isAuth})(App)
