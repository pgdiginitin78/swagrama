import { yupResolver } from "@hookform/resolvers/yup";
import {
  CardGiftcard,
  Info,
  LocalOffer,
  Phone,
  Schedule,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import SearchDropdown from "../../../common/formFields/SearchDropdown";
import { successAlert } from "../../../common/toast/CustomToast";
import RegisterNewPatient from "./RegisterNewPatient";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";



const schema = yup.object().shape({
  searchPatientName: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),
  selectClinic: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),
  searchDoctor: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),
  selectDepartment: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),
  date: yup
    .date()
    .nullable()
    .required("Please select a date")
    .min(new Date(), "Date must be today or later"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function OPDBookingModal({
  open,
  handleClose,
  selectedService,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      selectClinic: null,
      searchDoctor: null,
      searchPatientName: null,
      selectDepartment: null,
      date: null,
    },
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [openPatientRegistrationModal, setOpenPatientRegistrationModal] =
    useState(false);

  const onSubmitHandler = (data) => {
    console.log("Form Data =>", data);
    successAlert("Appointment Booked Successfully!");
    handleClose();
  };
  console.log("selectedService", selectedService);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="booking-modal-title"
      >
        <Box
          sx={style}
          className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[55%]  rounded-lg relative overflow-y-auto max-h-[95vh]"
        >
          <CancelButtonModal onClick={handleClose} />

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg p-2 mb-2 border border-green-200 mt-5"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-green-600 to-lime-600 p-1 rounded-lg"
                  >
                    <CalendarTodayIcon className="text-white text-sm" />
                  </motion.div>
                  <div>
                    <h1 className="font-semibold text-sm text-ayuDark">
                      Book Appointment
                    </h1>
                    <p className="text-xs text-gray-600">
                      Schedule Your Visit With Us
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <CommonButton
                  type="button"
                  label="+ Add New Patient"
                  className="bg-gradient-to-r from-ayuBrown to-amber-600 text-white px-3 py-1 rounded-lg text-xs font-semibold w-full sm:w-auto"
                  onClick={() => {
                    setOpenPatientRegistrationModal(true);
                  }}
                />
              </motion.div>
            </div>

            {selectedService !== undefined && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 bg-white rounded-md border-l-2 border-green-600"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1 px-2">
                  <div className="flex items-center gap-1">
                    <InfoOutlinedIcon className="text-green-500 text-xs" />
                    <span className="text-xs font-semibold text-gray-700">
                      Service Name:
                    </span>
                    <span className="text-xs font-bold text-green-600">
                      {selectedService?.serviceName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 pl-3 sm:pl-0">
                    <CurrencyRupeeIcon className="text-green-500 text-xs" />
                    <span className="text-xs font-semibold text-gray-700">
                      Service Price:
                    </span>
                    <span className="text-xs font-bold text-green-600">
                      {selectedService?.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

   

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="space-y-2"
            >
              {/* Form Fields */}
              <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg p-2 border border-green-200">
                <h3 className="text-xs font-semibold text-gray-800 mb-2 flex items-center gap-1">
                  <div className="w-1 h-4 bg-gradient-to-b from-green-600 to-lime-600 rounded-full"></div>
                  Appointment Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Patient Information
                    </label>
                    <SearchDropdown
                      control={control}
                      name="searchPatientName"
                      placeholder="Search By Patient Name*"
                      handleInputChange={(e) => {
                        console.log("searchByPatientName", e);
                      }}
                      searchIcon={true}
                      isClearable={true}
                      error={errors.searchPatientName}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Clinic Location
                    </label>
                    <DropdownField
                      control={control}
                      name="selectClinic"
                      placeholder="Select Clinic *"
                      label="Doctor"
                      error={errors?.selectClinic}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Department
                    </label>
                    <DropdownField
                      control={control}
                      name="selectDepartment"
                      placeholder="Select Department *"
                      label="Doctor"
                      error={errors?.selectDepartment}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Doctor
                    </label>
                    <DropdownField
                      control={control}
                      name="searchDoctor"
                      placeholder="Select Doctor *"
                      label="Doctor"
                      error={errors?.searchDoctor}
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Preferred Date
                    </label>
                    <DatePickerField
                      control={control}
                      name="date"
                      label="Appointment Date *"
                      error={errors.date}
                      disablePast={true}
                      inputFormat={"dd-MM-yyyy"}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="col-span-2">
                <div className=" mx-auto p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg">
                  <motion.div
                    className="mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex space-x-3 items-center">
                      <motion.div
                        className="inline-flex items-center justify-center w-9 h-9 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full mb-2 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Clock className="w-6 h-6 text-white" />
                      </motion.div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Choose Your Time
                      </h2>
                    </div>

                    <p className="text-left text-sm text-gray-600">
                      Select a convenient time slot for your appointment
                    </p>
                  </motion.div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlotData.map((slot, index) => {
                      const isSelected =
                        selectedTimeSlot?.slotStartTime === slot.slotStartTime;

                      return (
                        <motion.button
                          type="button"
                          key={index}
                          onClick={() =>
                            setSelectedTimeSlot(isSelected ? null : slot)
                          }
                          className={`
                          relative
                          flex flex-col items-center justify-center
                          p-2 rounded-lg
                          border
                          ${
                            isSelected
                              ? "border-amber-600 bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg"
                              : "border-gray-200 bg-white text-gray-700"
                          }
                        `}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 25,
                                }}
                              >
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div className="text-center">
                            <div
                              className={`text-sm font-medium ${
                                isSelected ? "text-white" : "text-gray-800"
                              }`}
                            >
                              {slot.slotStartTime}
                            </div>
                            <div
                              className={`text-xs ${
                                isSelected ? "text-amber-100" : "text-gray-500"
                              }`}
                            >
                              {slot.slotEndTime}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  <AnimatePresence>
                    {selectedTimeSlot && (
                      <motion.div
                        className="mt-4 p-4 bg-white rounded-xl shadow-md border-2 border-amber-200"
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 20, height: 0 }}
                        transition={{ duration: 0.4 }}
                      ></motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Selected Time Slot
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {selectedTimeSlot.slotStartTime} -{" "}
                        {selectedTimeSlot.slotEndTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600">
                        Appointment Fee : ₹750
                      </p>
                      <p className="text-sm font-medium text-ayuBrown">
                        *All bookings are non-refundable.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Coming Soon Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-white rounded-lg overflow-hidden border border-green-200"
                >
                  <div className="bg-gradient-to-br from-green-600 to-lime-600 p-2 relative overflow-hidden">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-10 -right-10 w-20 h-20 bg-white rounded-full blur-3xl"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-10 -left-10 w-20 h-20 bg-white rounded-full blur-3xl"
                    />

                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                        className="bg-white/20 backdrop-blur-sm p-1 rounded-lg"
                      >
                        <Schedule className="text-white text-sm" />
                      </motion.div>
                      <div className="text-center sm:text-left">
                        <h4 className="text-xs font-semibold text-white mb-0.5">
                          Online Booking Coming Soon
                        </h4>
                        <p className="text-green-100 text-xs">
                          We're preparing something special for you
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-2">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                      className="relative"
                    >
                      <motion.div
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="bg-gradient-to-r from-ayuBrown to-amber-600 bg-[length:200%_100%] rounded-lg p-2 relative overflow-hidden"
                      >
                        <motion.div
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        />

                        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2">
                          <motion.div
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <CardGiftcard className="text-white text-sm" />
                          </motion.div>
                          <motion.p
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xs font-semibold text-white text-center"
                          >
                            Call Now for Exclusive Benefits & Special Discounts!
                          </motion.p>
                          <motion.div
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: 0.5,
                            }}
                          >
                            <LocalOffer className="text-white text-sm" />
                          </motion.div>
                        </div>

                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                              y: [0, -20],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                            style={{
                              top: `${20 + i * 15}%`,
                              left: `${10 + i * 20}%`,
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Contact Numbers */}
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-0.5 w-5 bg-gradient-to-r from-green-600 to-transparent rounded-full" />
                        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Contact for Booking & Details
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Primary Contact */}
                        <motion.a
                          href="tel:+919272130399"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-lime-600 text-white px-2 py-1.5 rounded-lg transition-all duration-300"
                        >
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 2,
                                }}
                                className="bg-white/20 p-1 rounded-md"
                              >
                                <Phone className="text-xs" />
                              </motion.div>
                              <div>
                                <span className="text-xs text-green-100 block mb-0.5">
                                  Primary Contact
                                </span>
                                <span className="font-semibold text-xs tracking-wide">
                                  +91 9272130399
                                </span>
                              </div>
                            </div>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-white/60 text-xs"
                            >
                              →
                            </motion.div>
                          </div>
                        </motion.a>

                        {/* Alternate Contact */}
                        <motion.a
                          href="tel:+919272110399"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-lime-600 text-white px-2 py-1.5 rounded-lg transition-all duration-300"
                        >
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 2,
                                  delay: 0.5,
                                }}
                                className="bg-white/20 p-1 rounded-md"
                              >
                                <Phone className="text-xs" />
                              </motion.div>
                              <div>
                                <span className="text-xs text-green-100 block mb-0.5">
                                  Alternate Contact
                                </span>
                                <span className="font-semibold text-xs tracking-wide">
                                  +91 9272110399
                                </span>
                              </div>
                            </div>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: 0.3,
                              }}
                              className="text-white/60 text-xs"
                            >
                              →
                            </motion.div>
                          </div>
                        </motion.a>
                      </div>
                    </div>

                    {/* Important Information */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg p-2 border border-green-200"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-0.5 w-5 bg-gradient-to-r from-green-400 to-transparent rounded-full" />
                        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Appointment Information
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        {/* Consultation Fee */}
                        <motion.div
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-2 bg-white p-2 rounded-lg border border-green-200"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                            className="bg-green-100 p-1 rounded-md"
                          >
                            <Info className="text-green-500 text-xs" />
                          </motion.div>
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5 whitespace-nowrap">
                              Consultation Fee
                            </p>
                            <p className="text-sm font-bold text-green-600">
                              ₹750
                            </p>
                          </div>
                        </motion.div>

                        {/* Important Notice */}
                        <motion.div
                          whileHover={{ x: 3 }}
                          className="flex items-start gap-2 bg-amber-50 p-2 rounded-lg border border-amber-200"
                        >
                          <span className="text-ayuBrown font-bold text-sm mt-0.5">
                            ⚠
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-ayuDark mb-0.5">
                              Important Notice
                            </p>
                            <p className="text-xs text-gray-700">
                              All bookings are non-refundable. Please ensure
                              your availability before confirming.
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-end gap-2 pt-2 "
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <CommonButton
                    type="button"
                    label="Reset"
                    className="text-red-600 border border-red-600 "
                    onClick={() => reset()}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <CommonButton
                    type="submit"
                    label="Book Appointment"
                    disabled={true}
                    className="bg-gradient-to-r from-green-500 to-lime-500 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed "
                  />
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </Box>
      </Modal>

      {openPatientRegistrationModal && (
        <RegisterNewPatient
          open={openPatientRegistrationModal}
          handleClose={() => {
            setOpenPatientRegistrationModal(false);
          }}
        />
      )}
    </>
  );
}
