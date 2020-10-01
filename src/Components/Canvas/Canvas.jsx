import React from "react";
import classes from "./Canvas.module.css"

class Canvas extends React.Component {

    state = {
        isDrawing: false
    };


    componentDidMount() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        canvas.addEventListener('mousedown', this.startDraw(ctx, canvas));
        canvas.addEventListener('mousemove', this.draw(ctx, canvas));
        canvas.addEventListener('mouseup', this.stopDraw(ctx, canvas));
        canvas.height = 500;
        canvas.width = 1000;
    }

    startDraw =(ctx, canvas) => (e) => {
        this.setState({isDrawing: true});
        console.log(e);
        this.draw(ctx, canvas)(e);
    };

    draw = (ctx, canvas) => ({x, y}) => {
        if (!this.state.isDrawing) return;

        let X = x - canvas.offsetLeft + window.scrollX;
        let Y = y - canvas.offsetTop + window.scrollY;

        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#171717";

        ctx.lineTo(X, Y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(X, Y)

    };

    stopDraw =(ctx, canvas)=> (e) => {
        ctx.beginPath();
        this.setState({isDrawing: false});
    };

    render() {
        return (

            <div>
                <canvas className={classes.Canvas}>
                    Обновите браузер
                </canvas>
            </div>
        )
    }
}

export default Canvas;