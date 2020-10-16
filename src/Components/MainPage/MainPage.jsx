import React from 'react';
import {Route} from "react-router-dom";
import classes from './MainPage.module.css'
import LoadPhoto from "../LoadPhoto/LoadPhoto";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";

const MainPage = (props) => {
    return (
        <div className={classes.MainContent}>
            <Route exact path='/'
                   render={() => <LoadPhoto/>}/>
            <Route path='/auth'
                   render={() => <Login/>}/>
            <Route path='/reg'
                   render={() => <Registration/>}/>
        </div>
    )
};

export default MainPage;