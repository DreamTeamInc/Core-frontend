import React from "react";
import classes from "./ModelsGalleryItem.module.css";
import basket from "./../../../../assets/img/delete.svg";
import {connect} from "react-redux";
import {removeMaskToYourself} from "../../../../Reducers/photoReducer"
import {deleteModelMask} from "../../../../Reducers/modelReducer"

class ModelsGalleryItem extends React.Component {

    render() {

        return (
            <div className={classes.ModelsGalleryItem}>
                <div className={classes.ImgCore}>
                    {Object.keys(this.props.mask.photo).map((el, index)=> {
                    return(
                    <div className={classes.NameModels} key={index}>{this.props.mask.photo[el]}/</div>
                    );
                     })}
                    
                    <div className={classes.Img}>
                        <img src={"data:image/jpg;base64, " + this.props.mask.mask}
                             alt="mask"/>
                    </div>
                    <button className={classes.Delete}
                            onClick={() => {this.props.deleteModelMask(this.props.currentUser.id, this.props.mask.id)}}>
                        <img src={basket} alt=""/>
                    </button>

                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    
});

export default connect(mapStateToProps, {removeMaskToYourself, deleteModelMask})(ModelsGalleryItem);