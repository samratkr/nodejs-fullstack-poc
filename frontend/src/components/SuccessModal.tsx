import React, { useState, useEffect } from "react";
import Loader from "./Loader";

const SuccessModal: React.FC<{ message?: string; onClose?: () => void }> = ({
  message = "Saved successfully!",
  onClose,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          width: "300px",
          maxWidth: "90%",
          textAlign: "center",
          boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {loading ? (
          <Loader size={64} />
        ) : (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#4caf50",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto -10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              }}
            >
              <span
                style={{
                  fontSize: "3rem",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                ✔
              </span>
            </div>

            <div
              style={{
                marginTop: "2rem",
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {message}
            </div>

            <button
              onClick={onClose}
              style={{
                marginTop: "2rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#1a73e8",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessModal;
