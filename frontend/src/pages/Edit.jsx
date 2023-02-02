import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import cancel from "../assets/cancel.png";
import { useTokenContext } from "../contexts/TokenContext";
import "react-toastify/dist/ReactToastify.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Edit() {
  const [categoryList, setCategoryList] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [transaction, setTransaction] = useState({});
  const { token, redirectIfDisconnected } = useTokenContext();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backEnd}/api/transactions/${params.id}`, {
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
        setTransaction(result);
      })
      .catch(console.error);
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

  const onChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      transaction.amount &&
      transaction.comment &&
      transaction.user_id &&
      transaction.category_id
    ) {
      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");
      //   const newDate = transaction.date.slice(0, 10);
      //   setTransaction({
      //     ...transaction,
      //     date: newDate,
      //   });
      const body = JSON.stringify({
        id: transaction.id,
        amount: transaction.amount,
        comment: transaction.comment,
        date: transaction.date.slice(0, 10),
        user_id: transaction.user_id,
        category_id: parseInt(transaction.category_id, 10),
      });

      // const formData = new FormData();
      // formData.append("post", post);
      // formData.append("picture", inputRef.current.files[0]);
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
        redirect: "follow",
      };

      // On appelle le back. Si tous les middleware placé sur la route ci-dessous,
      // je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/transactions/${params.id}`, requestOptions)
        .then((response) => {
          if (response.status === 401) {
            redirectIfDisconnected();
            throw Error("J'AI DIS NON!");
          } else response.json();
        })
        .then((result) => {
          console.warn("YESSS", result);
          toast.success(" Modifiée avec succès !", {
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
            Modifiez votre transaction
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
                    value={transaction.amount}
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
                    value={transaction.comment}
                    onChange={onChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {transaction.date && (
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
                      value={transaction.date.slice(0, 10)}
                      onChange={onChange}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}

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
                    className="w-2/3"
                    value={transaction.category_id}
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
                  className="w-full flex justify-center py-2 px-4 my-4  border border-indigo-600 rounded-md shadow-md text-sm font-medium text-black hover:text-white bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 duration-300"
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

export default Edit;
