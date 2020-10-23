import React from "react";
import Slider from "react-slick";
import classes from "./ModelsGalleryLine.module.css";
import  "./../../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../../node_modules/slick-carousel/slick/slick-theme.css";
import ModelsGalleryItem from "./ModelsGalleryItem/ModelsGalleryItem";



class ModelsGalleryLine extends React.Component {

    render() {
        var settings = {
          dots: true,
          infinite: false,
           arrows:  true,
          speed: 500,
          slidesToShow: 8,
          slidesToScroll: 8,
          initialSlide: 0,
          loop:true,
          
        };
        return (
          <div className={classes.ModelsGalleryLine}>
            <Slider {...settings} className={classes.Slider}>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              <ModelsGalleryItem/>
              
            
            </Slider>
          </div>
        );
      }
}


export default ModelsGalleryLine;