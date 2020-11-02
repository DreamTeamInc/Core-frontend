import React from "react";
import classes from "./ModelsGalleryItem.module.css";
import basket from "./../../../../assets/img/delete.svg";


class ModelsGalleryItem extends React.Component {


    render() {

        return (
            <div className={classes.ModelsGalleryItem}>
                <div className={classes.ImgCore}>
                    <div className={classes.NameModels}>Месторождение/</div>
                    <div className={classes.NameModels}>Скважина/</div>
                    <div className={classes.NameModels}>Глубина/</div>
                    <div className={classes.Img}><img src={this.props.core} alt=""/></div>
                    <button className={classes.Delete}
                            onClick={() => window.confirm('Вы уверены, что хотите удалить разметку?')}>
                        <img src={basket} alt=""/>
                    </button>

                </div>
            </div>

        );
    }
}


export default ModelsGalleryItem;