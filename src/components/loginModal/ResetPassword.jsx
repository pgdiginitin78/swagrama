import { yupResolver } from "@hookform/resolvers/yup";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  IconButton,
  InputAdornment,
  Modal,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.svg";
import CommonButton from "../../components/common/button/CommonButton";
import InputField from "../../components/common/formFields/InputField";
import {
  errorAlert,
  successAlert,
} from "../../components/common/toast/CustomToast";
import { resetPassword } from "../../services/login/LoginServices";
import CancelButtonModal from "../common/button/CancelButtonModal";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("New password is required")
    .min(4, "Password must be at least 4 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = ({
  open,
  handleClose,
  otpEmailForVerification,
  setOtpEmailForVerification,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  console.log("searchParams", token);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const postObj = {
        token: otpEmailForVerification,
        NewPassword: data.password,
        ConfirmPassword: data.confirmPassword,
      };
      const response = await resetPassword(postObj);
      console.log("response12345", response);

      handleClose();
      successAlert(response.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/"), 2000);
      setOtpEmailForVerification("");
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    reset();
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "400px",
    maxHeight: "600px",
    overflowY: "auto",
    bgcolor: "#f8fbf6",
    borderRadius: 3,
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    border: "1px solid #e6efe3",
    p: 3,
  };

  return (
    <Modal open={open}>
      <Box sx={ModalStyle}>
        <Box>
          <CancelButtonModal onClick={handleClose} />
          <div className="">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="text-center mb-5">
                <img
                  src={SwagramaLogo}
                  alt="Swagrama Logo"
                  className="w-24 mx-auto mb-2 hover:scale-105 transition-transform duration-300"
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#2f3e2e",
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    mb: 1,
                  }}
                >
                  Create New Password
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6b7d6a",
                    fontSize: "0.875rem",
                  }}
                >
                  Your wellness journey awaits. Secure your account.
                </Typography>
              </motion.div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-4">
                  <InputField
                    name="password"
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    control={control}
                    error={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenIcon sx={{ color: "#7aa874" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#ffffff",
                      },
                    }}
                  />

                  <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    control={control}
                    error={errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenIcon sx={{ color: "#7aa874" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#ffffff",
                      },
                    }}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex  gap-4 pt-2"
                >
                  <CommonButton
                    type="button"
                    onClick={handleResetForm}
                    label="Reset"
                    className="flex-1 border border-red-600 text-red-600 hover:bg-red-100  transition-all duration-300"
                  />
                  <CommonButton
                    type="submit"
                    label={loading ? "Updating..." : "Confirm"}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white  transition-all duration-300 font-semibold"
                  />
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-xs text-[#6b7d6a]/60">
                  &copy; {new Date().getFullYear()} Swagrama. All rights
                  reserved.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResetPassword;
