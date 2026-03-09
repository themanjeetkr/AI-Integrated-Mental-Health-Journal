import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login({ setToken }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await loginUser({ email, password });

    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-2xl p-10 w-96">

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Welcome Back
        </h2>

        <input
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Login
        </button>

      </div>

    </div>
  );
}