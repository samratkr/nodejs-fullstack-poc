import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/reducers/authReducer";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: "#1a73e8",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Left: Hello User */}
      <div style={{ fontSize: "1.2em", fontWeight: "500" }}>
        Hello, {user?.name || "User"}
      </div>

      {/* Right: Avatar + Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Profile Avatar */}
        <div
          onClick={() => navigate("/profile")}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            color: "#1a73e8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          {user?.name?.charAt(0) || "U"}
        </div>

        {/* Logout Button */}
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #fff",
            backgroundColor: "transparent",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
          }}
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
