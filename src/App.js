import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import MainPage from "./Components/MainPage/MainPage";
import Login from "./Components/Login/Login";
import ViewUsers from "./Components/ViewUsers/ViewUsers";
import GalleryPage from "./Components/GalleryPage/GalleryPage";
import ModelsCore from "./Components/ModelsCore/ModelsCore";
import DownloadPhoto from "./Components/DownloadPhoto/DownloadPhoto";
import {Route} from "react-router-dom";
import UploadPhotos from './Components/DownloadPhoto/UploadPhotos/UploadPhotos';


function App() {
    return (
        <div className="Content">
            <Header/>
            <Route path="/auth" 
                    render = {() => <Login/>}/>
            <Route path="/users" 
                    render = {() => <ViewUsers/>}/>
            <Route path="/gallery" 
                    render = {() => <GalleryPage/>}/>
            <Route path="/download" 
                    render = {() => <DownloadPhoto/>}/>
            <Route path="/upload" 
                    render = {() => <UploadPhotos/>}/>
            <Route path="/models" 
                    render = {() => <ModelsCore/>}/> 
            {/* <MainPage/>  */}
        </div>
    );
}

export default App;