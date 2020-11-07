import React from "react";
import classes from "./ModelsCore.module.css";
import  "./../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import ModelsGalleryLine from "./ModelsGalleryLine/ModelsGalleryLine";
import {connect} from "react-redux";
import {ModelAPI} from "../../API/API";
import {getModels, createModel, deleteModel} from "../../Reducers/modelReducer";


class ModelsCore extends React.Component {
    state = {
        inputNameModels: '',
        kind: 1
    };

    componentDidMount = async () => {
      // await this.props.getModels(this.props.currentUser.id);
      await this.props.getModels(this.props.currentUser.id);
    }

    changeName = (name) => {
      this.setState(state => ({
          inputNameModels: name,
          })
      )
  };

    TrainModel = async() => {
      if(this.state.inputNameModels) {
        this.refs.NameModel.value="";
        ModelAPI.createModel(false, this.state.inputNameModels, this.props.currentUser.id, false, 1)
        await this.props.getModels(this.props.currentUser.id);
      }
      else alert("Введите название модели!");
    };
      
    render() {
        return (
            <div className={classes.ModelsCore}>    
              <div className={classes.Scroll}>
                <ModelsGalleryLine/>  
                <button className={classes.DeleteAll} onClick={() => window.confirm('Вы уверены, что хотите удалить все разметки?')}>Удалить все</button>
                 {/* ДЛЯ ГЕОЛОГА*/}
                 <div className={classes.TrainContainer}>
                <label htmlFor="inputNameModels" className={classes.NameModels} > Название модели:  </label>
                <input type="text" 
                        onChange={(e)=>{
                                    this.changeName(e.target.value)
                                  }}
                        id="inputNameModels" 
                        className={classes.inputNameModels} 
                        ref="NameModel"
                        required />    
                <button className={classes.BtnTrainModel} onClick={this.TrainModel} type="button"> Обучить </button>
                 {/* ДЛЯ АДМИНА*/}
                 {/* <button className={classes.BtnTrainModel} onClick={this.TrainModel} type="button"> Обучить "Default Model" </button> */}

                 <table  className={classes.TableModels}>
                 <tbody>
              <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> Список моделей </div></td>
               <td> </td>
            </tr>
           
              <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> 1. Default_Model </div></td>
               <td> </td>
            </tr>
            {this.props.models.error ? null :  (this.props.models.map((item, index) => {
            return(
            <tr className={classes.Item}>
              <td> <div className={classes.NameModel}> {index+2}{'. '}{item.name} </div></td>
               <td><button className={classes.BtnDelete} onClick={()=>{this.props.deleteModel(item.id)}}>&#215;</button></td>
            </tr>
            );
            })) }
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
  currentUser: state.user.currentUser,
  models: state.model.models,
});

export default connect(mapStateToProps, {getModels, createModel, deleteModel})(ModelsCore);