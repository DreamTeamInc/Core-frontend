import React from "react";
import Slider from "react-slick";
import classes from "./GalleryLine.module.css";
import  "./../../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryItem from "./GalleryItem/GalleryItem";
import core from "./../../../assets/img/Core/core1.png";
import newphoto from "./../../../assets/img/Core/addphoto.jpg";



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
           infinity: false,
          speed: 500,
          slidesToShow: 8,
          slidesToScroll: 8,
          initialSlide: 0,
          loop:true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                arrows:  true,
                loop:true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows:  true,
                loop:true,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                arrows:  true,
                loop:true,
                slidesToScroll: 1
              }
            }
          ]
        };
        return (
          <div className={classes.GalleryLine}>
            
            <Slider {...settings} className={classes.Slider}>
              <div className={classes.ImgCoreContainer}>
                <div className={classes.OriginalText}>Название(оригинал):</div>
                <div  className={classes.ImgOriginal}> <img src={core}></img></div>
              </div>
              <GalleryItem/>
              <GalleryItem/>
              <GalleryItem/>
              <GalleryItem/>
              <GalleryItem/>
              <GalleryItem/>
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