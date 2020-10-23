// import React from 'react';
// import classes from "./UploadPhotos.module.css";

// class UploadPhotos extends React.Component {
//     readFile = file => {
//         let fileReader = new FileReader()
    
//         return new Promise((resolve, reject) => {
//           fileReader.onload = e => {
//               let dataURI = e.target.result
//               resolve(<ItemPreview src={dataURI} preview={true}/>)
//           }
    
//           fileReader.onerror = () => reject('Ошибка чтения файла')
    
//           if (/^image/.test(file.type)) {
//               fileReader.readAsDataURL(file)
//           } else {
//               reject('Можно загружать только изображения!')
//           }
//         })
//     }
    
//     onAddFiles = e => {
//         const {files} = e.dataTransfer
//         this.setState({files: [...files]})
    
//         let a = [].map.call(files, file => this.readFile(file))
    
//         Promise.all(a)
//         .then(previews => this.setState({items: [...previews, ...this.state.items]}))
//         .catch(alert)
//     }

//   render() {
//     return (
//       <div className={classes.UploadPhotos}>
//         <div className={classes.UploadPhotosText}>Вход</div>
//         <div  className={classes.FormUploadPhotos}>

//         <button className={classes.BtnSignIn} onClick={this.signIn} type="button"> Войти </button>
//       </div>
//      </div>
//     );
//   }
// }

// export default UploadPhotos;
