import React from "react";
import classes from "./Canvas.module.css"
import {Colors} from "./../../Data"

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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data){
            if (this.props.data) {
                const drawing = new Image();
                drawing.src = "data:image/png;base64, " + this.props.data.mask; // can also be a remote URL e.g. http://
                drawing.onload = () => {
                    this.ctx.drawImage(drawing, 0, 0);
                    let newImgData = this.ctx.createImageData(this.props.width, this.props.height);
                    let oldImgData = this.ctx.getImageData(0, 0, this.props.width, this.props.height);
                    const colorMap = [];
                    let g = 0;
                    for (let i = 0; i < this.canvas.width * this.canvas.height; i++) {
                        let t = colorMap.find(u=>{
                            return u.r === oldImgData.data[4 * i] && u.g === oldImgData.data[4 * i + 1] && u.b === oldImgData.data[4 * i + 2];
                        });

                        if (t) {
                            newImgData.data[4 * i] = t.newR;  //red
                            newImgData.data[4 * i + 1] = t.newG;//green
                            newImgData.data[4 * i + 2] = t.newB;//blue
                            newImgData.data[4 * i + 3] = 255;//alpha
                        }else{
                            colorMap.push({
                                r:oldImgData.data[4 * i],
                                g:oldImgData.data[4 * i + 1],
                                b:oldImgData.data[4 * i + 2],
                                newR: Colors[g].r,
                                newG: Colors[g].g,
                                newB: Colors[g].b,
                                color: Colors[g].color
                            });

                            newImgData.data[4 * i] = Colors[g].r;  //red
                            newImgData.data[4 * i + 1] = Colors[g].g;//green
                            newImgData.data[4 * i + 2] = Colors[g].b;//blue
                            newImgData.data[4 * i + 3] = 255;//alpha
                            g++;
                        }
                    }
                    this.props.setColorMap(colorMap);
                    this.ctx.putImageData(newImgData, 0, 0);
                    this.props.save(this.canvas)
                };
            }

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

        let X = x - this.canvas.getBoundingClientRect().left;
        let Y = y - this.canvas.getBoundingClientRect().top;

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
        this.props.save(this.canvas)
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