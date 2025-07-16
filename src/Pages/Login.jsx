import React, { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://authentication-nu-ashen.vercel.app/api/v1/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Login successful");
        navigate("/home");
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-md rounded-md shadow-md items-center bg-white p-10"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 w-full"
          required
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 w-full"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-200 w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
        <h1 className="text-center text-blue-600 font-medium">
          Don't have an account ? <Link to="/signup">Sign up</Link>
        </h1>
      </form>
    </div>
  );
};

export default Login;
