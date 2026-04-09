import {
  Add,
  ArrowBackIos,
  ArrowForwardIos,
  CalendarMonth,
  KeyboardArrowDown,
  PeopleAlt,
  Remove,
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
} from "date-fns";
import { motion } from "framer-motion";
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

function StayBookingModal({
  open,
  handleClose,
  selectedService,
  handleGetRoomList,
}) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 0,
    children: 0,
    childrenAges: [],
  });

  const [guestsConfirmed, setGuestsConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");
  const [flexibleDuration, setFlexibleDuration] = useState("1 week");
  const [selectedFlexibleMonth, setSelectedFlexibleMonth] = useState(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
  const [guestsAnchorEl, setGuestsAnchorEl] = useState(null);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [roomStatus, setRoomStatus] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const cancelPaymentRef = useRef(null);
  const { user } = useAuth();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    setRoomStatus(null);
  }, [checkIn, checkOut, guests.adults, guests.children, guests.rooms]);

  const carouselRef = useRef(null);
  const guestInputRef = useRef(null);

  const { control, watch, setValue } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      bringingPet: false,
      twinSharing: true,
      mealPreference: {
        label: "Organic Full Board (Included)",
        value: "Organic Full Board (Included)",
      },
    },
  });

  const formValues = watch();

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "next" ? 200 : -200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleDateClick = (date) => {
    if (isBefore(date, startOfToday())) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (isBefore(date, checkIn)) {
        setCheckIn(date);
        setCheckOut(null);
      } else {
        setCheckOut(date);
        setCalendarAnchorEl(null);
        setHoveredDate(null);
        setTimeout(() => {
          if (guestInputRef.current) {
            setGuestsAnchorEl(guestInputRef.current);
          }
        }, 300);
      }
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
            className={`relative flex items-center justify-center h-8 w-8 md:h-9 md:w-9 cursor-pointer text-[13px] font-medium transition-all
                ${!isCurrentMonth ? "invisible pointer-events-none" : isPast ? "text-gray-300 pointer-events-none" : "text-gray-700"}
                ${inRange && isCurrentMonth ? "bg-lime-light/60" : ""}
                ${isStart && isCurrentMonth ? "rounded-l-full" : ""}
                ${isEnd && isCurrentMonth ? "rounded-r-full" : ""}
                ${checkIn && !checkOut && isSameDay(currentDay, hoveredDate) && isCurrentMonth ? "rounded-r-full" : ""}
              `}
          >
            {inRange && isCurrentMonth && (
              <div className="absolute inset-0 bg-lime-light/40 z-0"></div>
            )}
            <div
              className={`relative z-10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-all
                ${selected && isCurrentMonth ? "bg-ayuMid text-white shadow-sm scale-110" : "hover:bg-gray-100"}
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
              className="w-8 md:w-9 text-[9px] font-bold text-ayuMid/40 text-center uppercase"
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
    checkRoomAvailability(
      selectedService.roomTypeId,
      format(new Date(checkIn), "yyyy-MM-dd"),
    )
      .then((res) => {
        setRoomStatus(res.data);
      })
      .catch((err) => {
        console.error("Availability check failed:", err);
        setRoomStatus("error");
      });
  };

  console.log("selectedService", selectedService);

  const handleConfirmBooking = () => {
    const saveObj = {
      userId: user?.userId || 1,
      resortId: 1, // Default resort ID
      roomTypeId: selectedService.roomTypeId,
      stayType: "Seperate",
      checkInDate: format(new Date(checkIn), "yyyy-MM-dd"),
      checkInTime: "",
      checkOutTime: "",
      noOfPersons: guests.adults,
      noOfChildren: guests.children,
      isPet: formValues.bringingPet,
      twinSharing: formValues.twinSharing,
      totalAmount: costs.total,
      guestFullName: formValues.fullName,
      emailId: formValues.email,
      mobile: formValues.mobile,
      city: formValues.city,
    };

    setFinalSaveObj(saveObj);
    setOpenConfirmationModal(true);
  };

  const initiateBookingPayment = async () => {
    try {
      const userId = user?.userId || 1;
      const clinicId = 5;

      const tempObj = {
        amount: costs.total,
        checkInDate: format(new Date(checkIn), "yyyy-MM-dd"),
        userId: userId,
      };

      setIsLoading(true);
      const res = await InitiatePayment(clinicId, userId, tempObj);
      const data = res?.data;

      if (data?.status === 200) {
        setIsLoading(false);
        setIsPaymentPending(true);

        cancelPaymentRef.current = RedirectToSabPaisa(
          data,
          clinicId,
          data.clientTxnId,
          async () => {
            const res = await wellnessStayBooking(finalSaveObj);
            if (res.data.status === 200) {
              successAlert(res.data.message || "Booking Successful!");
              setOpenConfirmationModal(false);
              setIsPaymentPending(false);
              handleClose();
              if (handleGetRoomList) handleGetRoomList();
            } else {
              errorAlert(res.data.message || "Booking failed after payment");
            }
          },
          (errorStatus) => {
            const msg = errorStatus?.message || "Payment failed or cancelled.";
            errorAlert(msg);
            setOpenConfirmationModal(false);
            setIsPaymentPending(false);
          },
        );
      } else {
        setIsLoading(false);
        errorAlert(data?.message || "Failed to initiate payment");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Payment Error:", error);
      errorAlert("An unexpected error occurred during payment.");
    }
  };

  //   {
  //     "userId": 6,
  //     "firstName": "NITIN",
  //     "lastName": "NIKUMBH",
  //     "dob": "1998-04-06T00:00:00",
  //     "mobileNo": 7788899665,
  //     "gender": "male",
  //     "emailId": "pgdiginitin78@gmail.com",
  //     "city": "Pune",
  //     "bloodGroup": "A+",
  //     "address": "",
  //     "pinCode": 411041,
  //     "age": 28,
  //     "relation": "self"
  // }

  useEffect(() => {
    if (user !== null) {
      getPatientDataByMobileNo(user?.mobileNo, 5)
        .then((res) => {
          const data = res?.data?.data;
          const filterData = data.find((item) => item.userId === user?.userId);

          setValue(
            "fullName",
            `${filterData?.firstName} ${filterData?.lastName}`,
          );
          setValue("email", filterData?.emailId);
          setValue("mobile", filterData?.mobileNo);
          setValue("city", filterData?.city);

          console.log("getPatientDataByMobileNo", filterData);
        })
        .catch((err) => err);
    }
  }, []);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={ModalStyle}
          className="w-[98%] sm:w-[95%] md:w-[90%] lg:w-[80%] xl:w-[65%] max-h-[95dvh] overflow-y-auto rounded-xl bg-[#faf9f6] p-0 custom-scrollbar-wellness-stay"
        >
          <div className="sticky top-0 z-30 bg-[#faf9f6] flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h1 className="text-ayuTulsi font-serif text-lg md:text-2xl font-bold leading-tight">
              Stay Booking
            </h1>
            <CancelButtonModal onClick={handleClose} />
          </div>

          <div className="p-3 sm:p-4">
            <div className="relative group/searchbar">
              <motion.div
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-2 flex flex-col gap-2 border group-hover/searchbar:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={(e) => setCalendarAnchorEl(e.currentTarget)}
                    className="flex flex-col px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all border border-gray-100 group/item"
                  >
                    <p className="text-[8px] font-semibold text-ayuMid uppercase tracking-widest mb-1">
                      Check-in
                    </p>
                    <div className="flex items-center gap-1.5">
                      <CalendarMonth
                        className="text-ayuMid"
                        sx={{ fontSize: 14 }}
                      />
                      <span className="text-gray-800 font-semibold text-xs tracking-tight truncate">
                        {checkIn ? format(checkIn, "MMM dd, yyyy") : "Add date"}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={(e) => setCalendarAnchorEl(e.currentTarget)}
                    className="flex flex-col px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all border border-gray-100 group/item"
                  >
                    <p className="text-[8px] font-semibold text-ayuMid uppercase tracking-widest mb-1">
                      Check-out
                    </p>
                    <div className="flex items-center gap-1.5">
                      <CalendarMonth
                        className="text-ayuMid"
                        sx={{ fontSize: 14 }}
                      />
                      <span className="text-gray-800 font-semibold text-xs tracking-tight truncate">
                        {checkOut
                          ? format(checkOut, "MMM dd, yyyy")
                          : "Add date"}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  ref={guestInputRef}
                  onClick={(e) => setGuestsAnchorEl(e.currentTarget)}
                  className="px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all border border-gray-100 group/item"
                >
                  <div className="flex items-center gap-2">
                    <PeopleAlt className="text-ayuMid" sx={{ fontSize: 16 }} />
                    {!guestsConfirmed ? (
                      <span className="text-ayuMid font-semibold text-[11px] uppercase tracking-wider">
                        Add guests
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800 font-bold text-xs tracking-tight">
                          {guests.adults} Adults · {guests.children} Children
                        </span>
                        <span className="text-ayuMid font-black text-[9px] uppercase bg-lime-light px-1.5 py-0.5 rounded-full">
                          {guests.rooms} {guests.rooms > 1 ? "Rooms" : "Room"}
                        </span>
                      </div>
                    )}
                    <KeyboardArrowDown
                      sx={{ fontSize: 16 }}
                      className={`text-gray-300 ml-auto transition-transform duration-300 ${guestsAnchorEl ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={handleCheckVailabilty}
                    className="w-full py-3 bg-gradient-to-r from-ayuMid to-ayuTulsi text-white font-semibold rounded-lg hover:shadow-lg transition-all shadow-forest/10 active:scale-95 text-xs uppercase tracking-widest"
                  >
                    Search Availability
                  </button>
                  {roomStatus !== null && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-[9px] font-bold text-center ${roomStatus === "available" ? "text-ayuMid" : "text-ayuBrown"}`}
                    >
                      {roomStatus === "available"
                        ? "✓ Room is Available"
                        : "✕ Not Available for selected dates"}
                    </motion.p>
                  )}
                </div>
              </motion.div>

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
                      className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "calendar" ? "text-ayuMid" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      Calendar
                      {activeTab === "calendar" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-ayuMid rounded-t-full"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("flexible")}
                      className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "flexible" ? "text-ayuMid" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      I'm flexible
                      {activeTab === "flexible" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-ayuMid rounded-t-full"
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
                            className="pointer-events-auto p-1.5 hover:bg-lime-light/50 rounded-full transition-all text-ayuMid"
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
                            className="pointer-events-auto p-1.5 hover:bg-lime-light/50 rounded-full transition-all text-ayuMid"
                          >
                            <ArrowForwardIos sx={{ fontSize: 12 }} />
                          </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            {renderCalendar(calendarViewDate)}
                          </div>
                          <div className="flex-1 hidden md:block">
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
                                  onClick={() => setFlexibleDuration(duration)}
                                  className={`px-4 py-2 rounded-full border-2 font-semibold text-[11px] transition-all duration-300 ${
                                    flexibleDuration === duration
                                      ? "bg-lime-light border-ayuMid text-ayuMid shadow-sm"
                                      : "border-gray-100 text-ayuTulsi hover:border-gray-200"
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
                            <p className="text-[11px] text-ayuMid font-medium">
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
                                  isSameMonth(monthDate, selectedFlexibleMonth);
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
                                        ? "bg-lime-light border-ayuMid shadow-sm"
                                        : "bg-white border-gray-100 hover:border-gray-200"
                                    }`}
                                  >
                                    <CalendarMonth
                                      sx={{ fontSize: 14 }}
                                      className="text-ayuMid"
                                    />
                                    <div className="text-center leading-none">
                                      <p
                                        className={`text-[9px] pt-1 font-semibold uppercase tracking-tighter ${isSelected ? "text-ayuMid" : "text-gray-800"}`}
                                      >
                                        {monthLabel}
                                      </p>
                                      <p className="text-[8px] font-semibold text-ayuMid mt-0.5">
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
                        className="px-4 py-2 bg-white border border-gray-100 text-ayuMid font-semibold rounded-lg hover:bg-gray-50 transition-all text-xs"
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
                        className="bg-ayuMid text-white min-w-[80px]"
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
                      subtitleColor: "text-ayuMid",
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
                          onClick={() => {
                            if (key === "children") {
                              setGuests((g) => {
                                const newCount = Math.max(min, g.children - 1);
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
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-ayuBrown"
                        >
                          <Remove sx={{ fontSize: 14 }} />
                        </button>
                        <span className="w-4 text-center font-semibold text-sm text-gray-800">
                          {guests[key]}
                        </span>
                        <button
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
                          className="w-8 h-8 rounded-full border border-ayuMid text-ayuMid flex items-center justify-center hover:bg-lime-light active:scale-90 transition-all"
                        >
                          <Add sx={{ fontSize: 14 }} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {guests.children > 0 && (
                    <div className="pt-3 border-t border-gray-100 space-y-3">
                      <p className="text-[10px] text-ayuMid leading-tight">
                        Enter your children's correct ages for accurate pricing.
                      </p>
                      <div className="space-y-2">
                        {Array.from({ length: guests.children }).map((_, i) => (
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
                                  "&::before": { display: "none !important" },
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
                                    "&::before": { display: "none !important" },
                                  }}
                                >
                                  {age} years old
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                    <button
                      onClick={() => setGuestsAnchorEl(null)}
                      className="px-4 py-2 text-[11px] font-semibold text-ayuMid hover:text-gray-600 transition-all"
                    >
                      Cancel
                    </button>
                    <CommonButton
                      type="button"
                      onClick={() => {
                        setGuestsConfirmed(true);
                        setGuestsAnchorEl(null);
                      }}
                      className="bg-ayuMid text-white"
                      label="Apply"
                    />
                  </div>
                </div>
              </Popover>
            </div>

            <div className="w-full mt-4">
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col gap-5"
              >
                <div className="border-b border-ayuMid/10 pb-2">
                  <h2 className="text-base sm:text-lg font-serif text-ayuBrown font-bold">
                    Reservation Summary
                  </h2>
                </div>

                <div className="bg-lime-light p-3 rounded-xl flex items-center gap-3 border border-ayuMid/10">
                  <BedIcon
                    className="text-ayuMid flex-shrink-0"
                    sx={{ fontSize: 20 }}
                  />
                  <span className="text-ayuMid font-semibold text-sm tracking-tight line-clamp-2">
                    {selectedService
                      ? selectedService.serviceName.split("|")[1] ||
                        selectedService.serviceName
                      : "Select your stay"}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-bold text-ayuMid uppercase tracking-widest">
                    Guest Information
                  </p>
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

                <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-ayuMid uppercase tracking-widest">
                    Preferences
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        label: "Bringing a Pet?",
                        sub: "Pre-approval required",
                        subColor: "text-ayuMid",
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
                        className="flex items-center justify-between bg-gray-50/50 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                            <PeopleAlt
                              className="text-ayuMid"
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
                  <p className="text-[10px] font-bold text-ayuMid uppercase tracking-widest">
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

                <div className="pt-3 border-t border-ayuMid/5 flex flex-col gap-2">
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
                      <span className="text-ayuTulsi font-bold text-sm">
                        ₹{value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 pt-3 border-t border-dashed border-ayuMid/20">
                  <div>
                    <h3 className="text-base font-serif text-ayuBrown font-bold leading-none mb-1">
                      Total Amount
                    </h3>
                    <span className="text-[9px] text-ayuMid font-medium uppercase tracking-wider">
                      Includes all taxes & fees
                    </span>
                  </div>
                  <span className="text-2xl font-serif text-ayuMid font-black tracking-tight">
                    ₹{Math.round(costs.total).toLocaleString()}
                  </span>
                </div>

                <button
                  disabled={
                    !selectedService ||
                    !checkIn ||
                    !checkOut ||
                    roomStatus !== "available"
                  }
                  onClick={handleConfirmBooking}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] uppercase tracking-widest ${
                    selectedService &&
                    checkIn &&
                    checkOut &&
                    roomStatus === "available"
                      ? "bg-gradient-to-r from-ayuMid to-ayuTulsi text-white shadow-lg shadow-ayuMid/10"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                  }`}
                >
                  {roomStatus === "available"
                    ? "Complete Booking"
                    : "Unavailable"}
                </button>
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
                    className="bg-lime-light/30 py-3 px-2 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 border border-ayuMid/5 shadow-sm hover:bg-lime-light/50 transition-all"
                  >
                    <div className="text-ayuMid bg-white h-8 w-8 rounded-full shadow-sm flex items-center justify-center">
                      {badge.icon}
                    </div>
                    <p className="text-[8px] sm:text-[9px] font-black text-ayuMid uppercase tracking-tight leading-tight">
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
      />
    </>
  );
}

export default StayBookingModal;
