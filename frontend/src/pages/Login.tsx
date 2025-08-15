import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMe, login, setUser } from "../redux/reducers/authReducer";
import type { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const popup = window.open(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        "_blank",
        "width=500,height=600"
      );

      const messageListener = (event: MessageEvent) => {
        if (event.origin !== `${import.meta.env.VITE_API_URL}`) return;

        const { token, user } = event.data;
        if (token && user) {
          dispatch(setUser({ token }));
          dispatch(fetchMe(token));
          navigate("/profile");
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }
      };

      window.addEventListener("message", messageListener);

      const popupChecker = setInterval(() => {
        if (popup?.closed) {
          clearInterval(popupChecker);
          window.removeEventListener("message", messageListener);
        }
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom right, #38bdf8ff, #1e3a8a)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2.5rem",
          borderRadius: "2rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          width: "25%",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#1d4ed8", // blue-700
          }}
        >
          Welcome!!!
        </h1>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          onSubmit={handleSubmit}
        >
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
              outline: "none",
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
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#3b82f6", // blue-500
              color: "white",
              padding: "0.75rem",
              borderRadius: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
          }}
        >
          <button
            onClick={handleGoogleLogin}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
              border: "none",
              boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#1f1f1f")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "black")
            }
          >
            Sign in with Google
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <span style={{ marginRight: "0.5rem" }}>Don't have an account?</span>
          <button
            onClick={() => {
              // Navigate to SignUp page, using react-router-dom

              navigate("/signup");
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
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
