import React from "react";
import Slider from "react-slick";
import classes from "./UploadPhotoPage.module.css";
import  "./../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import UploadPhotoGalleryLine from "./../UploadPhotoGalleryLine/UploadPhotoGalleryLine";
import DropDown from "./../common/DropDown/DropDown";



class UploadPhotoPage extends React.Component {
    state = {
        file: null,
        imagePreviewUrl: null,
    };

    onPhotoLoad = (e) => {

        let file = e.target.files[0];
        if (file) {
            this.setState({
                file: file,
                imagePreviewUrl: URL.createObjectURL(file)
            });
        } else
            this.setState({
                file: null,
                imagePreviewUrl: null
            })
    };

    render() {
        return (
            <div className={classes.UploadPhotoPage}>
             <div className={classes.UploadPhotoPageHead}> 
                 <div className={classes.Input_Photo}>
                     <label for="input_file">
                              <p className={classes.Load_Photo__Text}>
                                    Загрузить изображение керна
                               </p>
                     </label>    
                 </div>
            <input id="input_file"
                       type="file"
                       accept="image"
                       onChange={this.onPhotoLoad}
                       className={classes.Input_Load_Photo}/>
             <DropDown/>
             <span className={classes.DropDown}>DropDown</span>
             </div>
            <div className={classes.ScrollGalleryVertical}> 
                <UploadPhotoGalleryLine/>
                <UploadPhotoGalleryLine/>
            </div>
            </div>
        
        );
    }
}


export default UploadPhotoPage;