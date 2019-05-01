import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import GalleryList from "./components/GalleryList";
import Snackbar from "./components/SnackBar";
import ImageModal from "./ImageModal/ImageModal";
import axios from "axios";
import api from "./utils/api";
import { useMessage } from "./context/MessageContext";

function Gallery() {
  const [pictures, setPictures] = useState(null);
  const [picturesError, setPicturesError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { isMessageShown, message, showMessage, hideMessage } = useMessage();

  useEffect(() => {
    getPictures();
  }, []);

  return (
    <>
      <Header />

      <ImageModal
        omUploadPicture={handleUploadPicture}
        onUploadBlob={handleUploadBlob}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />

      <GalleryList
        pictures={pictures}
        picturesError={picturesError}
        onDeletePicture={handleDeletePicture}
        onUpdateTitle={handleUpdateTitle}
      />

      <Snackbar
        isMessageShown={isMessageShown}
        message={message}
        hideMessage={hideMessage}
      />
    </>
  );

  async function handleDeletePicture(name) {
    showMessage("Image deleting...");
    try {
      const res = await api.delete(`/pictures/${name}`);
      const newPictures = pictures.filter(pic => pic.name !== name);
      setPictures(newPictures);
      showMessage(res.data.message);
    } catch (err) {
      const msg = err.response.data.message;
      showMessage(msg);
    }
  }

  async function handleUploadBlob(url) {
    showMessage("Transforming image...");
    try {
      const res = await axios.get(url, { responseType: "blob" });
      let blob = res.data;
      let file = new File([blob], Date.now() + ".jpeg");
      let e = [file];
      showMessage("Transforming done");
      handleUploadPicture(e);
    } catch (err) {
      showMessage("Transforming failed, bad image");
    }
  }

  async function handleUploadPicture(e) {
    let file = e[0];
    const data = new FormData();
    data.append("gallery_image", file);
    data.append(
      "title",
      Math.random()
        .toString(36)
        .substring(4)
    );

    showMessage("Image uploading...");

    try {
      const res = await api.post("/pictures", data);
      const picture = res.data.picture;
      setPictures([picture, ...pictures]);
      showMessage(res.data.message);
      setModalOpen(false);
    } catch (err) {
      showMessage("Error: " + err.response.data.message);
      setModalOpen(false);
    }
  }

  async function handleUpdateTitle(title, name, index) {
    showMessage("Picture title updating...");
    try {
      const res = await api.put(/pictures/ + name, { title });
      let newPictures = [...pictures];
      newPictures[index] = res.data.picture;
      setPictures(newPictures);
      showMessage("Picture has been updated successfully");
    } catch (err) {
      const msg = err.response.data.message;
      showMessage(msg);
    }
  }

  async function getPictures() {
    try {
      const res = await api.get("/pictures");
      setPictures(res.data.pictures);
    } catch (err) {
      console.log(err);
      setPicturesError(err);
    }
  }
}

export default Gallery;
