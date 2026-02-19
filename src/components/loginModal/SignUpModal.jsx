import { Close } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePickerField from "../common/formFields/DatePickerField";
import InputArea from "../common/formFields/InputArea";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.svg";
import InputField from "../common/formFields/InputField";
import RadioField from "../common/formFields/RadioField";
import axios from "axios";
import { format } from "date-fns";
import { errorAlert, successAlert } from "../common/toast/CustomToast";
import ConfirmationModal from "../common/ConfirmationModal";
import { signupJYA } from "../../services/login/LoginServices";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const signupValidationSchema = yup.object().shape({
  FirstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),

  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),

  dob: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Cannot be in future"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Must be positive")
    .integer("Must be integer"),

  mobileNo: yup
    .string()
    .required("Mobile required")
    .matches(/^[0-9]{10}$/, "Must be 10 digits"),

  whatsappNo: yup
    .string()
    .required("WhatsApp required")
    .matches(/^[0-9]{10}$/, "Must be 10 digits"),

  emailId: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.(com|in)$/i, "Email must end with .com or .in"),

  pinCode: yup
    .string()
    .required("Pin code required")
    .matches(/^[0-9]{6}$/, "Must be 6 digits"),

  address: yup.string().required("Address required"),
  locality: yup
    .string()
    .required("Locality required")
    .min(2, "Min 2 characters"),

  city: yup.string().required("City required").min(2, "Min 2 characters"),

  state: yup.string().required("State required").min(2, "Min 2 characters"),

  country: yup.string().required("Country required").min(2, "Min 2 characters"),

  landmark: yup.string().optional().min(2, "Min 2 characters"),

  userName: yup
    .string()
    .required("Username required")
    .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscore"),

  passWord: yup
    .string()
    .required("Password required")
    .min(4, "Minimum 4 characters required"),

  confirmPassword: yup
    .string()
    .required("Confirm password")
    .oneOf([yup.ref("passWord"), null], "Passwords must match"),

  agreeToTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default function SignUpModal({ open, handleClose, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);
  const [formData, setFormData] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      FirstName: "",
      lastName: "",
      dob: "",
      age: "",
      gender: "Male",
      mobileNo: "",
      whatsappNo: "",
      emailId: "",
      pinCode: "",
      address: "",
      locality: "",
      city: "",
      state: "",
      country: "",
      landmark: "",
      userName: "",
      passWord: "",
      confirmPassword: "",
      macId: "",
      macIp: ipAddress,
      agreeToTerms: false,
      relation: "self",
    },
  });

  const dob = watch("dob");
  const pinCodeValue = watch("pinCode");
  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      dob: data.dob ? format(new Date(data.dob), "yyyy-MM-dd") : "",
    };
    setFormData(formattedData);
    setOpenConfirmationModal(true);
  };

  const handleUserSignup = async () => {
    try {
      setOpenConfirmationModal(false);
      // showLoader();
      const response = await signupJYA(formData);
      const apiData = response?.data;
      if (response.status === 200 && apiData) {
        successAlert(apiData);
        handleClose();
        reset();
      } else {
        errorAlert("Registration failed");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      errorAlert(errorMessage);
    } finally {
      // hideLoader();
    }
  };

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      if (calculatedAge >= 0) {
        setValue("age", calculatedAge);
      }
    }
  }, [dob, setValue]);

  useEffect(() => {
    const fetchPinData = async () => {
      if (pinCodeValue.length !== 6) return;
      try {
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${pinCodeValue}`,
        );
        const pinCodeData = res.data[0]?.PostOffice[0];
        setValue("pinCode", pinCodeData.Pincode);
        setValue("locality", pinCodeData.Name);
        setValue("city", pinCodeData.District);
        setValue("state", pinCodeData.State);
        setValue("country", pinCodeData.Country);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPinData();
  }, [pinCodeValue, setValue]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIpAddress(data.ip);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
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
                  <MotionBox variants={itemVariants} sx={{ mb: 1 }}>
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
                      Manage your Ayurveda therapy and events, services by
                      booking through the Swagrama.
                    </p>
                  </MotionBox>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <motion.div
                      custom={0}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="group"
                    >
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[#e6efe3]">
                        <div className="bg-gradient-to-r from-[#22c55e] to-[#84cc16] px-4 py-3">
                          <h3 className="text-lg sm:text-xl font-bold text-[#2f3e2e] flex items-center gap-2">
                            <span className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm">
                              1
                            </span>
                            Personal Information
                          </h3>
                        </div>
                        <div className="p-4 sm:p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <InputField
                              control={control}
                              name="FirstName"
                              label="First Name *"
                              error={errors.FirstName}
                            />
                            <InputField
                              control={control}
                              name="lastName"
                              label="Last Name *"
                              error={errors.lastName}
                            />
                            <DatePickerField
                              control={control}
                              name="dob"
                              label="Date Of Birth *"
                              disableFuture={true}
                              inputFormat="dd-MM-yyyy"
                              error={errors.dob}
                            />
                            <InputField
                              control={control}
                              name="age"
                              label="Age *"
                              error={errors.age}
                            />
                            <div className="sm:col-span-2">
                              <RadioField
                                control={control}
                                name="gender"
                                label="Gender *"
                                dataArray={[
                                  {
                                    id: "Male",
                                    value: "Male",
                                    label: "Male",
                                  },
                                  {
                                    id: "Female",
                                    value: "Female",
                                    label: "Female",
                                  },
                                  {
                                    id: "Other",
                                    value: "Other",
                                    label: "Other",
                                  },
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      custom={1}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="group"
                    >
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[#e6efe3]">
                        <div className="bg-gradient-to-r from-amber-200 to-amber-100 px-4 py-3">
                          <h3 className="text-lg sm:text-xl font-bold text-[#2f3e2e] flex items-center gap-2">
                            <span className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm">
                              2
                            </span>
                            Contact Information
                          </h3>
                        </div>
                        <div className="p-4 sm:p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div className="space-y-2">
                              <InputField
                                control={control}
                                name="mobileNo"
                                label="Mobile Number *"
                                error={errors.mobileNo}
                              />
                              <FormControlLabel
                                control={
                                  <Switch
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setValue(
                                          "whatsappNo",
                                          watch("mobileNo"),
                                        );
                                      }
                                    }}
                                    sx={{
                                      "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "#16a34a",
                                      },
                                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                        {
                                          backgroundColor: "lightgreen",
                                        },
                                    }}
                                  />
                                }
                                label="Same as Mobile Number"
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    fontSize: "0.875rem",
                                    color: "#4b5563",
                                  },
                                }}
                              />
                            </div>
                            <InputField
                              control={control}
                              name="whatsappNo"
                              label="WhatsApp Number *"
                              error={errors.whatsappNo}
                            />
                            <div className="sm:col-span-2">
                              <InputField
                                control={control}
                                type="email"
                                name="emailId"
                                label="Email *"
                                error={errors.emailId}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      custom={2}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="group"
                    >
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[#e6efe3]">
                        <div className="bg-gradient-to-r from-teal-200 to-teal-100 px-4 py-3">
                          <h3 className="text-lg sm:text-xl font-bold text-[#2f3e2e] flex items-center gap-2">
                            <span className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm">
                              3
                            </span>
                            Address Information
                          </h3>
                        </div>
                        <div className="p-4 sm:p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <InputField
                              control={control}
                              name="pinCode"
                              label="Pin Code *"
                              error={errors.pinCode}
                            />
                            <InputField
                              control={control}
                              name="locality"
                              label="Locality *"
                              error={errors.locality}
                            />
                            <InputField
                              control={control}
                              name="city"
                              label="City *"
                              error={errors.city}
                            />
                            <InputField
                              control={control}
                              name="state"
                              label="State *"
                              error={errors.state}
                            />
                            <InputField
                              control={control}
                              name="country"
                              label="Country *"
                              error={errors.country}
                            />
                            <InputField
                              control={control}
                              name="landmark"
                              label="Landmark"
                              error={errors.landmark}
                            />
                            <div className="sm:col-span-2">
                              <InputArea
                                control={control}
                                name="address"
                                label="Address *"
                                error={errors.address}
                                minRows={2}
                                maxRows={3}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      custom={3}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="group"
                    >
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[#e6efe3]">
                        <div className="bg-gradient-to-r from-green-200 to-green-100 px-4 py-3">
                          <h3 className="text-lg sm:text-xl font-bold text-[#2f3e2e] flex items-center gap-2">
                            <span className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm">
                              4
                            </span>
                            Account Information
                          </h3>
                        </div>
                        <div className="p-4 sm:p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div className="sm:col-span-2">
                              <Controller
                                name="userName"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    size="small"
                                    label="Username *"
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <PersonIcon
                                            sx={{
                                              color: "#7aa874",
                                              fontSize: 20,
                                            }}
                                          />
                                        </InputAdornment>
                                      ),
                                    }}
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        bgcolor: "#ffffff",
                                        transition: "all 0.3s",
                                        "&:hover": {
                                          boxShadow:
                                            "0 2px 8px rgba(122, 168, 116, 0.15)",
                                        },
                                      },
                                    }}
                                  />
                                )}
                              />
                            </div>

                            <Controller
                              name="passWord"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  label="Password *"
                                  onPaste={(e) => e.preventDefault()}
                                  type={showPassword ? "text" : "password"}
                                  error={!!errors.passWord}
                                  helperText={errors.passWord?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockIcon
                                          sx={{
                                            color: "#7aa874",
                                            fontSize: 20,
                                          }}
                                        />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          size="small"
                                          onClick={() =>
                                            setShowPassword(!showPassword)
                                          }
                                        >
                                          {showPassword ? (
                                            <VisibilityOffIcon
                                              sx={{ fontSize: 20 }}
                                            />
                                          ) : (
                                            <VisibilityIcon
                                              sx={{ fontSize: 20 }}
                                            />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      bgcolor: "#ffffff",
                                      transition: "all 0.3s",
                                      "&:hover": {
                                        boxShadow:
                                          "0 2px 8px rgba(122, 168, 116, 0.15)",
                                      },
                                    },
                                  }}
                                />
                              )}
                            />

                            <Controller
                              name="confirmPassword"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  label="Confirm Password *"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  onPaste={(e) => e.preventDefault()}
                                  error={!!errors.confirmPassword}
                                  helperText={errors.confirmPassword?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockIcon
                                          sx={{
                                            color: "#7aa874",
                                            fontSize: 20,
                                          }}
                                        />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          size="small"
                                          onClick={() =>
                                            setShowConfirmPassword(
                                              !showConfirmPassword,
                                            )
                                          }
                                        >
                                          {showConfirmPassword ? (
                                            <VisibilityOffIcon
                                              sx={{ fontSize: 20 }}
                                            />
                                          ) : (
                                            <VisibilityIcon
                                              sx={{ fontSize: 20 }}
                                            />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      bgcolor: "#ffffff",
                                      transition: "all 0.3s",
                                      "&:hover": {
                                        boxShadow:
                                          "0 2px 8px rgba(122, 168, 116, 0.15)",
                                      },
                                    },
                                  }}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      custom={4}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="bg-white rounded-2xl shadow-md border border-[#e6efe3] overflow-hidden">
                        <div className="p-4 sm:p-6">
                          <h4 className="text-base sm:text-lg font-bold text-[#2f3e2e] mb-3">
                            Terms and Conditions
                          </h4>
                          <div className="max-h-48 overflow-y-auto p-3 sm:p-4 bg-[#f8fbf6] rounded-xl border border-[#e6efe3] text-xs sm:text-sm text-[#4b5563] leading-relaxed custom-scrollbar">
                            <p className="mb-3">
                              <strong>1. Acceptance of Terms</strong>
                            </p>
                            <p className="mb-4">
                              By creating an account with JYA (Join Your
                              Ayurveda), you agree to embark on a holistic
                              wellness journey. These terms govern your use of
                              our Ayurvedic wellness platform and services. If
                              you do not agree with any part of these terms,
                              please do not register.
                            </p>

                            <p className="mb-3">
                              <strong>
                                2. Wellness Services & Consultation
                              </strong>
                            </p>
                            <p className="mb-4">
                              Our platform provides Ayurvedic consultations,
                              wellness guidance, herbal product recommendations,
                              and holistic health resources. All advice is based
                              on traditional Ayurvedic principles and should
                              complement, not replace, conventional medical
                              care. Always consult qualified healthcare
                              professionals for medical conditions.
                            </p>

                            <p className="mb-3">
                              <strong>3. Health Information & Privacy</strong>
                            </p>
                            <p className="mb-4">
                              We collect your health information, dosha profile,
                              lifestyle habits, and wellness goals to provide
                              personalized Ayurvedic recommendations. Your
                              health data is confidential and processed in
                              accordance with our Privacy Policy and applicable
                              health data protection regulations.
                            </p>

                            <p className="mb-3">
                              <strong>4. Accurate Health Information</strong>
                            </p>
                            <p className="mb-4">
                              You agree to provide accurate and complete health
                              information including medical history, allergies,
                              current medications, and health conditions.
                              Accurate information is crucial for safe and
                              effective Ayurvedic recommendations. Update your
                              health profile whenever your condition changes.
                            </p>

                            <p className="mb-3">
                              <strong>5. Product Usage & Responsibility</strong>
                            </p>
                            <p className="mb-4">
                              Ayurvedic products and remedies recommended
                              through our platform should be used as directed.
                              You are responsible for checking ingredient lists
                              for potential allergens. Discontinue use and
                              consult a healthcare provider if you experience
                              adverse reactions. Pregnant or nursing women
                              should seek medical advice before using any herbal
                              products.
                            </p>

                            <p className="mb-3">
                              <strong>6. Account Security & Usage</strong>
                            </p>
                            <p className="mb-4">
                              You are responsible for maintaining the
                              confidentiality of your account credentials. Do
                              not share your account with others as it contains
                              personal health information. We reserve the right
                              to suspend accounts that violate our community
                              guidelines or misuse our wellness services.
                            </p>

                            <p className="mb-3">
                              <strong>7. Limitation of Liability</strong>
                            </p>
                            <p className="mb-4">
                              While we strive to provide authentic Ayurvedic
                              guidance, individual results may vary. We are not
                              liable for any adverse effects from following
                              wellness recommendations or using products. Our
                              services are educational and complementary in
                              nature, not a substitute for professional medical
                              diagnosis or treatment.
                            </p>

                            <p className="mb-3">
                              <strong>8. Intellectual Property</strong>
                            </p>
                            <p className="mb-4">
                              All content including Ayurvedic recipes, dosha
                              assessments, wellness plans, and educational
                              materials are proprietary to JYA. You may use them
                              for personal wellness purposes but may not
                              reproduce, distribute, or commercialize our
                              content without permission.
                            </p>

                            <p className="mb-3">
                              <strong>9. Changes to Terms</strong>
                            </p>
                            <p>
                              We reserve the right to modify these terms to
                              better serve your wellness journey. Continued use
                              of our platform after changes constitutes
                              acceptance of the modified terms. We will notify
                              users of significant changes via email or platform
                              notifications.
                            </p>
                          </div>

                          <Controller
                            name="agreeToTerms"
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      checked={field.value}
                                      sx={{
                                        color: errors.agreeToTerms
                                          ? "#d32f2f"
                                          : "#7aa874",
                                        "&.Mui-checked": {
                                          color: "#7aa874",
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: "0.875rem",
                                        color: errors.agreeToTerms
                                          ? "#d32f2f"
                                          : "#4b5563",
                                      }}
                                    >
                                      I have read and agree to the Terms and
                                      Conditions *
                                    </Typography>
                                  }
                                  sx={{ mt: 2 }}
                                />
                                {errors.agreeToTerms && (
                                  <FormHelperText error sx={{ ml: 2 }}>
                                    {errors.agreeToTerms.message}
                                  </FormHelperText>
                                )}
                              </Box>
                            )}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <MotionBox variants={itemVariants}>
                      <Button
                        type="submit"
                        fullWidth
                        disabled={!agreeToTerms}
                        sx={{
                          borderRadius: 3,
                          py: 1.5,
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "1rem",
                          background: agreeToTerms
                            ? "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)"
                            : "#e0e0e0",
                          color: "white",
                          boxShadow: agreeToTerms
                            ? "0 4px 15px rgba(127, 176, 105, 0.3)"
                            : "none",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: agreeToTerms
                              ? "translateY(-2px)"
                              : "none",
                            boxShadow: agreeToTerms
                              ? "0 6px 20px rgba(127, 176, 105, 0.4)"
                              : "none",
                          },
                          "&:disabled": {
                            cursor: "not-allowed",
                          },
                        }}
                      >
                        Sign Up
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
      <ConfirmationModal
        confirmationOpen={openConfirmationModal}
        confirmationHandleClose={() => setOpenConfirmationModal(false)}
        confirmationSubmitFunc={handleUserSignup}
        confirmationLabel="Confirm Registration"
        confirmationMsg="Are you sure you want to create this account?"
        confirmationButtonMsg="Confirm"
      />
    </>
  );
}
