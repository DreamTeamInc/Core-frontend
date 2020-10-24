import React from "react";
import classes from "./ModelsGalleryItem.module.css";
import core from "./../../../../assets/img/Core/mask.png";
import basket from "./../../../../assets/img/delete.svg";





class ModelsGalleryItem extends React.Component {


    render() {
        
        return (
          <div className={classes.ModelsGalleryItem}>
          <div className={classes.ImgCore}>
          <div className={classes.NameModels}>name</div>
          <div  className={classes.Img}> <img src={core}></img></div>
          <button className={classes.Delete} onClick={() => window.confirm('Вы уверены, что хотите удалить разметку?')}><img src={basket}/></button>
          
          </div>
          </div>
 
        );
      }
}


export default ModelsGalleryItem;