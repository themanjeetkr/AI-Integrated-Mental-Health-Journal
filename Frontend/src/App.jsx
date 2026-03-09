import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) return <Login setToken={setToken} />;

  return <Dashboard token={token} setToken={setToken} />;
}