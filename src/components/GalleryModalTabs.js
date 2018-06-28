import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import GalleryModalTabsUploader from './GalleryModalTabsUploader.js';
import GalleryModalTabsGrid from './GalleryModalTabsGrid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
});

const GalleyModalTabs = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={props.activeTab} onChange={props.handleTabChange}>
                    <Tab value="upload" label="Upload Image"/>
                    <Tab value="get" label="Get Image"/>
                </Tabs>
            </AppBar>

            {props.activeTab === 'upload' &&
                <TabContainer>
                    <GalleryModalTabsUploader
                        onUploadPicture={props.onUploadPicture}
                    />
                </TabContainer>
            }

            {props.activeTab === 'get' &&
                <TabContainer>
                    <GalleryModalTabsGrid
                        onUploadBlob={props.onUploadBlob}
                        handleRandomImage={props.handleRandomImage}
                    />
                </TabContainer>
            }
        </div>
    );

}


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3, height: '300px'}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


export default withStyles(styles)(GalleyModalTabs);