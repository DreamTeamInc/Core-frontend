import React from "react";
import classes from "./GalleryPage.module.css";
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import search from "./../../assets/img/search.svg"
import GalleryLine from "./GalleryLine/GalleryLine";
import Filter from "./Filter/Filter";
import {markup, shine} from "../../Data";
import {connect} from "react-redux";
import {getPhotos} from "../../Reducers/photoReducer";
import {getLocations, getWellsInLocation} from "../../Reducers/locationReducer";
import Preloader from "../common/Preloader/Preloader";
import LoadPhoto from "../LoadPhoto/LoadPhoto";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class GalleryPage extends React.PureComponent {
    state = {
        currentField: "",
        currentWell: "",

        editorMod: false,
        photoEdit: "",

        currentLight: "",
        currentMarkUp: "",

        update: false
    };
    photoFilter = [];
    wells = [];
    componentDidMount = async () => {
        if (this.props.photos.length === 0)
            await this.props.getPhotos();
        await this.props.getLocations();
        for(const item of this.props.locations) {
            await this.props.getWellsInLocation(item);
            this.wells.push(this.props.well);
        };
        console.log(
          "HELLO", this.wells);
        this.setState({editMod: false})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname === "/gallery") {
            this.setState({editorMod: false})
        }
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
    ClearField = () => {
        this.setState({
            currentField: "",
            currentWell: "",
        });

    };

    EditPhoto = (photo) => {
        this.setState({
            editorMod: true,
            photoEdit: photo
        });
        this.props.history.push("/gallery/edit")
    };

  FilterPhoto = () => {
     this.props.getPhotos(this.state.currentMarkUp,
      this.state.currentField,
      this.state.currentWell,
      this.state.currentLight === 'Дневной свет' ? 1 : this.state.currentLight === 'Ультрафиолет' ? 2 : '',
      0,false);
      
    this.setState({
      update: !this.state.update,
    });
  };

  changeUpdate = () => {
    this.setState({
      update: !this.state.update
    })
  }

  render() {
    if (this.state.editorMod)
      return <LoadPhoto photo={this.state.photoEdit}/>;
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
            <GalleryLine EditPhoto={this.EditPhoto} photo={u} key={u.id}  onUpdate={this.changeUpdate} update= {this.state.update}/>
          ))}
          {this.props.isFetching && <Preloader/>}
          {!this.props.isFetching &&
          <div className={classes.Next} onClick={()=>{this.props.getPhotos(this.state.currentMarkUp,
            this.state.currentField,
            this.state.currentWell,
            this.state.currentLight === 'Дневной свет' ? 1 : this.state.currentLight === 'Ультрафиолет' ? 2 : '',this.props.photos.length)}}>Дальше</div>}
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

export default compose(
    connect(mapStateToProps, {
        getPhotos,
        getLocations,
        getWellsInLocation,
    }),
    withRouter)(GalleryPage);
