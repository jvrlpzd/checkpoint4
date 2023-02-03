import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTokenContext } from "../contexts/TokenContext";
import logo from "../assets/logo.png";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRegisterOk } = useTokenContext();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const backEnd = import.meta.env.VITE_BACKEND_URL;

  const handleRegister = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      username,
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    if (username && email && password) {
      // on appelle le back
      fetch(`${backEnd}/api/register`, requestOptions)
        .then((response) => {
          if (response.status === 201) {
            console.warn("trololo", response);
            setRegisterOk("Compte créé");
            navigate("/login");
          }
          response.json();
        })

        .catch((error) => {
          console.error(error);
        });
    } else {
      setErrorMessage("Please specify username, email and password");
    }
  };

  return (
    <div>
      <div className="min-h-full flex flex-col justify-center py-10 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <a href="/">
            <img className="mx-auto h-20 w-auto" src={logo} alt="Piggy" />
          </a>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créez votre compte
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleRegister}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Se connecter
                </button>
              </div>
            </form>

            <div className="flex relative justify-center text-sm pt-6">
              <p className="mt-2 text-center text-sm text-gray-600">
                Ou{" "}
                <Link to="/login">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    connectez-vous avec votre compte
                  </span>
                </Link>
              </p>
            </div>
            {errorMessage.length > 0 && (
              <div className="flex relative justify-center text-sm pt-6">
                <p className="mt-2 text-center text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
