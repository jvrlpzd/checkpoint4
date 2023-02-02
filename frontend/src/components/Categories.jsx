import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTokenContext } from "../contexts/TokenContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Categories() {
  const { token, redirectIfDisconnected } = useTokenContext();

  const [groupList, setGroupList] = useState({});
  const [categoryList, setCategoryList] = useState({});

  useEffect(() => {
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

    fetch(`${backEnd}/api/groupssum`, {
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

  return (
    <div className="w-full">
      <Link to="/addCategory">
        <div className="w-full flex justify-center mb-10">
          <button
            type="submit"
            className=" flex w-1/3 md:w-1/4 xl:w-1/5 h-16 items-center justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-md font-medium text-black bg-white hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  duration-300 "
          >
            Ajouter une <br />
            catégorie
          </button>
        </div>
      </Link>
      {categoryList && groupList && (
        <div>
          <div className="transaction-container flex w-full flex-col items-center">
            <div className="transaction-container mx-4 w-full md:w-3/5 xl:w-2/5">
              <ul className="flex flex-col mx-3">
                {groupList.length > 0 &&
                  groupList.map((group) => (
                    <div key={group.id}>
                      <li>
                        <div className="w-full flex h-16 justify-between  items-center rounded border border-gray-400 bg-indigo-600 duration-300">
                          <h1 className="text-2xl ml-4 font-extrabold text-gray-50 tracking-tight sm:text-3xl duration-300 my-8">
                            {group.group_name}
                          </h1>
                          <h1 className="text-2xl mr-4 font-extrabold text-gray-50 tracking-tight sm:text-3xl duration-300 my-8">
                            {group.total_amount}
                          </h1>
                        </div>
                      </li>
                      {categoryList.length > 0 &&
                        categoryList
                          .filter((category) => category.group_id === group.id)
                          .map((category) => (
                            <div
                              key={category.id}
                              className="w-full flex h-12 justify-between shadow-lg items-center rounded-lg   my-2 "
                            >
                              <div className="flex w-full justify-between mx-8">
                                <div className="flex ml-2 ">
                                  <h1>{category.category_name}</h1>
                                </div>

                                <div className="">
                                  <h4 className="font-extrabold text-gray-900 tracking-tight">
                                    {category.total_amount}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
