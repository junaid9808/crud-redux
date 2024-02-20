import React from "react";

import { useSelector } from "react-redux";
export const SingallView = ({ id, showPOP, setShowPOP }) => {
  const allUsers = useSelector((state) => {
    return state?.UserSlice?.users;
  });
  const user = allUsers?.filter((ele) => ele.id === id);
  console.log("user", user);
  return (
    <>
      <div className="  z-50    fixed">
        <div className="bg-white shadow-2xl  rounded-3xl p-4 w-96 flex flex-col   justify-start items-center">
          <button
            className="bg-slate-600 text-white p-2"
            onClick={() => setShowPOP(false)}
          >
            close
          </button>
          <h2 className="text-4xl">{user[0].name}</h2>
          <h3 className="text-3xl">{user[0].email}</h3>
          <h4 className="text-2xl">{user[0].age}</h4>
          <p className="text-lg">{user[0].gender}</p>
        </div>
      </div>
    </>
  );
};
