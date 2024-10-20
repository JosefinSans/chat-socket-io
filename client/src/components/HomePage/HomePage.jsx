import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("id", Date.now());
    console.log("connected");
    !name ? alert("enter the name") : navigate("/rooms");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <label
          htmlFor="name"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Enter your name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          placeholder="Your name"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default HomePage;
