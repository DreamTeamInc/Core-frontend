import React from "react";
import classes from "./UploadGalleryItem.module.css";




class UploadGalleryItem extends React.Component {

    state = {
        liked: false,
        likes: 0
      };

      addLike = () => {
        let newCount = this.state.likes + 1;
          this.setState({ liked: true });
          this.setState({
          likes: newCount
        });
      };
    
    render() {
        
        return (
          <div className={classes.UploadGalleryItem}>
          <div className={classes.Img}></div>
          <div className={classes.Name}>
              name 
          </div>
          </div>
 
        );
      }
}


export default UploadGalleryItem;