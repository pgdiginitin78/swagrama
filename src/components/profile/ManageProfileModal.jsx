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
  User as UserIcon
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { getUserDetails } from "../../services/login/LoginServices";
import CancelButtonModal from "../common/button/CancelButtonModal";
import CommonButton from "../common/button/CommonButton";
import DatePickerField from "../common/formFields/DatePickerField";
import InputArea from "../common/formFields/InputArea";
import InputField from "../common/formFields/InputField";
import RadioField from "../common/formFields/RadioField";
import { errorAlert, successAlert } from "../common/toast/CustomToast";

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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const ManageProfileModal = ({ open, onClose, user: authUser, onSave }) => {
  const { user } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(authUser?.avatar || null);
  const fileRef = useRef();

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
            setValue("age", userData.age || "");
            setValue("gender", userData.gender || "Male");
            setValue("address", userData.address || "");
            setValue("city", userData.city || "");
            setValue("state", userData.state || "");
            setValue("pinCode", userData.pincode || "");
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

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const onFormSubmit = (data) => {
    const updated = {
      ...authUser,
      ...data,
      avatar: avatarPreview,
      firstName: data.FirstName,
      email: data.emailId,
      phone: data.mobileNo,
      dob: data.dob ? format(new Date(data.dob), "yyyy-MM-dd") : "",
    };
    onSave(updated);
    successAlert("Profile updated successfully!");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ outline: "none" }}>
        <AnimatePresence>
          {open && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[1000px] max-h-[95vh] overflow-hidden rounded-[9px] shadow-2xl bg-white border border-emerald-100 flex flex-col"
            >
              <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-6 py-4 relative ">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-[9px] border border-white/30 shadow-inner">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-white ">
                        Manage Profile
                      </h2>
                    </div>
                  </div>
                  <CancelButtonModal onClick={onClose} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-slate-50/30">
                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-3 flex flex-col items-center">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-[9px] overflow-hidden border-2 border-white shadow-lg bg-emerald-50 flex items-center justify-center relative transition-transform group-hover:scale-105 duration-300">
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-12 h-12 text-emerald-200" />
                          )}
                          <div
                            onClick={() => fileRef.current?.click()}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300"
                          >
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-[9px] shadow-lg border-2 border-white hover:bg-emerald-600 transition-colors"
                        >
                          <Camera size={14} />
                        </button>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Profile Picture
                      </p>
                    </div>

                    <div className="lg:col-span-9 bg-white p-4 rounded-[9px] border border-slate-200 shadow-sm relative overflow-hidden">
                      <div>
                        <h3 className="text-base font-black text-slate-800 mb-2 flex items-center gap-2">
                          User Info
                        </h3>
                      </div>
                      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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

                        <div className="space-y-1 col-span-2">
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

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <section className="bg-white p-5 rounded-[9px] shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-amber-100 rounded-[9px] text-amber-600">
                          <Calendar size={18} />
                        </div>
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <div className="sm:col-span-2">
                          <RadioField
                            control={control}
                            name="gender"
                            label="Gender *"
                            dataArray={[
                              { id: "Male", value: "Male", label: "Male" },
                              {
                                id: "Female",
                                value: "Female",
                                label: "Female",
                              },
                              { id: "Other", value: "Other", label: "Other" },
                            ]}
                          />
                        </div>
                      </div>
                    </section>
                    <section className="bg-white p-5 rounded-[9px] shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-[9px] text-blue-600">
                          <Phone size={18} />
                        </div>
                        Contact Information
                      </h3>
                      <div className="space-y-4">
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
                    </section>
                    <section className="lg:col-span-2 bg-white p-5 rounded-[9px] shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-100 rounded-[9px] text-emerald-600">
                          <MapPin size={18} />
                        </div>
                        Address Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <InputField
                          control={control}
                          name="pinCode"
                          label="Pincode *"
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

                        <div className="md:col-span-1">
                          <InputField
                            control={control}
                            name="country"
                            label="Country *"
                            error={errors.country}
                          />
                        </div>

                        <div className="md:col-span-3">
                          <InputArea
                            control={control}
                            name="address"
                            label="Address *"
                            error={errors.address}
                            minRows={1}
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                </form>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
                <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <CheckCircle size={14} /> Data is secured with SSL encryption
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex-1 sm:flex-initial">
                    <CommonButton
                      type="button"
                      label="Reset"
                      onClick={reset}
                      className={"text-red-600 border border-red-600"}
                    />
                  </div>
                  <div className="flex-[2] sm:flex-initial">
                    <CommonButton
                      onClick={handleSubmit(onFormSubmit)}
                      disabled={!isDirty && authUser?.avatar === avatarPreview}
                      label="Update"
                      className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:grayscale disabled:opacity-50 text-sm"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Modal>
  );
};

export default ManageProfileModal;
