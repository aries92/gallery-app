import React, {Component} from 'react';
// import { withStyles } from '@material-ui/core/styles';
import GalleryHeader from '../components/GalleryHeader';
import GalleryGrid from '../components/GalleryGrid';
import GallerySnackBar from '../components/GallerySnackBar';
import GalleryModal from '../components/GalleryModal';
import axios from 'axios';
import api from '../utils/api';

class App extends Component {

    state = {
        pictures: null,
        picturesError: false,
        message: null,

        snackBarOpen: false,
        modalOpen: false,
        activeTab: 'upload',
        editTitle: null
    }

    componentDidMount() {
        this.onGetPictures()
    }

    render() {
        return (
            <div className="App">
                <GalleryHeader/>

                <GalleryModal
                    onUploadPicture={this.onUploadPicture}
                    onUploadBlob={this.onUploadBlob}
                    handleModal={this.handleModal}
                    modalOpen={this.state.modalOpen}
                    handleTabChange={this.handleTabChange}
                    activeTab={this.state.activeTab}
                    handleRandomImage={this.handleRandomImage}
                />

                <GalleryGrid
                    pictures={this.state.pictures}
                    picturesError={this.state.picturesError}
                    handleMessage={this.handleMessage}
                    onDeletePicture={this.onDeletePicture}
                    onUpdateTitle={this.onUpdateTitle}
                />

                <GallerySnackBar
                    snackBarOpen={this.state.snackBarOpen}
                    message={this.state.message}
                    handleSnackBarClose={this.handleSnackBarClose}/>
            </div>
        );
    }

    handleSnackBarClose = () => {
        this.setState({snackBarOpen: false})
    }

    handleMessage = (msg) => {
        if (this.state.snackBarOpen) {
            this.handleSnackBarClose()
        }
        this.setState({
            snackBarOpen: true,
            message: msg
        })
    }

    handleModal = (bool) => {
        this.setState({
            modalOpen: bool
        });
    };

    handleTabChange = (e, activeTab) => {
        this.setState({activeTab});
    }

    handleRandomImage = () => {
        const number = Math.floor(Math.random() * 1084);
        return 'https://picsum.photos/1024/800?image=' + number;
    }

    onDeletePicture = (name) => {
        const {pictures} = this.state;
        this.handleMessage("Image deleting...")
        api.delete(`/pictures/${name}`)
            .then(res => {
                const newPictures = pictures.filter(pic => pic.name !== name);
                this.setState({pictures: newPictures})
                this.handleMessage(res.data.message)
            })
            .catch(error => {
                const msg = error.response.data.message;
                this.handleMessage(msg)
            });
    }

    onUploadBlob = (url) => {
        this.handleMessage('Transforming image...')
        return axios
            .get(url, {responseType: 'blob'})
            .then(response => {
                this.handleMessage('Transforming done')
                let blob = response.data;
                let file = new File([blob], Date.now() +'.jpeg');
                let e = [file];
                this.onUploadPicture(e)
            })
            .catch(err => {
                this.handleMessage('Transforming failed, bad image')
            })
    }

    onUploadPicture = (e) => {
        let file = e[0];
        const data = new FormData();
        data.append('gallery_image', file);
        data.append('title', Math.random().toString(36).substring(4));

        this.handleMessage("Image uploading...")

        api.post('/pictures', data)
            .then(res => {
                const picture = res.data.picture;
                this.setState({
                    pictures: [picture, ...this.state.pictures]
                });
                this.handleMessage(res.data.message)
                this.handleModal(false)
            })
            .catch(error => {
                this.handleMessage('Error: '+error.response.data.message)
                this.handleModal(false)
            })
    }

    onUpdateTitle = (title, name, index) => {
        this.handleMessage('Picture title updating...')
        api.put(/pictures/+name, {title})
            .then(res=>{
                let pictures = Object.assign([], this.state.pictures);
                pictures[index] = res.data.picture;
                this.setState({pictures});
                this.handleMessage('Picture has been updated successfully')
            })
            .catch(err=>{
                const msg = err.response.data.message;
                this.handleMessage(msg)
            })

    }

    onGetPictures = () => {
        api.get('/pictures')
            .then(res => {
                this.setState({pictures: res.data.pictures})
            })
            .catch(error => {
                this.setState({picturesError: error})
            });
    }
}

export default App;
