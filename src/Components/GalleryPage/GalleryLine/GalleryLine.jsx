import React from "react";
import Slider from "react-slick";
import classes from "./GalleryLine.module.css";
import  "./../../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryItem from "./GalleryItem/GalleryItem";
import core from "./../../../assets/img/Core/core.jpg";
import newphoto from "./../../../assets/img/Core/addphoto.png";




class GalleryLine extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       imageList: []
    //     };
    //   }
    
    //   componentDidMount() {
    
    //     for (var { FileName: url } of this.props.banquetImages.list) {
    //       var newObj = {}
    //       newObj.original = url;
    //       newObj.thumbnail = url;
    //       this.state.imageList.push(newObj)
    //     }
    //   }
    
    render() {

     
        var settings = {
          dots: true,
          arrows:  true,
          speed: 500,
          slidesToShow: 8,
          slidesToScroll: 8,
          infinite: false,
          initialSlide: 0,
        
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows:  true,
                infinite: false,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows:  true,
                infinite: false,
                initialSlide: 0
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                arrows:  true,
                infinite: false,
                slidesToScroll: 2
              }
            }
          ]
        };
        return (
          <div className={classes.GalleryLine}>
            
            <Slider {...settings} className={classes.Slider}>
              <div className={classes.ImgCoreContainer}>
                <div className={classes.OriginalText}>Название(оригинал)</div>
                <div  className={classes.ImgOriginal}> <img src={core}></img></div>
              </div>
              <GalleryItem/>
              <GalleryItem/>
              
              <div className={classes.ImgCoreContainer}>
                <div className={classes.OriginalText}></div>
                <div  className={classes.NewPhoto}> <img src={newphoto}></img></div>
              </div>
              
            
            </Slider>
          </div>
        );
      }
}


export default GalleryLine;