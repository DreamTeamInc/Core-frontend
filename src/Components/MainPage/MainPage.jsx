import React from 'react';
import {Route} from "react-router-dom";
import classes from './MainPage.module.css'
import Header from "./../Header/Header";
import Login from "./../Login/Login";
import ViewUsers from "./../ViewUsers/ViewUsers";
import GalleryPage from "./../GalleryPage/GalleryPage";
import ModelsCore from "./../ModelsCore/ModelsCore";
import DownloadPhoto from "./../DownloadPhoto/DownloadPhoto";
import UploadPhotos from './../DownloadPhoto/UploadPhotos/UploadPhotos';
import LoadPhoto from "./../LoadPhoto/LoadPhoto";


const MainPage = (props) => {
    return (
        <div className={classes.MainContent}>
            <Route exact path='/'
                   render={() =><div><Header/><LoadPhoto/></div>}/>
            <Route path='/auth'
                   render={() => <Login/>}/>
            <Route path="/users" 
                    render = {() => <div><Header/><ViewUsers/></div>}/>
            <Route path="/gallery" 
                    render = {() => <div><Header/><GalleryPage/></div>}/>
            <Route path="/download" 
                    render = {() => <div><Header/><DownloadPhoto/></div>}/>
            <Route path="/upload" 
                    render = {() => <div><Header/><UploadPhotos/></div>}/>
            <Route path="/models" 
                    render = {() => <div><Header/><ModelsCore/></div>}/> 
        </div>
    )
};

export default MainPage;