import React from "react";
import classes from "./ButtonLike.module.css";
import {connect} from "react-redux";
import {putLike, removeLike} from "./../../../../../Reducers/photoReducer";


class ButtonLike extends React.Component {
      state = {
        liked: this.props.users.indexOf(this.props.currentUser.id) !== -1,
        likes: this.props.likes
      }

      addLike = () => {
        this.props.putLike(this.props.currentUser.id, this.props.photo, this.props.maska);
        this.setState({
          liked: true,
          likes: this.state.likes+1
        });
      };
      removeLike = () => {
        this.props.removeLike(this.props.currentUser.id, this.props.photo, this.props.maska);
        this.setState({
          liked: false,
          likes: this.state.likes-1
        });
      };
    
    render() {
        if (this.state.liked) {
            return ( <div className={classes.ButtonLike}>
                <i onClick={this.removeLike} className={classes.Remove}>&#10084;</i> 
                <span className={classes.Count}> {this.state.likes}</span>
                </div>);
          }
        else {
            return (
            <div className={classes.ButtonLike}>
              <i onClick={this.addLike}  className={classes.Add}>&#10084;</i>
              <span className={classes.Count}> {this.state.likes}</span>
              </div>
        );
      }
    }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, {putLike, removeLike})(ButtonLike);