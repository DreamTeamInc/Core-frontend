import React from "react";
import Slider from "react-slick";
import classes from "./GalleryLine.module.css";
import "./../../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryItem from "./GalleryItem/GalleryItem";
import newphoto from "./../../../assets/img/Core/addphoto.png";
import {getPhotoMasks} from "../../../Reducers/photoReducer";
import {connect} from "react-redux"


class GalleryLine extends React.Component {

    settings = {
        dots: true,
        arrows: true,
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
                    arrows: true,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    infinite: false,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                    infinite: false,
                    slidesToScroll: 2
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

                <Slider {...this.settings} className={classes.Slider}>
                    <div className={classes.ImgCoreContainer}>
                        <div className={classes.OriginalText}>Название(оригинал)</div>
                        <div className={classes.ImgOriginal}>
                            <img src={this.props.photo.photo_path} alt="Керн"/>
                        </div>
                    </div>
                    {this.props.photo.masks && this.props.photo.masks.map(m => <GalleryItem mask={m} key={m.id}/>)}

                    <div className={classes.ImgCoreContainer}>
                        <div className={classes.OriginalText}/>
                        <div className={classes.NewPhoto}>
                            <img src={newphoto} alt=""/>
                        </div>
                    </div>

                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getPhotoMasks})(GalleryLine);