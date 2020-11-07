import React from "react";
import classes from "./GalleryPage.module.css";
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryLine from "./GalleryLine/GalleryLine";
import Filter from "./Filter/Filter";
import { markup, shine } from "../../Data";
import { connect } from "react-redux";
import { getPhotos } from "../../Reducers/photoReducer";
import { getLocations } from "../../Reducers/locationReducer";
import { getWellsInLocation } from "../../Reducers/locationReducer";
import Preloader from "../common/Preloader/Preloader";
import LoadPhoto from "../LoadPhoto/LoadPhoto";

class GalleryPage extends React.Component {
  state = {
    currentField: "",
    currentWell: "",
    editorMod:false,
    photoEdit:""
  };
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
  ClearField = () =>{
     this.setState({
         currentField: "",
         currentWell: "",    
     });
  };

  EditPhoto = (photo) => {
    this.setState({
      editorMod:true,
      photoEdit:photo
    })
  };

  render() {
    if (this.state.editorMod)
      return <LoadPhoto photo={this.state.photoEdit}/>;
    return (
      <div className={classes.GalleryPage}>
        <div className={classes.GalleryHead}>
          <div className={classes.GalleryHead__Text}>Галерея разметок</div>
          <div className={classes.Filter_Container}>
            <Filter
              show_menu={markup}
              name="Тип разметки"
              style={{ width: "200px" }}
            />
            <div className={classes.Border} />
            <Filter show_menu={shine} name="Излучение" />
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
            <GalleryLine EditPhoto={this.EditPhoto} photo={u} key={u.id} />
          ))}
          {this.props.isFetching && <Preloader/>}
          {!this.props.isFetching &&
          <div className={classes.Next} onClick={()=>{this.props.getPhotos(this.props.photos.length)}}>Дальше</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  photos: state.photo.photos,
  locations: state.location.locations,
  well: state.location.well,
  isFetching: state.photo.isFetching
});

export default connect(mapStateToProps, {
  getPhotos,
  getLocations,
  getWellsInLocation,
})(GalleryPage);
