import React from "react";
import classes from "./ModelsCore.module.css";
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import ModelsGalleryLine from "./ModelsGalleryLine/ModelsGalleryLine";
import {connect} from "react-redux";

import {createModel, deleteMasksAll, deleteModel, getModels, trainModel} from "../../Reducers/modelReducer";
import {confirmAlert} from 'react-confirm-alert';
import '../ViewUsers/UsersList/UsersData/Confirm.css';


class ModelsCore extends React.Component {
    state = {
        inputNameModels: '',
        kind: 0,
        isFetching: false
        // currentLight: "Дневной свет",
        // update: false,
    };

    componentDidMount = async () => {
        await this.props.getModels(this.props.currentUser.id);
    };

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


    handleDelete = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Вы уверены, что хотите удалить все разметки?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteMasksAll(this.props.currentUser.id)
                },
                {
                    label: 'No'
                }
            ]
        });

    };

    TrainModel = async () => {
        if (this.state.inputNameModels) {
            this.refs.NameModel.value = "";
            this.setState({isFetching:true});
            await this.props.trainModel(this.props.currentUser.id, this.state.inputNameModels);
            await this.props.getModels(this.props.currentUser.id);
            this.setState({isFetching:false});
        } else alert("Введите название модели!");
    };
    TrainDefaultModel = async () => {
        // ModelAPI.createModel(false, this.state.inputNameModels, this.props.currentUser.id, false, 2, this.props.activeModel[0].mask_set)
        this.setState({isFetching:true});
        await this.props.getModels(this.props.currentUser.id);
        this.setState({isFetching:false});
    };


    // changeUpdate = () => {
    //   this.setState({
    //     update: !this.state.update
    //   })

    // }

    render() {
        let i = 0;
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
                    <ModelsGalleryLine/>
                    <button className={classes.DeleteAll} onClick={this.handleDelete}>Удалить все</button>

                    {/* ДЛЯ ГЕОЛОГА*/}
                    <div className={classes.TrainContainer}>
                        {!this.props.currentUser.is_su ? <div>
                                <label htmlFor="inputNameModels" className={classes.NameModels}> Название модели: </label>
                                <input type="text"
                                       onChange={(e) => {
                                           this.changeName(e.target.value)
                                       }}
                                       id="inputNameModels"
                                       className={classes.inputNameModels}
                                       ref="NameModel"
                                       required/>
                                <button className={classes.BtnTrainModel}
                                        onClick={this.TrainModel}
                                        type="button"> Обучить
                                </button>
                            </div>
                            : <button className={classes.BtnTrainModel} onClick={this.TrainDefaultModel}
                                      type="button"> Обучить "Default Model" </button>
                        }
                        {this.state.isFetching && <div>Loading...</div>}

                        <table className={classes.TableModels}>
                            <tbody>
                            <tr className={classes.Item}>
                                <td>
                                    <div className={classes.NameModel}> Список моделей</div>
                                </td>
                                <td></td>
                            </tr>

                            {this.props.models.error ? null : (this.props.models.map((item, index) => {
                                i++;
                                return (
                                    <tr className={classes.Item} key={index}>
                                        {!item.is_active &&
                                        <>
                                            <td>
                                                <div className={classes.NameModel}> {i}{'. '}{item.name} </div>
                                            </td>
                                            <td>
                                                {!item.is_default &&
                                                <button className={classes.BtnDelete} onClick={() => {
                                                    this.props.deleteModel(item.id)
                                                }}>&#215;</button>}
                                            </td>
                                        </>}
                                    </tr>
                                );
                            }))}
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
});

export default connect(mapStateToProps, {
    getModels,
    createModel,
    deleteModel,
    deleteMasksAll,
    trainModel
})(ModelsCore);