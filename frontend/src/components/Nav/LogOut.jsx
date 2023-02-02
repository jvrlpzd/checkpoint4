import React from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";

function LogOut() {
  const navigate = useNavigate();
  const { setUser } = useTokenContext();
  const onClick = () => {
    localStorage.clear();
    setUser({});
    navigate("/home");
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:ml-4 px-4 py-2 text-white bg-[#15133C] rounded-md hover:shadow hover:bg-[#FFFFFF] hover:text-[#15133C] hover:border hover:border-[#15133C]"
    >
      Log Out
    </button>
  );
}

export default LogOut;
