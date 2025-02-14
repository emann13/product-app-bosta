"use client";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./errorPage.css";

interface ErrorPageProps {
  errorType: "connection" | "generic";
}

const ErrorPage = ({ errorType }: ErrorPageProps) => {
  useEffect(() => {
    if (errorType === "connection") {
      toast.error("Connection failed. Please check your internet and try again.");
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  }, [errorType]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-page-container">
      {errorType === "connection" ? (
        <div className="error-content">
          <SignalWifiOffIcon style={{ fontSize: "5rem", color: "white" }} />
          <p>Connection issue. Please check your network and try again.</p>
        </div>
      ) : (
        <div className="error-content">
          <SentimentDissatisfiedIcon style={{ fontSize: "5rem", color: "orange" }} />
          <p>An error occurred. Please try again later.</p>
        </div>
      )}

      <Button variant="contained" color="primary" onClick={handleReload}>
        Reload
      </Button>

      <ToastContainer />
    </div>
  );
};

export default ErrorPage;
