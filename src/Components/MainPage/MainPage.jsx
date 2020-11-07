import React from 'react';
import {Redirect, Route} from "react-router-dom";
import classes from './MainPage.module.css'
import LoadPhoto from "../LoadPhoto/LoadPhoto";
import Registration from "../Registration/Registration";
import ViewUsers from "../ViewUsers/ViewUsers";
import GalleryPage from "../GalleryPage/GalleryPage";
import DownloadPhoto from "../DownloadPhoto/DownloadPhoto";
import UploadPhotos from '../DownloadPhoto/UploadPhotos/UploadPhotos';
import ModelsCore from "../ModelsCore/ModelsCore";
import Header from "../Header/Header";
import withAuthRedirect from "../../hoc/withAuthRedirect";

const MainPage = (props) => {
    return (
        <div className={classes.MainContent}>
            <Header/>
            <Route exact path='/'
                   render={() => <Redirect to = "/gallery"/>}/>
            <Route path="/users"
                   render={() => <ViewUsers/>}/>
            <Route path="/gallery"
                   render={() => <GalleryPage/>}/>
            <Route path="/download"
                   render={() => <DownloadPhoto/>}/>
            <Route path="/models"
                   render={() => <ModelsCore/>}/>
        </div>
    )
};

export default withAuthRedirect(MainPage);