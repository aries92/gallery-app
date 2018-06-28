import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GalleryModalTabsGridTile from './GalleryModalTabsGridTile';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    subheader: {
        width: '100%',
    },
});

function GalleryModalTabsGrid(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <GridList cellHeight={150} className={classes.gridList} cols={4}>
                {[...Array(8)].map((el, i) =>
                    <GalleryModalTabsGridTile
                        key={i}
                        i={i}
                        randomImage={props.handleRandomImage()}
                        onUploadBlob={props.onUploadBlob}
                    />
                )}
            </GridList>
        </div>
    );
}

GalleryModalTabsGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryModalTabsGrid);
