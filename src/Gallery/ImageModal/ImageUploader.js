import React from "react";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import Dropzone from "react-dropzone";

function ImageUploader({ onUploadPicture }) {
  return (
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={onUploadPicture}
      className="uploadBox"
      activeClassName="uploadBoxActive"
      acceptClassName="uploadBoxAccept"
      rejectClassName="uploadBoxReject"
    >
      <Typography variant="display1" gutterBottom>
        Upload your image
      </Typography>
      <div>
        <CloudUpload style={{ fontSize: 52 }} color="primary" />
      </div>
    </Dropzone>
  );
}

export default ImageUploader;
