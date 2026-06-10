import React, { useState, useRef, useEffect } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.svg";
import CancelButtonModal from "../common/button/CancelButtonModal";
import { verifyOtp } from "../../services/login/LoginServices";
import { errorAlert, successAlert } from "../common/toast/CustomToast";
import { useLoader } from "../common/commonLoader/LoaderContext";

const OTPVerificationModal = ({
  open,
  handleClose,
  onVerify,
  handleResend,
  emailFromResend,
  setOtpEmailForVerification,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const { setIsLoading } = useLoader();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(data)) return;

    const newOtp = [...otp];
    data.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    const focusIndex = Math.min(data.length, 5);
    inputRefs[focusIndex].current.focus();
  };

const handleInternalResend = () => {
  if (canResend) {
    if (handleResend) {
      handleResend(emailFromResend);
    }
    setTimer(30);
    setCanResend(false);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some((d) => d === "")) {
      errorAlert("Please enter the complete OTP");
      return;
    }
    handleVerifyOtp();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };


  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      errorAlert("Please enter a valid 6-digit OTP");
      return;
    }

    let tempObj = {
      email: emailFromResend,
      otp: otpString,
    };

    setIsLoading(true);
    setOtpEmailForVerification(otpString);
    verifyOtp(tempObj)
      .then((res) => {
        if (res.status === 200) {
          successAlert(res.data?.message || "OTP Verified Successfully");
          if (onVerify) {
            onVerify(otpString);
          }
        } else {
          errorAlert(res.data?.message || "Invalid OTP");
        }
        setOtp("");
      })
      .catch((err) => {
        console.error("verifyOtp", err);
        errorAlert(err?.response?.data?.message || "Invalid OTP");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      open={open}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-[340px] mx-4 outline-none"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-[0.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.12)] overflow-hidden relative border border-white/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/40 to-lime-100/40 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-lime-100/40 to-green-100/40 rounded-full -ml-16 -mb-16 blur-2xl" />

              <div className="p-3 relative z-10">
                <CancelButtonModal
                  onClick={() => {
                    handleClose();
                    setOtp("");
                  }}
                />

                <div className="flex flex-col items-center text-center mb-3 mt-2">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="mb-1"
                  >
                    <img
                      src={SwagramaLogo}
                      alt="Swagrama Logo"
                      className="h-24 w-auto"
                    />
                  </motion.div>

                  <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-1">
                    Verify Your Account
                  </h2>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-[220px]">
                    Enter the code sent to
                    <span className="block font-semibold text-green-600 mt-0.5 text-sm">
                      {emailFromResend}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex justify-between gap-2 px-1">
                    {otp.map((digit, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex-1"
                      >
                        <input
                          ref={inputRefs[index]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className="w-full aspect-square text-center text-xl font-bold text-gray-800 bg-white border border-gray-200 rounded-[9px] shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all duration-300 outline-none"
                          autoFocus={index === 0}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    {timer > 0 ? (
                      <p className="text-[11px] font-medium text-gray-500">
                        Resend code in{" "}
                        <span className="font-bold text-green-600">
                          {timer}s
                        </span>
                      </p>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleInternalResend}
                        className="text-[11px] font-bold text-green-600 hover:text-green-700 transition-all underline underline-offset-2"
                      >
                        Resend Code
                      </motion.button>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      disabled={otp.some((d) => d === "")}
                      sx={{
                        py: 1.2,
                        borderRadius: "9px",
                        background:
                          "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                        color: "white",
                        textTransform: "none",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        boxShadow: "0 10px 20px rgba(34, 197, 94, 0.25)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #16a34a 0%, #65a30d 100%)",
                          boxShadow: "0 12px 24px rgba(34, 197, 94, 0.3)",
                          transform: "translateY(-1px)",
                        },
                        "&:active": {
                          transform: "translateY(0px)",
                        },
                        "&:disabled": {
                          background: "#f1f5f9",
                          color: "#cbd5e1",
                          boxShadow: "none",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Verify & Proceed
                    </Button>
                  </div>
                </form>

                <div className="mt-3 text-center">
                  <div className="w-8 h-0.5 bg-gray-100 mx-auto rounded-full mb-3" />
                  <p className="text-[9px] uppercase tracking-widest font-semibold text-gray-400">
                    Secure Verification
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default OTPVerificationModal;
