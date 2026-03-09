import { useState } from "react";
import { loginUser, registerUser } from "../services/api";

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {

    if (isLogin) {
      const data = await loginUser({ email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        alert("Login failed");
      }

    } else {
      const data = await registerUser({ name, email, password });

      if (data.message) {
        alert("Registration successful. Please login.");
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-96">

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Name (only for register) */}
        {!isLogin && (
          <input
            className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
          />
        )}

        {/* Email */}
        <input
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full mb-6 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span
            className="text-blue-600 cursor-pointer ml-1 font-medium"
            onClick={()=>setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

      </div>

    </div>
  );
}