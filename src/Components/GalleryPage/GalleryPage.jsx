import React from "react";
import Slider from "react-slick";
import classes from "./GalleryPage.module.css";
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryLine from "./GalleryLine/GalleryLine";
import Filter from "./Filter/Filter";
import { segments_value, show_menu } from "../../Data";

class GalleryPage extends React.Component {
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
    return (
      <div className={classes.GalleryPage}>
        <div className={classes.GalleryHead}>
          <p>Галерея разметок</p>
          <div className={classes.Filter}>
            <Filter show_menu={show_menu} segments_value={segments_value}>
              Filter
            </Filter>
          </div>
        </div>
        <div className={classes.ScrollGalleryVertical}>
          <GalleryLine />
          <GalleryLine />
        </div>
      </div>
    );
  }
}

export default GalleryPage;
