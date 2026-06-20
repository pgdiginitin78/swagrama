import { yupResolver } from "@hookform/resolvers/yup";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
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
import axios from "axios";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { signupJYA, verifyUser } from "../../services/login/LoginServices";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.svg";
import CancelButtonModal from "../common/button/CancelButtonModal";
import { useLoader } from "../common/commonLoader/LoaderContext";
import ConfirmationModal from "../common/ConfirmationModal";
import DatePickerField from "../common/formFields/DatePickerField";
import DropdownField from "../common/formFields/DropdownField";
import InputArea from "../common/formFields/InputArea";
import InputField from "../common/formFields/InputField";
import RadioField from "../common/formFields/RadioField";
import { errorAlert, successAlert } from "../common/toast/CustomToast";

const modalVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 24,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const dropdownObjectSchema = yup
  .object()
  .shape({
    id: yup.mixed().required(),
    label: yup.string().required(),
  })
  .nullable()
  .required("This field is required");

const signupValidationSchema = yup.object().shape({
  FirstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),
  dob: yup.date().required("Date of birth is required"),

  age: yup
    .number()
    .typeError("Age is required")
    .required("Age is required")
    .positive("Must be positive")
    .integer("Must be integer")
    .min(1, "Age must be at least 1")
    .max(120, "Age cannot exceed 120"),
  bloodGroup: dropdownObjectSchema.typeError("Blood group is required"),
  mobileNo: yup
    .string()
    .required("Mobile required")
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
  userName: yup
    .string()
    .required("Username required")
    .max(50, "Maximum 50 characters required"),
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

const calculateAgeFromDOB = (dob) => {
  if (!dob || isNaN(new Date(dob))) return "";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 1 && age <= 120 ? String(age) : "";
};

const calculateDOBFromAge = (age) => {
  const ageNum = Number(age);
  if (
    !age ||
    isNaN(ageNum) ||
    !Number.isInteger(ageNum) ||
    ageNum < 1 ||
    ageNum > 120
  )
    return null;
  const birthYear = new Date().getFullYear() - ageNum;
  return new Date(birthYear, 0, 1);
};

const bloodGroupOptions = [
  { id: 1, value: "A+", label: "A+" },
  { id: 2, value: "A-", label: "A-" },
  { id: 3, value: "B+", label: "B+" },
  { id: 4, value: "B-", label: "B-" },
  { id: 5, value: "AB+", label: "AB+" },
  { id: 6, value: "AB-", label: "AB-" },
  { id: 7, value: "O+", label: "O+" },
  { id: 8, value: "O-", label: "O-" },
];

const genderOptions = [
  { id: "Male", value: "Male", label: "Male" },
  { id: "Female", value: "Female", label: "Female" },
  { id: "Other", value: "Other", label: "Other" },
];

const numericKeyFilter = (e) => {
  if (!/[0-9]|Backspace|Delete|Tab|ArrowLeft|ArrowRight/.test(e.key)) {
    e.preventDefault();
  }
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "#ffffff",
  },
};

const TODAY = new Date();
const INITIAL_AGE = calculateAgeFromDOB(TODAY);

export default function SignUpModal({ open, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);
  const [formData, setFormData] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyMobile, setVerifyMobile] = useState("");

  const { setIsLoading } = useLoader();
  const usernameDebounceRef = useRef(null);
  const emailDebounceRef = useRef(null);
  const mobileDebounceRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    register,
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      FirstName: "",
      lastName: "",
      dob: TODAY,
      age: INITIAL_AGE,
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
      macIp: "",
      agreeToTerms: false,
      relation: "self",
      bloodGroup: null,
      sameAsMobileNumber: false,
      middleName: "",
    },
  });

  const dob = watch("dob");
  const pinCodeValue = watch("pinCode");
  const agreeToTerms = watch("agreeToTerms");
  const watchedAge = watch("age");
  const watchedMobileNo = watch("mobileNo");
  const watchedSameAsMobile = watch("sameAsMobileNumber");

  const isDobEffectFromAge = useRef(false);
  const isAgeEffectFromDob = useRef(false);

  const isFieldUnavailable =
    userNameAvailable === "Username is already taken" ||
    verifyEmail === "Email ID is already taken" ||
    verifyMobile === "Mobile No is already taken";

  const isDisabled = !agreeToTerms || isFieldUnavailable;

  const onSubmit = useCallback(
    (data) => {
      const formattedData = {
        ...data,
        dob:
          data.dob && !isNaN(new Date(data.dob).getTime())
            ? format(new Date(data.dob), "yyyy-MM-dd")
            : "",
        macIp: ipAddress,
        bloodGroup: data.bloodGroup?.value,
        whatsappNo: data.whatsappNo !== "" ? data.whatsappNo : null,
        middleName: data.middleName || "",
      };
      setFormData(formattedData);
      setOpenConfirmationModal(true);
    },
    [ipAddress],
  );

  const handleUserSignup = useCallback(async () => {
    try {
      setOpenConfirmationModal(false);
      setIsLoading(true);
      const response = await signupJYA(formData);
      const apiData = response?.data;
      if (response?.status === 200 && apiData) {
        successAlert(
          typeof apiData === "string"
            ? apiData
            : apiData?.message || "Registration successful",
        );
        handleClose();
        reset();
      } else {
        errorAlert("Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.msg ||
        (typeof error?.response?.data === "string"
          ? error.response.data
          : null) ||
        "Something went wrong";
      errorAlert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formData, handleClose, reset, setIsLoading]);

  const onFormError = useCallback((errs) => {
    const firstErrorField = Object.keys(errs)[0];
    if (firstErrorField && errs[firstErrorField]?.message) {
      errorAlert(errs[firstErrorField].message);
    }
  }, []);

  const handleTogglePassword = useCallback(
    () => setShowPassword((p) => !p),
    [],
  );
  const handleToggleConfirmPassword = useCallback(
    () => setShowConfirmPassword((p) => !p),
    [],
  );
  const handleCloseConfirmation = useCallback(
    () => setOpenConfirmationModal(false),
    [],
  );

  useEffect(() => {
    if (isDobEffectFromAge.current) {
      isDobEffectFromAge.current = false;
      return;
    }
    if (!dob) return;
    const calculatedAge = calculateAgeFromDOB(dob);
    const currentAge = getValues("age");
    if (calculatedAge !== "" && calculatedAge !== String(currentAge)) {
      isAgeEffectFromDob.current = true;
      setValue("age", calculatedAge, { shouldValidate: true });
    }
  }, [dob, setValue, getValues]);

  useEffect(() => {
    if (isAgeEffectFromDob.current) {
      isAgeEffectFromDob.current = false;
      return;
    }
    if (!watchedAge) {
      if (getValues("dob") !== null) {
      }
      return;
    }
    const ageNum = Number(watchedAge);
    if (
      !isNaN(ageNum) &&
      Number.isInteger(ageNum) &&
      ageNum >= 1 &&
      ageNum <= 120
    ) {
      const currentDob = getValues("dob");
      const currentAgeFromDOB = calculateAgeFromDOB(currentDob);
      if (currentAgeFromDOB !== String(watchedAge)) {
        const calculatedDOB = calculateDOBFromAge(watchedAge);
        if (calculatedDOB) {
          isDobEffectFromAge.current = true;
          setValue("dob", calculatedDOB, { shouldValidate: true });
        }
      }
    }
  }, [watchedAge, setValue, getValues]);

  useEffect(() => {
    const fetchPinData = async () => {
      if (pinCodeValue?.length !== 6) return;
      try {
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${pinCodeValue}`,
        );
        const pinCodeData = res.data?.[0]?.PostOffice?.[0];
        if (pinCodeData) {
          setValue("pinCode", pinCodeData.Pincode);
          setValue("locality", pinCodeData.Name);
          setValue("city", pinCodeData.District);
          setValue("state", pinCodeData.State);
          setValue("country", pinCodeData.Country);
        }
      } catch {}
    };
    fetchPinData();
  }, [pinCodeValue, setValue]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data?.ip))
      .catch(() => {});
    setValue("dob", new Date(), { shouldValidate: true });
  }, []);

  const handleSameAsMobileToggle = useCallback(
    (e) => {
      if (e.target.checked) {
        setValue("whatsappNo", watchedMobileNo);
      } else {
        setValue("whatsappNo", "");
      }
    },
    [watchedMobileNo, setValue],
  );

  const handleEmailChange = useCallback((e) => {
    const value = e.target.value;
    setVerifyEmail("");
    if (emailDebounceRef.current) clearTimeout(emailDebounceRef.current);
    if (!value.trim()) return;
    if(errors?.emailId?.message !== "Invalid email format"){
      emailDebounceRef.current = setTimeout(() => {
        verifyUser({ userName: null, emailId: value, mobileNo: null })
          .then((res) => {
            setVerifyEmail(res.data.message);
            if (res.data.message === "Email ID is already taken") {
              errorAlert(res.data.message);
            }
          })
          .catch(() => setVerifyEmail(""));
      }, 500);
    }
  }, []);

  const handleUsernameChange = useCallback(
    (field) => (e) => {
      field.onChange(e);
      const value = e.target.value;
      setUserNameAvailable("");
      if (usernameDebounceRef.current)
        clearTimeout(usernameDebounceRef.current);
      if (!value.trim()) return;
      usernameDebounceRef.current = setTimeout(() => {
        verifyUser({ userName: value, email: null, mobileNo: null })
          .then((res) => {
            setUserNameAvailable(res.data.message);
            if (res.data.message == "Username is already taken") {
              errorAlert(res.data.message);
            }
          })
          .catch(() => setUserNameAvailable(""));
      }, 500);
    },
    [],
  );

  const handleMobileNoChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === "") setValue("whatsappNo", "");
      if (watchedSameAsMobile && value !== "") setValue("whatsappNo", value);
      setVerifyMobile("");
      if (mobileDebounceRef.current) clearTimeout(mobileDebounceRef.current);
      if (!value.trim() || value.length !== 10) return;
      mobileDebounceRef.current = setTimeout(() => {
        verifyUser({ userName: null, email: null, mobileNo: value })
          .then((res) => {
            console.log("SignUpModal", res.data);
            setVerifyMobile(res.data.message);
            if (res.data.message == "Mobile No is already taken") {
              errorAlert(res.data.message);
            }
          })
          .catch(() => setVerifyMobile(""));
      }, 500);
    },
    [watchedSameAsMobile, setValue],
  );

  const switchSx = useMemo(
    () => ({
      "& .MuiSwitch-switchBase.Mui-checked": { color: "#16a34a" },
      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "lightgreen",
      },
    }),
    [],
  );

  return (
    <>
      <Modal
        open={open}
        closeAfterTransition={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 680,
            maxHeight: "90vh",
            mx: 2,
            outline: "none",
          }}
        >
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                key="signup-modal"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ willChange: "transform, opacity", borderRadius: 12 }}
              >
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 3,
                    boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                    position: "relative",
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CancelButtonModal onClick={handleClose} />

                  <Box
                    sx={{
                      p: 4,
                      pt: 3,
                      overflowY: "auto",
                      flex: 1,
                      overscrollBehavior: "contain",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": { display: "none" },
                    }}
                  >
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

                    <form
                      onSubmit={handleSubmit(onSubmit, onFormError)}
                      className="space-y-2 mt-2"
                      autoComplete="off"
                    >
                      <div className="bg-white rounded-[9px] shadow-md border border-[#e6efe3] overflow-hidden">
                        <div className="bg-gradient-to-r from-[#22c55e] to-[#84cc16] px-4 py-3">
                          <h3 className="text-lg sm:text-xl font-bold text-[#2f3e2e] flex items-center gap-2">
                            <span className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm">
                              1
                            </span>
                            Personal Information
                          </h3>
                        </div>
                        <div className="p-4 sm:p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                            <div>
                              <InputField
                                control={control}
                                name="FirstName"
                                label="First Name *"
                                error={errors.FirstName}
                              />
                              {errors.FirstName && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.FirstName.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="lastName"
                                label="Last Name *"
                                error={errors.lastName}
                              />
                              {errors.lastName && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.lastName.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full">
                              <DatePickerField
                                control={control}
                                name="dob"
                                label="Date Of Birth *"
                                disableFuture={true}
                                inputFormat="dd-MM-yyyy"
                                error={errors.dob}
                                dob={true}
                                defaultValue={TODAY}
                              />
                              {errors.dob && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.dob.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="age"
                                label="Age *"
                                error={errors.age}
                                inputProps={{ inputMode: "numeric" }}
                                onKeyDown={numericKeyFilter}
                              />
                              {errors.age && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.age.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div>
                              <DropdownField
                                control={control}
                                name="bloodGroup"
                                placeholder="Select Blood Group *"
                                dataArray={bloodGroupOptions}
                                error={errors.bloodGroup}
                              />
                              {errors.bloodGroup && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.bloodGroup.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="md:col-span-2 xl:col-span-1">
                              <RadioField
                                control={control}
                                name="gender"
                                label="Gender *"
                                dataArray={genderOptions}
                              />
                              {errors.gender && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.gender.message}
                                </FormHelperText>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-[9px] shadow-md border border-[#e6efe3] overflow-hidden">
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
                            <div
                              className="space-y-2"
                              onChange={handleMobileNoChange}
                            >
                              <div className="w-full">
                                <InputField
                                  control={control}
                                  name="mobileNo"
                                  label="Mobile Number *"
                                  error={errors.mobileNo}
                                  inputProps={{ inputMode: "numeric" }}
                                  onKeyDown={numericKeyFilter}
                                />
                                {errors.mobileNo && (
                                  <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                    {errors.mobileNo.message}
                                  </FormHelperText>
                                )}
                                {verifyMobile && (
                                  <p
                                    className={`text-xs m-1 ${
                                      verifyMobile === "Mobile No is available"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {verifyMobile}
                                  </p>
                                )}
                              </div>
                              <FormControlLabel
                                control={
                                  <Switch
                                    onChange={handleSameAsMobileToggle}
                                    sx={switchSx}
                                  />
                                }
                                label="Same as Mobile Number"
                                {...register("sameAsMobileNumber")}
                                name="sameAsMobileNumber"
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    fontSize: "0.875rem",
                                    color: "#4b5563",
                                  },
                                }}
                              />
                            </div>
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="whatsappNo"
                                label="WhatsApp Number"
                                inputProps={{ inputMode: "numeric" }}
                                onKeyDown={numericKeyFilter}
                              />
                              {errors.whatsappNo && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.whatsappNo.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div
                              className="sm:col-span-2"
                              onChange={handleEmailChange}
                            >
                              <InputField
                                control={control}
                                type="email"
                                name="emailId"
                                label="Email *"
                                error={errors.emailId}
                                dontCapitalize="none"
                              />
                              {errors.emailId && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.emailId.message}
                                </FormHelperText>
                              )}
                              {verifyEmail && (
                                <p
                                  className={`text-xs m-1 ${
                                    verifyEmail === "Email ID is available"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {verifyEmail}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-[9px] shadow-md border border-[#e6efe3] overflow-hidden">
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
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="pinCode"
                                label="Pin Code *"
                                error={errors.pinCode}
                              />
                              {errors.pinCode && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.pinCode.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="locality"
                                label="Locality"
                                error={errors.locality}
                              />
                              {errors.locality && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.locality.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="city"
                                label="City *"
                                error={errors.city}
                              />
                              {errors.city && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.city.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="state"
                                label="State *"
                                error={errors.state}
                              />
                              {errors.state && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.state.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="country"
                                label="Country *"
                                error={errors.country}
                              />
                              {errors.country && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.country.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="w-full">
                              <InputField
                                control={control}
                                name="landmark"
                                label="Landmark"
                              />
                              {errors.landmark && (
                                <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                  {errors.landmark.message}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="sm:col-span-2">
                              <div className="w-full">
                                <InputArea
                                  control={control}
                                  name="address"
                                  label="Address"
                                  error={errors.address}
                                  minRows={2}
                                  maxRows={3}
                                />
                                {errors.address && (
                                  <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                    {errors.address.message}
                                  </FormHelperText>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-[9px] shadow-md border border-[#e6efe3] overflow-hidden">
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
                                    onChange={handleUsernameChange(field)}
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
                                    sx={textFieldSx}
                                  />
                                )}
                              />
                              {userNameAvailable && (
                                <p
                                  className={`text-xs ${
                                    userNameAvailable ===
                                    "Username is available"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {userNameAvailable}
                                </p>
                              )}
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
                                          onClick={handleTogglePassword}
                                        >
                                          {showPassword ? (
                                            <VisibilityIcon
                                              sx={{ fontSize: 20 }}
                                            />
                                          ) : (
                                            <VisibilityOffIcon
                                              sx={{ fontSize: 20 }}
                                            />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={textFieldSx}
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
                                          onClick={handleToggleConfirmPassword}
                                        >
                                          {showConfirmPassword ? (
                                            <VisibilityIcon
                                              sx={{ fontSize: 20 }}
                                            />
                                          ) : (
                                            <VisibilityOffIcon
                                              sx={{ fontSize: 20 }}
                                            />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={textFieldSx}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-[9px] shadow-md border border-[#e6efe3] overflow-hidden">
                        <div className="p-4 sm:p-6">
                          <h4 className="text-base sm:text-lg font-bold text-[#2f3e2e] mb-3">
                            Terms and Conditions
                          </h4>
                          <div className="max-h-48 overflow-y-auto p-3 sm:p-4 bg-[#f8fbf6] rounded-xl border border-[#e6efe3] text-xs sm:text-sm text-[#4b5563] leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                                2. Wellness Services &amp; Consultation
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
                              <strong>
                                3. Health Information &amp; Privacy
                              </strong>
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
                              <strong>
                                5. Product Usage &amp; Responsibility
                              </strong>
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
                              <strong>6. Account Security &amp; Usage</strong>
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
                                        "&.Mui-checked": { color: "#7aa874" },
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

                      <motion.div
                        whileHover={agreeToTerms ? { y: -2 } : {}}
                        whileTap={agreeToTerms ? { scale: 0.99 } : {}}
                        style={{ willChange: "transform" }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          disabled={isDisabled}
                          sx={{
                            borderRadius: 3,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "1rem",
                            background: isDisabled
                              ? "#e0e0e0"
                              : "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
                            color: isDisabled ? "#9e9e9e" : "#ffffff",
                            boxShadow: isDisabled
                              ? "none"
                              : "0 4px 15px rgba(127, 176, 105, 0.3)",
                            transition: "all 0.3s ease",

                            "&:hover": {
                              background: isDisabled
                                ? "#e0e0e0"
                                : "linear-gradient(135deg, #16a34a 0%, #65a30d 100%)",
                              boxShadow: isDisabled
                                ? "none"
                                : "0 6px 18px rgba(127, 176, 105, 0.4)",
                            },

                            "&.Mui-disabled": {
                              background: "#e0e0e0",
                              color: "#9e9e9e",
                              cursor: "not-allowed",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Sign Up
                        </Button>
                      </motion.div>

                      <div className="flex justify-center items-center space-x-3 mt-5">
                        <p className="text-ayuBrown">
                          Already have an account?
                        </p>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Modal>
      <ConfirmationModal
        confirmationOpen={openConfirmationModal}
        confirmationHandleClose={handleCloseConfirmation}
        confirmationSubmitFunc={handleUserSignup}
        confirmationLabel="Confirm Registration"
        confirmationMsg="Are you sure you want to create this account?"
        confirmationButtonMsg="Confirm"
      />
    </>
  );
}
