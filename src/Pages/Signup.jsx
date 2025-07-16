import React, { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!userName || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://authentication-nu-ashen.vercel.app/api/v1/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, email, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast(data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        toast.error(data.message || "Signup failed");
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
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-10 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

        <input
          ref={nameRef}
          required
          type="text"
          placeholder="Full Name"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 w-full"
        />

        <input
          ref={emailRef}
          required
          type="email"
          placeholder="Email"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 w-full"
        />

        <input
          ref={passwordRef}
          required
          type="password"
          placeholder="Password"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-200 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 className="animate-spin w-4 h-4" />
              Signing up...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
        <h1 className="text-center text-blue-600 font-medium">
          Already have an account ? <Link to="/">Login</Link>
        </h1>
      </form>
    </div>
  );
};

export default Signup;
