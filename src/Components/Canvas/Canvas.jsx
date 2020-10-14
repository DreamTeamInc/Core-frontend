import React from "react";
import classes from "./Canvas.module.css"

class Canvas extends React.Component {

    state = {
        isDrawing: false
    };

    ctx;
    canvas;
    ref = React.createRef();

    componentDidMount() {
        const canvas = this.ref.current;
        const ctx = canvas.getContext('2d');
        this.ctx = ctx;
        this.canvas = canvas;
        if (this.props.isDraw) {
            canvas.addEventListener('mousedown', this.startDraw);
            canvas.addEventListener('mousemove', this.draw);
            canvas.addEventListener('mouseup', this.stopDraw);
            window.addEventListener('mouseup', this.stopDraw);
        }
        // canvas.width = this.props.width;
        // canvas.height = this.props.height;
        let imgData = ctx.createImageData(canvas.width, canvas.height);

        for (let i = 0; i < canvas.width * canvas.height; i++) {
            imgData.data[4 * i] = 255;  //red
            imgData.data[4 * i + 1] = 165;//green
            imgData.data[4 * i + 2] = 165;//blue
            imgData.data[4 * i + 3] = 130;//alpha
        }
        ctx.putImageData(imgData, 0, 0)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.height !== this.props.height || prevProps.width !== this.props.width){
            let imgData = this.ctx.createImageData(this.props.width, this.props.height);

            for (let i = 0; i < this.canvas.width * this.canvas.height; i++) {
                imgData.data[4 * i] = 255;  //red
                imgData.data[4 * i + 1] = 165;//green
                imgData.data[4 * i + 2] = 165;//blue
                imgData.data[4 * i + 3] = 255;//alpha
            }
            this.ctx.putImageData(imgData, 0, 0)
        }
        if (prevProps.isDraw !== this.props.isDraw){
            if (this.props.isDraw) {
                this.canvas.addEventListener('mousedown', this.startDraw);
                this.canvas.addEventListener('mousemove', this.draw);
                this.canvas.addEventListener('mouseup', this.stopDraw);
                window.addEventListener('mouseup', this.stopDraw);
            }else{
                this.canvas.removeEventListener('mousedown', this.startDraw);
                this.canvas.removeEventListener('mousemove', this.draw);
                this.canvas.removeEventListener('mouseup', this.stopDraw);
                window.removeEventListener('mouseup', this.stopDraw);
            }
        }
    }

    startDraw = (e) => {
        this.setState({isDrawing: true});
        this.draw(e);
    };

    draw = ({x, y}) => {
        if (!this.state.isDrawing) return;

        let X = x - this.canvas.offsetLeft + window.scrollX;
        let Y = y - this.canvas.offsetTop + window.scrollY;

        this.ctx.lineWidth = this.props.brush;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.props.color;

        this.ctx.lineTo(X, Y);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(X, Y)

    };

    stopDraw = (e) => {
        this.ctx.beginPath();
        this.setState({isDrawing: false});
    };


    // showArray = () => {
    //     let img_data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    //     console.log(img_data)
    // };

    render() {
        return (
            <div className={this.props.className}>
                <canvas ref={this.ref} className={classes.Canvas} width={this.props.width} height={this.props.height}>
                    Обновите браузер
                </canvas>
            </div>
        )
    }
}

export default Canvas;