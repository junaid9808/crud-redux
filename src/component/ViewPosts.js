import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readUser } from "../store/slices/UserSlice";
import { SingallView } from "./singallView";
import { deleteUser } from "../store/slices/UserSlice";
import { Link } from "react-router-dom";
export const ViewPosts = () => {
  const [id, setId] = useState();
  const [showPOP, setShowPOP] = useState(false);
  const [radioData, setRadioData] = useState("");
  const dispatch = useDispatch();
  const { users, isLoading, searchData } = useSelector((state) => {
    return state?.UserSlice;
  });
  console.log("search", searchData);
  useEffect(() => {
    dispatch(readUser(users));
  }, []);
  console.log("selecter", users);
  if (isLoading) {
    return <h1>loading</h1>;
  }
  return (
    <>
      <div className=" flex justify-center items-center mt-12">
        {showPOP && (
          <SingallView id={id} showPOP={showPOP} setShowPOP={setShowPOP} />
        )}
      </div>
      <div className=" ">
        <h1 className="text-4xl font-sans mb-4 flex justify-center items-center">
          All Data
        </h1>
        <div className="flex flex-row justify-center items-center mb-2">
          <div class="">
            <input
              class="form-check-input"
              name="gender"
              type="radio"
              checked={radioData === ""}
              onChange={(e) => setRadioData("")}
              required
            />
            <label class="form-check-label">All</label>
          </div>
          <div class="">
            <input
              class="form-check-input"
              name="gender"
              value="Male"
              type="radio"
              checked={radioData === "Male"}
              onChange={(e) => setRadioData(e.target.value)}
              required
            />
            <label class="form-check-label">Male</label>
          </div>
          <div class="">
            <input
              class="form-check-input"
              name="gender"
              value="Female"
              type="radio"
              checked={radioData === "Female"}
              onChange={(e) => setRadioData(e.target.value)}
              required
            />
            <label class="form-check-label">Female</label>
          </div>
        </div>

        <div class="relative overflow-x-auto mx-10">
          <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  name
                </th>
                <th scope="col" class="px-6 py-3">
                  email
                </th>
                <th scope="col" class="px-6 py-3">
                  gender
                </th>
                <th scope="col" class="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users
                  .filter((ele) => {
                    if (searchData.length === 0) {
                      return ele;
                    } else {
                      return ele.name
                        .toLowerCase()
                        .includes(searchData.toLowerCase());
                    }
                  })
                  .filter((ele) => {
                    if (radioData === "Male") {
                      return ele.gender === radioData;
                    } else if (radioData === "Female") {
                      return ele.gender === radioData;
                    } else return ele;
                  })
                  .map((ele) => (
                    <tr
                      key={ele.id}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {ele.name}
                      </th>
                      <td class="px-6 py-4">{ele.email}</td>
                      <td class="px-6 py-4">{ele.gender}</td>
                      <td class="ml-16 py-4">
                        <button
                          className="p-1 text-white rounded-md bg-blue-500"
                          onClick={() => [setId(ele.id), setShowPOP(true)]}
                        >
                          View
                        </button>
                        <Link to={`/eidt/${ele.id}`}>
                          <button className="p-1 text-white rounded-md bg-red-700 ml-2">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="p-1 text-white rounded-md bg-green-700 ml-2"
                          onClick={() => dispatch(deleteUser(ele.id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
