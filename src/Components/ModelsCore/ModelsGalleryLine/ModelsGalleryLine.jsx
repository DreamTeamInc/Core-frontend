import React from "react";
import Slider from "react-slick";
import classes from "./ModelsGalleryLine.module.css";
import "../../GalleryPage/GalleryLine/slick-theme.css";
import "../../GalleryPage/GalleryLine/slick-theme.css";
import ModelsGalleryItem from "./ModelsGalleryItem/ModelsGalleryItem";
import { getModelMasks } from "../../../Reducers/modelReducer";
import { connect } from "react-redux";

class ModelsGalleryLine extends React.Component {

  async componentDidMount() {
    await this.props.getModelMasks(this.props.currentUser.id);
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 8,
      initialSlide: 0,
      loop: true,
    };
    return (
      <div className={classes.ModelsGalleryLine}>
        <Slider {...settings} className={classes.Slider}>
          {this.props.masksModel.map((m, index) => (
            <ModelsGalleryItem
              mask={m}
              key={m.id}
              index={index}
              deleteModel={this.deleteModel}
            />
          ))}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  masksModel: state.model.masksModel,
});

export default connect(mapStateToProps, { getModelMasks })(ModelsGalleryLine);
