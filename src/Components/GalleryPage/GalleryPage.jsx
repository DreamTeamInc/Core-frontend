import React from "react";
import classes from "./GalleryPage.module.css";
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import search from "./../../assets/img/search.svg"
import GalleryLine from "./GalleryLine/GalleryLine";
import Filter from "./Filter/Filter";
import { markup, shine } from "../../Data";
import { connect } from "react-redux";
import { getPhotos } from "../../Reducers/photoReducer";
import { getLocations } from "../../Reducers/locationReducer";
import { getWellsInLocation } from "../../Reducers/locationReducer";

class GalleryPage extends React.Component {
  state = {
    currentField: "",
    currentWell: "",
    currentLight: "",
    currentMarkUp: "",
    
  };
  photoFilter= [];
  wells = [];
  componentDidMount = async() => {
    await this.props.getPhotos();
    await this.props.getLocations();
    this.props.locations.map(async (item) => {
        await this.props.getWellsInLocation(item);
        this.wells.push(this.props.well);
    });
  }

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

  onLightClick = (light) => {
    this.setState({
      currentLight: light,
    });
  };
  onMarkUpClick = (mark) => {
    this.setState({
      currentMarkUp: mark,
    });
  };
  ClearField = () =>{
     this.setState({
         currentField: "",
         currentWell: "",    
     });
  } 
  // FilterPhoto = () => {
  //   if (this.state.currentField === "" && this.state.currentWell && this.state.currentLight ==="")
  //   {
  //         this.photoFilter = this.props.photo;
    
  //   }else {

  //   }
  // };

  render() {
    return (
      <div className={classes.GalleryPage}>
        <div className={classes.GalleryHead}>
          <div className={classes.GalleryHead__Text}>Галерея разметок</div>
          <div className={classes.Filter_Container}>
            <span className={classes.Search} onClick={this.FilterPhoto}><img src={search} alt="filter"/></span>
            <Filter
              show_menu={markup}
              name="Тип разметки"
              style={{ width: "180px"}} 
              onFilterClick={this.onMarkUpClick}
              idAll = "5"
            />
            <div className={classes.Border} />
            <Filter show_menu={shine} name="Излучение" currentLight={this.state.currentLight} onFilterClick={this.onLightClick} idAll = "3"/>
            <div className={classes.Border} />
            <Filter
              name="Месторождение"
              type="fixed"
              currentField={this.state.currentField}
              currentWell={this.state.currentWell}
              onFieldClick={this.onFieldClick}
              onWellClick={this.onWellClick}
              wells = {this.wells}
            />
           
            <div className={classes.NameOfPlace}>
              {this.state.currentField + " " + this.state.currentWell}
            </div>
           {(this.state.currentField === "")? null: <button className={classes.BtnClear} onClick={this.ClearField} >&#215;</button>}
          </div>
        </div>

        <div className={classes.ScrollGalleryVertical}>
          {this.props.photos.map((u) => (
            <GalleryLine photo={u} key={u.id} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  photos: state.photo.photos,
  locations: state.location.locations,
  well: state.location.well,
});

export default connect(mapStateToProps, {
  getPhotos,
  getLocations,
  getWellsInLocation,
})(GalleryPage);
