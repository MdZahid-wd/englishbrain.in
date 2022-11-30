import React, { Component } from "react";
import ImageCrop from "./imageCrop/ImageCrop";
import axios from "axios";
class ProfileImage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userProfilePic: "",
      editor: null,
      scaleValue: 50,
      rotateValue: 0,
    };
  }

  setEditorRef = (editor) => this.setState({ editor });

  onCrop = async () => {
    const { editor } = this.state;
    if (editor !== null) {
      const url = await editor.getImageScaledToCanvas().toDataURL();

      //sending profile pic//////////////////
      try {
        console.log(url, "before sending");
        const { data } = await axios.post("/api/profilePicUpdate", {
          url: url,
        });
        console.log(data, "after setting profile pic");
        if (data.acknowledged == true) {
          console.log("dashboard change time");
          document.getElementById("dashboard-button").click();
        }
      } catch (e) {
        console.log(e, "during sending login form ");
      }
      //sending profile pic//////////////////

      this.setState({ userProfilePic: url });
    }
  };
  onRotateChange = (scaleChangeEvent) => {
    // const scaleValue = parseFloat(scaleChangeEvent.target.value);
    // this.setState({ scaleValue });
  };
  onScaleChange = (scaleChangeEvent) => {
    const scaleValue = parseFloat(scaleChangeEvent.target.value);
    this.setState({ scaleValue });
  };

  DataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  profilePicChange = (fileChangeEvent) => {
    const file = fileChangeEvent.target.files[0];
    const { type } = file;
    if (
      !(
        type.endsWith("jpeg") ||
        type.endsWith("png") ||
        type.endsWith("jpg") ||
        type.endsWith("gif")
      )
    ) {
    } else {
      this.setState({
        openCropper: true,
        selectedImage: fileChangeEvent.target.files[0],
        fileUploadErrors: [],
      });
    }
  };
  render() {
    return (
      <div className="App rst1">
        <div id="update-image">
          <input
            type="file"
            accept="image/*"
            name="profilePicBtn"
            className="custome-file-input rst1"
            onChange={this.profilePicChange}
            required
          ></input>
          <label for="file" className="form-label chooseFile-label rst1">
            edit image
          </label>
        </div>

        <ImageCrop
          imageSrc={this.state.selectedImage}
          setEditorRef={this.setEditorRef}
          onCrop={this.onCrop}
          scaleValue={this.state.scaleValue}
          onScaleChange={this.onScaleChange}
          rotateValue={this.state.rotateValue}
          onRotateChange={this.onRotateChange}
        />
      </div>
    );
  }
}

export default ProfileImage;
