import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import cancel from "../assets/cancel.png";
import { useTokenContext } from "../contexts/TokenContext";
import "react-toastify/dist/ReactToastify.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function AddCategory() {
  const [groupList, setGroupList] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  // const [newDate, setNewDate] = useState();

  const { user, token, redirectIfDisconnected } = useTokenContext();

  useEffect(() => {
    fetch(`${backEnd}/api/groups`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          redirectIfDisconnected();
          throw Error("J'AI DIS NON!");
        } else return response.json();
      })
      .then((result) => {
        setGroupList(result);
      })
      .catch(console.error);
  }, []);

  const [dataPost, setDataPost] = useState({
    category_name: "",
    group_id: 0,
    user_id: user.id,
    image: null,
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setDataPost({
      ...dataPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataPost.category_name && dataPost.group_id) {
      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");

      const body = JSON.stringify(dataPost);

      // const formData = new FormData();
      // formData.append("post", post);
      // formData.append("picture", inputRef.current.files[0]);
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      };

      // On appelle le back. Si tous les middleware placé sur la route ci-dessous,
      // je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/categories`, requestOptions)
        .then((response) => {
          if (response.status === 401) {
            redirectIfDisconnected();
            throw Error("J'AI DIS NON!");
          } else response.json();
        })
        .then((result) => {
          console.warn("YESSS", result);
          toast.success(" Publié avec succès !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          navigate("/app");
        })
        .catch(console.error());
    } else {
      setErrorMessage("Veuillez renseigner tous les champs");
    }
  };

  return (
    <div>
      <Link to="/app">
        <img
          src={cancel}
          alt="cancel"
          className="h-14 w-14 fixed top-7 right-7"
        />
      </Link>
      <div className="min-h-full flex flex-col justify-center py-32 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto" src={logo} alt="Piggy" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Ajoutez votre catégorie
          </h2>
        </div>
        <button type="button" onClick={() => console.warn(dataPost)}>
          rthrstgfr
        </button>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="category_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <div className="mt-1">
                  <input
                    id="category_name"
                    name="category_name"
                    type="category_name"
                    value={dataPost.category_name}
                    onChange={onChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="group_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Groupe
                </label>
                <div className="mt-1">
                  <select
                    name="group_id"
                    id="group_id"
                    className="w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                    onChange={onChange}
                  >
                    <option value="0">Choisir...</option>
                    {groupList.length &&
                      groupList.map((group) => (
                        <option value={group.id} key={group.id}>
                          {group.group_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Ajouter
                </button>
              </div>
            </form>
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

export default AddCategory;
