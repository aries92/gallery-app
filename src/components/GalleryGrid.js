import React from 'react';
// import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import CircularProgress from '@material-ui/core/CircularProgress';
import GalleryGridItem from './GalleryGridItem'


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '25px',
        overflow: 'hidden',
    }
});
const GalleryGrid = (props) => {
    const {classes} = props;

    if (props.picturesError) {
        return <div style={{textAlign: 'center'}}>pictures loading failed: {props.picturesError.message}</div>
    }
    if (!props.pictures) {
        return <div style={{textAlign: 'center'}}><CircularProgress size={50} color="secondary"/></div>
    }
    return (
        <div className={classes.root}>
            <GridList cellHeight={300} cols={4} style={{width: '100%'}}>
                {props.pictures.map((picture,index) => (
                    <GalleryGridItem
                        pictureIndex={index}
                        key={picture._id}
                        picture={picture}
                        onDeletePicture={props.onDeletePicture}
                        onUpdateTitle={props.onUpdateTitle}
                    />
                ))}
            </GridList>
        </div>
    );
};

// GalleryGrid.propTypes = {};
// GalleryGrid.defaultProps = {};
export default withStyles(styles)(GalleryGrid);
