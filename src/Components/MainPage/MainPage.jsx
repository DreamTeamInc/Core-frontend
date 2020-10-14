import React from 'react';
import {Route} from "react-router-dom";
import classes from './MainPage.module.css'
import LoadPhoto from "../LoadPhoto/LoadPhoto";

const MainPage = (props) => {
    return (
        <div className={classes.MainContent}>
            <Route path='/'
                   render={() => <LoadPhoto/>}/>
        </div>
    )
};

export default MainPage;