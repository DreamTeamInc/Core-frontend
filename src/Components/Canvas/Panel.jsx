import React from "react";
import DropDown from "../common/DropDown/DropDown";
import classes from "./Panel.module.css"

const Colors = [
    {color:"red"},
    {color:"black"},
    {color:"white"},
    {color:"coral"},
    {color:"yellow"},
    {color:"green"},
    {color:"pink"},
    {color:"blue"},
    {color:"purple"},
];


const Panel = (props) => {
    return (
        <div>
            <div>
                <input placeholder="BRUSH"
                       type="number"
                       value={props.brush}
                       onChange={props.onBrushChange}/>

                <DropDown className={classes.CurrentColor}
                          dropClassName={classes.Drop}
                          style={{background: props.color}}>
                    {Colors.map(u=><div className={classes.Color}
                                        style={{background: u.color}}
                                        onClick={()=>{props.onColorChange(u.color)}}/>)}
                </DropDown>
            </div>
        </div>
    )
};

export default Panel;