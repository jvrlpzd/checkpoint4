/* eslint-disable react/prop-types */
//
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconMenu from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import logout from "../../assets/logout.png";
import { useTokenContext } from "../../contexts/TokenContext";

function Nav({ setChangeView, changeView }) {
  const { setUser, setToken } = useTokenContext();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    setToken("");
    setUser({});
    navigate("/");
  };
  return (
    <div className="shadow-md w-full z-20 fixed top-0 left-0 right-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center 
      text-gray-800"
        >
          <Link to="/app">
            <img className="w-20 h-20 mb-2" src={logo} alt="" />
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-9 cursor-pointer md:hidden"
        >
          <img className="h-12" src={iconMenu} alt="" />
        </button>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-20 left-0  w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${
            open ? "top-30 " : "top-[-490px]"
          }`}
        >
          <ul className="md:flex items-center">
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <button
                type="button"
                onClick={() => setChangeView(true)}
                className={
                  changeView
                    ? "text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl duration-300 underline"
                    : "text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl duration-300"
                }
              >
                Historique
              </button>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <button
                type="button"
                onClick={() => setChangeView(false)}
                className={
                  !changeView
                    ? "text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl duration-300 underline"
                    : "text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl duration-300"
                }
              >
                Cat??gories
              </button>
            </li>

            <li className="md:ml-8 text-xl md:my-0 my-7">
              <button type="button" onClick={logOut}>
                <img
                  className="w-6 h-6 mr-2 md:h-10 md:w-10 md:-mb-2"
                  src={logout}
                  alt="Log out"
                />
              </button>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
