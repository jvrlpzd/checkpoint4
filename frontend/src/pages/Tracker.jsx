import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import plus from "../assets/plus.png";
import eyeopen from "../assets/eyeopen.png";
import eyeclose from "../assets/eyeclose.png";
import { useTokenContext } from "../contexts/TokenContext";
import Transaction from "../components/Transaction";
import Categories from "../components/Categories";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Tracker() {
  const { user, token, redirectIfDisconnected } = useTokenContext();
  const [transactions, setTransactions] = useState({});
  const [amounts, setAmounts] = useState({});
  const [changeView, setChangeView] = useState(true);
  const [categoryList, setCategoryList] = useState({});
  const [viewAmount, setViewAmount] = useState(true);

  useEffect(() => {
    fetch(`${backEnd}/api/transactions/user/${user.id}`, {
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
        setTransactions(result);
      })
      .catch(console.error);
    fetch(`${backEnd}/api/transactions/user/${user.id}/countall`, {
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
        setAmounts(result[0]);
      })
      .catch(console.error);
    fetch(`${backEnd}/api/categoriessum`, {
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

  return (
    <div className="max-w-screen truncate ">
      <Nav setChangeView={setChangeView} changeView={changeView} />
      {transactions && categoryList && (
        <div>
          <div className="flex justify-center items-center w-full">
            <h1 className="pt-32 pb-4 text-3xl drop-shadow-md font-extrabold text-gray-900 tracking-tight sm:text-4xl duration-300 my-8">
              Bienvenu <span className="text-indigo-700">{user.username}</span>{" "}
              !
            </h1>
          </div>
          {/* <button type="button" onClick={()=>console.log(categoryList)}>CATEGORY</button> */}
          <div className="transaction-container flex w-full flex-col items-center">
            <div className="bilan mb-12 mx-3 flex flex-col w-3/5  shadow-xl md:w-2/5 xl:w-1/3 rounded border border-gray-400 justify-center items-center">
              <div className=" border-b border-gray-400 h-16 w-full flex justify-between items-center">
                <p className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl duration-300 ml-2">
                  Total:{" "}
                  <span
                    className={
                      // eslint-disable-next-line no-nested-ternary
                      !viewAmount
                        ? "blur-md duration-300"
                        : amounts.total > 0
                        ? "text-lime-600 duration-300"
                        : "text-red-600 duration-300"
                    }
                  >
                    {amounts.total}
                  </span>{" "}
                  €
                </p>
                <button
                  type="button"
                  onClick={() => setViewAmount(!viewAmount)}
                >
                  <img
                    className="h-6 w-6 mr-2"
                    src={viewAmount ? `${eyeclose}` : `${eyeopen}`}
                    alt="view"
                  />
                </button>
              </div>
              <div className="flex justify-center w-full">
                <div className="border-r border-gray-400 flex h-16 w-full justify-center items-center">
                  <h2 className="text-lime-600 text-xl font-extrabold tracking-tight sm:text-2xl ">
                    <span
                      className={
                        // eslint-disable-next-line no-nested-ternary
                        !viewAmount ? "blur-md duration-300 text-gray-900" : ""
                      }
                    >
                      {" "}
                      {amounts.positive}
                    </span>{" "}
                    €
                  </h2>
                </div>
                <div className="border-l border-gray-400 flex h-16 w-full justify-center items-center">
                  <h2 className="text-red-600 text-xl font-extrabold tracking-tight sm:text-2xl">
                    <span
                      className={
                        // eslint-disable-next-line no-nested-ternary
                        !viewAmount ? "blur-md duration-300 text-gray-900" : ""
                      }
                    >
                      {" "}
                      {amounts.negative}
                    </span>{" "}
                    €
                  </h2>
                </div>
              </div>
            </div>
            {changeView ? (
              <Transaction
                transactions={transactions}
                categoryList={categoryList}
              />
            ) : (
              <Categories categoryList={categoryList} />
            )}
            {/* <div className="transaction-container mx-4 w-full md:w-3/5 xl:w-2/5">
              <ul className="flex flex-col mx-3">
                <li>
                  <div className="w-full flex h-16 justify-center items-center rounded border border-gray-400 bg-indigo-600">
                    <h1 className="text-2xl font-extrabold text-gray-50 tracking-tight sm:text-3xl duration-300 my-8">
                      Transactions
                    </h1>
                  </div>
                </li>
                {transactions.length > 0 &&
                  transactions.map((transaction) => (
                    <div key={transaction.id} className="">
                      <Link to={`/app/${transaction.id}`}>
                        <button
                          type="button"
                          className="w-full flex h-12 justify-between shadow-lg items-center rounded-lg   my-2 "
                        >
                          <div className="flex ml-2 ">
                            <h4
                              className={
                                transaction.amount <= 0
                                  ? "text-red-600 font-extrabold"
                                  : "text-lime-600 font-extrabold"
                              }
                            >
                              {transaction.amount}
                            </h4>
                          </div>

                          <div className="">
                            <h4 className="font-extrabold text-gray-900 tracking-tight">
                              {transaction.comment.length > 22
                                ? `${transaction.comment.slice(0, 23)}...`
                                : transaction.comment}
                            </h4>
                          </div>

                          <div className="mr-2 flex flex-col items-end align-center">
                            {categoryList.length > 0 &&
                              categoryList
                                .filter(
                                  (category) =>
                                    category.id === transaction.category_id
                                )
                                .map((category) => (
                                  <p
                                    className="text-gray-400"
                                    key={category.id}
                                  >
                                    {category.category_name}
                                  </p>
                                ))}

                            <p className=" text-indigo-400">
                              {transaction.date
                                .slice(5, 10)
                                .split("-")
                                .reverse()
                                .join("/")}
                            </p>
                          </div>
                        </button>
                      </Link>
                    </div>
                  ))}
              </ul>
            </div> */}
            <div>
              <Link to="/add">
                <img
                  src={plus}
                  alt="plus"
                  className="h-20 w-20 fixed bottom-5 left-5 z-10"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracker;
