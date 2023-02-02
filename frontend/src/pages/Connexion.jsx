import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTokenContext } from "../contexts/TokenContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, token, setToken, registerOk } = useTokenContext();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token.length > 1) navigate("/app");
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    if (email && password) {
      console.warn(body);
      // on appelle le back
      fetch(`${backEnd}/api/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.warn(result);
          setUser(result.user);
          setToken(result.token);
          navigate("/app");
        })

        .catch((error) => {
          setErrorMessage("Email et/ou mot de passe incorrect(s)");
          console.error(error);
        });
    } else {
      setErrorMessage("Please specify email and password");
    }
  };

  return (
    <div>
      <div className="min-h-full flex flex-col justify-center py-32 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          /> */}
          {registerOk.length > 0 && (
            <h2 className="mt-6 text-center underline text-3xl font-extrabold text-indigo-600">
              {registerOk}
            </h2>
          )}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Accédez à votre espace
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleLogin}
            >
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
                <Link to="/signUp">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    créez votre compte maintenant
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

export default Connexion;
