import axios from "axios";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const submiter = async (e) => {
    e.preventDefault();
    const value = await axios.get(
      `${window.location.origin}/search?name=${name}`
    );
    setdata(value.data);
    console.log(data);
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center bg-black items-center">
        <form
          onSubmit={submiter}
          className="w-64 h-96 flex  flex-col items-center justify-evenly "
        >
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            required
            className="w-full h-10 border-2 px-3 border-black"
          />
          <button
            type="submit"
            className="w-16 h-10 rounded-sm bg-blue-500 font-bold hover:bg-blue-900 text-white"
          >
            Search
          </button>
        </form>
        <div className="w-64 h-auto flex flex-col items-center justify-evenly bg-white">
          {data.name}
          <br />
          {data.email}
          <br />
          {data.password}
        </div>
      </div>
    </>
  );
};

export default Search;
