import React from "react";
import classes from "./Segment.module.css"
import Arrow from "./../../../../assets/img/Editor/Arrow.svg"
import Close from "./../../../../assets/img/Editor/Close.svg"
import DropDown from "../../../common/DropDown/DropDown";
import {Colors, segments_value_ds} from "../../../../Data";


const Segment = (props) => {
    return (
        <div className={classes.Segment}>
            <div className={classes.Header}>

                <DropDown className={classes.DropDownColor}
                    // dropclassname={classes.Drop}
                          dropClassName={classes.DropColor}
                          childs={
                              <div className={classes.ColorContainer}>
                                  <img className={classes.Arrow} src={Arrow} alt="Arrow"/>
                                  <div className={classes.Color} style={{background: props.color}}/>
                              </div>
                          }>
                    {Colors.map(u => <div className={classes.Color}
                                          key={u.color}
                                          style={{background: u.color}}
                                          onClick={props.changeColor(props.id, u.color)}/>)}
                </DropDown>

                <div className={classes.Delete} onClick={props.deleteSegment(props.id)}>
                    <img className={classes.DeleteImg} src={Close} alt="Close"/>
                </div>
            </div>
            <div className={classes.Info}>
                <div className={classes.Name}>
                    {props.name + ": "}
                </div>
                <DropDown className={classes.Value}
                          dropclassname={classes.Drop}
                          childs={
                              <div className={classes.Value}>
                                  <img className={classes.Arrow} src={Arrow} alt="Arrow"/>
                                  {props.value}
                              </div>}>
                    {props.values.map(u => <div className={classes.DropValue}
                                                     key={u.value}
                                                     onClick={props.changeValue(props.id, u.value)}> {u.value} </div>)}
                </DropDown>
            </div>
        </div>
    )
};

export default Segment;