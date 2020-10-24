import React from "react";
import DropDown from "../common/DropDown/DropDown";
import classes from "./Panel.module.css"
import {Colors} from "./../../Data"

const Panel = (props) => {
    return (
        <div>
            <div className={classes.ContainerBrush}>
                <div className={classes.Size__Text}>Размер</div><input className={classes.Brush}
                       placeholder="BRUSH"
                       type="number"
                       value={props.brush}
                       onChange={props.onBrushChange}/>

                <div className={classes.Size__Text}>Цвет</div>
                <DropDown dropClassName={classes.Drop} className={classes.DropColor}
                          childs={<div className={classes.CurrentColor}
                                       style={{background: props.color}}/>}>

                    {Colors.map(u => <div className={classes.Color}
                                          key={u.color}
                                          style={{background: u.color}}
                                          onClick={() => {
                                              props.onColorChange(u.color)
                                          }}/>)}
                </DropDown>
            </div>
        </div>
    )
};

export default Panel;