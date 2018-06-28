import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class GalleryGridItemTitle extends Component {
    state = {
        title: this.props.title
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value});
    }

    render() {
        const isNeedToSave = this.props.title !== this.state.title;
        const title = this.state.title;
        const {name, pictureIndex} = this.props;

        return (
            <GridListTileBar
                title={
                    <input type="text" className="clearInput"
                           value={this.state.title}
                           onChange={this.handleTitleChange}/>
                }
                actionIcon={
                    isNeedToSave &&
                    <IconButton onClick={() => this.props.onUpdateTitle(title, name, pictureIndex)}>
                        <SaveIcon style={{color: '#fff'}}/>
                    </IconButton>
                }
            />
        );
    }
}

// GalleryGridItemTitle.propTypes = {};
// GalleryGridItemTitle.defaultProps = {};

export default GalleryGridItemTitle;
