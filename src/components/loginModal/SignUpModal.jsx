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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Close,
  Person,
  Phone,
  AccountCircle,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.png";
import RadioField from "../common/formFields/RadioField";

const MotionBox = motion.create(Box);

export default function SignUpModal({ open, handleClose, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      gender: "1",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Sign up data:", data);
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
        staggerChildren: 0.08,
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
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const renderTextField = (
    name,
    label,
    icon,
    type = "text",
    rules = {},
    showPasswordToggle = false,
    passwordVisible = false,
    setPasswordVisible = null
  ) => (
    <MotionBox variants={itemVariants} sx={{ mb: 2.5 }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Box
            sx={{
              position: "relative",
              padding: "2px",
              borderRadius: 2,
              background: "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(34, 197, 94, 0.25)",
              },
            }}
          >
            <TextField
              {...field}
              fullWidth
              label={label}
              type={
                showPasswordToggle
                  ? passwordVisible
                    ? "text"
                    : "password"
                  : type
              }
              size="small"
              error={!!errors[name]}
              helperText={errors[name]?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {React.cloneElement(icon, {
                      size: "small",
                      sx: { color: "#22c55e" },
                    })}
                  </InputAdornment>
                ),
                endAdornment: showPasswordToggle ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      edge="end"
                      sx={{
                        color: "#22c55e",
                        "&:hover": {
                          backgroundColor: "rgba(34, 197, 94, 0.08)",
                        },
                      }}
                    >
                      {passwordVisible ? (
                        <VisibilityOff size="small" />
                      ) : (
                        <Visibility size="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ) : null,
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
                    boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)",
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
  );

  return (
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
              maxWidth: 680,
              maxHeight: "90vh",
              mx: 2,
              outline: "none",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
            
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
                    Create Account
                  </h1>
                  <p className="text-ayuMid text-xs text-center">
                    Manage your Ayurveda therapy and events, services by booking
                    through the Swagrama.
                  </p>
                </MotionBox>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                        Account created successfully!
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <MotionBox
                    variants={itemVariants}
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 2.5,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Box
                          sx={{
                            flex: 1,
                            position: "relative",
                            padding: "2px",
                            borderRadius: 2,
                            background:
                              "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.25)",
                            },
                          }}
                        >
                          <TextField
                            {...field}
                            fullWidth
                            label="First Name"
                            size="small"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person
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
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                                "&.Mui-focused": {
                                  boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "#22c55e",
                                fontWeight: 500,
                                background: "white",
                                paddingRight: 1,
                                paddingLeft: 1,
                                "&.Mui-focused": { color: "#22c55e" },
                              },
                              "& .MuiFormHelperText-root": { marginLeft: 0 },
                            }}
                          />
                        </Box>
                      )}
                    />

                    <Controller
                      name="lastName"
                      control={control}
                      rules={{
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Box
                          sx={{
                            flex: 1,
                            position: "relative",
                            padding: "2px",
                            borderRadius: 2,
                            background:
                              "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.25)",
                            },
                          }}
                        >
                          <TextField
                            {...field}
                            fullWidth
                            label="Last Name"
                            size="small"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person
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
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                                "&.Mui-focused": {
                                  boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "#22c55e",
                                fontWeight: 500,
                                background: "white",
                                paddingRight: 1,
                                paddingLeft: 1,
                                "&.Mui-focused": { color: "#22c55e" },
                              },
                              "& .MuiFormHelperText-root": { marginLeft: 0 },
                            }}
                          />
                        </Box>
                      )}
                    />
                  </MotionBox>
                  {renderTextField(
                    "username",
                    "Username",
                    <AccountCircle />,
                    "text",
                    {
                      required: "Username is required",
                      minLength: {
                        value: 4,
                        message: "Username must be at least 4 characters",
                      },
                    }
                  )}
                  <MotionBox variants={itemVariants} sx={{ mb: 2.5 }}>
                    <div className="flex space-x-3 w-full ">
                      <div className="flex space-x-2 items-center w-full">
                        <h5 className="text-sm font-semibold -mt-1.5">
                          Gender :
                        </h5>
                        <RadioField
                          control={control}
                          name="gender"
                          dataArray={[
                            {
                              id: 1,
                              value: 1,
                              label: "Male",
                            },
                            {
                              id: 2,
                              value: 2,
                              label: "Female",
                            },
                            {
                              id: 3,
                              value: 3,
                              label: "Other",
                            },
                          ]}
                        />
                      </div>
                      <div className="w-full">
                        {renderTextField(
                          "mobileNumber",
                          "Mobile Number",
                          <Phone />,
                          "tel",
                          {
                            required: "Mobile number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message:
                                "Please enter a valid 10-digit mobile number",
                            },
                          }
                        )}
                      </div>
                    </div>
                  </MotionBox>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      {renderTextField(
                        "password",
                        "Password",
                        <Lock />,
                        "password",
                        {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        },
                        true,
                        showPassword,
                        setShowPassword
                      )}
                    </div>
                    <div>
                      {renderTextField(
                        "confirmPassword",
                        "Confirm Password",
                        <Lock />,
                        "password",
                        {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        },
                        true,
                        showConfirmPassword,
                        setShowConfirmPassword
                      )}
                    </div>
                  </div>

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
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                          Creating Account...
                        </Box>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </MotionBox>

                  <div className="flex justify-center items-center space-x-3 mt-5">
                    <p className="text-ayuBrown">Already have an account?</p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </Box>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Modal>
  );
}
