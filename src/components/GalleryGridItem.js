import React from 'react';
// import PropTypes from 'prop-types';
import GridListTile from '@material-ui/core/GridListTile';
import DeleteForever from '@material-ui/icons/DeleteForever';
import GalleryGridItemTitle from './GalleryGridItemTitle';


const GalleryGridItem = (props) => {
    const {picture, style} = props;

    return (
        <GridListTile key={picture._id} cols={1} style={style} className="GalleryGridItem">
            <div onClick={() => {
                props.onDeletePicture(picture.name)
            }}
                 className="deleteIcon">
                <DeleteForever style={{fontSize: 32}}/>
            </div>

            <img src={picture.url} alt={picture.title}/>

            {picture.title &&
                <GalleryGridItemTitle
                    pictureIndex={props.pictureIndex}
                    title={picture.title}
                    name={picture.name}
                    onUpdateTitle={props.onUpdateTitle}
                />
            }
        </GridListTile>
    );
};

// GalleryGridItem.propTypes = {};
// GalleryGridItem.defaultProps = {};

export default GalleryGridItem;
