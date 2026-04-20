import {
  Add,
  ArrowBackIos,
  ArrowForwardIos,
  CalendarMonth,
  KeyboardArrowDown,
  PeopleAlt,
  Remove,
  AccessTime,
  SearchRounded,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  MenuItem,
  Modal,
  Popover,
  Select,
} from "@mui/material";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths,
  startOfToday,
  parse,
} from "date-fns";
import { LocalizationProvider, TimeClock } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import { useForm } from "react-hook-form";
import { Bed as BedIcon } from "@mui/icons-material";
import { Switch } from "@mui/material";
import DropdownField from "../../../common/formFields/DropdownField";
import InputField from "../../../common/formFields/InputField";
import { checkRoomAvailability } from "../../../../services/healingServices/wellnessStay/WellnessStayServices";
import PetsIcon from "@mui/icons-material/Pets";
import { useAuth } from "../../../../context/AuthContext";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import {
  getPatientDataByMobileNo,
  InitiatePayment,
} from "../../../../services/bookAppointment/BookAppointmentServices";
import { wellnessStayBooking } from "../../../../services/healingServices/wellnessStay/WellnessStayServices";
import { RedirectToSabPaisa } from "../../opdBooking/RedirectToSabPaisa";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import ConfirmationModal from "../../../common/ConfirmationModal";
import AddPatientModal from "../../opdBooking/AddPatientModal";

function StayBookingModal({
  open,
  handleClose,
  selectedService,
  handleGetRoomList,
}) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkInTime, setCheckInTime] = useState(
    format(new Date(), "HH:mm:ss"),
  );
  const [checkOut, setCheckOut] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(
    format(new Date(), "HH:mm:ss"),
  );

  const [inTimeAnchorEl, setInTimeAnchorEl] = useState(null);
  const [outTimeAnchorEl, setOutTimeAnchorEl] = useState(null);

  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 1,
    children: 0,
    childrenAges: [],
  });

  const [guestsConfirmed, setGuestsConfirmed] = useState(true);
  const [activeTab, setActiveTab] = useState("calendar");
  const [flexibleDuration, setFlexibleDuration] = useState("1 week");
  const [selectedFlexibleMonth, setSelectedFlexibleMonth] = useState(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
  const [guestsAnchorEl, setGuestsAnchorEl] = useState(null);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [roomStatus, setRoomStatus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const cancelPaymentRef = useRef(null);
  const { user } = useAuth();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    setRoomStatus(null);
  }, [checkIn, checkOut, guests.adults, guests.children, guests.rooms]);

  const carouselRef = useRef(null);
  const checkInDateRef = useRef(null);
  const inTimeRef = useRef(null);
  const checkOutDateRef = useRef(null);
  const outTimeRef = useRef(null);
  const guestInputRef = useRef(null);

  const { control, watch, setValue, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      bringingPet: false,
      patientFid:null,
      twinSharing: true,
      mealPreference: {
        label: "Organic Full Board (Included)",
        value: "Organic Full Board (Included)",
      },
    },
    mode: "onChange",
  });
  const patientFid = watch("patientFid");
  const formValues = watch();

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "next" ? 200 : -200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleDateClick = (date) => {
    if (isBefore(date, startOfToday())) return;

    if (checkIn && !checkOut) {
      if (isSameDay(date, checkIn)) {
        setCheckIn(null);
        setCheckOut(null);
      } else if (isBefore(date, checkIn)) {
        setCheckIn(date);
        setCheckOut(null);
      } else {
        setCheckOut(date);
        setHoveredDate(null);
        setCalendarAnchorEl(null);
      }
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const calculateTotal = () => {
    if (!selectedService) return { stay: 0, wellness: 0, taxes: 0, total: 0 };
    const base = selectedService.price;
    const wellness = 0;
    const taxes = (base + wellness) * 0.18;
    return {
      stay: base,
      wellness: wellness,
      taxes: taxes,
      total: base + wellness + taxes,
    };
  };

  const costs = calculateTotal();

  const isDateSelected = (date) =>
    (checkIn && isSameDay(date, checkIn)) ||
    (checkOut && isSameDay(date, checkOut));

  const isDateInRange = (date) => {
    if (checkIn && checkOut) {
      return isWithinInterval(date, { start: checkIn, end: checkOut });
    }
    if (checkIn && hoveredDate && !checkOut) {
      if (isBefore(hoveredDate, checkIn)) return false;
      return isWithinInterval(date, { start: checkIn, end: hoveredDate });
    }
    return false;
  };

  const renderCalendar = (monthDate) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const isCurrentMonth = isSameMonth(currentDay, monthStart);
        const isPast = isBefore(currentDay, startOfToday());
        const selected = isDateSelected(currentDay);
        const inRange = isDateInRange(currentDay);
        const isStart = checkIn && isSameDay(currentDay, checkIn);
        const isEnd = checkOut && isSameDay(currentDay, checkOut);

        days.push(
          <div
            key={currentDay.toString()}
            onMouseEnter={() =>
              isCurrentMonth && !isPast && setHoveredDate(currentDay)
            }
            onMouseLeave={() => setHoveredDate(null)}
            onClick={() =>
              isCurrentMonth && !isPast && handleDateClick(currentDay)
            }
            className={`relative flex items-center justify-center h-8 w-8 md:h-10 md:w-10 cursor-pointer text-[13px] font-medium transition-all
                ${!isCurrentMonth ? "opacity-0 pointer-events-none" : isPast ? "text-gray-300 pointer-events-none" : "text-gray-700"}
                ${inRange && isCurrentMonth ? "bg-booking-primaryLight/60" : ""}
                ${isStart && isCurrentMonth ? "rounded-l-full" : ""}
                ${isEnd && isCurrentMonth ? "rounded-r-full" : ""}
                ${checkIn && !checkOut && isSameDay(currentDay, hoveredDate) && isCurrentMonth ? "rounded-r-full" : ""}
              `}
          >
            {inRange && isCurrentMonth && (
              <div className="absolute inset-0 bg-booking-primaryLight/40 z-0"></div>
            )}
            <div
              className={`relative z-10 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-all
                ${selected && isCurrentMonth ? "bg-booking-primary text-white shadow-sm scale-110" : "hover:bg-gray-100"}
              `}
            >
              {format(currentDay, "d")}
            </div>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }

    return (
      <div className="w-full">
        <div className="text-center font-bold text-gray-800 mb-2 text-sm">
          {format(monthDate, "MMMM yyyy")}
        </div>
        <div className="flex mb-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, index) => (
            <div
              key={index}
              className="w-8 md:w-9 text-[9px] font-bold text-booking-primary/40 text-center uppercase"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="space-y-px">{rows}</div>
      </div>
    );
  };

  const handleCheckVailabilty = () => {
    if (!checkIn) return;
    setIsSearching(true);
    setRoomStatus(null);
    checkRoomAvailability(
      selectedService?.roomTypeId,
      format(new Date(checkIn), "yyyy-MM-dd"),
      checkInTime,
      format(new Date(checkOut), "yyyy-MM-dd"),
      checkOutTime,
    )
      .then((res) => {
        setRoomStatus(res?.data);
        setIsSearching(false);
      })
      .catch((err) => {
        console.error("Check availability error:", err);
        setRoomStatus("error");
        setIsSearching(false);
      });
  };
  console.log("selectedService", selectedService);

  const handleConfirmBooking = () => {
    if (!user) {
      errorAlert("login first");
      return;
    }
    const saveObj = {
      userId: user?.userId || 1,
      resortId: 1,
      roomTypeId: selectedService?.roomTypeId,
      stayType: selectedService?.maxOcc === 1 ? "Seperate" : "Double",
      checkInDate: checkIn ? format(new Date(checkIn), "yyyy-MM-dd") : "",
      CheckoutDate: checkOut ? format(new Date(checkOut), "yyyy-MM-dd") : "",
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      noOfPersons: guests?.adults || 0,
      noOfChildren: guests?.children || 0,
      isPet: formValues?.bringingPet || false,
      twinSharing: formValues?.twinSharing || false,
      totalAmount: costs?.total || 0,
      guestFullName: formValues?.fullName || "",
      emailId: formValues?.email || "",
      mobile: String(formValues?.mobile || ""),
      city: formValues?.city || "",
    };

    setFinalSaveObj(saveObj);
    setOpenConfirmationModal(true);
  };

  const initiateBookingPayment = async () => {
    if (isPaymentPending) return;
    try {
      const userId = user?.userId || 1;
      const clinicId = 5;

      setIsLoading(true);

      const bookingRes = await wellnessStayBooking(finalSaveObj);
      const bookingData = bookingRes?.data;
      console.log("bookingData", bookingData);

      if (bookingData?.message) {
        const bookingId = bookingData?.data;

        const tempObj = {
          amount: costs.total,
          appointmentDate: format(new Date(checkIn), "yyyy-MM-dd"),
          SloteStartTime: checkInTime,
          SloteEndTime: checkOutTime,
          userId: userId,
          paymentFor: "StayBooking",
          bookingId: bookingId,
        };

        const res = await InitiatePayment(null, userId, tempObj);
        const data = res?.data;

        if (data?.status === 200) {
          setIsLoading(false);
          setIsPaymentPending(true);

          cancelPaymentRef.current = RedirectToSabPaisa(
            data,
            null,
            data.clientTxnId,
            async () => {
              successAlert(bookingData.message || "Booking Successful!");
              setOpenConfirmationModal(false);
              setIsPaymentPending(false);
              handleClose();
              if (handleGetRoomList) handleGetRoomList();
            },
            (errorStatus) => {
              const msg =
                errorStatus?.message || "Payment failed or cancelled.";
              errorAlert(msg);
              setOpenConfirmationModal(false);
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
    }
  };

  const handleGetPatientData = () => {
    getPatientDataByMobileNo(user?.mobileNo, 5)
      .then((res) => {
        const dataArray = res?.data?.data;
        if (Array.isArray(dataArray) && dataArray.length > 0) {
          const filterData = dataArray.find((item) => item.userId === user?.userId);
          setPatientOptions(
            dataArray.map((d) => ({
              ...d,
              id: d.userId,
              value: d.userId,
              label: `${d.firstName} ${d.lastName}`,
            })),
          );
          if (filterData) {
            setValue("fullName", `${filterData.firstName} ${filterData.lastName}`);
            setValue("email", filterData.emailId || "");
            setValue("mobile", filterData.mobileNo || "");
            setValue("city", filterData.city || "");
          }
        }
      })
      .catch((err) => console.error("Error fetching patient data:", err));
  };

console.log("patientFid",patientFid);

    useEffect(() => {
    if (patientFid !== null) {
      setValue("fullName", patientFid.label);
      setValue("mobileNumber", patientFid.mobileNo);
      setValue("age", patientFid?.age);
      setValue("city", patientFid.city);
      setValue("emailAddress", patientFid.emailId);
    }
  }, [patientFid]);

  useEffect(() => {
    if (!user) return;
    handleGetPatientData();
  }, [user]);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={ModalStyle}
          className="w-[98%] sm:w-[95%] md:w-[90%] lg:w-[80%] xl:w-[65%] max-h-[95dvh] overflow-y-auto rounded-xl bg-booking-bg p-0 custom-scrollbar-wellness-stay"
        >
          <div className="sticky top-0 z-30 bg-white flex items-center justify-between px-4 py-3 border-b border-booking-border shadow-sm">
            <h1 className="text-booking-primaryDark  text-lg md:text-2xl font-bold leading-tight">
              Stay Booking
            </h1>
            <CancelButtonModal onClick={handleClose} />
          </div>

          <div className="p-3 sm:p-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="relative group/searchbar">
                <motion.div
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-2 flex flex-col gap-2 border group-hover/searchbar:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row items-stretch gap-2">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {/* Check-in Block */}
                      <div className="flex items-stretch border border-gray-100 rounded-lg bg-white overflow-hidden hover:border-booking-primary transition-colors">
                        <div
                          ref={checkInDateRef}
                          onClick={(e) => {
                            setCalendarAnchorEl(e.currentTarget);
                            if (checkIn) setCalendarViewDate(checkIn);
                          }}
                          className="flex-1 flex flex-col px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-all border-r border-gray-50"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                            Check-in
                          </p>
                          <div className="flex items-center gap-1.5">
                            <CalendarMonth
                              className="text-booking-primary/60"
                              sx={{ fontSize: 13 }}
                            />
                            <span className="text-gray-800 font-bold text-[11px] tracking-tight truncate">
                              {checkIn
                                ? format(checkIn, "MMM dd, yyyy")
                                : "Add date"}
                            </span>
                          </div>
                        </div>
                        <div
                          ref={inTimeRef}
                          onClick={(e) => setInTimeAnchorEl(e.currentTarget)}
                          className="w-24 flex flex-col px-2 py-1.5 cursor-pointer hover:bg-gray-50 transition-all"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                            Time
                          </p>
                          <div className="flex items-center gap-1">
                            <AccessTime
                              className="text-booking-primary/60"
                              sx={{ fontSize: 12 }}
                            />
                            <span className="text-gray-800 font-bold text-[11px]">
                              {checkInTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Check-out Block */}
                      <div className="flex items-stretch border border-gray-100 rounded-lg bg-white overflow-hidden hover:border-booking-primary transition-colors">
                        <div
                          ref={checkOutDateRef}
                          onClick={(e) => {
                            setCalendarAnchorEl(e.currentTarget);
                            if (checkIn) setCalendarViewDate(checkIn);
                          }}
                          className="flex-1 flex flex-col px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-all border-r border-gray-50"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                            Check-out
                          </p>
                          <div className="flex items-center gap-1.5">
                            <CalendarMonth
                              className="text-booking-primary/60"
                              sx={{ fontSize: 13 }}
                            />
                            <span className="text-gray-800 font-bold text-[11px] tracking-tight truncate">
                              {checkOut
                                ? format(checkOut, "MMM dd, yyyy")
                                : "Add date"}
                            </span>
                          </div>
                        </div>
                        <div
                          ref={outTimeRef}
                          onClick={(e) => setOutTimeAnchorEl(e.currentTarget)}
                          className="w-24 flex flex-col px-2 py-1.5 cursor-pointer hover:bg-gray-50 transition-all"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                            Time
                          </p>
                          <div className="flex items-center gap-1">
                            <AccessTime
                              className="text-booking-primary/60"
                              sx={{ fontSize: 12 }}
                            />
                            <span className="text-gray-800 font-bold text-[11px]">
                              {checkOutTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        ref={guestInputRef}
                        onClick={(e) => setGuestsAnchorEl(e.currentTarget)}
                        className="px-3 py-1.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all border border-gray-100 group/item flex flex-col justify-center bg-white"
                      >
                        <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                          Guests
                        </p>
                        <div className="flex items-center gap-2">
                          <PeopleAlt
                            className="text-booking-primary/60"
                            sx={{ fontSize: 14 }}
                          />
                          {!guestsConfirmed ? (
                            <span className="text-booking-primary/60 font-bold text-[10px] uppercase tracking-wider">
                              Add guests
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="text-gray-800 font-bold text-[11px] tracking-tight">
                                {guests.adults}A · {guests.children}C
                              </span>
                              <span className="text-booking-primary font-black text-[8px] uppercase bg-booking-primaryLight px-1.5 py-0.5 rounded-full">
                                {guests.rooms}R
                              </span>
                            </div>
                          )}
                          <KeyboardArrowDown
                            sx={{ fontSize: 14 }}
                            className={`text-gray-300 ml-auto transition-transform duration-300 ${guestsAnchorEl ? "rotate-180" : ""}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center md:w-36">
                      <CommonButton
                        type="button"
                        searchIcon={true}
                        onClick={handleCheckVailabilty}
                        disabled={isSearching}
                        className={`relative h-full  text-white  transition-all duration-500 active:scale-95 overflow-hidden ${
                          isSearching
                            ? "bg-booking-primary/80 cursor-not-allowed"
                            : "bg-booking-primary hover:bg-booking-primaryDark shadow-md"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {roomStatus && !isSearching && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mt-2 overflow-hidden"
                    >
                      <div
                        className={`p-3 rounded-xl border flex items-center gap-3 ${
                          roomStatus?.message === "Sold Out" ||
                          roomStatus === "unavailable" ||
                          roomStatus === "error"
                            ? "bg-red-50 border-red-100 text-red-700"
                            : "bg-emerald-50 border-emerald-100 text-booking-primary"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                            roomStatus?.message === "Sold Out" ||
                            roomStatus === "unavailable" ||
                            roomStatus === "error"
                              ? "bg-white text-red-500"
                              : "bg-white text-booking-primary"
                          }`}
                        >
                          {roomStatus?.message === "Sold Out" ||
                          roomStatus === "unavailable" ||
                          roomStatus === "error" ? (
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider">
                            {roomStatus?.message ||
                              (roomStatus === "available"
                                ? "Available"
                                : "Unavailable")}
                          </p>
                          <p className="text-[10px] opacity-80 font-medium">
                            {roomStatus?.message === "Sold Out" ||
                            roomStatus === "unavailable"
                              ? "Please try different dates"
                              : roomStatus === "error"
                                ? "Failed to check availability. Please try again."
                                : "Rooms are available for the selected dates."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Popover
                  open={Boolean(inTimeAnchorEl)}
                  anchorEl={inTimeAnchorEl}
                  onClose={() => setInTimeAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "16px",
                      mt: 1,
                      boxShadow: "0 20px 50px rgba(38, 61, 33, 0.15)",
                      overflow: "hidden",
                      border: "1px solid rgba(212, 232, 194, 0.5)",
                    },
                  }}
                >
                  <div className="bg-white flex flex-col items-center">
                    <div className="w-full text-center py-2.5 bg-[#f0f4ef] border-b border-[#e4ebdd]">
                      <p className="text-[9px] font-black text-booking-primary uppercase tracking-[0.2em] mb-0.5">
                        In Time
                      </p>
                      <p className="text-[11px] font-bold text-booking-primaryDark">
                        Selected: {checkInTime}
                      </p>
                    </div>
                    <div className="p-2">
                      <TimeClock
                        value={parse(checkInTime, "HH:mm:ss", new Date())}
                        onChange={(val) =>
                          setCheckInTime(format(val, "HH:mm:ss"))
                        }
                        ampm={false}
                        sx={{
                          "& .MuiClock-pin": { backgroundColor: "#263d21" },
                          "& .MuiClockPointer-root": {
                            backgroundColor: "#263d21",
                          },
                          "& .MuiClockPointer-thumb": {
                            backgroundColor: "#263d21",
                            borderColor: "#263d21",
                          },
                          "& .MuiClock-clock": {
                            backgroundColor: "#f9faf7",
                          },
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-end p-3 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={() => setInTimeAnchorEl(null)}
                        className="px-6 py-2 bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white text-[10px] font-bold rounded-lg hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Popover>

                <Popover
                  open={Boolean(outTimeAnchorEl)}
                  anchorEl={outTimeAnchorEl}
                  onClose={() => setOutTimeAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "16px",
                      mt: 1,
                      boxShadow: "0 20px 50px rgba(38, 61, 33, 0.15)",
                      overflow: "hidden",
                      border: "1px solid rgba(212, 232, 194, 0.5)",
                    },
                  }}
                >
                  <div className="bg-white flex flex-col items-center">
                    <div className="w-full text-center py-2.5 bg-[#f0f4ef] border-b border-[#e4ebdd]">
                      <p className="text-[9px] font-black text-booking-primary uppercase tracking-[0.2em] mb-0.5">
                        Out Time
                      </p>
                      <p className="text-[11px] font-bold text-booking-primaryDark">
                        Selected: {checkOutTime}
                      </p>
                    </div>
                    <div className="p-2">
                      <TimeClock
                        value={parse(checkOutTime, "HH:mm:ss", new Date())}
                        onChange={(val) =>
                          setCheckOutTime(format(val, "HH:mm:ss"))
                        }
                        ampm={false}
                        sx={{
                          "& .MuiClock-pin": { backgroundColor: "#263d21" },
                          "& .MuiClockPointer-root": {
                            backgroundColor: "#263d21",
                          },
                          "& .MuiClockPointer-thumb": {
                            backgroundColor: "#263d21",
                            borderColor: "#263d21",
                          },
                          "& .MuiClock-clock": {
                            backgroundColor: "#f9faf7",
                          },
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-end p-3 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={() => {
                          setOutTimeAnchorEl(null);
                          setTimeout(() => {
                            if (guestInputRef.current) {
                              setGuestsAnchorEl(guestInputRef.current);
                            }
                          }, 300);
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white text-[10px] font-bold rounded-lg hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Popover>

                <Popover
                  open={Boolean(calendarAnchorEl)}
                  anchorEl={calendarAnchorEl}
                  onClose={() => setCalendarAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "12px",
                      mt: 1,
                      boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(0,0,0,0.04)",
                      overflow: "hidden",
                      width: {
                        xs: "calc(100vw - 24px)",
                        sm: "360px",
                        md: "680px",
                      },
                      maxWidth: "calc(100vw - 24px)",
                    },
                  }}
                >
                  <div
                    className="bg-white flex flex-col"
                    style={{ maxHeight: "80dvh" }}
                  >
                    <div className="flex items-center justify-center gap-6 py-3 border-b border-gray-100 flex-shrink-0">
                      <button
                        onClick={() => setActiveTab("calendar")}
                        className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "calendar" ? "text-booking-primary" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        Calendar
                        {activeTab === "calendar" && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-booking-primary rounded-t-full"
                          />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("flexible")}
                        className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "flexible" ? "text-booking-primary" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        I'm flexible
                        {activeTab === "flexible" && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-booking-primary rounded-t-full"
                          />
                        )}
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4">
                      {activeTab === "calendar" && (
                        <div className="relative animate-in fade-in duration-300">
                          <div className="absolute top-0 left-0 right-0 flex justify-between items-center z-20 pointer-events-none">
                            <button
                              onClick={() =>
                                setCalendarViewDate(
                                  subMonths(calendarViewDate, 1),
                                )
                              }
                              className="pointer-events-auto p-1.5 hover:bg-booking-primaryLight/50 rounded-full transition-all text-booking-primary"
                            >
                              <ArrowBackIos
                                sx={{ fontSize: 12 }}
                                className="ml-1"
                              />
                            </button>
                            <button
                              onClick={() =>
                                setCalendarViewDate(
                                  addMonths(calendarViewDate, 1),
                                )
                              }
                              className="pointer-events-auto p-1.5 hover:bg-booking-primaryLight/50 rounded-full transition-all text-booking-primary"
                            >
                              <ArrowForwardIos sx={{ fontSize: 12 }} />
                            </button>
                          </div>
                          <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 min-w-[280px]">
                              {renderCalendar(calendarViewDate)}
                            </div>
                            <div className="flex-1 min-w-[280px]">
                              {renderCalendar(addMonths(calendarViewDate, 1))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "flexible" && (
                        <div className="space-y-5 animate-in fade-in duration-300 w-full">
                          <div className="space-y-3">
                            <p className="text-gray-800 font-semibold text-sm tracking-tight">
                              How long do you want to stay?
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {["3 nights", "1 week", "1 month"].map(
                                (duration) => (
                                  <button
                                    key={duration}
                                    onClick={() =>
                                      setFlexibleDuration(duration)
                                    }
                                    className={`px-4 py-2 rounded-full border-2 font-semibold text-[11px] transition-all duration-300 ${
                                      flexibleDuration === duration
                                        ? "bg-booking-primaryLight border-booking-primary text-booking-primary shadow-sm"
                                        : "border-gray-100 text-booking-primaryDark hover:border-gray-200"
                                    }`}
                                  >
                                    {duration}
                                  </button>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="space-y-0.5">
                              <p className="text-gray-800 font-semibold text-sm tracking-tight">
                                When do you want to stay?
                              </p>
                              <p className="text-[11px] text-booking-primary font-medium">
                                Select your preferred month
                              </p>
                            </div>

                            <div className="relative group/carousel px-4">
                              <div
                                ref={carouselRef}
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                                className="flex gap-2 overflow-x-auto pb-1 pt-1 scroll-smooth [&::-webkit-scrollbar]:hidden"
                              >
                                {Array.from({ length: 12 }).map((_, i) => {
                                  const monthDate = addMonths(new Date(), i);
                                  const monthLabel = format(monthDate, "MMMM");
                                  const yearLabel = format(monthDate, "yyyy");
                                  const isSelected =
                                    selectedFlexibleMonth &&
                                    isSameMonth(
                                      monthDate,
                                      selectedFlexibleMonth,
                                    );
                                  return (
                                    <button
                                      key={i}
                                      onClick={() =>
                                        setSelectedFlexibleMonth(
                                          startOfMonth(monthDate),
                                        )
                                      }
                                      className={`flex-shrink-0 w-20 py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                                        isSelected
                                          ? "bg-booking-primaryLight border-booking-primary shadow-sm"
                                          : "bg-white border-gray-100 hover:border-gray-200"
                                      }`}
                                    >
                                      <CalendarMonth
                                        sx={{ fontSize: 14 }}
                                        className="text-booking-primary"
                                      />
                                      <div className="text-center leading-none">
                                        <p
                                          className={`text-[9px] pt-1 font-semibold uppercase tracking-tighter ${isSelected ? "text-booking-primary" : "text-gray-800"}`}
                                        >
                                          {monthLabel}
                                        </p>
                                        <p className="text-[8px] font-semibold text-booking-primary mt-0.5">
                                          {yearLabel}
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                              <button
                                onClick={() => scrollCarousel("prev")}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 z-10 transition-colors"
                              >
                                <ArrowBackIos
                                  sx={{ fontSize: 10 }}
                                  className="text-gray-600 ml-0.5"
                                />
                              </button>
                              <button
                                onClick={() => scrollCarousel("next")}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 z-10 transition-colors"
                              >
                                <ArrowForwardIos
                                  sx={{ fontSize: 10 }}
                                  className="text-gray-600"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/20 flex-shrink-0 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setCheckIn(null);
                          setCheckOut(null);
                          setHoveredDate(null);
                          setFlexibleDuration("1 week");
                          setSelectedFlexibleMonth(null);
                        }}
                        className="text-ayuBrown font-bold hover:text-ayuBrown/80 transition-all text-[10px] tracking-widest uppercase"
                      >
                        Clear all
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCalendarAnchorEl(null)}
                          className="px-4 py-2 bg-white border border-gray-100 text-booking-primary font-semibold rounded-lg hover:bg-gray-50 transition-all text-xs"
                        >
                          Cancel
                        </button>
                        <CommonButton
                          type="button"
                          label="Select"
                          onClick={() => {
                            if (
                              activeTab === "flexible" &&
                              selectedFlexibleMonth
                            ) {
                              const start = startOfMonth(selectedFlexibleMonth);
                              let end;
                              if (flexibleDuration === "3 nights")
                                end = addDays(start, 3);
                              else if (flexibleDuration === "1 week")
                                end = addDays(start, 7);
                              else end = addMonths(start, 1);
                              setCheckIn(start);
                              setCheckOut(end);
                            }
                            setCalendarAnchorEl(null);
                          }}
                          className="bg-booking-primary text-white min-w-[80px]"
                        />
                      </div>
                    </div>
                  </div>
                </Popover>

                <Popover
                  open={Boolean(guestsAnchorEl)}
                  anchorEl={guestsAnchorEl}
                  onClose={() => setGuestsAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "12px",
                      mt: 1,
                      p: 2.5,
                      width: { xs: "calc(100vw - 24px)", sm: "300px" },
                      maxWidth: "calc(100vw - 24px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  <div className="space-y-4">
                    {[
                      {
                        label: "Room",
                        key: "rooms",
                        min: 1,
                        subtitle: null,
                        subtitleColor: null,
                      },
                      {
                        label: "Adults",
                        key: "adults",
                        min: 1,
                        subtitle: "Ages 13 or above",
                        subtitleColor: "text-booking-primary",
                      },
                      {
                        label: "Children",
                        key: "children",
                        min: 0,
                        subtitle: "Ages 0–12",
                        subtitleColor: "text-ayuBrown",
                      },
                    ].map(({ label, key, min, subtitle, subtitleColor }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {label}
                          </p>
                          {subtitle && (
                            <p className={`text-[10px] ${subtitleColor}`}>
                              {subtitle}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            disabled={label === "Room" || guests[key] <= min}
                            onClick={() => {
                              if (key === "children") {
                                setGuests((g) => {
                                  const newCount = Math.max(
                                    min,
                                    g.children - 1,
                                  );
                                  return {
                                    ...g,
                                    children: newCount,
                                    childrenAges: g.childrenAges.slice(
                                      0,
                                      newCount,
                                    ),
                                  };
                                });
                              } else {
                                setGuests((g) => ({
                                  ...g,
                                  [key]: Math.max(min, g[key] - 1),
                                }));
                              }
                            }}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-ayuBrown disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Remove sx={{ fontSize: 14 }} />
                          </button>
                          <span className="w-4 text-center font-semibold text-sm text-gray-800">
                            {guests[key]}
                          </span>
                          <button
                            type="button"
                            disabled={label === "Room"}
                            onClick={() => {
                              if (key === "children") {
                                setGuests((g) => ({
                                  ...g,
                                  children: g.children + 1,
                                  childrenAges: [...g.childrenAges, ""],
                                }));
                              } else {
                                setGuests((g) => ({ ...g, [key]: g[key] + 1 }));
                              }
                            }}
                            className="w-8 h-8 rounded-full border border-booking-primary text-booking-primary flex items-center justify-center hover:bg-booking-primaryLight active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Add sx={{ fontSize: 14 }} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {guests.children > 0 && (
                      <div className="pt-3 border-t border-gray-100 space-y-3">
                        <p className="text-[10px] text-booking-primary leading-tight">
                          Enter your children's correct ages for accurate
                          pricing.
                        </p>
                        <div className="space-y-2">
                          {Array.from({ length: guests.children }).map(
                            (_, i) => (
                              <FormControl key={i} fullWidth size="small">
                                <Select
                                  value={guests.childrenAges[i] || ""}
                                  onChange={(e) => {
                                    const newAges = [...guests.childrenAges];
                                    newAges[i] = e.target.value;
                                    setGuests((g) => ({
                                      ...g,
                                      childrenAges: newAges,
                                    }));
                                  }}
                                  displayEmpty
                                  variant="outlined"
                                  sx={{
                                    borderRadius: "9px",
                                    fontSize: "11px",
                                    ".MuiSelect-select": { py: 1 },
                                  }}
                                  IconComponent={KeyboardArrowDown}
                                >
                                  <MenuItem
                                    value=""
                                    disabled
                                    sx={{
                                      fontSize: "11px",
                                      "&::before": {
                                        display: "none !important",
                                      },
                                    }}
                                  >
                                    Age of Child {i + 1}
                                  </MenuItem>
                                  {Array.from({ length: 13 }).map((_, age) => (
                                    <MenuItem
                                      key={age}
                                      value={age}
                                      sx={{
                                        fontSize: "11px",
                                        "&::before": {
                                          display: "none !important",
                                        },
                                      }}
                                    >
                                      {age} years old
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                      <button
                        onClick={() => setGuestsAnchorEl(null)}
                        className="px-4 py-2 text-[11px] font-semibold text-booking-primary hover:text-gray-600 transition-all"
                      >
                        Cancel
                      </button>
                      <CommonButton
                        type="button"
                        onClick={() => {
                          setGuestsConfirmed(true);
                          setGuestsAnchorEl(null);
                        }}
                        className="bg-booking-primary text-white"
                        label="Apply"
                      />
                    </div>
                  </div>
                </Popover>
              </div>
            </LocalizationProvider>

            <div className="w-full mt-4">
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col gap-5"
              >
                <div className="border-b border-booking-primary/10 pb-2">
                  <h2 className="text-base sm:text-lg font-serif text-ayuBrown font-bold">
                    Reservation Summary
                  </h2>
                </div>

                <div className="bg-booking-primaryLight p-3 rounded-xl flex items-center gap-3 border border-booking-primary/10">
                  <BedIcon
                    className="text-booking-primary flex-shrink-0"
                    sx={{ fontSize: 20 }}
                  />
                  <span className="text-booking-primary font-semibold text-sm tracking-tight line-clamp-2">
                    {selectedService
                      ? selectedService.serviceName.split("|")[1] ||
                        selectedService.serviceName
                      : "Select your stay"}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-booking-primary uppercase tracking-widest">
                      Guest Information
                    </p>
                    <CommonButton
                      type="button"
                      onClick={() => setOpenAddPatient(true)}
                      label="+ Add Guest"
                      className="bg-booking-primary text-white  hover:bg-booking-primaryDark transition-all shadow-sm shrink-0"
                    />
                  </div>
                  <div className="mt-3">
                    <DropdownField
                      control={control}
                      name="patientFid"
                      placeholder="Select Patient"
                      dataArray={patientOptions}
                      isClearable={true}
                      searchIcon={true}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField
                      control={control}
                      name="fullName"
                      label="Full Name"
                      variant="outlined"
                    />
                    <InputField
                      control={control}
                      name="email"
                      label="Email Address"
                      variant="outlined"
                    />
                    <InputField
                      control={control}
                      name="mobile"
                      label="Mobile"
                      variant="outlined"
                    />
                    <InputField
                      control={control}
                      name="city"
                      label="City"
                      variant="outlined"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-3 border rounded-xl p-2">
                  <p className="text-[10px] font-bold text-booking-primary uppercase tracking-widest">
                    Preferences
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        label: "Bringing a Pet?",
                        sub: "Pre-approval required",
                        subColor: "text-booking-primary",
                        field: "bringingPet",
                      },
                      {
                        label: "Twin Sharing?",
                        sub: "*Same-gender rules",
                        subColor: "text-red-500",
                        field: "twinSharing",
                      },
                    ].map(({ label, sub, subColor, field }) => (
                      <div
                        key={field}
                        className="flex items-center justify-between bg-gray-50/50 p-3 rounded-xl border  hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                            <PeopleAlt
                              className="text-booking-primary"
                              sx={{ fontSize: 16 }}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-xs sm:text-[13px]">
                              {label}
                            </p>
                            <p
                              className={`text-[10px] font-semibold ${subColor}`}
                            >
                              {sub}
                            </p>
                          </div>
                        </div>
                        <Switch
                          size="small"
                          checked={formValues[field]}
                          onChange={(e) => setValue(field, e.target.checked)}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#4B6B53",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              { backgroundColor: "#4B6B53" },
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold text-booking-primary uppercase tracking-widest">
                    Meal Preference
                  </p>
                  <DropdownField
                    control={control}
                    name="mealPreference"
                    placeholder="Selected Meal Plan"
                    dataArray={[
                      {
                        label: "Organic Full Board (Included)",
                        value: "Organic Full Board (Included)",
                      },
                      {
                        label: "Custom Diet (Requires Consult)",
                        value: "Custom Diet (Requires Consult)",
                      },
                    ]}
                  />
                </div>

                <div className="pt-3 border-t border-booking-primary/5 flex flex-col gap-2">
                  {[
                    { label: "Stay", value: costs.stay },
                    { label: "Wellness Access", value: costs.wellness },
                    {
                      label: "Taxes & Service",
                      value: Math.round(costs.taxes),
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                        {label}
                      </span>
                      <span className="text-booking-primaryDark font-bold text-sm">
                        ₹{value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 pt-3 border-t border-dashed border-booking-primary/20">
                  <div>
                    <h3 className="text-base font-serif text-ayuBrown font-bold leading-none mb-1">
                      Total Amount
                    </h3>
                    <span className="text-[9px] text-booking-primary font-medium uppercase tracking-wider">
                      Includes all taxes & fees
                    </span>
                  </div>
                  <span className="text-2xl font-serif text-booking-primary font-black tracking-tight">
                    ₹{Math.round(costs.total).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-end space-x-2 border-t border-dashed pt-2">
                  <CommonButton
                    type="button"
                    label="Reset"
                    className="border border-red-600 text-red-600 bg-red-50"
                    onClick={reset}
                  />
                  <CommonButton
                    disabled={
                      !selectedService ||
                      !checkIn ||
                      !checkOut ||
                      isSearching ||
                      roomStatus?.message === "Sold Out" ||
                      roomStatus === "unavailable" ||
                      roomStatus === "error" ||
                      roomStatus === null
                    }
                    label={"Book Now"}
                    onClick={handleConfirmBooking}
                    className={`w-full text-sm transition-all active:scale-[0.98] uppercase tracking-widest ${
                      selectedService &&
                      checkIn &&
                      checkOut &&
                      !isSearching &&
                      roomStatus !== null &&
                      roomStatus?.message !== "Sold Out" &&
                      roomStatus !== "unavailable" &&
                      roomStatus !== "error"
                        ? "bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white shadow-lg shadow-booking-primary/10"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                    }`}
                  />
                </div>
              </motion.div>

              <div className="mt-3 mb-2 grid grid-cols-3 gap-2">
                {[
                  {
                    icon: <PeopleAlt sx={{ fontSize: 18 }} />,
                    label: "Twin Sharing",
                  },
                  {
                    icon: <PetsIcon sx={{ fontSize: 18 }} />,
                    label: "Pet Pre-Approved",
                  },
                  {
                    icon: <CalendarMonth sx={{ fontSize: 18 }} />,
                    label: "72-Hr Cancel",
                  },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="bg-booking-primaryLight/30 py-3 px-2 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 border border-booking-primary/5 shadow-sm hover:bg-booking-primaryLight/50 transition-all"
                  >
                    <div className="text-booking-primary bg-white h-8 w-8 rounded-full shadow-sm flex items-center justify-center">
                      {badge.icon}
                    </div>
                    <p className="text-[8px] sm:text-[9px] font-black text-booking-primary uppercase tracking-tight leading-tight">
                      {badge.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <ConfirmationModal
        confirmationOpen={openConfirmationModal || isPaymentPending}
        confirmationHandleClose={() => {
          if (isPaymentPending) {
            cancelPaymentRef.current?.();
            setIsPaymentPending(false);
            setOpenConfirmationModal(false);
          } else {
            setOpenConfirmationModal(false);
          }
        }}
        confirmationSubmitFunc={
          isPaymentPending ? () => {} : initiateBookingPayment
        }
        confirmationLabel={
          isPaymentPending ? "Payment in Progress" : "Confirm Stay Booking"
        }
        confirmationMsg={
          isPaymentPending
            ? "Please complete the transaction in the new tab to secure your room. Do not close this window."
            : "Are you sure you want to book this stay?"
        }
        confirmationButtonMsg={
          isPaymentPending ? "Waiting..." : "Confirm & Pay"
        }
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
}

export default StayBookingModal;
