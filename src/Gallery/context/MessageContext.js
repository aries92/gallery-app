import React, { createContext, useContext, useReducer } from "react";

const MessageContext = createContext(null);

const initialState = {
  message: "",
  isMessageShown: false
};

function messageReducer(state, { type, message }) {
  switch (type) {
    case "SHOW_MESSAGE":
      return {
        isMessageShown: true,
        message
      };
    case "HIDE_MESSAGE":
      return {
        isMessageShown: false,
        message: ""
      };
    default:
      throw new Error();
  }
}

export function MessageProvider({ children }) {
  const contextValue = useReducer(messageReducer, initialState);
  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const [{ isMessageShown, message }, dispatch] = useContext(MessageContext);

  function hideMessage() {
    dispatch({ type: "HIDE_MESSAGE" });
  }

  function showMessage(message) {
    dispatch({ type: "SHOW_MESSAGE", message });
  }

  return {
    isMessageShown,
    message,
    hideMessage,
    showMessage
  };
}
