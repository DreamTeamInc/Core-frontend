import React from "react";
import Slider from "react-slick";
import classes from "./GalleryLine.module.css";
import "./slick.css";
import "./slick-theme.css";
import GalleryItem from "./GalleryItem/GalleryItem";
import newphoto from "./../../../assets/img/Core/addphoto.png";
import {addMaskToYourself, getPhotoMasks, removeMaskToYourself} from "../../../Reducers/photoReducer";
import {getActiveModel} from "../../../Reducers/modelReducer";
import {connect} from "react-redux";

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
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    infinite: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                    infinite: false,
                    slidesToScroll: 2,
                },
            },
        ],
    };
    state = {
        dis: false,
        id: null,
    };

    // onChange = (event) => {
    //     this.props.changeDis(this.props.index)
    //     if(this.props.index !== this.props.id) this.props.addMaskToYourself(this.props.currentUser.id, this.props.mask.id)
    //     else  this.props.removeMaskToYourself(this.props.currentUser.id, this.props.mask.id)
    // };
    changeDis = (id) => async () => {
        if (this.state.id === null) {
            this.props.addMaskToYourself(this.props.currentUser.id, id);
            this.setState({
                dis: false,
                id
            });
        } else {
            if (this.state.id === id) {
                this.props.removeMaskToYourself(this.props.currentUser.id, id);
                this.setState({
                    dis: false,
                    id: null,
                });
            } else {
                this.setState({dis: true});
                await this.props.removeMaskToYourself(this.props.currentUser.id, this.state.id);
                this.props.addMaskToYourself(this.props.currentUser.id, id);
                this.setState({
                    dis: false,
                    id
                });
            }
        }
    };

    async componentDidMount() {

        await this.props.getPhotoMasks(this.props.photo.id);
        await this.props.getActiveModel(this.props.currentUser.id);

        if (this.props.photo.masks) {
            this.props.photo.masks.forEach((m) => {
                let kind;
                if (this.props.photo.kind === this.props.activeModel[0].kind) {
                    kind = 0;
                } else {
                    kind = 1;
                }
                if (this.props.activeModel[kind]) {
                    this.props.activeModel[kind].mask_set.forEach((mask) => {

                        if (m.id === mask) {
                            this.setState({
                                dis: false,
                                id: m.id,
                            });
                        }
                    });
                }
            });
        }
    }


    componentDidUpdate(prevProps, prevState, e) {
        if (this.props.update && !this.props.photo.masks) {
            this.props.getPhotoMasks(this.props.photo.id);
        }
    }

    render() {
        return (
            <div className={classes.GalleryLine}>
                <Slider {...this.settings} className={classes.Slider}>
                    <div className={classes.ImgCoreContainer}>
                        {this.props.photo.kind === 1 ? (
                            <div className={classes.OriginalText}>
                                {this.props.photo.location.split(" ").join("_") +
                                "_" +
                                this.props.photo.well.split(" ").join("_") +
                                "_" +
                                this.props.photo.depth +
                                "_Дневной_свет"}
                            </div>
                        ) : (
                            <div className={classes.OriginalText}>
                                {this.props.photo.location.split(" ").join("_") +
                                "_" +
                                this.props.photo.well.split(" ").join("_") +
                                "_" +
                                this.props.photo.depth +
                                "_Ультрафиолет"}
                            </div>
                        )}
                        <div className={classes.ImgOriginal}>
                            <img
                                src={"data:image/png;base64, " + this.props.photo.photo}
                                alt="Керн"
                            />
                        </div>
                    </div>
                    {this.props.photo.masks &&
                    this.props.photo.masks.map((m) => (
                        <GalleryItem
                            mask={m}
                            key={m.id}
                            photo={this.props.photo}
                            changeDis={this.changeDis}
                            id={this.state.id}
                            dis={this.state.dis}
                            EditPhoto={this.props.EditPhoto}
                        />
                    ))}

                    <div className={classes.ImgCoreContainer}>
                        <div
                            className={classes.NewPhoto}
                            onClick={
                                this.props.EditPhoto(this.props.photo)
                            }
                        >
                            <img src={newphoto} alt=""/>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    activeModel: state.model.activeModel,
});

export default connect(mapStateToProps, {getPhotoMasks, getActiveModel, addMaskToYourself, removeMaskToYourself})(
    GalleryLine
);
