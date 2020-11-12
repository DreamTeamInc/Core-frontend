import React from "react";
import classes from "./UploadPhotos.module.css";


class UploadPhotos extends React.Component {
    constructor(props) {
        super(props);
        // let newList = [];
        // props.fileList.map((f) => {
        //     const str = f.file.name;
        //     let start = false;
        //     let res = "";
        //     for (let i of str) {
        //         if (i === ".") break;
        //         if (start) res += i;
        //         if (i === "_") start = true;
        //     }
        //     newList.push(res);
        //     console.log("NewList: ", newList);
        // });
        this.state = {
            fileList: props.fileList,
            inputDepth: "",
            inputLight: "",
         

        };
    }

    handleDelete = (index) => {
        let arr = this.state.fileList;
        arr.splice(index, 1);
        this.setState({fileList: arr});
    };

    renderFiles() {
        return (
            <div className={classes.FormUploadPhotos}>
                <table>
                    {" "}
                    {this.props.fileList.map(({file, id, depth}, index) => {
                        return (
                            <tbody key={index}>
                            <tr className={classes.Item}>
                                <td>
                                    {" "}
                                    <div className={classes.NamePhoto}>
                                        {" "}
                                        {index + 1}.{file.name}{" "}
                                    </div>
                                </td>
                                <td>
                                    {" "}
                                    <label htmlFor="inputDepth" className={classes.inputDepth}>
                                        {" "}
                                        Глубина{" "}
                                    </label>
                                    <input
                                        type="number"
                                        onChange={(e)=>{
                                            this.props.changeDepth(id, e.target.value)
                                        }}
                                        value={depth}
                                        id="inputDepth"
                                        className={classes.inputDepth}
                                    />
                                </td>
                                <td>
                                    <label htmlFor={index + 1} className={classes.inputLight}>
                                        {" "}
                                        УФ{" "}
                                    </label>
                                    <input
                                        type="radio"
                                        onChange={(e)=>{this.props.changeLight(id, e.target.value)}}
                                        name={index + 1}
                                        className={classes.inputLight}
                                        value="2"
                                    />
                                    <label htmlFor={index + 1} className={classes.inputLight}>
                                        {" "}
                                        ДС{" "}
                                    </label>
                                    <input
                                        type="radio"
                                        onChange={(e)=>{this.props.changeLight(id, e.target.value)}}
                                        name={index + 1}
                                        className={classes.inputLight}
                                        value="1"
                                    />
                                </td>
                                <td
                                    className={classes.BtnDelete}
                                    onClick={() => {
                                        this.props.deleteField(id);
                                    }}
                                >
                                    {" "}
                                    &#215;{" "}
                                </td>
                            </tr>
                            </tbody>
                        );
                    })}
                </table>

            </div>

        );
    }



    render() {
        return (
            <div className={classes.UploadPhotos}>
                <div className={classes.UploadPhotosText}>
                    Загрузка{" "}
                    <span className={classes.BtnExit} onClick={this.props.close}>
                         &#215;
                    </span>
                </div>
                {this.renderFiles()}
                <span onClick={this.props.submit} className={classes.BtnSave}>Загрузить</span>
            </div>
        );
    }
}

export default UploadPhotos;
