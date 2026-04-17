import { yupResolver } from "@hookform/resolvers/yup";
import Event from "@mui/icons-material/Event";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Modal } from "@mui/material";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, Calendar, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import {
  getPatientDataByMobileNo,
  getServicesByClinicId,
  InitiatePayment,
} from "../../../../services/bookAppointment/BookAppointmentServices";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import {
  BookNatureTherapy,
  GetNatureTherapySlotsByUser,
} from "../../../../services/healingServices/natureTherapyServices/NatureTherapyServices";
import { RedirectToSabPaisa } from "../../opdBooking/RedirectToSabPaisa";
import ConfirmationModal from "../../../common/ConfirmationModal";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";

const schema = yup.object().shape({
  serviceFid: yup.object().nullable().required("Therapy is required"),
  fromDate: yup
    .date()
    .typeError("Invalid date")
    .required("Date is required")
    .nullable(),
  noOfPerson: yup
    .number()
    .typeError("Must be a number")
    .min(1, "At least 1 person is required")
    .required("Required"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
  specialRequest: yup.string().nullable(),
  fullName: yup.string().required("Full name is required"),
  mobile: yup.string().required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  city: yup.string().nullable(),
});

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function TimeSlotChip({ slot, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!slot.isAvailable || slot.isBookedByUser}
      className={`
        relative px-2 py-2 rounded-md font-semibold text-[10px] transition-all duration-200 
        ${
          isSelected
            ? "bg-booking-primary text-white shadow-md"
            : "bg-slate-100 text-booking-label hover:bg-booking-primaryLight border border-booking-border"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      <span className="flex items-center space-x-1 whitespace-nowrap">
        <span className="font-bold">{slot.slotStartTime}</span>
        <NavigateNextIcon sx={{ fontSize: 14 }} />
        <span className="font-normal opacity-90">{slot.slotEndTime}</span>
      </span>
    </button>
  );
}

const NatureTherapyBookingModal = ({ open, handleClose, therapy }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotError, setSlotError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const { setIsLoading } = useLoader();

  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      serviceFid: null,
      fromDate: null,
      noOfPerson: 1,
      termsAccepted: false,
      specialRequest: "",
      totalAmount: 0,
      perDayAmount: 0,
      fullName: "",
      email: "",
      mobile: "",
      city: "",
    },
    mode: "onChange",
  });

  const fromDate = watch("fromDate");
  const noOfPerson = watch("noOfPerson");

  useEffect(() => {
    const totalPeople = parseInt(noOfPerson) || 1;
    let pricePerPerson = 1000;

    if (therapy) {
      const getBasePrice = (priceStr) => {
        if (!priceStr) return 0;
        const mainPart = String(priceStr).split("/")[0];
        return parseInt(mainPart.replace(/[^0-9]/g, "")) || 0;
      };

      const singlePrice = getBasePrice(therapy.price);
      const groupPrice = getBasePrice(therapy.priceRange);
      const bulkPrice = getBasePrice(therapy.bulkPrice);

      if (totalPeople >= 5 && bulkPrice > 0) {
        pricePerPerson = bulkPrice;
      } else if (totalPeople >= 2 && groupPrice > 0) {
        pricePerPerson = groupPrice;
      } else {
        pricePerPerson = singlePrice || 1000;
      }
    }

    const sessionAmount = pricePerPerson * totalPeople;
    setValue("perDayAmount", pricePerPerson);
    setValue("totalAmount", sessionAmount);
  }, [noOfPerson, therapy, setValue]);

  useEffect(() => {
    setSelectedTimeSlot(null);
    setSlotError("");
    getServicesByClinicId(5)
      .then((res) => {
        const data = res?.data?.data;
        if (data?.length) {
          const formatted = data.map((item) => ({
            ...item,
            id: item.serviceFid,
            value: item.serviceFid,
            label: `${item.serviceName}`,
            charges: item.charges || 0,
          }));
          setServicesOptions(formatted);
        }
      })
      .catch((error) => console.error(error));

    if (user !== null) {
      getPatientDataByMobileNo(user?.mobileNo, 5)
        .then((res) => {
          const data = res?.data?.data || [];
          const filterData = data.find(
            (item) => String(item.userId) === String(user?.userId),
          );
          if (filterData) {
            setValue(
              "fullName",
              `${filterData.firstName || ""} ${filterData.lastName || ""}`.trim(),
              { shouldValidate: true, shouldDirty: true },
            );
            setValue("email", filterData.emailId || "", {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("mobile", String(filterData.mobileNo || ""), {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("city", filterData.city || "", {
              shouldValidate: true,
              shouldDirty: true,
            });
          } else if (user) {

            setValue(
              "fullName",
              `${user.firstName || ""} ${user.lastName || ""}`.trim(),
              { shouldValidate: true, shouldDirty: true },
            );
            setValue("email", user.emailId || "", {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("mobile", String(user.mobileNo || ""), {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [user, setValue]);

  useEffect(() => {
    if (servicesOptions?.length > 0 && therapy?.nameEnglish) {
      const matchedService = servicesOptions.find(
        (item) =>
          item.label.toLowerCase() === therapy.nameEnglish.toLowerCase(),
      );
      if (matchedService) {
        setValue("serviceFid", matchedService);
      } else {
        setValue("serviceFid", {
          id: therapy.nameEnglish,
          value: therapy.nameEnglish,
          label: therapy.nameEnglish,
          charges: therapy.price ? parseInt(therapy.price.split("/")[0]) : 0,
        });
      }
    }
  }, [servicesOptions, therapy, setValue]);

  useEffect(() => {
    if (user?.userId && fromDate) {
      setSelectedTimeSlot(null);
      setSlotError("");
      setLoading(true);
      GetNatureTherapySlotsByUser(
        user.userId,
        format(new Date(fromDate), "yyyy-MM-dd"),
      )
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setDoctorSlots(data);
          } else {
            setDoctorSlots([]);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setDoctorSlots([]);
      setSelectedTimeSlot(null);
    }
  }, [user?.userId, fromDate]);

console.log("selectedTimeSlot",selectedTimeSlot);

  const onSubmit = (data) => {
    if (!user) {
      errorAlert("login first");
      return;
    }
    if (!selectedTimeSlot) {
      setSlotError("Please select a time slot");
      return;
    }
    setSlotError("");
    const saveObj = {
      userId: user?.userId || null,
      TherapyName: therapy?.nameEnglish,
      PatientName: data.fullName,
      Mobile: data.mobile,
      City: data.city,
      email: data.email,
      Appointmentdate: format(new Date(data.fromDate), "yyyy-MM-dd"),
      slotStartTime : selectedTimeSlot?.slotStartTime,
      slotEndTime :selectedTimeSlot?.slotEndTime,
      No_of_person: data.noOfPerson,
      SpecificRequest: data.specialRequest,
      Amount: watch("totalAmount"),
    };
    setFormData(saveObj);
    setOpenConfirmation(true);
  };

  const handleConfirmBooking = async () => {
    if (isPaymentPending || !formData) return;
    try {
      setIsLoading(true);
      const bookingRes = await BookNatureTherapy(formData);
      const bookingData = bookingRes?.data;

      if (bookingData?.message) {
        const bookingId = bookingData?.bookingId || bookingData?.data;

        const tempObj = {
          amount: formData.Amount,
          appointmentDate: formData.Appointmentdate,
          SloteStartTime: formData.slotTime,
          SloteEndTime: formData.slotTime,
          userId: user?.userId,
          paymentFor: "NatureTherapy",
          bookingId: bookingId,
        };

        const res = await InitiatePayment(null, user?.userId, tempObj);
        const data = res?.data;

        if (data?.status === 200) {
          setIsLoading(false);
          setIsPaymentPending(true);

          RedirectToSabPaisa(
            data,
            null,
            data.clientTxnId,
            async () => {
              successAlert(bookingData.message);
              setOpenConfirmation(false);
              setIsPaymentPending(false);
              reset();
              handleClose();
            },
            (errorStatus) => {
              const msg =
                errorStatus?.message || "Payment failed or cancelled.";
              errorAlert(msg);
              setOpenConfirmation(false);
              setIsPaymentPending(false);
            },
          );
        } else {
          setIsLoading(false);
          errorAlert(data?.message || "Failed to initiate payment");
        }
      } else {
        setIsLoading(false);
        errorAlert(bookingData?.message || "Booking failed");
      }
    } catch (error) {
      setIsLoading(false);
      errorAlert("An unexpected error occurred during the booking process.");
      console.error(error);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[900px] xl:w-[1000px] max-w-[1200px]"
            >
              <div className="relative bg-booking-bg rounded-[9px] shadow-2xl border border-booking-border overflow-hidden">
                <div className="sticky top-0 z-20 bg-white border-b border-booking-border px-4 sm:px-6 py-3 shadow-md flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-booking-text flex items-center gap-2">
                    <span className="bg-booking-primary/10 p-1.5 rounded-lg flex items-center justify-center">
                      <Event sx={{ fontSize: 20, color: "var(--booking-primary)" }} className="text-booking-primary" />
                    </span>
                    Book Nature Therapy
                  </h2>

                  <CancelButtonModal onClick={handleClose} />
                </div>

                <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-4 sm:px-6 py-6 custom-scrollbar bg-[#f8fafc]">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid lg:grid-cols-12 gap-6">
                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-8 space-y-6"
                      >
                        <div className="bg-booking-surface rounded-[9px] shadow-sm border border-booking-border overflow-hidden">
                          <div className="bg-booking-primaryLight px-5 py-3 flex items-center gap-3">
                            <User className="w-5 h-5 text-booking-primary" />
                            <h2 className="text-base font-bold text-booking-primary uppercase tracking-wider">
                              Patient Information
                            </h2>
                          </div>
                          <div className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <InputField
                                  control={control}
                                  name="fullName"
                                  label="Full Name *"
                                  error={errors.fullName}
                                  shrink={true}
                                />
                              </div>
                              <div>
                                <InputField
                                  control={control}
                                  name="mobile"
                                  label="Mobile Number *"
                                  error={errors.mobile}
                                  shrink={true}
                                />
                              </div>
                              <div>
                                <InputField
                                  control={control}
                                  name="email"
                                  label="Email Address *"
                                  error={errors.email}
                                  shrink={true}
                                />
                              </div>
                              <div className="col-span-2">
                                <InputField
                                  control={control}
                                  name="city"
                                  label="City"
                                  error={errors.city}
                                  shrink={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-booking-surface rounded-[9px] shadow-sm border border-booking-border overflow-hidden">
                          <div className="bg-booking-primaryLight px-5 py-3 flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-booking-primary" />
                            <h2 className="text-base font-bold text-booking-primary uppercase tracking-wider">
                              Therapy & Schedule
                            </h2>
                          </div>
                          <div className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <DropdownField
                                  control={control}
                                  name="serviceFid"
                                  placeholder="Select Therapy *"
                                  dataArray={servicesOptions}
                                  error={errors.serviceFid}
                                  isDisabled={!!therapy?.nameEnglish}
                                />
                              </div>
                              <DatePickerField
                                control={control}
                                name="fromDate"
                                label="Appointment Date *"
                                inputFormat="dd-MM-yyyy"
                                disablePast={true}
                                error={errors.fromDate}
                              />
                              <InputField
                                control={control}
                                name="noOfPerson"
                                label="Number of Persons *"
                                type="number"
                                error={errors.noOfPerson}
                                InputProps={{ inputProps: { min: 1 } }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-booking-surface rounded-[9px] shadow-sm border border-booking-border overflow-hidden p-5">
                          <InputArea
                            name="specialRequest"
                            control={control}
                            label="Specific Requests or Medical Conditions"
                            placeholder="Please mention any special requirements..."
                            error={errors.specialRequest}
                          />
                          <div className="mt-4">
                            <CheckBoxField
                              name="termsAccepted"
                              control={control}
                              label="I agree to the clinical guidelines and terms."
                              error={errors.termsAccepted}
                            />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-4 lg:sticky lg:top-0 h-fit"
                      >
                        <div className="space-y-6">
                          <div className="bg-booking-surface rounded-[9px] shadow-sm border border-booking-border overflow-hidden flex flex-col">
                            <div className="bg-booking-secondaryLight px-5 py-3 flex items-center gap-3">
                              <Clock className="w-5 h-5 text-booking-secondary" />
                              <h2 className="text-base font-bold text-booking-secondary uppercase tracking-wider">
                                Slots
                              </h2>
                            </div>

                            <div className="p-4 flex-1 min-h-[220px]">
                              {loading ? (
                                <div className="flex flex-col items-center justify-center h-40">
                                  <div className="w-8 h-8 border-4 border-booking-primaryLight border-t-booking-primary rounded-full animate-spin"></div>
                                </div>
                              ) : doctorSlots?.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2">
                                  {doctorSlots.map((slot, index) => (
                                    <TimeSlotChip
                                      key={index}
                                      slot={slot}
                                      isSelected={
                                        selectedTimeSlot?.slotStartTime ===
                                        slot.slotStartTime
                                      }
                                      onSelect={() => {
                                        setSelectedTimeSlot(slot);
                                        setSlotError("");
                                      }}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-40 text-center p-4 bg-slate-50 rounded-[9px] border border-dashed border-slate-200">
                                  <Clock className="w-8 h-8 text-slate-300 mb-2" />
                                  <p className="text-[10px] text-slate-500 font-medium">
                                    {fromDate
                                      ? "No slots available for this date"
                                      : "Select date to view available slots"}
                                  </p>
                                </div>
                              )}
                              {slotError && (
                                <p className="text-red-500 text-[10px] mt-2 font-bold text-center">
                                  {slotError}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="bg-booking-primaryLight rounded-[9px] shadow-sm p-5 text-booking-text border border-booking-primary/10">
                            <div className="flex items-center gap-2 mb-4 border-b border-booking-primary/10 pb-3">
                              <Banknote className="w-5 h-5 text-booking-primary" />
                              <h3 className="font-bold text-sm tracking-widest uppercase text-booking-primaryDark">
                                Bill Summary
                              </h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-booking-label">
                                  Price / Person
                                </span>
                                <span className="font-bold">
                                  ₹{watch("perDayAmount")?.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-booking-label">
                                  Persons
                                </span>
                                <span className="font-bold">x {watch("noOfPerson")}</span>
                              </div>
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-booking-label">
                                  GST & TC
                                </span>
                                <span className="font-bold">0</span>
                              </div>
                              <div className="pt-3 border-t border-booking-primary/10 flex justify-between items-end">
                                <div>
                                  <p className="text-[10px] text-booking-primary font-bold uppercase tracking-tighter">
                                    Total Amount
                                  </p>
                                  <p className="text-2xl font-black tracking-tight text-booking-primaryDark">
                                    ₹{watch("totalAmount")?.toLocaleString()}
                                  </p>
                                </div>
                                <CommonButton
                                  type="submit"
                                  label="Book Now"
                                  className="bg-booking-primary hover:bg-booking-primaryDark text-white font-black px-6 py-2 rounded-[5px] transition-all shadow-md active:scale-95 text-xs truncate"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 lg:hidden">
                      <CommonButton
                        type="button"
                        onClick={handleClose}
                        label="Cancel"
                        className="border border-slate-200 text-slate-500"
                      />
                      <CommonButton
                        type="submit"
                        label="Confirm Booking"
                        className="bg-emerald-600 text-white"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Modal>

      <ConfirmationModal
        confirmationOpen={openConfirmation}
        confirmationHandleClose={() => setOpenConfirmation(false)}
        confirmationSubmitFunc={handleConfirmBooking}
        confirmationLabel="Confirm Therapy Booking"
        confirmationMsg="Are you sure you want to book this nature therapy for the selected slot?"
        confirmationButtonMsg="Confirm Booking"
      />
    </>
  );
};

export default NatureTherapyBookingModal;
