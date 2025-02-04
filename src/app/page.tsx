"use client";

import { useState } from "react";
import { useDogStore } from "@/store/useDogStore";
import Loader from "@/components/Loader";

export default function LoginPage() {
  const { login, isLoading } = useDogStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    await login(name, email);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-100 text-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-pink-500 mb-6">
          &#x1F436; Welcome to Fetch Dog Finder &#x1F43E;
        </h1>
        <p className="text-gray-700 mb-4">Find your perfect furry companion!</p>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-full border-2 border-yellow-300 text-gray-900 mb-4 focus:ring focus:ring-yellow-300"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-full border-2 border-yellow-300 text-gray-900 mb-6 focus:ring focus:ring-yellow-300"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="h-12 flex justify-center">
          {isLoading && <Loader />}
        </div>
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-3 rounded-full transition hover:bg-green-400 shadow-md text-lg flex justify-center items-center"
        >
          &#x1F415; Start Exploring!
        </button>
      </div>
    </div>
  );
}
