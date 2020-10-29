import React from 'react';
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
    state = {
        inputDepth: '',
        inputLight: ''
      };
    
    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
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

  render() {
    return (
      <div className={classes.UploadPhotos}>
        <div className={classes.UploadPhotosText}>Загрузка  <button className={classes.BtnExit} onClick={this.onClose}>&#215;</button></div>
       
        <div  className={classes.FormUploadPhotos}>
        <table >
            <tr className={classes.Item}>
              <td> <div className={classes.NamePhoto}> 1.NamePhotoCore1234567 </div></td>
              <td> <label for="inputDepth" className={classes.inputDepth}> Глубина </label>
               <input type="text" onChange={this.handleChange} id="inputDepth" className={classes.inputDepth}  /></td>
               <td><label for="inputLight" className={classes.inputLight}> УФ </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="UL" />
               <label for="inputLight" className={classes.inputLight}> ДС  </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="DL" /></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            <br/>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NamePhoto}> 2.NamePhotoCore1234567 </div></td>
              <td> <label for="inputDepth" className={classes.inputDepth}> Глубина </label>
               <input type="text" onChange={this.handleChange} id="inputDepth" className={classes.inputDepth}  /></td>
               <td><label for="inputLight" className={classes.inputLight}> УФ </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="UL" />
               <label for="inputLight" className={classes.inputLight}> ДС  </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="DL" /></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            <br/>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NamePhoto}> 3.NamePhotoCore1234567 </div></td>
              <td> <label for="inputDepth" className={classes.inputDepth}> Глубина </label>
               <input type="text" onChange={this.handleChange} id="inputDepth" className={classes.inputDepth}  /></td>
               <td><label for="inputLight" className={classes.inputLight}> УФ </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="UL" />
               <label for="inputLight" className={classes.inputLight}> ДС  </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="DL" /></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            <br/>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NamePhoto}> 4.NamePhotoCore1234567 </div></td>
              <td> <label for="inputDepth" className={classes.inputDepth}> Глубина </label>
               <input type="text" onChange={this.handleChange} id="inputDepth" className={classes.inputDepth}  /></td>
               <td><label for="inputLight" className={classes.inputLight}> УФ </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="UL" />
               <label for="inputLight" className={classes.inputLight}> ДС  </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="DL" /></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            <br/>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NamePhoto}> 5.NamePhotoCore1234567 </div></td>
              <td> <label for="inputDepth" className={classes.inputDepth}> Глубина </label>
               <input type="text" onChange={this.handleChange} id="inputDepth" className={classes.inputDepth}  /></td>
               <td><label for="inputLight" className={classes.inputLight}> УФ </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="UL" />
               <label for="inputLight" className={classes.inputLight}> ДС  </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="DL" /></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            <br/>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NamePhoto}> 6.NamePhotoCore1234567 </div></td>
              <td> <label for="inputDepth" className={classes.inputDepth}> Глубина </label>
               <input type="text" onChange={this.handleChange} id="inputDepth" className={classes.inputDepth}  /></td>
               <td><label for="inputLight" className={classes.inputLight}> УФ </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="UL" />
               <label for="inputLight" className={classes.inputLight}> ДС  </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="DL" /></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            <br/>
            </tr>
            <tr className={classes.Item}>
              <td> <div className={classes.NamePhoto}> 7.NamePhotoCore1234567 </div></td>
              <td> <label for="inputDepth" className={classes.inputDepth}> Глубина </label>
               <input type="text" onChange={this.handleChange} id="inputDepth" className={classes.inputDepth}  /></td>
               <td><label for="inputLight" className={classes.inputLight}> УФ </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="UL" />
               <label for="inputLight" className={classes.inputLight}> ДС  </label>
               <input type="radio" onChange={this.handleChange} name="inputLight" className={classes.inputLight} value="DL" /></td>
               <td><button className={classes.BtnDelete}>&#215;</button></td>
            <br/>
            </tr>
        </table>
        <button className={classes.BtnSave} onClick={this.Upload} type="button"> Сохранить </button>
      </div>
     </div>
    );
  }
}

export default UploadPhotos;
