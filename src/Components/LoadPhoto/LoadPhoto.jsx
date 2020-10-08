import React from "react";

class LoadPhoto extends React.Component {

    state = {
        file: null,
        imagePreviewUrl: null
    };


    onPhotoLoad = (e) => {
        let file = e.target.files[0];

        if (file)
            this.setState({
                file: file,
                imagePreviewUrl: URL.createObjectURL(file)
            });
        else
            this.setState({
                file: null,
                imagePreviewUrl: null
            })
    };


    render() {

        return (
            <div>
                <input type="file" accept="image/" onChange={this.onPhotoLoad}/>
                {
                    this.state.imagePreviewUrl &&
                    <div>
                        <img src={this.state.imagePreviewUrl} alt="not"/>
                    </div>

                }
            </div>
        )
    }
}

export default LoadPhoto;