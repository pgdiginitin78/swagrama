import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Modal } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Camera,
  CheckCircle,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { getUserDetails, signupJYA } from "../../services/login/LoginServices";
import CancelButtonModal from "../common/button/CancelButtonModal";
import CommonButton from "../common/button/CommonButton";
import DatePickerField from "../common/formFields/DatePickerField";
import InputArea from "../common/formFields/InputArea";
import InputField from "../common/formFields/InputField";
import RadioField from "../common/formFields/RadioField";
import { errorAlert, successAlert } from "../common/toast/CustomToast";
import { useLoader } from "../common/commonLoader/LoaderContext";
import ConfirmationModal from "../common/ConfirmationModal";

const schema = yup.object().shape({
  FirstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dob: yup.date().nullable().required("Date of birth is required"),
  age: yup.number().typeError("Age is required").required("Age is required"),
  mobileNo: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Must be 10 digits"),
  whatsappNo: yup.string().nullable(),
  emailId: yup.string().required("Email is required").email("Invalid format"),
  pinCode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Must be 6 digits"),
  address: yup.string().required("Address is required"),
  locality: yup.string().required("Locality is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  userName: yup.string().required("Username is required"),
  occupation: yup.string().nullable(),
  gender: yup.string().required("Gender is required"),
});

const containerVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

const genderOptions = [
  { id: "Male", value: "Male", label: "Male" },
  { id: "Female", value: "Female", label: "Female" },
  { id: "Other", value: "Other", label: "Other" },
];

const SectionCard = ({
  icon,
  iconBg,
  iconColor,
  title,
  children,
  className = "",
}) => (
  <section
    className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}
  >
    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100">
      <div className={`p-1.5 rounded-lg ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
        {title}
      </h3>
    </div>
    <div className="p-4">{children}</div>
  </section>
);

const ManageProfileModal = ({ open, onClose, user: authUser, onSave }) => {
  const { user } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(authUser?.avatar || null);
  const [formData, setFormData] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);

  const fileRef = useRef();
  const { setIsLoading } = useLoader();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      FirstName: "",
      lastName: "",
      dob: null,
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
      userName: "",
      occupation: "",
    },
    mode: "onChange",
  });

  const dobValue = watch("dob");
  const pinCodeValue = watch("pinCode");

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      dob:
        data.dob && !isNaN(new Date(data.dob).getTime())
          ? format(new Date(data.dob), "yyyy-MM-dd")
          : "",
      macIp: ipAddress,
      userId: user?.userId,
    };
    setFormData(formattedData);
    setOpenConfirmationModal(true);
  };

  const handleUserSignup = async () => {
    try {
      setOpenConfirmationModal(false);
      setIsLoading(true);
      const response = await signupJYA(formData);
      const apiData = response?.data;
      if (response.status === 200 && apiData) {
        successAlert(apiData);
        onClose();
        reset();
        setIsLoading(false);
      } else {
        errorAlert("Registration failed");
        setIsLoading(false);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      errorAlert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open && user?.userId) {
      getUserDetails(user.userId)
        .then((res) => {
          const userData = res?.data?.data;
          if (userData) {
            setValue("FirstName", userData.firstName || "");
            setValue("lastName", userData.lastName || "");
            setValue("mobileNo", userData.whatsappNo || "");
            setValue("whatsappNo", userData.whatsappNo || "");
            setValue("emailId", userData.emailId || "");
            if (userData.dob) setValue("dob", new Date(userData.dob));
            const filterGender = genderOptions.find(
              (item) =>
                item.label?.toLowerCase() === userData?.gender?.toLowerCase(),
            );
            if (filterGender) setValue("gender", filterGender.value);
            setValue("age", userData.age || "");
            setValue("address", userData.address || "");
            setValue("city", userData.city || "");
            setValue("state", userData.state || "");
            setValue("pinCode", userData.pinCode || "");
            setValue("locality", userData.locality || "");
            setValue("country", userData.country || "India");
            setValue("userName", userData.userName || "");
            setValue("occupation", userData.occupation || "");
            if (userData.avatar) setAvatarPreview(userData.avatar);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user details:", err);
          errorAlert("Failed to fetch user details.");
        });
    }
  }, [open, user, setValue]);

  useEffect(() => {
    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }
      if (calculatedAge >= 0) setValue("age", calculatedAge);
    }
  }, [dobValue, setValue]);

  useEffect(() => {
    const fetchPinData = async () => {
      if (pinCodeValue?.length !== 6) return;
      try {
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${pinCodeValue}`,
        );
        const pinCodeData = res.data[0]?.PostOffice?.[0];
        if (pinCodeData) {
          setValue("locality", pinCodeData.Name);
          setValue("city", pinCodeData.District);
          setValue("state", pinCodeData.State);
          setValue("country", pinCodeData.Country);
        }
      } catch (error) {
        console.error("PIN Fetch Error:", error);
      }
    };
    fetchPinData();
  }, [pinCodeValue, setValue]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data?.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          "@media (min-width: 640px)": { alignItems: "center" },
        }}
      >
        <Box sx={{ outline: "none", width: "100%" }}>
          
          <AnimatePresence>
            {open && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-[92vw] md:w-[85vw] lg:w-[960px] mx-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl shadow-2xl bg-white overflow-hidden border border-emerald-100"
              >
                <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-4 sm:px-6 py-3.5 sm:py-4 relative shrink-0">
              
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="shrink-0 bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-lg border border-white/30">
                        <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-base sm:text-xl font-black text-white leading-tight truncate">
                          Manage Profile
                        </h2>
                        <p className="text-white/70 text-[10px] sm:text-xs font-medium hidden sm:block">
                          Update your personal information
                        </p>
                      </div>
                    </div>
                    <CancelButtonModal onClick={onClose} />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/40">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4"
                  >
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100">
                        <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
                          Profile
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                          <div className="flex flex-col items-center gap-2 shrink-0">
                            <div
                              className="relative group cursor-pointer"
                              onClick={() => fileRef.current?.click()}
                            >
                              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-emerald-100 shadow-md bg-emerald-50 flex items-center justify-center">
                                {avatarPreview ? (
                                  <img
                                    src={avatarPreview}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <UserIcon className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-200" />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-active:opacity-100 flex items-center justify-center transition-opacity duration-200 rounded-xl">
                                  <Camera className="w-5 h-5 text-white" />
                                </div>
                              </div>
                              <button
                                type="button"
                                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 sm:p-1.5 rounded-lg shadow-md border-2 border-white hover:bg-emerald-600 active:scale-95 transition-all"
                              >
                                <Camera
                                  size={12}
                                  className="sm:w-3.5 sm:h-3.5"
                                />
                              </button>
                            </div>
                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              Photo
                            </p>
                            <input
                              ref={fileRef}
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={handleAvatarChange}
                            />
                          </div>

                          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            <div className="sm:col-span-2">
                              <InputField
                                control={control}
                                name="userName"
                                label="Username *"
                                error={errors.userName}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <SectionCard
                        icon={<Calendar size={16} />}
                        iconBg="bg-amber-100"
                        iconColor="text-amber-600"
                        title="Personal Information"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2 sm:col-span-1">
                            <DatePickerField
                              control={control}
                              name="dob"
                              label="Date of Birth *"
                              disableFuture
                              error={errors.dob}
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <InputField
                              control={control}
                              name="age"
                              label="Age"
                              error={errors.age}
                              disabled
                            />
                          </div>
                          <div className="col-span-2">
                            <RadioField
                              control={control}
                              name="gender"
                              label="Gender *"
                              dataArray={genderOptions}
                            />
                          </div>
                        </div>
                      </SectionCard>

                      <SectionCard
                        icon={<Phone size={16} />}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        title="Contact Information"
                      >
                        <div className="space-y-3">
                          <InputField
                            control={control}
                            name="mobileNo"
                            label="Mobile Number *"
                            error={errors.mobileNo}
                          />
                          <InputField
                            control={control}
                            name="whatsappNo"
                            label="WhatsApp Number"
                          />
                          <InputField
                            control={control}
                            name="emailId"
                            label="Email Address *"
                            error={errors.emailId}
                          />
                        </div>
                      </SectionCard>
                    </div>

                    <SectionCard
                      icon={<MapPin size={16} />}
                      iconBg="bg-emerald-100"
                      iconColor="text-emerald-600"
                      title="Address Information"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="col-span-1">
                          <InputField
                            control={control}
                            name="pinCode"
                            label="Pincode *"
                            error={errors.pinCode}
                          />
                        </div>
                        <div className="col-span-1">
                          <InputField
                            control={control}
                            name="locality"
                            label="Locality *"
                            error={errors.locality}
                          />
                        </div>
                        <div className="col-span-1">
                          <InputField
                            control={control}
                            name="city"
                            label="City *"
                            error={errors.city}
                          />
                        </div>
                        <div className="col-span-1">
                          <InputField
                            control={control}
                            name="state"
                            label="State *"
                            error={errors.state}
                          />
                        </div>
                        <div className="col-span-1">
                          <InputField
                            control={control}
                            name="country"
                            label="Country *"
                            error={errors.country}
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1 md:col-span-3">
                          <InputArea
                            control={control}
                            name="address"
                            label="Address *"
                            error={errors.address}
                            minRows={1}
                          />
                        </div>
                      </div>
                    </SectionCard>
                  </form>
                </div>

                <div className="shrink-0 px-3 sm:px-6 py-3 sm:py-4 border-t border-slate-100 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-xs font-medium shrink-0">
                      <CheckCircle size={13} />
                      <span>SSL encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
                      <CommonButton
                        type="button"
                        label="Reset"
                        onClick={reset}
                        className="flex-1 sm:flex-initial text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 active:scale-95 transition-all text-sm py-2 px-4 rounded-lg font-bold"
                      />
                      <CommonButton
                        onClick={handleSubmit(onSubmit)}
                        disabled={
                          !isDirty && authUser?.avatar === avatarPreview
                        }
                        label="Update Profile"
                        className="flex-[2] sm:flex-initial bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black shadow-md hover:shadow-lg active:scale-95 transition-all disabled:grayscale disabled:opacity-50 text-sm py-2 px-5 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Modal>

      <ConfirmationModal
        confirmationOpen={openConfirmationModal}
        confirmationHandleClose={() => setOpenConfirmationModal(false)}
        confirmationSubmitFunc={handleUserSignup}
        confirmationLabel="Confirm Registration"
        confirmationMsg="Are you sure you want to update this account profile"
        confirmationButtonMsg="Confirm"
      />
    </>
  );
};

export default ManageProfileModal;
