import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";

const ImageCrop = ({
  imageSrc,
  onCrop,
  setEditorRef,
  scaleValue,
  onScaleChange,
}) => (
  <div>
    <div className="editorOverlayInner rst1">
      <div className="editorModalContent clearfix rst1">
        <div className="cropCnt rst1">
          <AvatarEditor
            image={imageSrc}
            border={50}
            scale={scaleValue}
            rotate={0}
            ref={setEditorRef}
            className="rounded-circle mt-5 cropCanvas rst1"
          />
          <input
            className="rst1"
            style={{ width: "100%" }}
            type="range"
            value={scaleValue}
            name="points"
            min="1"
            max="10"
            onChange={onScaleChange}
          />
          {console.log(onScaleChange)}
          <button
            onClick={onCrop}
            className="editorOverlayCloseBtn crpBtn rst1"
          >
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
};

export default ImageCrop;
