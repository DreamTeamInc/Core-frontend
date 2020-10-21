import React from "react";
import classes from "./GalleryItem.module.css";
import ButtonLike from "./../ButtonLike/ButtonLike";




class GalleryItem extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       imageList: []
    //     };
    //   }
    
    //   componentDidMount() {
    
    //     for (var { FileName: url } of this.props.banquetImages.list) {
    //       var newObj = {}
    //       newObj.original = url;
    //       newObj.thumbnail = url;
    //       this.state.imageList.push(newObj)
    //     }
    //   }
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
          <div className={classes.GalleryItem}>
          <div className={classes.ImgCore}>
          <div className={classes.UserName}>Иван</div>
          <div className={classes.Img}></div>
          <div className={classes.Like}>
              {/* <input id="toggle-heart" type="checkbox" />
              <label for="toggle-heart" aria-label="like">❤</label>
              <span className={classes.Count}>25</span> */}
              <ButtonLike liked={this.props.liked} likes={this.props.likes} />
              {/* <span className={classes.Count}>Likes: {this.state.likes}</span> */}
              <span className={classes.AddToYourself}>К себе <input className={classes.Check} type="checkbox" label="Save" readonly /></span> 
          </div>
          </div>
          </div>
        );
      }
}


export default GalleryItem;