import React from "react";
import Slider from "react-slick";
import classes from "./GalleryLine.module.css";
import  "./../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryItem from "../GalleryItem/GalleryItem";



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
          infinite: true,
           arrows:  true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
          loop:true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
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
              <GalleryItem/>
              <GalleryItem/>
               <GalleryItem/>
              <GalleryItem/>
              <GalleryItem/>
              
            
            </Slider>
          </div>
        );
      }
}


export default GalleryLine;