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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-96">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Welcome Back
        </h2>

        <input
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}