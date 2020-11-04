import React from "react";
import classes from "./UploadPhotos.module.css";
class UploadPhotos extends React.Component {
  constructor(props) {
    super(props);
    let newList = [];
    props.fileList.map((file) => {
      const str = file.name;
      let start = false;
      let res = "";
      for (let i of str) {
        if (i === ".") break;
        if (start) res += i;
        if (i === "_") start = true;
      }
      newList.push(res);
      console.log("NewList: ", newList);
    });
    this.state = {
      fileList: props.fileList,
      inputDepth: "",
      inputLight: "",
      depthList: newList,
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleDelete = (index) => {
    let arr = this.state.fileList;
    arr.splice(index, 1);
    let newDepth = this.state.depthList;
    newDepth.splice(index, 1);
    this.setState({ fileList: arr , depthList: newDepth});
  };

  renderFiles() {
    return (
      <div className={classes.FormUploadPhotos}>
        <table>
          {" "}
          {this.props.fileList.map((file, index) => {
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
                    type="text"
                    placeholder={this.state.depthList[index]}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    name={index + 1}
                    className={classes.inputLight}
                    value="UL"
                  />
                  <label htmlFor={index + 1} className={classes.inputLight}>
                    {" "}
                    ДС{" "}
                  </label>
                  <input
                    type="radio"
                    onChange={this.handleChange}
                    name={index + 1}
                    className={classes.inputLight}
                    value="DL"
                  />
                </td>
                <td
                  className={classes.BtnDelete}
                  onClick={() => {
                    this.handleDelete(index);
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
        <button className={classes.BtnSave}>Загрузить</button>
      </div>
    );
  }
}

export default UploadPhotos;
