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
import { ModalStyle } from "../common/modalStyle/ModalStyle";

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
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  userName: yup.string().required("Username is required"),
  occupation: yup.string().nullable(),
  gender: yup.string().required("Gender is required"),
});

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const genderOptions = [
  { id: "Male", value: "Male", label: "Male" },
  { id: "Female", value: "Female", label: "Female" },
  { id: "Other", value: "Other", label: "Other" },
];

const SectionLabel = ({ icon, iconBg, iconColor, title }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className={`p-1.5 rounded-md ${iconBg}`}>
      <span className={iconColor}>{icon}</span>
    </div>
    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
      {title}
    </span>
    <div className="flex-1 h-px bg-slate-100" />
  </div>
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
      console.log("apiData",response);      
      if (response.status === 200 && apiData) {
        successAlert(response?.data);
        onClose();
        reset();
      } 
      setIsLoading(false);
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
      <Modal open={open}>
        <Box
          sx={{
            ...ModalStyle,
            overflow: "hidden",
            p: 0,
            border: "none",
            borderRadius: "16px",
          }}
          className="w-[95%] md:w-[75%] lg:w-[40%] max-h-[90vh] h-full"
        >
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col h-full bg-white"
            >
                <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-4 py-3 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-lg border border-white/30">
                        <UserIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="text-base font-black text-white leading-tight">
                          Manage Profile
                        </h2>
                        <p className="text-white/70 text-[10px] font-medium">
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
                    className="p-3 space-y-4"
                  >
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="relative group cursor-pointer shrink-0"
                          onClick={() => fileRef.current?.click()}
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-emerald-100 bg-emerald-50 flex items-center justify-center">
                            {avatarPreview ? (
                              <img
                                src={avatarPreview}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UserIcon className="w-7 h-7 text-emerald-200" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-active:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                              <Camera className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <button
                            type="button"
                            className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-md shadow border-2 border-white hover:bg-emerald-600 active:scale-95 transition-all"
                          >
                            <Camera size={10} />
                          </button>
                          <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAvatarChange}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Profile Photo
                          </p>
                          <p className="text-xs text-slate-500">
                            Tap to upload a new photo
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                      <SectionLabel
                        icon={<UserIcon size={14} />}
                        iconBg="bg-purple-100"
                        iconColor="text-purple-600"
                        title="Basic Info"
                      />
                      <div className="grid grid-cols-2 gap-2.5">
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
                        <div className="col-span-2">
                          <InputField
                            control={control}
                            name="userName"
                            label="Username *"
                            error={errors.userName}
                          />
                        </div>
                        <div className="col-span-2">
                          <InputField
                            control={control}
                            name="occupation"
                            label="Occupation"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                      <SectionLabel
                        icon={<Calendar size={14} />}
                        iconBg="bg-amber-100"
                        iconColor="text-amber-600"
                        title="Personal Information"
                      />
                      <div className="grid grid-cols-2 gap-2.5">
                        <DatePickerField
                          control={control}
                          name="dob"
                          label="Date of Birth *"
                          disableFuture
                          error={errors.dob}
                        />
                        <InputField
                          control={control}
                          name="age"
                          label="Age"
                          error={errors.age}
                          disabled
                        />
                        <div className="col-span-2">
                          <RadioField
                            control={control}
                            name="gender"
                            label="Gender *"
                            dataArray={genderOptions}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                      <SectionLabel
                        icon={<Phone size={14} />}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        title="Contact Information"
                      />
                      <div className="grid md:grid-cols-2 gap-3">
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
                        <div className="col-span-2">
                          <InputField
                            control={control}
                            name="emailId"
                            label="Email Address *"
                            error={errors.emailId}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                      <SectionLabel
                        icon={<MapPin size={14} />}
                        iconBg="bg-emerald-100"
                        iconColor="text-emerald-600"
                        title="Address Information"
                      />
                      <div className="grid grid-cols-2 gap-2.5">
                        <InputField
                          control={control}
                          name="pinCode"
                          label="Pincode *"
                          error={errors.pinCode}
                        />
                        <InputField
                          control={control}
                          name="locality"
                          label="Locality"
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
                        <div className="col-span-2">
                          <InputArea
                            control={control}
                            name="address"
                            label="Address *"
                            error={errors.address}
                            minRows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="shrink-0 px-3 py-3 border-t border-slate-100 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1 text-slate-400 text-[10px] font-medium shrink-0">
                      <CheckCircle size={11} />
                      <span>SSL encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:ml-auto sm:w-auto">
                      <CommonButton
                        type="button"
                        label="Reset"
                        onClick={reset}
                        className="flex-1 sm:flex-initial text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 active:scale-95 transition-all text-sm"
                      />
                      <CommonButton
                        onClick={handleSubmit(onSubmit)}
                        disabled={
                          !isDirty && authUser?.avatar === avatarPreview
                        }
                        label="Update Profile"
                        className="flex-[2] sm:flex-initial bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black shadow-md hover:shadow-lg active:scale-95 transition-all disabled:grayscale disabled:opacity-50 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
      
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
