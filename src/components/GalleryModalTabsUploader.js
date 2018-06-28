import React from 'react';
// import PropTypes from 'prop-types';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone'

const GalleryModalTabsUploader = (props) => {
    return (
        <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={props.onUploadPicture}
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
};

// GalleryModalTabsUploader.propTypes = {};
// GalleryModalTabsUploader.defaultProps = {};

export default GalleryModalTabsUploader;
