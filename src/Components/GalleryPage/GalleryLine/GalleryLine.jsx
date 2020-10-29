import React from "react";
import Slider from "react-slick";
import classes from "./GalleryLine.module.css";
import "./../../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryItem from "./GalleryItem/GalleryItem";
import newphoto from "./../../../assets/img/Core/addphoto.png";
import {getPhotoMasks} from "../../../Reducers/photoReducer";
import {connect} from "react-redux"
import core from "../../../assets/img/Core/core.jpg"


class GalleryLine extends React.Component {
    SliderSettings = {
        dots: true,
        arrows: true,
        infinity: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        initialSlide: 0,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinity: false,
                    arrows: true,

                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinity: false,
                    arrows: true,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                    infinity: false,
                    slidesToScroll: 1
                }
            }
        ]
    };

    componentDidMount() {
        if (!this.props.photo.masks)
            this.props.getPhotoMasks(this.props.photo.id)
    }

    render() {
        return (
            <div className={classes.GalleryLine}>

                <Slider {...this.SliderSettings} className={classes.Slider}>
                    <div className={classes.ImgCoreContainer}>
                        <div className={classes.OriginalText}>Название(оригинал)</div>
                        <div className={classes.ImgOriginal}>
                            {/*<img src={this.props.photo.photo_path} alt="Оригинальный керн"/>*/}
                            <img src={core} alt="Оригинальный керн"/>
                        </div>
                    </div>
                    <GalleryItem/>
                    <GalleryItem/>
                    <GalleryItem/>
                    <GalleryItem/>
                    <GalleryItem/>

                    <div className={classes.ImgCoreContainer}>
                        <div className={classes.OriginalText}/>
                        <div className={classes.NewPhoto}><img src={newphoto} alt={""}/></div>
                    </div>


                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getPhotoMasks})(GalleryLine);