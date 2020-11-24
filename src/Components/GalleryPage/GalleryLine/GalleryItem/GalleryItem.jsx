import React from "react";
import classes from "./GalleryItem.module.css";
import ButtonLike from "./ButtonLike/ButtonLike";
import {UserAPI} from "../../../../API/API";
import {connect} from "react-redux";

class GalleryItem extends React.Component {
    state = {}

    componentDidMount() {
        UserAPI.getUser(this.props.mask.user).then((data) => {
            this.setState({...data});
        });
    }


    render() {
        return (
            <div className={classes.GalleryItem}>
                <div className={classes.ImgCore}>
                    <div className={classes.UserName}>
                        {this.state.first_name + " " + this.state.second_name}
                    </div>
                    <div className={classes.Img} onClick={this.props.EditPhoto(this.props.photo, this.props.mask.mask, this.props.mask.classification)}>
                        <img
                            src={"data:image/jpg;base64, " + this.props.mask.mask}
                            alt="mask"
                        />
                        {/*<img src={core} alt="mask"/>*/}
                    </div>
                    <div className={classes.Like}>
                        <ButtonLike
                            users={this.props.mask.users_who_like}
                            likes={this.props.mask.likes}
                            photo={this.props.photo.id}
                            maska={this.props.mask.id}
                        />
                        <span className={classes.AddToYourself}>
              К себе
              <input
                  className={classes.Check}
                  type="checkbox"
                  disabled={this.props.index !== this.props.id && this.props.dis}
                  checked={this.props.mask.id === this.props.id}
                  readOnly
                  onChange={this.props.changeDis(this.props.mask.id)}
              />
            </span>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    activeModel: state.photo.activeModel,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps, {})(GalleryItem);
