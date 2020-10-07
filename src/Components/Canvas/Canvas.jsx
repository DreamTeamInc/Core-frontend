import React from "react";
import classes from "./Canvas.module.css"

class Canvas extends React.Component {

    state = {
        isDrawing: false,
        brush: 4,
        color: "#FFFFFF"
    };

    ctx;
    canvas;

    componentDidMount() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        this.ctx = ctx;
        this.canvas = canvas;
        canvas.addEventListener('mousedown', this.startDraw);
        canvas.addEventListener('mousemove', this.draw);
        canvas.addEventListener('mouseup', this.stopDraw);
        canvas.width = 1340;
        canvas.height = 700;
        let imgData = ctx.createImageData(canvas.width, canvas.height);

        for (let i = 0; i < canvas.width * canvas.height; i++) {
            imgData.data[4 * i] = 255;  //red
            imgData.data[4 * i + 1] = 165;//green
            imgData.data[4 * i + 2] = 165;//blue
            imgData.data[4 * i + 3] = 255;//alpha
        }
        ctx.putImageData(imgData, 0, 0)
    }

    startDraw = (e) => {
        this.setState({isDrawing: true});
        this.draw(e);
    };

    draw = ({x, y}) => {
        if (!this.state.isDrawing) return;

        let X = x - this.canvas.offsetLeft + window.scrollX;
        let Y = y - this.canvas.offsetTop + window.scrollY;

        this.ctx.lineWidth = this.state.brush;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.state.color;

        this.ctx.lineTo(X, Y);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(X, Y)

    };

    stopDraw = (e) => {
        this.ctx.beginPath();
        this.setState({isDrawing: false});
    };


    showArray = () => {
        let img_data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        console.log(img_data)
    };

    render() {
        return (

            <div>
                <canvas className={classes.Canvas}>
                    Обновите браузер
                </canvas>
                <div>
                    <input placeholder="BRUSH"
                           type="number"
                           value={this.state.brush}
                           onChange={(e) => {
                               this.setState({brush: e.currentTarget.value})
                           }}/>

                    <input placeholder="color"
                           type="color"
                           value={this.state.color}
                           onChange={(e) => {
                               this.setState({color: e.currentTarget.value})
                           }}
                    />
                </div>
                <div>
                    <span className={classes.Button} onClick={this.showArray}>
                        показать массив
                    </span>
                </div>
            </div>
        )
    }
}

export default Canvas;