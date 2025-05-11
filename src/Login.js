import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:9192/login", {
        username,
        password,
      });

      const role = response.data;

      if (role === "admin") {
        navigate("/admin", { state: { username } });
      } else if (role === "user") {
        navigate("/user", { state: { username } });
        setError("User logged");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center vh-100">
      <div className="login-card p-4 shadow-lg rounded">
        <h2 className="text-center mb-4">QUIZ BUILDER</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              className="form-control stylish-input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="form-control stylish-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary w-100 py-2 stylish-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          {error && (
            <div className="text-danger mt-3 fade-in text-center">{error}</div>
          )}
        </form>
      </div>

      <style>{`
        .login-bg {
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-card {
          background-color: #ffffff;
          width: 100%;
          max-width: 400px;
        }
        .stylish-input {
          transition: all 0.3s ease;
        }
        .stylish-input:focus {
          border-color: #66a6ff;
          box-shadow: 0 0 5px rgba(102, 166, 255, 0.5);
        }
        .stylish-button {
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .stylish-button:hover {
          background-color: #559dff;
          transform: scale(1.03);
        }
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.5s forwards ease-in-out;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;