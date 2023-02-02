/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

function Transaction({ transactions, categoryList }) {
  return (
    <div className="transaction-container flex w-full mb-40 flex-col items-center">
      <div className="transaction-container mx-4 w-full md:w-3/5 xl:w-2/5">
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
                            <p className="text-gray-400" key={category.id}>
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
      </div>
    </div>
  );
}

export default Transaction;
