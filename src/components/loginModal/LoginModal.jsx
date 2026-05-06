import Close from "@mui/icons-material/Close";
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.svg";
import ConfirmationModal from "../common/ConfirmationModal";
import { errorAlert, successAlert } from "../common/toast/CustomToast";
import SignUpModal from "./SignUpModal";
import { useLoader } from "../common/commonLoader/LoaderContext";
import { forgotPassword, userLogin } from "../../services/login/LoginServices";
import { useAuth } from "../../context/AuthContext";
import CancelButtonModal from "../common/button/CancelButtonModal";
import CommonButton from "../common/button/CommonButton";
import ResetPassword from "./ResetPassword";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import OTPVerificationModal from "./OTPVerificationModal";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  width: "100%",
  maxWidth: "100vw",
  height: { xs: "100%", sm: "auto" },
  maxHeight: { xs: "100vh", sm: "95vh" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 1,
  "&:focus": {
    outline: "none",
  },
};

const modalVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const validationSchema = yup.object().shape({
  userName: yup.string().required("Email / Mobile No. is required"),
  password: yup.string().required("Password is required"),
  emailAddress: yup.string().email("Please enter a valid email address"),
});

export default function LoginModal({ open, handleClose }) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true);
  const [formData, setFormData] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openForgotModal, setOpenForgotModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [otpEmailForVerification, setOtpEmailForVerification] = useState("");

  const [emailFromResend, setEmailFromResend] = useState("");

  const { setIsLoading } = useLoader();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
    setError,
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      emailAddress: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const emailAddressValue = watch("emailAddress");

  const onSubmit = async (data) => {
    setFormData(data);
    setOpenConfirmationModal(true);
  };

  const handleUserLogin = async () => {
    try {
      setIsLoading(true);
      setOpenConfirmationModal(false);

      const response = await userLogin(formData);
      if (response?.data.statusCode === 200 ) {
        console.log("LOGIN API RESPONSE: ",response.data.data);
        localStorage.setItem("accessToken", response.data?.data?.accessToken);
        localStorage.setItem("refreshToken", response.data?.data?.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data?.data?.user));
        localStorage.setItem("expiresIn", response.data?.data?.expiresIn);
        localStorage.setItem("tokenSetTime", Date.now());
        login(response.data?.data?.user);
        successAlert(response.data.message);
        handleClose();
        reset();
        setIsLoading(false);
      } else {
        throw new Error(response.data?.message || "Invalid login credentials");
      }
    } catch (error) {
      errorAlert(
        error?.response?.data?.message || "Invalid username or password",
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (emailFromResend) => {
    const emailToUse = emailFromResend || emailAddressValue;

    try {
      // Manual check for empty since trigger might not work on an optional field in schema
      if (
        !emailToUse ||
        (typeof emailToUse === "string" && emailToUse.trim() === "")
      ) {
        setError("emailAddress", {
          type: "manual",
          message: "Please enter your email",
        });
        return;
      }

      const forgotSchema = yup
        .string()
        .email("Please enter a valid email address")
        .required("Please enter your email");

      await forgotSchema.validate(emailToUse);
    } catch (err) {
      setError("emailAddress", { type: "manual", message: err.message });
      return;
    }
    setEmailFromResend(emailToUse);
    try {
      setIsLoading(true);
      const response = await forgotPassword({
        email: emailToUse,
        ClinicId: 5,
      });
      if (response.status === 200) {
        successAlert(response.data?.message || "Password reset email sent!");
        setOtpEmailForVerification(emailToUse);
        setOpenForgotModal(false);
        reset({
          emailAddress: "",
          userName: watch("userName"),
          password: watch("password"),
        });
        setOpenOTPModal(true);
      } else {
        errorAlert(response.data?.message || "Something went wrong");
      }
    } catch (error) {
      errorAlert(
        error?.response?.data?.message || "Failed to send reset email",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {loginOpen ? (
        <Modal
          open={open}
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
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ willChange: "transform, opacity" }}
                className="w-full max-w-[440px] mx-4 sm:mx-6 md:mx-8 outline-none max-h-[95vh] sm:max-h-[90vh] flex"
              >
                <div className="bg-white rounded-xl shadow-2xl relative w-full flex flex-col max-h-full overflow-hidden">
                  <CancelButtonModal onClick={handleClose} />

                  <div className="p-6 sm:p-8 pt-4 sm:pt-6 overflow-y-auto flex-1 custom-green-scrollbar">
                    <style>{`
                      .custom-green-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #22c55e #f3f4f6;
                      }
                      .custom-green-scrollbar::-webkit-scrollbar {
                        width: 8px;
                      }
                      .custom-green-scrollbar::-webkit-scrollbar-track {
                        background: #f3f4f6;
                        border-radius: 10px;
                      }
                      .custom-green-scrollbar::-webkit-scrollbar-thumb {
                        background: #22c55e;
                        border-radius: 10px;
                      }
                      .custom-green-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #16a34a;
                      }
                    `}</style>

                    <div className="mb-6">
                      <div className="flex justify-center mb-3">
                        <img
                          src={SwagramaLogo}
                          className="h-20 sm:h-24 md:h-[100px] w-auto"
                          alt="Swagrama Logo"
                        />
                      </div>
                      <h1 className="font-semibold text-lg sm:text-xl text-ayuBrown text-center">
                        Welcome Back
                      </h1>
                      <p className="text-ayuMid text-xs sm:text-sm text-center mt-1">
                        Login To Continue Your Swagrama Journey
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4 sm:mb-5">
                        <Controller
                          name="userName"
                          control={control}
                          rules={{ required: "userName is required" }}
                          render={({ field }) => (
                            <Box
                              sx={{
                                position: "relative",
                                padding: "2px",
                                borderRadius: 2,
                                background:
                                  "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                                "&:hover": {
                                  boxShadow:
                                    "0 4px 12px rgba(34, 197, 94, 0.25)",
                                },
                              }}
                            >
                              <TextField
                                {...field}
                                fullWidth
                                label="User Name / Mobile No."
                                size="small"
                                inputProps={{ autoComplete: "off" }}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
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
                                    "& fieldset": { border: "none" },
                                    "&:hover fieldset": { border: "none" },
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
                                    "&.Mui-focused": { color: "#22c55e" },
                                  },
                                  "& .MuiFormHelperText-root": {
                                    marginLeft: 0,
                                  },
                                }}
                              />
                            </Box>
                          )}
                        />
                      </div>

                      <div className="mb-2">
                        <Controller
                          name="password"
                          control={control}
                          rules={{
                            required: "Password is required",
                            minLength: {
                              value: 1,
                              message: "Password is required",
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
                                        {showPassword === false ? (
                                          <VisibilityOffIcon size="small" />
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
                                    "& fieldset": { border: "none" },
                                    "&:hover fieldset": { border: "none" },
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
                                    "&.Mui-focused": { color: "#22c55e" },
                                  },
                                  "& .MuiFormHelperText-root": {
                                    marginLeft: 0,
                                  },
                                }}
                              />
                            </Box>
                          )}
                        />
                      </div>
                      <div className="flex justify-end my-2">
                        <button
                          type="button"
                          className="text-xs text-ayuBrown hover:underline"
                          onClick={() => {
                            reset({ emailAddress: "" });
                            setOpenForgotModal(true);
                          }}
                        >
                          Forgot Password
                        </button>
                      </div>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="small"
                        sx={{
                          py: 1,
                          borderRadius: 2,
                          background:
                            "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                          textTransform: "none",
                          fontSize: "1rem",
                          fontWeight: 600,
                          boxShadow: "0 8px 20px rgba(34, 197, 94, 0.35)",
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
                        Login
                      </Button>

                      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 mt-5">
                        <p className="text-ayuBrown text-sm sm:text-base">
                          Don't have an account?
                        </p>
                        <button
                          type="button"
                          onClick={() => setLoginOpen(false)}
                          className="text-green-600 hover:text-green-700 font-medium transition-colors text-sm sm:text-base"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Modal>
      ) : (
        <SignUpModal open={true} handleClose={() => setLoginOpen(true)} />
      )}

      {openForgotModal && (
        <Modal open={openForgotModal}>
          <Box sx={ModalStyle}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "400px",
                bgcolor: "#f8fbf6",
                borderRadius: 3,
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                border: "1px solid #e6efe3",
                p: 3,
              }}
            >
              <CancelButtonModal
                onClick={() => {
                  setOpenForgotModal(false);
                  reset({ emailAddress: "" });
                }}
              />
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 700, color: "#2f3e2e" }}
              >
                Forgot Password
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: "#6b7d6a" }}>
                Enter your email address to reset your password.
              </Typography>
              <Controller
                name="emailAddress"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      position: "relative",
                      padding: "2px",
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                      mb: 2,
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(34, 197, 94, 0.25)",
                      },
                    }}
                  >
                    <TextField
                      {...field}
                      value={field.value || ""}
                      fullWidth
                      label="Email Address"
                      size="small"
                      error={!!errors.emailAddress}
                      helperText={errors.emailAddress?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email size="small" sx={{ color: "#22c55e" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          "& fieldset": { border: "none" },
                          "&:hover fieldset": { border: "none" },
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
                          "&.Mui-focused": { color: "#22c55e" },
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                          color: "#d32f2f",
                          position: "absolute",
                          bottom: "-20px",
                        },
                      }}
                    />
                  </Box>
                )}
              />
              <div className="flex justify-end mt-6 space-x-3">
                <CommonButton
                  type="button"
                  onClick={() => {
                    reset({ emailAddress: "" });
                  }}
                  label="Reset"
                  className={
                    "border border-red-600 text-red-600 hover:bg-red-100 w-full"
                  }
                />

                <CommonButton
                  type="button"
                  onClick={() => handleForgotPassword()}
                  label="Confirm"
                  className={" bg-green-600 text-white  w-full"}
                />
              </div>
            </Box>
          </Box>
        </Modal>
      )}

      <ConfirmationModal
        confirmationOpen={openConfirmationModal}
        confirmationHandleClose={() => setOpenConfirmationModal(false)}
        confirmationSubmitFunc={handleUserLogin}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure you want to log in?"
        confirmationButtonMsg="Confirm"
      />
      {openResetModal && (
        <ResetPassword
          open={openResetModal}
          handleClose={() => setOpenResetModal(false)}
          otpEmailForVerification={otpEmailForVerification}
          setOtpEmailForVerification={setOtpEmailForVerification}
        />
      )}

      <OTPVerificationModal
        open={openOTPModal}
        handleClose={() => setOpenOTPModal(false)}
        onVerify={(otp) => {
          setOpenOTPModal(false);
          setOpenResetModal(true);
        }}
        handleResend={handleForgotPassword}
        emailFromResend={emailFromResend}
        setOtpEmailForVerification={setOtpEmailForVerification}
      />
    </>
  );
}
