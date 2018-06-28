import React from 'react';
import GridListTile from "@material-ui/core/GridListTile/index";
//import PropTypes from 'prop-types';

const GalleryModalTabsGridTile = (props) => {
    return (
        <GridListTile key={props.i} cols={1} style={props.style}>
            <img src={props.randomImage}
                 onClick={()=>props.onUploadBlob(props.randomImage)}
                 alt=""
            />
        </GridListTile>
    );
};

// GalleryModalTabsGridTile.propTypes = {};
// GalleryModalTabsGridTile.defaultProps = {};

export default GalleryModalTabsGridTile;
