import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import { useTokenContext } from "../contexts/TokenContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Tracker() {
  const { user, token, redirectIfDisconnected } = useTokenContext();
  const [transactions, setTransactions] = useState({});

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
  }, []);

  return (
    <div className="max-w-screen truncate ">
      <Nav />
      <div>
        <h1>Welcome {user.username}</h1>
        <p>{token}</p>
        <div className="transaction-container flex flex-col items-center w-full">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl duration-300 my-8">
            Transactions
          </h1>
          <div className="transaction-container mx-4 md:w-1/2">
            <ul className="flex flex-col items-start ">
              {transactions.length > 0 &&
                transactions.map((transaction) => (
                  <button
                    type="button"
                    className="w-full flex h-10 justify-between items-center rounded border border-gray-400"
                    key={transaction.id}
                  >
                    <div className="flex ">
                      <h4
                        className={
                          transaction.amount <= 0
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {transaction.amount}
                      </h4>
                    </div>
                    <div className="">
                      <h4>{transaction.comment}</h4>
                    </div>

                    <p>
                      {transaction.date
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </p>
                  </button>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracker;
