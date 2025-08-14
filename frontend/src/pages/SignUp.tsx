import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/reducers/authReducer";
import type { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        register({ name, email, password, age: Number(age) })
      ).unwrap();
      alert("Registered successfully!");
      // redirect to login page or user dashboard
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom right, #38bdf8, #1e3a8a)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "3rem",
          borderRadius: "2rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          width: "25%",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "2rem",
            textAlign: "center",
            color: "#1d4ed8",
          }}
        >
          Sign Up
        </h1>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "1rem",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "1rem",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "1rem",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) =>
              setAge(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
            style={{
              padding: "0.75rem",
              borderRadius: "1rem",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.75rem",
              borderRadius: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              border: "none",
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#2563eb")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#3b82f6")
            }
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <span style={{ marginRight: "0.5rem" }}>Have an account?</span>
          <button
            onClick={() => {
              // Navigate to SignUp page, using react-router-dom
              navigate("/login");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#3b82f6",
              cursor: "pointer",
              fontWeight: "600",
              textDecoration: "underline",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
