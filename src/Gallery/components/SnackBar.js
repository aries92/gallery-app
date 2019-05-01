import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function GallerySnackBar({ hideMessage, isMessageShown, message }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={isMessageShown}
      autoHideDuration={5000}
      onClose={hideMessage}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={hideMessage}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}

export default GallerySnackBar;
