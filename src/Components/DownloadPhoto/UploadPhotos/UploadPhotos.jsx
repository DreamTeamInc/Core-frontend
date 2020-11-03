import React from "react";
import classes from "./UploadPhotos.module.css";
class UploadPhotos extends React.Component {
  // readFile = file => {
  //     let fileReader = new FileReader()

  //     return new Promise((resolve, reject) => {
  //       fileReader.onload = e => {
  //           let dataURI = e.target.result
  //           resolve(<ItemPreview src={dataURI} preview={true}/>)
  //       }

  //       fileReader.onerror = () => reject('Ошибка чтения файла')

  //       if (/^image/.test(file.type)) {
  //           fileReader.readAsDataURL(file)
  //       } else {
  //           reject('Можно загружать только изображения!')
  //       }
  //     })
  // }

  // onAddFiles = e => {
  //     const {files} = e.dataTransfer
  //     this.setState({files: [...files]})

  //     let a = [].map.call(files, file => this.readFile(file))

  //     Promise.all(a)
  //     .then(previews => this.setState({items: [...previews, ...this.state.items]}))
  //     .catch(alert)
  // }
  constructor(props) {
    super();
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

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  onClose = () => {
    this.setState({
      showComponent: false,
    });
  };

  handleDelete = (index) => {
    var arr = this.state.fileList;
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
          <span className={classes.BtnExit} onClick={this.onClose}>
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
