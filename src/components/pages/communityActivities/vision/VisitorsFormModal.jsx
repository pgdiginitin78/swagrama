import { yupResolver } from "@hookform/resolvers/yup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { Box, Modal } from "@mui/material";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ClipboardList,
  MapPin,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import {
  getPatientDataByMobileNo,
  InitiatePayment,
} from "../../../../services/bookAppointment/BookAppointmentServices";
import { SaveActivities } from "../../../../services/communityActivitiesServices/CommunityActivitiesServices";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import ConfirmationModal from "../../../common/ConfirmationModal";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import AddPatientModal from "../../opdBooking/AddPatientModal";
import { RedirectToSabPaisa } from "../../opdBooking/RedirectToSabPaisa";
import BillSummaryIcon from "../../../assets/BillSummary.svg";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Min 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Must be 10 digits"),
  city: yup.string().required("City is required"),
  appointmentDate: yup
    .date()
    .typeError("Invalid date")
    .required("Date is required")
    .nullable(),
  noOfPerson: yup
    .number()
    .typeError("Must be a number")
    .min(1, "At least 1 person")
    .max(20, "Maximum 20 members allowed")
    .required("Required"),
  specialRequests: yup.string().max(500, "Max 500 characters"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
});

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const VisitorsFormModal = ({ open, handleClose, serviceDetails, origin }) => {
  const { user } = useAuth();
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const { isLoading, setIsLoading } = useLoader();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      city: "",
      patientFid: null,
      appointmentDate: new Date(),
      noOfPerson: 1,
      specialRequests: "",
      termsAccepted: false,
    },
    mode: "onChange",
  });

  const patientFid = watch("patientFid");

  const noOfPerson = watch("noOfPerson") || 1;
  const termsAccepted = watch("termsAccepted");

  const getNumericPrice = (priceVal) => {
    if (!priceVal || priceVal === "Free") return 0;
    if (typeof priceVal === "number") return priceVal;
    return parseInt(priceVal.toString().replace(/[^0-9]/g, "")) || 0;
  };

  const basePrice = getNumericPrice(serviceDetails?.price);
  const subtotal = basePrice * noOfPerson;
  const gst = Math.round(subtotal * 0);
  const total = subtotal + gst;

  const handleGetPatientData = () => {
    getPatientDataByMobileNo(user?.mobileNo, user.userId, "OPD", 5)
      .then((res) => {
        const data = res?.data?.data || [];
        const filterData = data.find(
          (item) => String(item.userId) === String(user?.userId),
        );
        if (data?.length) {
          setPatientOptions(
            data.map((d) => ({
              ...d,
              id: d.userId,
              value: d.userId,
              label: `${d.firstName || ""} ${d.lastName || ""}`.trim(),
            })),
          );
          if (filterData) {
            setValue(
              "fullName",
              `${filterData.firstName || ""} ${filterData.lastName || ""}`.trim(),
            );
            setValue("mobileNumber", filterData.mobileNo || "");
            setValue("email", filterData.emailId || "");
            setValue("city", filterData.city || "");
          }
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (patientFid !== null) {
      setValue("fullName", patientFid.label);
      setValue("mobileNumber", String(patientFid.mobileNo || ""));
      setValue("email", patientFid.emailId || "");
      setValue("city", patientFid.city || "");
    }
  }, [patientFid, setValue]);

  console.log("patientFid", patientFid);

  useEffect(() => {
    if (!user) return;
    handleGetPatientData();
  }, [user]);

  const onSubmit = (data) => {
    if (!user) {
      errorAlert("login first");
      return;
    }
    console.log("Visitor Booking Data:", {
      service: serviceDetails?.serviceName,
      totalAmount: total,
      ...data,
      appointmentDate: format(data.appointmentDate, "yyyy-MM-dd"),
    });

    const saveObj = {
      userId: patientFid?.userId,
      createdBy: user?.userId,
      clinicFid: 5,
      fullName: data?.fullName,
      mobile: data?.mobileNumber,
      city: data?.city,
      email: data?.email,
      activityName: serviceDetails?.serviceName,
      checkin: origin === "AnnualEvents" ? null : serviceDetails?.checkIn,
      checkOut: origin === "AnnualEvents" ? null : serviceDetails?.checkOut,
      visitDate: format(data.appointmentDate, "yyyy-MM-dd"),
      no_of_person: data.noOfPerson,
      amount: total,
      origin: origin,
    };
    console.log("saveObj",saveObj)
    setFormData(saveObj);
    setOpenConfirmation(true);
  };
  const cancelPaymentRef = useRef(null);

  const handleConfirmBooking = async () => {
    if (isPaymentPending) return;
    try {
      setIsLoading(true);
      const bookingRes = await SaveActivities(formData);
      const bookingData = bookingRes?.data;
      console.log("bookingData",bookingData)

      if (bookingData?.message) {
        const innerData = bookingData?.data?.data || bookingData?.data;
        const bookingId = innerData?.bookingId;

        const tempObj = {
          amount: formData.amount,
          userId: innerData?.patientUserId,
          paymentFor: origin,
          bookingId: bookingId,
        };
        const res = await InitiatePayment(5, null, tempObj);
        const data = res?.data;
        if (data?.status === 200) {
          setIsLoading(false);
          setIsPaymentPending(true);

          cancelPaymentRef.current = RedirectToSabPaisa(
            data,
            0,
            data.clientTxnId,
            async () => {
              successAlert(bookingData.message);
              setOpenConfirmation(false);
              setIsPaymentPending(false);
              handleClose();
              reset();
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
      console.error("Booking error:", error);
    }
  };

  if (!serviceDetails) return null;

  return (
    <>
      <Modal open={open} closeAfterTransition>
        <Box
          sx={ModalStyle}
          className="w-[98%] sm:w-[95%] md:w-[90%] lg:w-[80%] xl:w-[65%] 2xl:w-[55%] max-h-[90dvh] overflow-hidden rounded-xl p-0 flex flex-col"
        >
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col flex-1 min-h-0"
            >
              <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-4 sm:px-5 py-4 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                    <ClipboardList className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                      Booking Request
                    </h2>
                    <p className="text-white/80 text-[10px] font-medium uppercase tracking-widest mt-0.5">
                      Community Services
                    </p>
                  </div>
                </div>
                <CancelButtonModal onClick={handleClose} />
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-7 no-scrollbar">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7"
                >
                  <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-white p-4 sm:p-5 rounded-[9px] border border-green-300 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-black text-green-900 leading-tight">
                            {serviceDetails.serviceName}
                          </h3>
                          <p className="text-green-600 font-bold text-sm">
                            {serviceDetails.nameHindi}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-green-100 pt-4">
                        <div className="flex items-center gap-2">
                          <AccessTimeIcon className="text-green-800 !text-[18px]" />
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-extrabold">
                              Timings
                            </p>
                            <p className="text-xs font-bold text-slate-700">
                              {serviceDetails.checkIn} -{" "}
                              {serviceDetails.checkOut}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="text-green-700 w-4 h-4" />
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-extrabold">
                              Location
                            </p>
                            <p className="text-xs font-bold text-slate-700">
                              Swagrama Center
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-[9px] shadow-sm border border-slate-300">
                      <h4 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Schedule
                        Configuration
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DatePickerField
                          control={control}
                          name="appointmentDate"
                          label="Visit Date *"
                          inputFormat="dd-MM-yyyy"
                          disablePast={true}
                          error={errors.appointmentDate}
                        />
                        <div className="relative">
                          <InputField
                            control={control}
                            name="noOfPerson"
                            label="Number of Persons *"
                            type="number"
                            placeholder="Ex: 5"
                            inputProps={{ min: 1, max: 20 }}
                            error={errors.noOfPerson}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-[9px] shadow-sm border border-slate-300">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                        <h4 className="text-[10px] w-full font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                          <UserIcon className="w-3.5 h-3.5" /> Visitor
                          Information
                        </h4>
                        <div className="flex justify-end  w-full">
                          <CommonButton
                            type="button"
                            onClick={() => setOpenAddPatient(true)}
                            label="+ Add Guest"
                            className="bg-green-700 text-white hover:bg-green-800 transition-all shadow-sm shrink-0"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <DropdownField
                          control={control}
                          name="patientFid"
                          placeholder="Select Guest"
                          dataArray={patientOptions}
                          isClearable={true}
                          searchIcon={true}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-1 sm:col-span-2">
                          <InputField
                            control={control}
                            name="fullName"
                            label="Full Name *"
                            error={errors.fullName}
                          />
                        </div>
                        <InputField
                          control={control}
                          name="mobileNumber"
                          label="Contact No. *"
                          type="tel"
                          error={errors.mobileNumber}
                        />
                        <InputField
                          control={control}
                          name="email"
                          label="Email Address *"
                          error={errors.email}
                        />
                        <div className="col-span-1 sm:col-span-2">
                          <InputField
                            control={control}
                            name="city"
                            label="City *"
                            error={errors.city}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-[9px] shadow-sm border border-slate-300">
                      <InputArea
                        control={control}
                        name="specialRequests"
                        label="Additional Requirements"
                        placeholder="Any specific requests or info we should know?"
                        error={errors.specialRequests}
                        minRows={2}
                      />
                      <div className="mt-4 p-3 bg-emerald-50 rounded-[9px] border border-emerald-300">
                        <CheckBoxField
                          control={control}
                          name="termsAccepted"
                          label="I acknowledge my booking request and agree to follow community guidelines."
                          error={errors.termsAccepted}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-5 sm:space-y-6 lg:sticky lg:top-0 h-fit">
                    <div className="bg-green-800 rounded-[9px] shadow-xl p-5 sm:p-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                      <div className="flex items-center gap-2 mb-5 sm:mb-6 border-b border-white/10 pb-4">
                        <img src={BillSummaryIcon} alt="" className="w-5 h-5" />
                        <h3 className="font-bold text-xs tracking-widest uppercase">
                          Bill Summary
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-green-200">Base Price</span>
                          <span>{serviceDetails.price}</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-green-200">Persons</span>
                          <span>x {noOfPerson}</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-green-200">GST (18%)</span>
                          <span>₹{gst.toLocaleString()}</span>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                          <div className="animate-pulse-slow">
                            <p className="text-[10px] text-green-300 font-bold uppercase tracking-widest mb-0.5">
                              Payable Total
                            </p>
                            <p className="text-2xl sm:text-3xl font-black tracking-tighter">
                              ₹{total.toLocaleString()}
                            </p>
                          </div>
                          <CommonButton
                            type="submit"
                            label="Book Now"
                            disabled={!termsAccepted}
                            className={`font-black px-6 sm:px-8 transition-all shadow-lg active:scale-95 text-sm ${
                              termsAccepted
                                ? "bg-white text-green-800 hover:bg-green-50"
                                : "bg-white/10 text-white/30 pointer-events-none"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-[9px] border border-dashed border-slate-300">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-3 px-1">
                        Special Benefits
                      </h5>
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                          "{serviceDetails.benefits}"
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="lg:hidden p-4 bg-white border-t border-slate-100 flex gap-3 shrink-0">
                <CommonButton
                  type="button"
                  onClick={reset}
                  label="Reset"
                  className="flex-1 bg-red-50 border border-red-600 text-red-600"
                />
                <CommonButton
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  label="Book Now"
                  disabled={!termsAccepted}
                  className="flex-1 bg-green-700 text-white"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Modal>
      <ConfirmationModal
        confirmationOpen={openConfirmation}
        confirmationSubmitFunc={handleConfirmBooking}
        confirmationLabel="Confirm Activity Booking"
        confirmationMsg="Are you sure you want to book this activity?"
        confirmationButtonMsg={
          isPaymentPending ? "Processing..." : "Confirm & Pay"
        }
        confirmationHandleClose={() => {
          if (cancelPaymentRef.current) {
            cancelPaymentRef.current();
            cancelPaymentRef.current = null;
          }
          setIsPaymentPending(false);
          setOpenConfirmation(false);
        }}
        disabled={isPaymentPending}
      />
      {openAddPatient && (
        <AddPatientModal
          open={openAddPatient}
          handleClose={() => {
            setOpenAddPatient(false);
            handleGetPatientData();
          }}
        />
      )}
    </>
  );
};

export default VisitorsFormModal;
