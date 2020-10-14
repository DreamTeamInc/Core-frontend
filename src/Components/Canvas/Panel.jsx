import React from "react";


const Panel = (props) => {
    return (
        <div>
            <div>
                <input placeholder="BRUSH"
                       type="number"
                       value={props.brush}
                       onChange={props.onBrushChange}/>

                <input placeholder="color"
                       type="color"
                       value={props.color}
                       onChange={props.onColorChange}
                />
            </div>
        </div>
    )
};

export default Panel;