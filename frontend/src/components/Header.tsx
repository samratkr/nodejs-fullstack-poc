import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/reducers/authReducer";
import CustomModal from "./CustomModal";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
  };

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
      <div style={{ fontSize: "1.2em", fontWeight: "500" }}>
        Hello, {user?.name || "User"}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

        {logoutModal && (
          <CustomModal
            message="Do you want to Logout?"
            onClose={() => setLogoutModal(false)}
            onOkay={() => {
              setLogoutModal(false);
              handleLogout();
            }}
          />
        )}
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
          onClick={() => setLogoutModal(true)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
