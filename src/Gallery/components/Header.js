import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

const style = {
  header: {
    background: "linear-gradient(to right, #A354FF 0%, #d148ed 40%)"
    //background: 'linear-gradient(to left, #FE6B8B 30%, #FF8E53 90%)',
  },
  icon: {
    marginRight: "10px",
    fontSize: 36
  }
};

function Header() {
  return (
    <AppBar position="static" style={style.header}>
      <Toolbar>
        <PhotoLibraryIcon style={style.icon} />
        <Typography variant="title" color="inherit">
          Gallery app
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
