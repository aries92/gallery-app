import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ImageUploader from "./ImageUploader";
import ImageList from "./ImageList";

const style = {
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    marginTop: "25px",
    marginLeft: "25px"
  }
};

const tabStyles = {
  height: 300,
  padding: 24
};

function ImageModal({
  setModalOpen,
  modalOpen,
  onUploadPicture,
  onUploadBlob
}) {
  const [activeTab, setActiveTab] = useState("upload");
  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        variant="contained"
        color="primary"
        size="large"
        style={style.button}
      >
        ADD IMAGE
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <AppBar position="static">
            <Tabs value={activeTab} onChange={(e, tab) => setActiveTab(tab)}>
              <Tab value="upload" label="Upload Image" />
              <Tab value="get" label="Get Image" />
            </Tabs>
          </AppBar>
          <div style={tabStyles}>
            {activeTab === "upload" && (
              <ImageUploader onUploadPicture={onUploadPicture} />
            )}

            {activeTab === "get" && <ImageList onUploadBlob={onUploadBlob} />}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ImageModal;
