import React from 'react';
// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FileUpload from '@material-ui/icons/FileUpload';
import GalleryModalTabs from './GalleryModalTabs';

const style = {
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginTop: '25px',
        marginLeft: '25px'
    }
}

const GalleryModal = (props) => {
    return (
        <div>
            <Button onClick={()=>props.handleModal(true)} variant="raised" color="primary" size="large" style={style.button}>
                ADD IMAGE <FileUpload/>
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={props.modalOpen}
                onClose={()=>props.handleModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <GalleryModalTabs
                    onUploadPicture={props.onUploadPicture}
                    onUploadBlob={props.onUploadBlob}
                    handleTabChange={props.handleTabChange}
                    activeTab={props.activeTab}
                    handleRandomImage={props.handleRandomImage}
                />
            </Dialog>
        </div>
    )
}

// GalleryModal.propTypes = {};
// GalleryModal.defaultProps = {};

export default GalleryModal;
