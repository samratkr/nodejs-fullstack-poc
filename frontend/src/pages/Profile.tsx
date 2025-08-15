import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchMe, logout, updateUser } from "../redux/reducers/authReducer";

const API_URL = `${import.meta.env.VITE_API_URL}/api`; // replace with your backend URL

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && !user) dispatch(fetchMe(token));
  }, [token, user, dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
  });

  if (!user) return <p>Loading...</p>;

  const handleEditClick = () => {
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age || "",
    });
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const resultAction = await dispatch(
        updateUser({ id: user?._id ? user?._id : user?.id, payload: formData })
      );

      if (updateUser.fulfilled.match(resultAction)) {
        console.log("Updated user:", resultAction.payload); // ✅ payload contains updated user
        setIsEditing(false);
        // Optionally update Redux store here if needed
      } else {
        console.error(
          "Update failed:",
          resultAction.payload || resultAction.error.message
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      await axios.delete(`${API_URL}/${user._id ? user?._id : user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(logout());
    } catch (err: any) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "96vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "system-ui, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "50%",
          maxWidth: "40%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Edit / Update */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {!isEditing ? (
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #1a73e8",
                backgroundColor: "#1a73e8",
                color: "#fff",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={handleEditClick}
            >
              Edit
            </button>
          ) : (
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #1a73e8",
                backgroundColor: "#1a73e8",
                color: "#fff",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={handleUpdate}
            >
              Update
            </button>
          )}
        </div>

        {!isEditing ? (
          <>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h1
                style={{
                  marginBottom: "10px",
                  fontSize: "1.8em",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {user.name}
              </h1>
              <p style={{ margin: "6px 0" }}>
                <strong>Email:</strong> {user.email}
              </p>
              {user.age && (
                <p style={{ margin: "6px 0" }}>
                  <strong>Age:</strong> {user.age}
                </p>
              )}
            </div>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <button
                style={{
                  padding: "10px 0",
                  borderRadius: "8px",
                  border: "1px solid #d32f2f",
                  backgroundColor: "#fff",
                  color: "#d32f2f",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
