import React from 'react';
// import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const GallerySnackBar = (props) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={props.snackBarOpen}
            autoHideDuration={5000}
            onClose={props.handleSnackBarClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{props.message}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={props.handleSnackBarClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );
};

// GallerySnackBar.propTypes = {};
// GallerySnackBar.defaultProps = {};

export default GallerySnackBar;
