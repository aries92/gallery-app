import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridListTile from "@material-ui/core/GridListTile";
import DeleteForever from "@material-ui/icons/DeleteForever";
import BottomBar from "./BottomBar";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "25px",
    overflow: "hidden"
  }
});

function GalleryList({
  classes,
  picturesError,
  pictures,
  onDeletePicture,
  pictureIndex,
  onUpdateTitle
}) {
  if (picturesError) {
    return (
      <div style={{ textAlign: "center" }}>
        pictures loading failed: {picturesError.message}
      </div>
    );
  }
  if (!pictures) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={50} color="secondary" />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={4} style={{ width: "100%" }}>
        {pictures.map(picture => (
          <GridListTile key={picture._id} cols={1} className="GalleryListItem">
            <div
              onClick={() => {
                onDeletePicture(picture.name);
              }}
              className="deleteIcon"
            >
              <DeleteForever style={{ fontSize: 32 }} />
            </div>

            <img src={picture.url} alt={picture.title} />

            {picture.title && (
              <BottomBar
                pictureIndex={pictureIndex}
                title={picture.title}
                name={picture.name}
                onUpdateTitle={onUpdateTitle}
              />
            )}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(GalleryList);
