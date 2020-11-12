import React from "react";
import classes from "./GalleryItem.module.css";
import ButtonLike from "./ButtonLike/ButtonLike";
import {UserAPI} from "../../../../API/API";
import core from "./../../../../assets/img/Core/mask.png"


class GalleryItem extends React.Component {
    state = {

    };

    componentDidMount() {
        UserAPI.getUser(this.props.mask.user).then(data=>{
            this.setState({...data})
        })
    }

    render() {
        return (
            <div className={classes.GalleryItem}>
                <div className={classes.ImgCore}>
                    <div className={classes.UserName}>
                        {this.state.first_name + " "+ this.state.second_name}
                    </div>
                    <div className={classes.Img}>
                        <img src={"data:image/jpg;base64, "  + this.props.mask.mask} alt="mask"/>
                        {/*<img src={core} alt="mask"/>*/}
                    </div>
                    <div className={classes.Like}>
                        <ButtonLike liked={this.props.mask.liked} likes={this.props.mask.likes}/>
                        <span className={classes.AddToYourself}>
                          К себе
                          <input className={classes.Check} type="checkbox" readOnly/>
                      </span>
                    </div>
                </div>
            </div>
        );
    }
}


export default GalleryItem;