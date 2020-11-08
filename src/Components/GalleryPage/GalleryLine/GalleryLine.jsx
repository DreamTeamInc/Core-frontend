import React from "react";
import Slider from "react-slick";
import classes from "./GalleryLine.module.css";
import "./slick.css";
import "./slick-theme.css";
import GalleryItem from "./GalleryItem/GalleryItem";
import newphoto from "./../../../assets/img/Core/addphoto.png";
import {getPhotoMasks} from "../../../Reducers/photoReducer";
import {connect} from "react-redux"
import {PhotoAPI} from "../../../API/API";


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
                        {this.props.photo.kind === 1 ? 
                        <div className={classes.OriginalText}>{this.props.photo.location.split(' ').join('_') + "_" + this.props.photo.well.split(' ').join('_') + "_" + this.props.photo.depth + "_Дневной_свет"}</div>
                        :
                        <div className={classes.OriginalText}>{this.props.photo.location.split(' ').join('_') + "_" + this.props.photo.well.split(' ').join('_') + "_" + this.props.photo.depth  + "_Ультрафиолет"}</div>
                        }
                        <div className={classes.ImgOriginal}>
                            <img src={"data:image/jpg;base64, "+this.props.photo.photo} alt="Керн"/>
                        </div>
                    </div>
                    {this.props.photo.masks && this.props.photo.masks.map(m => <GalleryItem mask={m} key={m.id} photo={this.props.photo.id}/>)}

                    <div className={classes.ImgCoreContainer}>
                        <input id={this.props.photo.id} className="inputFile" type="file" onChange={(e) => {
                            console.log(e.target.files[0]);
                            PhotoAPI.createMask(e.target.files[0], e.target.files[0], 0, this.props.currentUser.id, this.props.photo.id)
                        }
                        }/>
                        <label htmlFor={this.props.photo.id}>
                            <div className={classes.NewPhoto}>
                                <img src={newphoto} alt=""/>
                            </div>
                        </label>
                    </div>

                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps, {getPhotoMasks})(GalleryLine);