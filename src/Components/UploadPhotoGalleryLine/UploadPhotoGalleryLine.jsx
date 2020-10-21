import React from "react";
import Slider from "react-slick";
import classes from "./UploadPhotoGalleryLine.module.css";
import  "./../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import UploadGalleryItem from "../UploadGalleryItem/UploadGalleryItem";



class UploadPhotoGalleryLine extends React.Component {

    render() {
        var settings = {
          dots: true,
          infinite: false,
           arrows:  true,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 6,
          initialSlide: 0,
          loop:true,
          
        };
        return (
          <div className={classes.UploadPhotoGalleryLine}>
            <Slider {...settings} className={classes.Slider}>
              <UploadGalleryItem/>
              <UploadGalleryItem/>
               <UploadGalleryItem/>
              <UploadGalleryItem/>
              <UploadGalleryItem/>
              <UploadGalleryItem/>
              <UploadGalleryItem/>
              
            
            </Slider>
          </div>
        );
      }
}


export default UploadPhotoGalleryLine;