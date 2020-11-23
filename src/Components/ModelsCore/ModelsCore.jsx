import React from "react";
import classes from "./ModelsCore.module.css";
import  "./../../../node_modules/slick-carousel/slick/slick.css"; 
import  "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import ModelsGalleryLine from "./ModelsGalleryLine/ModelsGalleryLine";
import Filter from "../GalleryPage/Filter/Filter";
import {shineModel} from "../../Data";
import {connect} from "react-redux";
import {ModelAPI} from "../../API/API";
import {getModels, createModel, deleteModel} from "../../Reducers/modelReducer";
import { getActiveModel } from "../../Reducers/modelReducer";



class ModelsCore extends React.Component {
    state = {
        inputNameModels: '',
        kind: 0,
        //currentLight: "Дневной свет",
       // update: false,
    };

    componentDidMount = async () => {
      await this.props.getModels(this.props.currentUser.id);
    }

    changeName = (name) => {
      this.setState(state => ({
          inputNameModels: name,
          })
      )
  };

//   onLightClick = (light) => {
//     this.setState({
//         currentLight: light,
//         update: !this.state.update,
//     });
    
// };

    TrainModel = async() => {
      if(this.state.inputNameModels) {
        this.refs.NameModel.value="";
        ModelAPI.createModel(false, this.state.inputNameModels, this.props.currentUser.id, false, 2, this.props.activeModel[0].mask_set)
        await this.props.getModels(this.props.currentUser.id);
      }
      else alert("Введите название модели!");
    };
      

    // changeUpdate = () => {
    //   this.setState({
    //     update: !this.state.update
    //   })

    // }

    render() {
        return (
            <div className={classes.ModelsCore}>  
                <div className={classes.ModelHead}>
                    <div className={classes.ModelHead__Text}>Модели</div>
                    {/* <div className={classes.Filter_Container}>
                    <div className={classes.Border} />
                    <Filter show_menu={shineModel} name="Дневной свет" currentLight={this.state.currentLight} onFilterClick={this.onLightClick} idALL="3"/>
                    <div className={classes.Border} />
                    </div>   */}
                </div>
                <div className={classes.Scroll}>

            {/* <ModelsGalleryLine   onUpdate={this.changeUpdate} update= {this.state.update} kind = {this.state.kind} currentLight={this.state.currentLight}/> */}
            <ModelsGalleryLine  />
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
            <tr className={classes.Item} key={index}>
              <td> <div className={classes.NameModel}> {index+2}{'. '}{item.name} </div></td>
               <td><button className={classes.BtnDelete} onClick={()=>{this.props.deleteModel(item.id)}}>&#215;</button></td>
            </tr>
            );
            })) }
            </tbody>
   
           
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
   activeModel: state.model.activeModel,
  
});

export default connect(mapStateToProps, {getModels, createModel, deleteModel, getActiveModel})(ModelsCore);