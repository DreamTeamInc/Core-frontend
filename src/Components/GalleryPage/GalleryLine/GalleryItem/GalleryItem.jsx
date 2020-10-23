import React from "react";
import classes from "./GalleryItem.module.css";
import ButtonLike from "./ButtonLike/ButtonLike";
import core from "./../../../../assets/img/Core/core.jpg";




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
          <div className={classes.UserName}>Иван Иванов</div>
          <div  className={classes.Img}> <img src={core}></img></div>
          <div className={classes.Like}>
              <ButtonLike liked={this.props.liked} likes={this.props.likes} />
              <span className={classes.AddToYourself}>К себе <input className={classes.Check} type="checkbox" label="Save" readonly /></span> 
          </div>
          </div>
          </div>
        );
      }
}


export default GalleryItem;