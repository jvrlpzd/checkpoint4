import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
// import LocalStorage from "localstorage";

const TokenContext = createContext();

export default TokenContext;

export function TokenContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", {});
  const [token, setToken] = useLocalStorage("token", "");
  const [registerOk, setRegisterOk] = useState("");
  function redirectIfDisconnected() {
    localStorage.clear();
    setToken("");
    setUser({});
    navigate("/");
    toast.warn("Session expirée, veuillez-vous reconnecter !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  }

  return (
    <TokenContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        setUser,
        token,
        setToken,
        registerOk,
        setRegisterOk,
        redirectIfDisconnected,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTokenContext = () => useContext(TokenContext);
