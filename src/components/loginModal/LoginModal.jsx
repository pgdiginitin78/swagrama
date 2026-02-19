import {
  Close,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.svg";
import ConfirmationModal from "../common/ConfirmationModal";
import { errorAlert, successAlert } from "../common/toast/CustomToast";
import SignUpModal from "./SignUpModal";
import { useLoader } from "../common/commonLoader/LoaderContext";
import { userLogin } from "../../services/login/LoginServices";

const MotionBox = motion.create(Box);

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

export default function LoginModal({ open, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true);
  const [formData, setFormData] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  
  const { showLoader, hideLoader } = useLoader();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setFormData(data);
    setOpenConfirmationModal(true);
  };

  const handleUserLogin = async () => {
    try {
      showLoader();
      setOpenConfirmationModal(false);

      const response = await userLogin(formData);
      const { data, status } = response;
      console.log("loginResponse", data);

      if (status === 200 && data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("expiresIn", data.expiresIn);
        localStorage.setItem("tokenSetTime", Date.now());
        successAlert(data.message || "Login successful");
        handleClose();
        reset();
      } else {
        throw new Error(data?.message || "Invalid login credentials");
      }
    } catch (error) {
      errorAlert(
        error?.response?.data?.message || "Invalid username or password",
      );
    } finally {
      hideLoader();
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
              <MotionBox
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-[440px] mx-4 sm:mx-6 md:mx-8 outline-none max-h-[95vh] sm:max-h-[90vh] flex"
              >
                <div className="bg-white rounded-3xl shadow-2xl relative w-full flex flex-col max-h-full overflow-hidden">
                  {/* Top gradient bar */}
                  <div className="h-1.5 bg-gradient-to-r from-green-500 to-lime-500 flex-shrink-0 rounded-t-3xl" />

                  {/* Close button */}
                  <IconButton
                    onClick={handleClose}
                    className="!absolute top-3 sm:top-4 right-3 sm:right-4 !text-gray-600 z-10 hover:!bg-gray-100 hover:!text-gray-800"
                  >
                    <Close />
                  </IconButton>

                  {/* Content container with scroll */}
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
                    <MotionBox variants={itemVariants} className="mb-6">
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
                    </MotionBox>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <MotionBox
                        variants={itemVariants}
                        className="mb-4 sm:mb-5"
                      >
                        <Controller
                          name="userName"
                          control={control}
                          rules={{
                            required: "userName is required",
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
                                label="Email / Mobile No."
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

                      <MotionBox
                        variants={itemVariants}
                        className="mb-5 sm:mb-6"
                      >
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
                          component={motion.button}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
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
                          Login
                        </Button>
                      </MotionBox>

                      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 mt-5">
                        <p className="text-ayuBrown text-sm sm:text-base">
                          Don't have an account?
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setLoginOpen(false);
                          }}
                          className="text-green-600 hover:text-green-700 font-medium transition-colors text-sm sm:text-base"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </MotionBox>
            )}
          </AnimatePresence>
        </Modal>
      ) : (
        <SignUpModal open={true} handleClose={() => setLoginOpen(true)} />
      )}
      <ConfirmationModal
        confirmationOpen={openConfirmationModal}
        confirmationHandleClose={() => setOpenConfirmationModal(false)}
        confirmationSubmitFunc={handleUserLogin}
        confirmationLabel="Confirmation"
        confirmationMsg="Are you sure you want to log in?"
        confirmationButtonMsg="Confirm"
      />
    </>
  );
}
