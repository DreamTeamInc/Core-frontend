import React from "react";
import Slider from "react-slick";
import classes from "./GalleryPage.module.css";
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryLine from "./GalleryLine/GalleryLine";
import Filter from "./Filter/Filter";
import { segments_value, show_menu, shine, markup } from "../../Data";

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
  state = {
    currentField: "",
    currentWell: "",
  };

  onFieldClick = (field) => {
    this.setState({
      currentField: field,
    });
  };

  onWellClick = (well) => {
    this.setState({
      currentWell: well,
    });
  };

  render() {
    return (
      <div className={classes.GalleryPage}>
        <div className={classes.GalleryHead}>
          <div className={classes.GalleryHead__Text}>Галерея разметок</div>
          <div className={classes.Filter_Container}>
            <Filter
              idAll = '5'
              show_menu={markup}
              name="Тип разметки"
              style={{ width: "200px" }}
            />
            <div className={classes.Border}/>
            <Filter idAll = '3' show_menu={shine} name="Излучение" />
            <div className={classes.Border}/>
            <Filter
              idAll = '4'
              show_menu={show_menu}
              name="Месторождение"
              type="fixed"
              currentField={this.state.currentField}
              currentWell={this.state.currentWell}
              onFieldClick={this.onFieldClick}
              onWellClick={this.onWellClick}
            ></Filter>

            <div className={classes.NameOfPlace}>
              {this.state.currentField + " " + this.state.currentWell}
            </div>
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
