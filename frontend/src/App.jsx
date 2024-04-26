import React, { useEffect, useState } from "react";
import axios from "axios";
import Time from "./Components/Time";
import { Link } from "react-router-dom";
const App = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitting form");
    axios
      .post(`${window.location.origin}/register`, {
        name: name,
        email: mail,
        password: pass,
      })
      .then((res) => {
        setMail("");
        setName("");
        setPass("");
      })
      .catch((err) => {
        console.error("Error during registration:", err);
      });
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center home-img">
        <Time />
        <div className="w-full h-screen flex flex-col justify-center items-center home-img">
          <h1 className="font-black text-blue-600 text-3xl font-mono">
            Register
          </h1>
          <form
            onSubmit={handleSubmit}
            method="post"
            className="w-64 h-96 flex  flex-col items-center justify-evenly "
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10  border-2 px-3 border-black"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={mail}
              required
              onChange={(e) => setMail(e.target.value)}
              className="w-full h-10 border-2 px-3 border-black"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={pass}
              required
              onChange={(e) => setPass(e.target.value)}
              className="w-full h-10 border-2 px-3 border-black"
            />
            <button
              type="submit"
              className="w-16 h-10 rounded-sm bg-blue-500 font-bold hover:bg-blue-900 text-white"
            >
              Submit
            </button>
            <Link
              className="w-full py-2 rounded-e text-center h-8 rounded-sm bg-sky-500 font-bold hover:bg-blue-900 text-white"
              to={"/search"}
            >
              Go For Search
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
