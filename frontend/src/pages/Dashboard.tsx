import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, logout } from "../redux/reducers/authReducer";
import type { RootState, AppDispatch } from "../redux/store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && !user) dispatch(fetchMe(token));
  }, [token, user, dispatch]);

  const containerStyle: React.CSSProperties = {
    height: "80vh",
    width: "96vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: "20px",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "16px",
    width: "33%",
    padding: "24px",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "24px",
  };

  const infoBoxStyle: React.CSSProperties = {
    backgroundColor: "#eff6ff",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    color: "#374151",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    fontWeight: 600,
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#dc2626",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Dashboard</h1>

        {user ? (
          <>
            <div style={infoBoxStyle}>
              <p>
                <span style={labelStyle}>Name:</span> {user.name}
              </p>
              <p>
                <span style={labelStyle}>Email:</span> {user.email}
              </p>
              <p>
                <span style={labelStyle}>Age:</span> {user.age}
              </p>
            </div>

            <button
              style={buttonStyle}
              onMouseOver={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  buttonHoverStyle.backgroundColor!)
              }
              onMouseOut={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  buttonStyle.backgroundColor!)
              }
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#6b7280" }}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
