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
import PetsIcon from '@mui/icons-material/Pets';
import { useAuth } from "../../../../context/AuthContext";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import { InitiatePayment } from "../../../../services/bookAppointment/BookAppointmentServices";
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

  console.log("selectedService",selectedService);
  

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
      city: formValues.city
    };
    
    setFinalSaveObj(saveObj);
    setOpenConfirmationModal(true);
  };

  const initiateBookingPayment = async () => {
    try {
      const userId = user?.userId || 1;
      const clinicId = 5; // Default Clinic ID for Wellness

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
          }
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

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={ModalStyle}
          className="w-[98%] md:w-[90%] lg:w-[85%] xl:w-[65%] max-h-[95vh] overflow-y-auto rounded-[9px] bg-[#faf9f6] p-0 custom-scrollbar-wellness-stay"
        >
            <h1 className="text-ayuTulsi font-serif text-xl md:text-2xl font-bold leading-tight">
              Stay Booking
            </h1>
          <CancelButtonModal onClick={handleClose} />
          <div className="p-4 ">
          <div className="relative group/searchbar ">
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[9px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-1.5 md:p-2 flex flex-col md:flex-row items-stretch md:items-center border group-hover/searchbar:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              <div
                onClick={(e) => setCalendarAnchorEl(e.currentTarget)}
                className="flex-1 px-5 py-2.5 cursor-pointer hover:bg-gray-50 rounded-[9px] transition-all border-b md:border-b-0 md:border-r border-gray-50 group/item text-center md:text-left"
              >
                <p className="text-[8px] font-semibold text-ayuMid uppercase tracking-widest mb-0.5 group-hover/item:text-ayuMid/80 transition-colors">
                  Check-in
                </p>
                <div className="flex items-center gap-2">
                  <CalendarMonth
                    className="text-ayuMid group-hover/item:text-ayuMid/70 transition-colors"
                    sx={{ fontSize: 16 }}
                  />
                  <span className="text-gray-800 font-semibold text-sm tracking-tight whitespace-nowrap">
                    {checkIn ? format(checkIn, "MMM dd, yyyy") : "Add date"}
                  </span>
                  <KeyboardArrowDown
                    sx={{ fontSize: 12 }}
                    className="text-gray-300 ml-auto"
                  />
                </div>
              </div>

              <div
                onClick={(e) => setCalendarAnchorEl(e.currentTarget)}
                className="flex-1 px-5 py-2.5 cursor-pointer hover:bg-gray-50 rounded-[9px] transition-all border-b md:border-b-0 md:border-r border-gray-50 group/item text-center md:text-left"
              >
                <p className="text-[8px] font-semibold text-ayuMid uppercase tracking-widest mb-0.5 group-hover/item:text-ayuMid/80 transition-colors">
                  Check-out
                </p>
                <div className="flex items-center gap-2">
                  <CalendarMonth
                    className="text-ayuMid group-hover/item:text-ayuMid/70 transition-colors"
                    sx={{ fontSize: 16 }}
                  />
                  <span className="text-gray-800 font-semibold text-sm tracking-tight whitespace-nowrap">
                    {checkOut ? format(checkOut, "MMM dd, yyyy") : "Add date"}
                  </span>
                  <KeyboardArrowDown
                    sx={{ fontSize: 12 }}
                    className="text-gray-300 ml-auto"
                  />
                </div>
              </div>

              <div
                ref={guestInputRef}
                onClick={(e) => setGuestsAnchorEl(e.currentTarget)}
                className="flex-1 px-5 py-2.5 cursor-pointer hover:bg-gray-50 rounded-[9px] transition-all relative group/item"
              >
                <div className="flex items-center gap-2 h-full">
                  <PeopleAlt
                    className="text-ayuMid group-hover/item:text-ayuMid/70 transition-colors"
                    sx={{ fontSize: 16 }}
                  />
                  {!guestsConfirmed ? (
                    <span className="text-ayuMid font-semibold text-[11px] uppercase tracking-wider">
                      Add guests
                    </span>
                  ) : (
                    <div className="flex flex-col -space-y-0.5 justify-center">
                      <span className="text-gray-800 font-bold text-[11px] tracking-tight">
                        {guests.adults} Ad, {guests.children} Ch
                      </span>
                      <span className="text-ayuMid font-black text-[9px] uppercase">
                        {guests.rooms} {guests.rooms > 1 ? "Rooms" : "Room"}
                      </span>
                    </div>
                  )}
                  <div className="ml-auto">
                    <KeyboardArrowDown
                      sx={{ fontSize: 16 }}
                      className={`text-gray-300 transition-transform duration-300 ${guestsAnchorEl ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 items-stretch md:items-start">
                <button
                  type="button"
                  onClick={handleCheckVailabilty}
                  className="md:ml-2 px-6 py-3 bg-gradient-to-r from-ayuMid to-ayuTulsi text-white font-semibold rounded-[9px] hover:shadow-lg transition-all shadow-forest/10 active:scale-95 whitespace-nowrap text-xs uppercase tracking-widest"
                >
                  Search Availability
                </button>
                {roomStatus !== null && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-[9px] font-bold px-4 ${roomStatus === "available" ? "text-ayuMid" : "text-ayuBrown"}`}
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
                  borderRadius: "9px",
                  mt: 1,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.01)",
                  overflow: "hidden",
                  width: { xs: "340px", md: "680px" },
                },
              }}
            >
              <div className="bg-white flex flex-col h-[350px]">
                <div className="flex items-center justify-center gap-6 py-3 border-b border-gray-50 flex-shrink-0">
                  <button
                    onClick={() => setActiveTab("calendar")}
                    className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "calendar" ? "text-ayuMid" : "text-ayuMid hover:text-gray-500"}`}
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
                    className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "flexible" ? "text-ayuMid" : "text-ayuMid hover:text-gray-500"}`}
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
                <div className="flex-1 overflow-hidden px-6 py-4">
                  {activeTab === "calendar" && (
                    <div className="relative animate-in fade-in duration-300">
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-center z-20 pointer-events-none">
                        <button
                          onClick={() =>
                            setCalendarViewDate(subMonths(calendarViewDate, 1))
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
                            setCalendarViewDate(addMonths(calendarViewDate, 1))
                          }
                          className="pointer-events-auto p-1.5 hover:bg-lime-light/50 rounded-full transition-all text-ayuMid"
                        >
                          <ArrowForwardIos sx={{ fontSize: 12 }} />
                        </button>
                      </div>

                      <div className="flex flex-col md:flex-row gap-8">
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
                    <div className="space-y-5 animate-in fade-in duration-300 max-w-2xl mx-auto w-full">
                      <div className="space-y-3">
                        <p className="text-gray-800 font-semibold text-sm tracking-tight text-center md:text-left">
                          How long do you want to stay?
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                          {["3 nights", "1 week", "1 month"].map((duration) => (
                            <button
                              key={duration}
                              onClick={() => setFlexibleDuration(duration)}
                              className={`px-5 py-2 rounded-full border-2 font-semibold text-[11px] transition-all duration-300
                              ${
                                flexibleDuration === duration
                                  ? "bg-lime-light border-ayuMid text-ayuMid shadow-sm"
                                  : "border-gray-100 text-ayuTulsi hover:border-gray-200"
                              }
                            `}
                            >
                              {duration}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-0.5 text-center md:text-left">
                          <p className="text-gray-800 font-semibold text-sm tracking-tight">
                            When do you want to Stay?
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
                            className="flex gap-3 overflow-x-auto pb-1 pt-1 scroll-smooth [&::-webkit-scrollbar]:hidden"
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
                                  className={`flex-shrink-0 w-24 py-3 rounded-[9px] border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300
                                  ${
                                    isSelected
                                      ? "bg-lime-light border-ayuMid shadow-sm"
                                      : "bg-white border-gray-100 hover:border-gray-200"
                                  }
                                `}
                                >
                                  <CalendarMonth
                                    sx={{ fontSize: 16 }}
                                    className={
                                      isSelected ? "text-ayuMid" : "text-ayuMid"
                                    }
                                  />
                                  <div className="text-center leading-none">
                                    <p
                                      className={`text-[10px] pt-1 font-semibold uppercase tracking-tighter ${isSelected ? "text-ayuMid" : "text-gray-800"}`}
                                    >
                                      {monthLabel}
                                    </p>
                                    <p className="text-[8px] font-semibold text-ayuMid mt-1">
                                      {yearLabel}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <button
                            onClick={() => scrollCarousel("prev")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto bg-white shadow-md rounded-full p-1.5 border border-gray-50 flex items-center justify-center hover:bg-gray-50 active:scale-90 z-10 transition-colors"
                          >
                            <ArrowBackIos
                              sx={{ fontSize: 10 }}
                              className="text-gray-600 ml-1"
                            />
                          </button>
                          <button
                            onClick={() => scrollCarousel("next")}
                            className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-auto bg-white shadow-md rounded-full p-1.5 border border-gray-50 flex items-center justify-center hover:bg-gray-50 active:scale-90 z-10 transition-colors"
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
                <div className="mt-auto px-6 py-4 border-t border-gray-100 bg-gray-50/20 flex-shrink-0">
                  <div className="flex items-center justify-between gap-4">
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
                    <div className="flex gap-4">
                      <button
                        onClick={() => setCalendarAnchorEl(null)}
                        className="px-6 py-2 bg-white border border-gray-100 text-ayuMid font-semibold rounded-[9px] hover:bg-gray-50 transition-all text-xs"
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
                        className="bg-ayuMid text-white min-w-[100px]"
                      />
                    </div>
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
                  borderRadius: "9px",
                  mt: 1,
                  p: 2.5,
                  width: "300px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.01)",
                },
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800 text-sm">Room</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setGuests((g) => ({
                          ...g,
                          rooms: Math.max(1, g.rooms - 1),
                        }))
                      }
                      className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-ayuBrown"
                    >
                      <Remove sx={{ fontSize: 14 }} />
                    </button>
                    <span className="w-3 text-center font-semibold text-sm text-gray-800">
                      {guests.rooms}
                    </span>
                    <button
                      onClick={() =>
                        setGuests((g) => ({ ...g, rooms: g.rooms + 1 }))
                      }
                      className="w-7 h-7 rounded-full border border-ayuMid text-ayuMid flex items-center justify-center hover:bg-lime-light active:scale-90 transition-all"
                    >
                      <Add sx={{ fontSize: 14 }} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      Adults
                    </p>
                    <p className="text-[10px] text-ayuMid">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setGuests((g) => ({
                          ...g,
                          adults: Math.max(1, g.adults - 1),
                        }))
                      }
                      className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-ayuBrown"
                    >
                      <Remove sx={{ fontSize: 14 }} />
                    </button>
                    <span className="w-3 text-center font-semibold text-sm text-gray-800">
                      {guests.adults}
                    </span>
                    <button
                      onClick={() =>
                        setGuests((g) => ({ ...g, adults: g.adults + 1 }))
                      }
                      className="w-7 h-7 rounded-full border border-ayuMid text-ayuMid flex items-center justify-center hover:bg-lime-light active:scale-90 transition-all"
                    >
                      <Add sx={{ fontSize: 14 }} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      Children
                    </p>
                    <p className="text-[10px] text-ayuBrown">Ages 0-12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setGuests((g) => {
                          const newCount = Math.max(0, g.children - 1);
                          return {
                            ...g,
                            children: newCount,
                            childrenAges: g.childrenAges.slice(0, newCount),
                          };
                        });
                      }}
                      className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-amber-600"
                    >
                      <Remove sx={{ fontSize: 14 }} />
                    </button>
                    <span className="w-3 text-center font-semibold text-sm text-gray-800">
                      {guests.children}
                    </span>
                    <button
                      onClick={() => {
                        setGuests((g) => {
                          const newCount = g.children + 1;
                          return {
                            ...g,
                            children: newCount,
                            childrenAges: [...g.childrenAges, ""],
                          };
                        });
                      }}
                      className="w-7 h-7 rounded-full border border-ayuMid text-ayuMid flex items-center justify-center hover:bg-lime-light active:scale-90 transition-all"
                    >
                      <Add sx={{ fontSize: 14 }} />
                    </button>
                  </div>
                </div>

                {guests.children > 0 && (
                  <div className="pt-3 border-t border-gray-50 space-y-3">
                    <p className="text-[10px] text-ayuMid leading-tight">
                      For accurate room pricing, make sure to enter your
                      children's correct ages.
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
                                "&::before": { display: "none !important" },
                                fontSize: "11px",
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

                <div className="pt-3 flex justify-end gap-2 border-t border-gray-50">
                  <button
                    onClick={() => setGuestsAnchorEl(null)}
                    className="px-4 py-1.5 text-[11px] font-semibold text-ayuMid hover:text-gray-600 transition-all"
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

          <div className="w-full max-w-4xl mx-auto mt-4">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[12px] p-5  border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col gap-6"
            >
              <div className="border-b border-ayuMid/10 pb-2">
                <h2 className="text-lg font-serif text-ayuBrown font-bold">
                  Reservation Summary
                </h2>
              </div>

              <div className="bg-lime-light p-3.5 rounded-[9px] flex items-center gap-3 border border-ayuMid/10">
                <BedIcon className="text-ayuMid" sx={{ fontSize: 22 }} />
                <span className="text-ayuMid font-semibold text-sm md:text-base tracking-tight flex-1">
                  {selectedService
                    ? selectedService.serviceName.split("|")[1] ||
                      selectedService.serviceName
                    : "Select your stay"}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-bold text-ayuMid uppercase tracking-widest leading-none">
                  Guest Information
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="text-[11px] font-bold text-ayuMid uppercase tracking-widest leading-none">
                  Preferences
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between bg-gray-50/50 p-3 rounded-[9px] border border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <PeopleAlt className="text-ayuMid" sx={{ fontSize: 18 }} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-800 text-[13px]">Bringing a Pet?</p>
                        <p className="text-[10px] text-ayuMid">Pre-approval required</p>
                      </div>
                    </div>
                    <Switch
                      size="small"
                      checked={formValues.bringingPet}
                      onChange={(e) => setValue("bringingPet", e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#4B6B53",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          { backgroundColor: "#4B6B53" },
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between bg-gray-50/50 p-3 rounded-[9px] border border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <PeopleAlt className="text-ayuMid" sx={{ fontSize: 18 }} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-800 text-[13px]">Twin Sharing?</p>
                        <p className="text-[10px] text-red-500 font-semibold">*Same-gender rules</p>
                      </div>
                    </div>
                    <Switch
                      size="small"
                      checked={formValues.twinSharing}
                      onChange={(e) => setValue("twinSharing", e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#4B6B53",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          { backgroundColor: "#4B6B53" },
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <p className="text-[11px] font-bold text-ayuMid uppercase tracking-widest leading-none pb-1">
                  Meal Preference
                </p>
                <div className="w-full md:w-1/2">
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
              </div>

              <div className="pt-4 border-t border-ayuMid/5 flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Stay</span>
                  <span className="text-ayuTulsi font-bold">
                    ₹{costs.stay.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Wellness Access</span>
                  <span className="text-ayuTulsi font-bold">
                    ₹{costs.wellness.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Taxes & Service</span>
                  <span className="text-ayuTulsi font-bold">
                    ₹{Math.round(costs.taxes).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-row items-baseline justify-between gap-4 mt-1 pt-3 border-t border-dashed border-ayuMid/20">
                <div className="flex flex-col">
                  <h3 className="text-base font-serif text-ayuBrown font-bold leading-none mb-1">Total Amount</h3>
                  <span className="text-[9px] text-ayuMid font-medium uppercase tracking-wider">Includes all taxes & fees</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-serif text-ayuMid font-black tracking-tight leading-none">
                    ₹{Math.round(costs.total).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  disabled={!selectedService || !checkIn || !checkOut || roomStatus !== "available"}
                  onClick={handleConfirmBooking}
                  className={`w-full py-3 rounded-[9px] font-bold text-base transition-all active:scale-[0.98] uppercase tracking-widest ${
                    selectedService && checkIn && checkOut && roomStatus === "available"
                      ? "bg-gradient-to-r from-ayuMid to-ayuTulsi text-white shadow-lg shadow-ayuMid/10" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                  }`}
                >
                  {roomStatus === "available" 
                    ? "Complete Booking" 
                    : "UNAVAILABLE"}
                </button>
              </div>

            </motion.div>

            <div className="mt-3.5 mb-2 grid grid-cols-3 gap-2.5">
              {[
                {
                  icon: <PeopleAlt sx={{ fontSize: 20 }} />,
                  label: "Twin Sharing",
                },
                {
                  icon: <PetsIcon sx={{ fontSize: 20 }} />,
                  label: "Pet Pre-Approved",
                },
                {
                  icon: <CalendarMonth sx={{ fontSize: 20 }} />,
                  label: "72-Hr Cancel",
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="bg-lime-light/30 py-2.5 px-2.5 rounded-[9px] flex flex-col items-center justify-center text-center gap-1 border border-ayuMid/5 shadow-sm transition-all hover:bg-lime-light/50"
                >
                  <div className="text-ayuMid bg-white h-8 w-8 rounded-full shadow-sm flex items-center justify-center">{badge.icon}</div>
                  <p className="text-[9px] font-black text-ayuMid uppercase tracking-tight leading-tight">
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
        confirmationSubmitFunc={isPaymentPending ? () => {} : initiateBookingPayment}
        confirmationLabel={isPaymentPending ? "Payment in Progress" : "Confirm Stay Booking"}
        confirmationMsg={
          isPaymentPending
            ? "Please complete the transaction in the new tab to secure your room. Do not close this window."
            : "Are you sure you want to book this stay?"
        }
        confirmationButtonMsg={isPaymentPending ? "Waiting..." : "Confirm & Pay"}
      />
    </>
  );
}

export default StayBookingModal;
