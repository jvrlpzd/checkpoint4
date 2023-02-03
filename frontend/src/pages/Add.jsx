import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import cancel from "../assets/cancel.png";
import { useTokenContext } from "../contexts/TokenContext";
import "react-toastify/dist/ReactToastify.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Add() {
  const [moreOrLess, setMoreOrLess] = useState(0);
  const [categoryList, setCategoryList] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  // const [newDate, setNewDate] = useState();

  const { user, token, redirectIfDisconnected } = useTokenContext();

  const date = new Date();
  const currentDate = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2
  )}-${`0${date.getDate()}`.slice(-2)}`;

  useEffect(() => {
    fetch(`${backEnd}/api/categories`, {
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
        setCategoryList(result);
      })
      .catch(console.error);
  }, []);

  const [dataPost, setDataPost] = useState({
    amount: "",
    comment: "",
    date: currentDate,
    user_id: user.id,
    category_id: "4",
    // post_image: "",
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
    if (
      moreOrLess > 0 &&
      dataPost.amount &&
      dataPost.comment &&
      dataPost.user_id &&
      dataPost.category_id
    ) {
      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");
      if (moreOrLess === 2) {
        dataPost.amount *= -1;
      }

      const post = JSON.stringify(dataPost);

      // const formData = new FormData();
      // formData.append("post", post);
      // formData.append("picture", inputRef.current.files[0]);
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: post,
      };

      // On appelle le back. Si tous les middleware placé sur la route ci-dessous,
      // je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/transactions`, requestOptions)
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
    <div className="max-h-screen">
      <Link to="/app">
        <img
          src={cancel}
          alt="cancel"
          className="h-14 w-14 fixed top-7 right-7"
        />
      </Link>
      <div className="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto" src={logo} alt="Piggy" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Ajoutez votre transaction
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="display flex">
                {moreOrLess < 2 && (
                  <button
                    type="submit"
                    onClick={() =>
                      moreOrLess === 0 ? setMoreOrLess(1) : setMoreOrLess(0)
                    }
                    className="w-full drop-shadow-xl flex m-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-600 hover:bg-lime-800 "
                  >
                    Revenu
                  </button>
                )}
                {moreOrLess !== 1 && (
                  <button
                    type="submit"
                    onClick={() =>
                      moreOrLess === 0 ? setMoreOrLess(2) : setMoreOrLess(0)
                    }
                    className="w-full drop-shadow-xl flex m-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-800"
                  >
                    Dépense
                  </button>
                )}
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Montant
                </label>
                <div className="mt-1">
                  <input
                    id="amount"
                    name="amount"
                    type="amount"
                    value={dataPost.amount}
                    onChange={onChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <input
                    id="comment"
                    name="comment"
                    type="comment"
                    autoComplete="comment"
                    value={dataPost.comment}
                    onChange={onChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <div className="mt-1">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    autoComplete="date"
                    value={dataPost.date.slice(0, 10)}
                    onChange={onChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Catégorie
                </label>
                <div className="mt-1">
                  <select
                    name="category_id"
                    id="category_id"
                    className="w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                    onChange={onChange}
                  >
                    <option value="0">Choisir...</option>
                    {categoryList.length &&
                      categoryList.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.category_name}
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

export default Add;
