import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile/index";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  subheader: {
    width: "100%"
  }
});

function ImageList({ classes, style, onUploadBlob }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imagesList = [...Array(8)].map(() => getRandomImage());
    setImages(imagesList);
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={150} cols={4}>
        {images.map((image, i) => (
          <GridListTile key={i} cols={1} style={style}>
            <img src={image} onClick={() => onUploadBlob(image)} alt="" />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

function getRandomImage() {
  const number = Math.floor(Math.random() * 1084);
  return "https://picsum.photos/1024/800?image=" + number;
}

ImageList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageList);
