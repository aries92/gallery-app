import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gallery from './containers/Gallery';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
        primary: { main: purple[400] }
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Gallery />
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
