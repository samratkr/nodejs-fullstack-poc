import React from "react";

const Loader: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = "#4caf50",
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: `${Math.floor(size / 10)}px solid #f3f3f3`,
          borderTop: `${Math.floor(size / 10)}px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      >
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
