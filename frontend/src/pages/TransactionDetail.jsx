import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import cancel from "../assets/cancel.png";
import { useTokenContext } from "../contexts/TokenContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function TransactionDetail() {
  const { token, redirectIfDisconnected } = useTokenContext();
  const [transaction, setTransaction] = useState({});
  const [categoryList, setCategoryList] = useState({});
  const [confirm, setConfirm] = useState(false);

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

  const handleDeleteTransaction = (transactionId) => {
    fetch(`${backEnd}/api/transactions/${transactionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          redirectIfDisconnected();
          throw Error("J'AI DIS NON!");
        } else {
          toast.success("Transaction Supprimée !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          });
          navigate("/app");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {transaction && categoryList.length && (
        <>
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
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label
                      htmlFor="amount"
                      className="block underline text-sm font-medium text-gray-700"
                    >
                      Montant
                    </label>
                    <div className="mt-1">
                      <h1 className="text-xl font-extrabold text-gray-900 tracking-tight sm:text-2xl duration-300">
                        {transaction.amount}
                      </h1>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="comment"
                      className="block underline text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <h1 className="text-xl font-extrabold text-gray-900 tracking-tight sm:text-2xl duration-300">
                        {transaction.comment}
                      </h1>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block underline text-sm font-medium text-gray-700"
                    >
                      Catégorie
                    </label>
                    <div className="mt-1">
                      {categoryList
                        .filter(
                          (category) => category.id === transaction.category_id
                        )
                        .map((category) => (
                          <h1
                            key={category.id}
                            className="text-xl font-extrabold text-gray-900 tracking-tight sm:text-2xl duration-300"
                          >
                            {category.category_name}
                          </h1>
                        ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block underline text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <div className="mt-1">
                      <h1 className="text-xl font-extrabold text-gray-900 tracking-tight sm:text-2xl duration-300">
                        {transaction.date &&
                          transaction.date
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                      </h1>
                    </div>
                  </div>

                  <div>
                    <Link to={`/app/${transaction.id}/edit`}>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 my-4  border border-indigo-600 rounded-md shadow-md text-sm font-medium text-black hover:text-white bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 duration-300"
                      >
                        Modifier
                      </button>
                    </Link>
                    {!confirm ? (
                      <button
                        type="submit"
                        onClick={() => setConfirm(true)}
                        className="w-full flex justify-center py-2 px-4 my-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 duration-300"
                      >
                        Supprimer
                      </button>
                    ) : (
                      <div>
                        <h2 className="block underline text-xl w-full text-center font-medium text-gray-700">
                          Vous êtes sûr ?
                        </h2>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteTransaction(transaction.id)
                          }
                          className="w-full flex justify-center py-2 px-4 my-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          YES
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionDetail;
