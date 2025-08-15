import React from "react";

const CustomModal: React.FC<{
  message?: string;
  onClose?: () => void;
  onOkay?: () => void;
}> = ({ message = "Saved successfully!", onClose, onOkay }) => {
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
        <>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10%",
              justifyContent: "center",
            }}
          >
            <button
              onClick={onClose}
              style={{
                marginTop: "2rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#ffffffff",
                color: "#f15858ff",
                border: "solid",
                borderWidth: "2px",
                borderColor: "#f15858ff",
                borderRadius: "6px",
                width: "35%",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Close
            </button>
            <button
              onClick={onOkay}
              style={{
                marginTop: "2rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#1a73e8",
                color: "#fff",
                width: "35%",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Confirm
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default CustomModal;
