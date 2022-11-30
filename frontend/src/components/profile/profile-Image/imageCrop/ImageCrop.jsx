import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";

const ImageCrop = ({
  imageSrc,
  onCrop,
  setEditorRef,
  scaleValue,
  onScaleChange,
  rotateValue,
}) => (
  <div>
    <div className="editorOverlayInner rst1">
      <div className="editorModalContent clearfix rst1">
        <div className="cropCnt rst1">
          <AvatarEditor
            image={imageSrc}
            border={0}
            scale={scaleValue / 50}
            rotate={rotateValue}
            ref={setEditorRef}
            className="rounded-circle mt-5 cropCanvas rst1"
          />
          <label htmlFor="input">size</label>
          <input
            className="profile-scale rst1"
            style={{ width: "100%" }}
            type="range"
            value={scaleValue}
            name="points"
            min="1"
            max="200"
            onChange={onScaleChange}
          />

          {/* <input
            className="profile-scale rst1"
            style={{ width: "100%" }}
            type="range"
            value={rotateValue}
            name="points"
            min="1"
            max="360"
            onChange={onScaleChange}
          /> */}

          <button onClick={onCrop} className="editorOverlayCloseBtn crpBtn ">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
);

ImageCrop.propTypes = {
  open: PropTypes.bool.isRequired,
  setEditorRef: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
  scaleValue: PropTypes.number.isRequired,
  onScaleChange: PropTypes.func.isRequired,
  rotateValue: PropTypes.number.isRequired,
  onRotateChange: PropTypes.func.isRequired,
};

export default ImageCrop;
