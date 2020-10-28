import React from "react";
import classes from "./ModelsCore.module.css";
import  "./../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import ModelsGalleryLine from "./ModelsGalleryLine/ModelsGalleryLine";


class ModelsCore extends React.Component {
    state = {
        inputNameModels: ''
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
          const newState = { ...prevstate };
          newState[name] = value;
          return newState;
        });
      };
      
    render() {
        return (
            <div className={classes.ModelsCore}>    
              <div className={classes.Scroll}>
                <ModelsGalleryLine/>  
                <button className={classes.DeleteAll} onClick={() => window.confirm('Вы уверены, что хотите удалить все разметки?')}>Удалить все</button>
                 {/* ДЛЯ ГЕОЛОГА*/}
                 <div className={classes.TrainContainer}>
                <label for="inputNameModels" className={classes.NameModels}> Название модели:  </label>
                <input type="text" onChange={this.handleChange} id="inputNameModels" className={classes.inputNameModels} required />    
                <button className={classes.BtnTrainModel} onClick={this.TrainModel} type="button"> Обучить </button>
                 {/* ДЛЯ АДМИНА*/}
                 <button className={classes.BtnTrainModel} onClick={this.TrainModel} type="button"> Обучить "Default Model" </button>

                 <table  className={classes.TableModels}>
              <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> Список моделей </div></td>
               <td> </td>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> 1.Default_Model </div></td>
               <td> </td>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> 2.NameModelsCore1234567 </div></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> 3.NameModelsCore1234567 </div></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
               </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> 4.NameModelsCore1234567 </div></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            </tr>
           
            </table>
                 
                 </div>
                 </div>
            </div>
        
        );
    }
}


export default ModelsCore;