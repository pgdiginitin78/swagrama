import { yupResolver } from "@hookform/resolvers/yup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CommonButton from "../../../common/button/CommonButton";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputField from "../../../common/formFields/InputField";
import CancelButtonModal from "../../../common/button/CancelButtonModal";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Min 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Min 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  countryCode: yup.object().required("Required"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Must be 10 digits"),
  bookingDate: yup
    .date()
    .required("Booking date is required")
    .typeError("Invalid date"),
  adultMale: yup.number().min(0).default(0),
  adultFemale: yup.number().min(0).default(0),
  adultOther: yup.number().min(0).default(0),
  child0to6: yup.number().min(0).default(0),
  child7to12: yup.number().min(0).default(0),
  specialRequests: yup.string().max(500, "Max 500 characters"),
});

const VisitorsFormModal = ({ open, handleClose, serviceDetails }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: { value: "+91", label: "+91" },
      mobileNumber: "",
      bookingDate: new Date(),
      adultMale: 0,
      adultFemale: 0,
      adultOther: 0,
      child0to6: 0,
      child7to12: 0,
      specialRequests: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data) => {
    console.log("Visitor Booking Data:", {
      service: serviceDetails?.serviceName,
      ...data,
    });
    // Here you would typically call an API
    handleClose();
  };

  if (!serviceDetails) return null;

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col outline-none">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-600 to-lime-500 p-3 text-white shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex space-x-3 items-center">
              <p className="font-bold flex items-center gap-2">
                <span className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  {serviceDetails.icon &&
                  typeof serviceDetails.icon === "function" ? (
                    <serviceDetails.icon />
                  ) : (
                    serviceDetails.icon || <GroupsIcon />
                  )}
                </span>
              </p>
              <div className="flex flex-col">
                <h2>{serviceDetails.serviceName}</h2>
                <h3 variant="body2" className="mt-1 opacity-90 font-medium">
                  {serviceDetails.nameHindi}
                </h3>
              </div>
            </div>
            <CancelButtonModal onClick={handleClose} />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Service Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-lime-50 rounded-2xl p-4 border border-lime-100"
          >
            <div className="flex items-center gap-2">
              <AccessTimeIcon className="text-green-600" fontSize="small" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                  In Time
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {serviceDetails.checkIn}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AccessTimeIcon className="text-lime-600" fontSize="small" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                  Out Time
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {serviceDetails.checkOut}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-2 md:col-span-1">
              <CurrencyRupeeIcon className="text-green-700" fontSize="small" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                  Price
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {serviceDetails.price}
                </p>
              </div>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-green-800 flex items-center gap-2 border-b border-green-100 pb-2">
                <PersonOutlineIcon fontSize="small" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  control={control}
                  name="firstName"
                  label="First Name"
                  error={errors.firstName}
                />
                <InputField
                  control={control}
                  name="lastName"
                  label="Last Name"
                  error={errors.lastName}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  control={control}
                  name="email"
                  label="Email Address"
                  type="email"
                  error={errors.email}
                />
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <DropdownField
                      control={control}
                      name="countryCode"
                      placeholder="Code"
                      dataArray={[
                        { value: "+91", label: "+91" },
                        { value: "+1", label: "+1" },
                        { value: "+44", label: "+44" },
                      ]}
                      error={errors.countryCode}
                    />
                  </div>
                  <div className="flex-1">
                    <InputField
                      control={control}
                      name="mobileNumber"
                      label="Mobile Number"
                      type="tel"
                      error={errors.mobileNumber}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-green-800 flex items-center gap-2 border-b border-green-100 pb-2">
                <EventIcon fontSize="small" />
                Visit Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePickerField
                  control={control}
                  name="bookingDate"
                  label="Booking Date"
                  error={errors.bookingDate}
                  minDate={new Date()}
                />
              </div>
            </div>

            {/* Guests Configuration */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-green-800 flex items-center gap-2 border-b border-green-100 pb-2">
                <GroupsIcon fontSize="small" />
                Guest Details
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <InputField
                  control={control}
                  name="adultMale"
                  label="Adults (Male)"
                  type="number"
                  error={errors.adultMale}
                />
                <InputField
                  control={control}
                  name="adultFemale"
                  label="Adults (Female)"
                  type="number"
                  error={errors.adultFemale}
                />
                <InputField
                  control={control}
                  name="adultOther"
                  label="Adults (Other)"
                  type="number"
                  error={errors.adultOther}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  control={control}
                  name="child0to6"
                  label="Children (0-6 yrs)"
                  type="number"
                  error={errors.child0to6}
                />
                <InputField
                  control={control}
                  name="child7to12"
                  label="Children (7-12 yrs)"
                  type="number"
                  error={errors.child7to12}
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <InputField
                control={control}
                name="specialRequests"
                label="Special Requests (Optional)"
                multiline
                rows={3}
                error={errors.specialRequests}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 w-full pt-4 justify-end">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
             
                onClick={handleClose}
              >
                <CommonButton
                  type="button"
                  className="border border-red-600 text-red-600 hover:shadow-xl transition-all"
                  label="Cancel"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
          
              >
                <CommonButton
                  type="submit"
                  className=" bg-gradient-to-r from-green-600 to-lime-500 text-white  shadow-lg hover:shadow-xl transition-all"
                  label="Book Visit Now"
                />
              </motion.div>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default VisitorsFormModal;
