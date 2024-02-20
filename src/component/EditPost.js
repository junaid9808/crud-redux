import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";

export const EditPost = () => {
  const [updateData, setUpdateData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { users, isLoading } = useSelector((state) => {
    return state?.UserSlice;
  });
  useEffect(() => {
    if (id) {
      const singalData = users.filter((ele) => ele.id == id);
      setUpdateData(singalData[0]);
    }
  }, []);

  const onChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/");
  };
  console.log("dataaaa", updateData);
  return (
    <>
      <div className="   w-full mt-4 max-w-xs flex justify-center items-center flex-col m-auto ">
        <h1 className="text-3xl font-sans text-blue-600">Fill The Data</h1>
        <form
          class=" w-96 px-8 pt-6 pb-8 mb-4 bg-white shadow-2xl rounded"
          onSubmit={handleSubmit}
        >
          <div class="mb-4">
            <label
              class="block  text-sm font-bold mb-2 text-blue-600"
              for="name"
            >
              Enetr Your Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
              value={updateData && updateData.name}
              placeholder="Name"
              onChange={onChange}
            />
          </div>
          <div class="mb-3">
            <label
              class="block text-blue-600 text-sm font-bold mb-2"
              for="Email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              value={updateData && updateData.email}
              placeholder="email"
              onChange={onChange}
            />
          </div>
          <div class="mb-3">
            <label class="block text-blue-600 text-sm font-bold mb-2" for="age">
              Age
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="age"
              type="text"
              value={updateData && updateData.age}
              placeholder="email"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-row justify-center items-center mb-4">
            <div class="">
              <input
                class="form-check-input"
                name="gender"
                value="Male"
                type="radio"
                checked={updateData && updateData.gender === "Male"}
                onChange={onChange}
                required
              />
              <label class="form-check-label">Male</label>
            </div>
            <div class="ml-4">
              <input
                class="form-check-input"
                name="gender"
                value="Female"
                type="radio"
                checked={updateData && updateData.gender === "Female"}
                onChange={onChange}
              />
              <label class="form-check-label">Female</label>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
