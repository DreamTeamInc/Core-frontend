import React from "react";
import classes from "./GalleryPage.module.css";
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import GalleryLine from "./GalleryLine/GalleryLine";
import Filter from "./Filter/Filter";
import {markup, shine, show_menu} from "../../Data";
import {connect} from "react-redux"
import {getPhotos} from "../../Reducers/photoReducer";

class GalleryPage extends React.Component {

    state = {
        currentField: "",
        currentWell: "",
    };

    componentDidMount() {
        this.props.getPhotos();
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

    render() {
        return (
            <div className={classes.GalleryPage}>
                <div className={classes.GalleryHead}>
                    <div className={classes.GalleryHead__Text}>Галерея разметок</div>
                    <div className={classes.Filter_Container}>
                        <Filter
                            show_menu={markup}
                            name="Тип разметки"
                            style={{width: "200px"}}
                        />
                        <div className={classes.Border}/>
                        <Filter show_menu={shine} name="Излучение"/>
                        <div className={classes.Border}/>
                        <Filter
                            show_menu={show_menu}
                            name="Месторождение"
                            type="fixed"
                            currentField={this.state.currentField}
                            currentWell={this.state.currentWell}
                            onFieldClick={this.onFieldClick}
                            onWellClick={this.onWellClick}
                        />

                        <div className={classes.NameOfPlace}>
                            {this.state.currentField + " " + this.state.currentWell}
                        </div>
                    </div>
                </div>

                <div className={classes.ScrollGalleryVertical}>
                    {
                        this.props.photos.map(u => <GalleryLine photo={u} key={u.id}/>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    photos: state.photo.photos
});


export default connect(mapStateToProps, {getPhotos})(GalleryPage);
