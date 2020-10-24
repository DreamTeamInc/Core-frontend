import React from "react";
import Slider from "react-slick";
import classes from "./ModelsGalleryLine.module.css";
import  "./../../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../../node_modules/slick-carousel/slick/slick-theme.css";
import ModelsGalleryItem from "./ModelsGalleryItem/ModelsGalleryItem";
import mask from "./../../../assets/img/Core/mask.png";
import mask1 from "./../../../assets/img/Core/mask1.png";
import mask2 from "./../../../assets/img/Core/mask2.png";
import mask3 from "./../../../assets/img/Core/mask3.png";
import mask4 from "./../../../assets/img/Core/mask4.png";



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
              <ModelsGalleryItem core={mask1}/>
              <ModelsGalleryItem core={mask2}/>
              <ModelsGalleryItem core={mask3}/>
              <ModelsGalleryItem core={mask4}/>
              <ModelsGalleryItem core={mask3}/>
              <ModelsGalleryItem core={mask1}/>
              <ModelsGalleryItem core={mask2}/>
              <ModelsGalleryItem core={mask3}/>
              <ModelsGalleryItem core={mask4}/>
              <ModelsGalleryItem core={mask2}/>
              <ModelsGalleryItem core={mask3}/>
              <ModelsGalleryItem core={mask1}/>
              
            
            </Slider>
          </div>
        );
      }
}


export default ModelsGalleryLine;