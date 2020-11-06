import React from "react";
import classes from "./ModelsCore.module.css";
import  "./../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import ModelsGalleryLine from "./ModelsGalleryLine/ModelsGalleryLine";
import {connect} from "react-redux";
import {getModels} from "../../Reducers/modelReducer";
import {isAuth} from "../../Reducers/userReducer";



class ModelsCore extends React.Component {
    state = {
        inputNameModels: '',
    };

    componentDidMount = async () => {
      await this.props.getModels(this.props.currentUser.id);
      
    }
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
            <tbody>
              <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> 1. Default_Model </div></td>
               <td> </td>
            </tr>
            {this.props.models.map((item, index) => {
            return(
            <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> {index+2}{'. '}{item.name} </div></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            </tr>
            );
            })}
            </tbody>
            {/* <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> 1.Default_Model </div></td>
               <td> </td>
            </tr> */}
           
           
            </table>
                 
                 </div>
                 </div>
            </div>
        
        );
    }
}


const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  currentUser: state.user.currentUser,
  models: state.model.models,
 // isFetch: state.user.isFetchUsers
});

export default connect(mapStateToProps, {getModels,isAuth})(ModelsCore);