import React from 'react';
import {Route} from "react-router-dom";
import classes from './MainPage.module.css'
import LoadPhoto from "../LoadPhoto/LoadPhoto";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Header from "../Header/Header";

const MainPage = (props) => {
    return (
        <div className={classes.MainContent}>
            <Route exact path='/'
                   render={() =><div><Header/><LoadPhoto/></div>}/>
            <Route path='/auth'
                   render={() => <Login/>}/>
            <Route path='/reg'
                   render={() => <div><Header/><Registration/></div>}/>
        </div>
    )
};

export default MainPage;