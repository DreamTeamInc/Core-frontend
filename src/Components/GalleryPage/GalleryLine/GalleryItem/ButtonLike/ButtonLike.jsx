import React from "react";
import classes from "./ButtonLike.module.css";


class ButtonLike extends React.Component {

    state = {
        liked: false,
        likes: 0,
      };

      addLike = () => {
        let newCount = this.state.likes + 1;
          this.setState({ liked: true });
          this.setState({
          likes: newCount
          
        });
      };
      removeLike = () => {
        let newCount = this.state.likes - 1;
          this.setState({ liked: false });
          this.setState({
          likes: newCount
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


export default ButtonLike;