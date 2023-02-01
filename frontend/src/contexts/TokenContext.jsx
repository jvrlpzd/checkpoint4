import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
// import LocalStorage from "localstorage";

const TokenContext = createContext();

export default TokenContext;

export function TokenContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ user, setUser, token, setToken }}
    >
      {children}
    </TokenContext.Provider>
  );
}

TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTokenContext = () => useContext(TokenContext);
