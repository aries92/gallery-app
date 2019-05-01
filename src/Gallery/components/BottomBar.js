import React, { useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import GridListTileBar from "@material-ui/core/GridListTileBar";

function BottomBar({ title, name, pictureIndex, onUpdateTitle }) {
  const [newTitle, setNewTitle] = useState(title);
  const isNeedToSave = title !== newTitle;

  return (
    <GridListTileBar
      title={
        <input
          type="text"
          className="clearInput"
          value={newTitle}
          onChange={handleTitleChange}
        />
      }
      actionIcon={
        isNeedToSave && (
          <IconButton
            onClick={() => onUpdateTitle(newTitle, name, pictureIndex)}
          >
            <SaveIcon style={{ color: "#fff" }} />
          </IconButton>
        )
      }
    />
  );

  function handleTitleChange(event) {
    setNewTitle(event.target.value);
  }
}

export default BottomBar;
