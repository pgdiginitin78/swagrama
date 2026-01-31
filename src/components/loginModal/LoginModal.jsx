import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Close,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.png";
import SignUpModal from "./SignUpModal";

const MotionBox = motion.create(Box);

export default function LoginModal({ open, handleClose, onSwitchToSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Login data:", data);
    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      reset();
      handleClose();
    }, 2000);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      {loginOpen ? (
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <AnimatePresence mode="wait">
            {open && (
              <MotionBox
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                sx={{
                  width: "100%",
                  maxWidth: 440,
                  mx: 2,
                  outline: "none",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 3,
                    boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: 6,
                      background:
                        "linear-gradient(90deg, #22c55e 0%, #84cc16 100%)",
                    }}
                  />

                  <IconButton
                    onClick={handleClose}
                    disabled={isSubmitting}
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      color: "#718096",
                      zIndex: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.04)",
                        color: "#2d3748",
                      },
                    }}
                  >
                    <Close />
                  </IconButton>

                  <Box sx={{ p: 4, pt: 3 }}>
                    <MotionBox variants={itemVariants} sx={{ mb: 3 }}>
                      <div className="flex justify-center">
                        <img
                          src={SwagramaLogo}
                          className="h-[100px]"
                          alt="Swagrama Logo"
                        />
                      </div>
                      <h1 className="font-semibold text-xl text-ayuBrown text-center">
                        Welcome Back
                      </h1>
                      <p className="text-ayuMid text-xs text-center">
                        Login To Continue Your Swagrama Journey
                      </p>
                    </MotionBox>

                    <AnimatePresence>
                      {submitSuccess && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <Alert
                            severity="success"
                            sx={{ mb: 2, borderRadius: 2 }}
                          >
                            Login successful!
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <MotionBox variants={itemVariants} sx={{ mb: 2.5 }}>
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          }}
                          render={({ field }) => (
                            <Box
                              sx={{
                                position: "relative",
                                padding: "2px",
                                borderRadius: 2,
                                background:
                                  "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  boxShadow:
                                    "0 4px 12px rgba(34, 197, 94, 0.25)",
                                },
                              }}
                            >
                              <TextField
                                {...field}
                                fullWidth
                                label="Email"
                                type="email"
                                size="small"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Email
                                        size="small"
                                        sx={{ color: "#22c55e" }}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "6px",
                                    backgroundColor: "#ffffff",
                                    "& fieldset": {
                                      border: "none",
                                    },
                                    "&:hover fieldset": {
                                      border: "none",
                                    },
                                    "&.Mui-focused fieldset": {
                                      border: "none",
                                    },
                                    "&.Mui-focused": {
                                      boxShadow:
                                        "0 0 0 3px rgba(34, 197, 94, 0.1)",
                                    },
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "#22c55e",
                                    fontWeight: 500,
                                    background: "white",
                                    paddingRight: 1,
                                    paddingLeft: 1,
                                    "&.Mui-focused": {
                                      color: "#22c55e",
                                    },
                                  },
                                  "& .MuiFormHelperText-root": {
                                    marginLeft: 0,
                                  },
                                }}
                              />
                            </Box>
                          )}
                        />
                      </MotionBox>

                      <MotionBox variants={itemVariants} sx={{ mb: 3 }}>
                        <Controller
                          name="password"
                          control={control}
                          rules={{
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          }}
                          render={({ field }) => (
                            <Box
                              sx={{
                                position: "relative",
                                padding: "2px",
                                borderRadius: 2,
                                background:
                                  "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  boxShadow:
                                    "0 4px 12px rgba(34, 197, 94, 0.25)",
                                },
                              }}
                            >
                              <TextField
                                {...field}
                                fullWidth
                                label="Password"
                                size="small"
                                type={showPassword ? "text" : "password"}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Lock
                                        size="small"
                                        sx={{ color: "#22c55e" }}
                                      />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() =>
                                          setShowPassword(!showPassword)
                                        }
                                        edge="end"
                                        sx={{
                                          color: "#22c55e",
                                          "&:hover": {
                                            backgroundColor:
                                              "rgba(34, 197, 94, 0.08)",
                                          },
                                        }}
                                      >
                                        {showPassword ? (
                                          <VisibilityOff size="small" />
                                        ) : (
                                          <Visibility size="small" />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "6px",
                                    backgroundColor: "#ffffff",
                                    "& fieldset": {
                                      border: "none",
                                    },
                                    "&:hover fieldset": {
                                      border: "none",
                                    },
                                    "&.Mui-focused fieldset": {
                                      border: "none",
                                    },
                                    "&.Mui-focused": {
                                      boxShadow:
                                        "0 0 0 3px rgba(34, 197, 94, 0.1)",
                                    },
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "#22c55e",
                                    fontWeight: 500,
                                    paddingRight: 1,
                                    paddingLeft: 1,
                                    background: "white",
                                    "&.Mui-focused": {
                                      color: "#22c55e",
                                    },
                                  },
                                  "& .MuiFormHelperText-root": {
                                    marginLeft: 0,
                                  },
                                }}
                              />
                            </Box>
                          )}
                        />
                      </MotionBox>

                      <MotionBox variants={itemVariants}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={isSubmitting}
                          component={motion.button}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          size="small"
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            background:
                              "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 600,
                            boxShadow: "0 8px 20px rgba(34, 197, 94, 0.35)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 12px 28px rgba(34, 197, 94, 0.45)",
                              background:
                                "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                            },
                            "&:disabled": {
                              background:
                                "linear-gradient(135deg, #a0aec0 0%, #718096 100%)",
                            },
                          }}
                        >
                          {isSubmitting ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                style={{
                                  width: 20,
                                  height: 20,
                                  border: "3px solid rgba(255,255,255,0.3)",
                                  borderTopColor: "white",
                                  borderRadius: "50%",
                                }}
                              />
                              Logging in...
                            </Box>
                          ) : (
                            "Login"
                          )}
                        </Button>
                      </MotionBox>

                      <div className="flex justify-center items-center space-x-3 mt-5">
                        <p className="text-ayuBrown">Don't have an account?</p>
                        <button
                          type="button"
                          onClick={() => {
                            setLoginOpen(false);
                          }}
                          className="text-green-600 hover:text-green-700 font-medium transition-colors"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </Box>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </Modal>
      ) : (
        <SignUpModal open={true} handleClose={() => setLoginOpen(true)} />
      )}
    </>
  );
}
