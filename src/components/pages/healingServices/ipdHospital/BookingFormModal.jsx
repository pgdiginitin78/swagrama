import {
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slide,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileText,
  Leaf,
  Loader2,
  RefreshCw,
  Shield,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import DropdownField from "../../../common/formFields/DropdownField";
import InputField from "../../../common/formFields/InputField";
import { DeleteIcon } from "../../../common/assets/CommonAssets";
import DatePickerField from "../../../common/formFields/DatePickerField";
import { getUserDetails } from "../../../../services/login/LoginServices";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = Yup.object({
  bookingFor: Yup.string().required("Please select who this booking is for"),
  roomName: Yup.string().when("$hasRooms", {
    is: true,
    then: (s) => s.required("Please select a room to proceed"),
    otherwise: (s) => s.optional(),
  }),
  primaryGuest: Yup.object({
    title: Yup.object()
      .nullable()
      .shape({
        value: Yup.string().required("required"),
        label: Yup.string().required("required"),
      })
      .required("Required"),
    firstName: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile must be exactly 10 digits")
      .required("Mobile number is required"),
    dateOfBirth: Yup.string().when("$bookingFor", {
      is: "someone_else",
      then: (s) =>
        s
          .required("Date of birth is required")
          .test(
            "age-range",
            "Age must be between 18 and 120 years",
            (value) => {
              if (!value) return false;
              const dob = new Date(value);
              const today = new Date();
              let age = today.getFullYear() - dob.getFullYear();
              const m = today.getMonth() - dob.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
              return age >= 18 && age <= 120;
            },
          ),
      otherwise: (s) => s.optional(),
    }),
  }),
  addGST: Yup.boolean().default(false),
  gstDetails: Yup.object()
    .when("addGST", {
      is: true,
      then: (s) =>
        s.shape({
          gstNumber: Yup.string()
            .length(15, "GST Number must be exactly 15 characters")
            .required("GST Number is required"),
          companyName: Yup.string().required("Company name is required"),
          gstAddress: Yup.string().required("GST Address is required"),
        }),
      otherwise: (s) =>
        s.shape({
          gstNumber: Yup.string().optional(),
          companyName: Yup.string().optional(),
          gstAddress: Yup.string().optional(),
        }),
    })
    .default({}),
  guests: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("Title is required"),
        name: Yup.string()
          .min(2, "Minimum 2 characters")
          .required("Full name is required"),
        below12: Yup.boolean().default(false),
        saveGuest: Yup.boolean().default(false),
      }),
    )
    .default([]),
  noOfPerson: Yup.number()
    .min(1, "At least 1 person required")
    .required("Required"),
  noOfChild: Yup.number().min(0, "Invalid number").required("Required"),
  petOption: Yup.boolean().default(false),
  paymentOption: Yup.string().required("Please select a payment option"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

function yupResolver(s, context) {
  return async (values) => {
    try {
      const v = await s.validate(values, { abortEarly: false, context });
      return { values: v, errors: {} };
    } catch (e) {
      if (e.name !== "ValidationError") throw e;
      const errs = {};
      e.inner.forEach((err) => {
        if (!err.path) return;
        const parts = err.path.replace(/\[(\d+)\]/g, ".$1").split(".");
        let cur = errs;
        for (let i = 0; i < parts.length - 1; i++) {
          const k = parts[i];
          const nk = parts[i + 1];
          if (cur[k] == null) cur[k] = isNaN(+nk) ? {} : [];
          cur = cur[k];
        }
        cur[parts[parts.length - 1]] = {
          type: err.type || "v",
          message: err.message,
        };
      });
      return { values: {}, errors: errs };
    }
  };
}

const TITLES = ["Mr", "Mrs", "Ms", "Master"];
const MAX_GUESTS = 3;

const MOCK_AVAILABILITY = {
  "स्वअमृतकक्ष | Eternity Room": "available",
  "स्वनित्यकक्ष | Eternal Room": "unavailable",
  "स्वशाश्वतकक्ष | Perpetual Room": "available",
  "स्वनैष्ठिककक्ष | Firmness Room": "available",
  "स्वअनन्तकक्ष | Infinite Room": "unavailable",
};

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.07, ease: "easeOut" },
  }),
};

const guestVariants = {
  hidden: { opacity: 0, x: -16, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { opacity: 0, x: 16, scale: 0.96, transition: { duration: 0.18 } },
};

function FieldError({ message }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs text-red-600 mt-0.5 flex items-center gap-1"
    >
      <span>⚠</span> {message}
    </motion.p>
  );
}

function SectionCard({ children, index, icon: Icon, title, subtitle }) {
  return (
    <motion.div
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/70 backdrop-blur-md rounded-lg border border-emerald-900/10 shadow-sm overflow-hidden"
    >
      {(title || Icon) && (
        <div className="px-3 sm:px-4 py-3 sm:py-3.5 border-b border-emerald-900/8">
          <div className="flex items-center gap-2 sm:gap-3">
            {Icon && (
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-emerald-900/15 to-lime-900/10 rounded-lg sm:rounded-xl flex-shrink-0">
                <Icon size={14} className="sm:size-4 text-emerald-900" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="p-3 sm:p-4">{children}</div>
    </motion.div>
  );
}

function PaymentCard({
  selected,
  onClick,
  title,
  subtitle,
  badge,
  amount,
  children,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-lg border-2 p-3 sm:p-4 transition-all duration-200 ${
        selected
          ? "border-emerald-700 bg-gradient-to-br from-emerald-900/8 to-lime-900/5 shadow-md"
          : "border-emerald-900/15 bg-white/60 hover:border-emerald-900/30"
      }`}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
          <div
            className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              selected ? "border-emerald-700" : "border-gray-300"
            }`}
          >
            {selected && (
              <div className="w-2 h-2 rounded-full bg-emerald-700" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                {title}
              </p>
              {badge && (
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 bg-emerald-900 text-lime-300 rounded-full whitespace-nowrap">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
              {subtitle}
            </p>
            {children}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-base sm:text-lg font-bold text-emerald-900">
            ₹{amount?.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function RoomAvailabilitySection({ service, errors, setValue }) {
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [checkingRooms, setCheckingRooms] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  const rooms = service?.rooms ?? [];
  if (rooms.length === 0) return null;

  const checkAvailability = async () => {
    setCheckingRooms(true);
    setChecked(false);
    setSelectedRoom("");
    setValue("roomName", "");
    await new Promise((r) => setTimeout(r, 1800));
    setAvailabilityMap(MOCK_AVAILABILITY);
    setChecked(true);
    setCheckingRooms(false);
  };

  const handleRoomSelect = (room) => {
    if (availabilityMap[room] === "unavailable") return;
    setSelectedRoom(room);
    setValue("roomName", room, { shouldValidate: true });
  };

  return (
    <SectionCard
      index={1}
      icon={BedDouble}
      title="Room Selection"
      subtitle="Check availability and pick your room"
    >
      <div className="space-y-3">
        <div className="flex justify-end">
          <motion.button
            type="button"
            onClick={checkAvailability}
            disabled={checkingRooms}
            whileHover={!checkingRooms ? { scale: 1.02 } : {}}
            whileTap={!checkingRooms ? { scale: 0.98 } : {}}
            className="flex items-center justify-end gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-emerald-700/40 text-emerald-800 text-xs sm:text-sm font-bold bg-emerald-900/5 hover:bg-emerald-900/10 hover:border-emerald-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {checkingRooms ? (
              <>
                <Loader2 size={14} className="animate-spin flex-shrink-0" />
                <span className="hidden sm:inline">Checking Availability…</span>
                <span className="sm:hidden">Checking…</span>
              </>
            ) : (
              <>
                <RefreshCw
                  size={14}
                  className={`flex-shrink-0 ${checked ? "text-emerald-600" : ""}`}
                />
                <span className="hidden sm:inline">
                  {checked
                    ? "Re-check Availability"
                    : "Check Room Availability"}
                </span>
                <span className="sm:hidden">
                  {checked ? "Re-check" : "Check"}
                </span>
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {checkingRooms && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {rooms.map((room) => (
                  <div
                    key={room}
                    className="h-12 sm:h-14 rounded-lg sm:rounded-xl border-2 border-emerald-900/10 bg-white/50 animate-pulse"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {checked && !checkingRooms && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-900/60">
                  Select a Room
                </p>
                <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span className="hidden sm:inline">Available</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                    <span className="hidden sm:inline">Unavailable</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {rooms.map((room, i) => {
                  const status = availabilityMap[room] ?? "available";
                  const isAvailable = status === "available";
                  const isSelected = selectedRoom === room;

                  return (
                    <motion.div
                      key={room}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                      onClick={() => handleRoomSelect(room)}
                      className={`relative flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl border-2 transition-all duration-200
                        ${!isAvailable ? "cursor-not-allowed opacity-50 border-gray-200 bg-gray-50/60" : "cursor-pointer"}
                        ${isSelected ? "border-emerald-700 bg-gradient-to-br from-emerald-900/10 to-lime-900/6 shadow-md" : ""}
                        ${isAvailable && !isSelected ? "border-emerald-900/15 bg-white/60 hover:border-emerald-700/50 hover:bg-emerald-900/5 hover:shadow-sm" : ""}
                      `}
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected
                            ? "bg-emerald-900 text-lime-300"
                            : isAvailable
                              ? "bg-emerald-900/10 text-emerald-900"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <BedDouble size={14} className="sm:size-[15px]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs sm:text-xs font-bold leading-tight truncate ${
                            isSelected
                              ? "text-emerald-900"
                              : isAvailable
                                ? "text-gray-900"
                                : "text-gray-400"
                          }`}
                        >
                          {room}
                        </p>
                        <p
                          className={`text-[10px] font-semibold mt-0.5 ${
                            isAvailable ? "text-emerald-600" : "text-gray-400"
                          }`}
                        >
                          {isAvailable ? "Available" : "N/A"}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <CheckCircle2
                            size={16}
                            className="text-emerald-700"
                          />
                        ) : isAvailable ? (
                          <div className="w-4 h-4 rounded-full border-2 border-emerald-900/20" />
                        ) : (
                          <XCircle size={16} className="text-gray-300" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {errors.roomName && (
                <FieldError message={errors.roomName.message} />
              )}

              <AnimatePresence>
                {selectedRoom && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 px-3 py-2 bg-emerald-900/8 border border-emerald-900/15 rounded-lg sm:rounded-xl"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-emerald-700 flex-shrink-0"
                    />
                    <p className="text-xs font-bold text-emerald-900 truncate">
                      Selected:{" "}
                      <span className="font-extrabold">{selectedRoom}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}

function SuccessView({ onClose, data, service }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-emerald-900 to-lime-800 rounded-full flex items-center justify-center mb-3 sm:mb-5 shadow-xl flex-shrink-0"
      >
        <BadgeCheck size={32} className="sm:size-[38px] text-lime-300" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-lg sm:text-xl font-bold text-gray-900 mb-2"
      >
        Booking Confirmed!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed max-w-xs"
      >
        Your stay at <strong>{service?.serviceName}</strong> has been
        successfully booked. Voucher sent to your email.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xs bg-gradient-to-br from-emerald-900/10 to-lime-900/8 border border-emerald-900/20 rounded-lg sm:rounded-[9px] p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Booking ID</span>
          <span className="font-mono font-bold text-emerald-900 text-[11px] sm:text-sm">
            SWG-{Math.random().toString(36).slice(2, 8).toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Guest</span>
          <span className="font-bold text-gray-900">
            {data?.primaryGuest?.firstName} {data?.primaryGuest?.lastName}
          </span>
        </div>
        {data?.roomName && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Room</span>
            <span className="font-bold text-gray-900 text-right max-w-[140px] leading-tight text-[11px] sm:text-sm">
              {data.roomName}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Check-in</span>
          <span className="font-bold text-gray-900">{service?.checkIn}</span>
        </div>
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onClose}
        className="px-6 sm:px-8 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-900 via-emerald-800 to-lime-900 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 border border-lime-400/30"
      >
        Done
      </motion.button>
    </motion.div>
  );
}

const BookingFormModal = ({ open, handleClose, eventDetails: service }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const hasRooms = (service?.rooms?.length ?? 0) > 0;
  const userData = JSON.parse(localStorage.getItem("user") || "null");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: (values, context, options) =>
      yupResolver(schema, { hasRooms, bookingFor: values.bookingFor })(
        values,
        context,
        options,
      ),
    defaultValues: {
      bookingFor: "myself",
      noOfPerson: 1,
      noOfChild: 0,
      petOption: false,
      roomName: "",
      primaryGuest: {
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dateOfBirth: "",
      },
      addGST: false,
      gstDetails: { gstNumber: "", companyName: "", gstAddress: "" },
      guests: [],
      paymentOption: "",
      terms: false,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "guests" });

  const [addGST, paymentOption, bookingFor, noOfPerson, noOfChild, petOption] =
    watch([
      "addGST",
      "paymentOption",
      "bookingFor",
      "noOfPerson",
      "noOfChild",
      "petOption",
    ]);

  const basePrice = service?.price ?? 3760;
  const adultPrice = basePrice * (noOfPerson > 0 ? noOfPerson : 1);
  const childPrice = (noOfChild > 0 ? noOfChild : 0) * (basePrice * 0.5);
  const petPrice = petOption ? 500 : 0;
  const price = Math.round(adultPrice + childPrice + petPrice);
  const origPrice = Math.round(price * 1.03);
  const canAddGuest = fields.length < MAX_GUESTS;

  const onClose = () => {
    reset();
    setSubmitted(false);
    setSubmittedData(null);
    handleClose();
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1200));
    const payload = {
      stayId: service?.serviceName ?? "wellness-stay",
      bookingFor: data.bookingFor,
      noOfPerson: data.noOfPerson,
      noOfChild: data.noOfChild,
      petOption: data.petOption,
      ...(hasRooms ? { roomName: data.roomName } : {}),
      primaryGuest: data.primaryGuest,
      ...(data.addGST ? { gstDetails: data.gstDetails } : {}),
      guests: data.guests,
      paymentOption: data.paymentOption,
    };
    setSubmittedData(data);
    setSubmitted(true);
  };

  useEffect(() => {
    getUserDetails(userData?.userId)
      .then((res) => {
        const data = res?.data?.data;
        setValue("primaryGuest.firstName", data.firstName);
        setValue("primaryGuest.lastName", data.lastName);
        setValue("primaryGuest.email", data.emailId);
        setValue("primaryGuest.mobile", data.whatsappNo);
      })
      .catch((err) => err);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #f7fee7 40%, #fffbeb 100%)",
          m: { xs: 0.5, sm: 1 },
          maxHeight: { xs: "calc(100vh - 4px)", sm: "calc(100vh - 32px)" },
        },
      }}
    >
      <div className="sticky top-0 z-20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-lime-900 px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b border-lime-400/20">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1 sm:p-1.5 bg-white/15 rounded-lg sm:rounded-xl flex-shrink-0">
            <Leaf size={14} className="sm:size-4 text-lime-300" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-xs sm:text-sm leading-tight truncate">
              {service?.serviceName ?? "Wellness Stay"}
            </p>
            <p className="text-lime-300/80 text-[10px] sm:text-xs">
              {service?.person} · ₹{price.toLocaleString()}
            </p>
          </div>
        </div>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.1)" }}
        >
          <X size={16} className="sm:size-[18px]" />
        </IconButton>
      </div>

      <DialogContent
        sx={{
          p: 0,
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            background: "#166534",
            borderRadius: "4px",
          },
        }}
      >
        {submitted ? (
          <SuccessView
            onClose={onClose}
            data={submittedData}
            service={service}
          />
        ) : (
          <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
            <form
              id="booking-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="space-y-2.5 sm:space-y-3">
                <SectionCard
                  index={0}
                  icon={UserCheck}
                  title="Booking For"
                  subtitle="Who is this reservation for?"
                >
                  <Controller
                    name="bookingFor"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        value={field.value}
                        onChange={field.onChange}
                        sx={{ gap: 1 }}
                      >
                        {[
                          { value: "myself", label: "Myself" },
                          { value: "someone_else", label: "Someone Else" },
                        ].map((opt) => (
                          <motion.div
                            key={opt.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => field.onChange(opt.value)}
                            className={`flex-1 min-w-0 md:min-w-[130px] flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              field.value === opt.value
                                ? "border-emerald-700 bg-gradient-to-br from-emerald-900/10 to-lime-900/5 shadow-sm"
                                : "border-emerald-900/15 bg-white/60 hover:border-emerald-900/30"
                            }`}
                          >
                            <Radio
                              value={opt.value}
                              checked={field.value === opt.value}
                              size="small"
                              sx={{
                                p: 0,
                                color: "#166534",
                                "&.Mui-checked": { color: "#166534" },
                              }}
                            />
                            <span className="text-xs sm:text-sm font-bold text-gray-900">
                              {opt.label}
                            </span>
                          </motion.div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.bookingFor && (
                    <FieldError message={errors.bookingFor.message} />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 sm:mt-4">
                    <div>
                      <InputField
                        control={control}
                        name="noOfPerson"
                        label="No of Person"
                        type="number"
                        error={errors.noOfPerson}
                      />
                    </div>
                    <div>
                      <InputField
                        control={control}
                        name="noOfChild"
                        label="No of Child"
                        type="number"
                        error={errors.noOfChild}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <Controller
                      name="petOption"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              size="small"
                              sx={{
                                color: "#166534",
                                "&.Mui-checked": { color: "#166534" },
                                p: "4px",
                              }}
                            />
                          }
                          label={
                            <span className="text-xs sm:text-sm font-bold text-gray-900">
                              Bring a Pet (Additional charges apply)
                            </span>
                          }
                          sx={{ m: 0 }}
                        />
                      )}
                    />
                  </div>
                </SectionCard>

                <RoomAvailabilitySection
                  service={service}
                  errors={errors}
                  setValue={setValue}
                />

                <SectionCard
                  index={2}
                  icon={Users}
                  title="Primary Guest Details"
                  subtitle={
                    bookingFor === "someone_else"
                      ? "Enter the primary guest's details"
                      : "Your details for the booking confirmation"
                  }
                >
                  <div className="space-y-2.5 sm:space-y-3.5">
                    <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-2 sm:gap-3">
                      <div>
                        <DropdownField
                          control={control}
                          name="primaryGuest.title"
                          placeholder="Prefix"
                          error={errors.primaryGuest?.title}
                          dataArray={[
                            { value: "Mr", label: "Mr" },
                            { value: "Mrs", label: "Mrs" },
                            { value: "Ms", label: "Ms" },
                          ]}
                        />
                      </div>
                      <div>
                        <InputField
                          control={control}
                          name="primaryGuest.firstName"
                          label="First name"
                          error={errors.primaryGuest?.firstName}
                        />
                      </div>
                    </div>

                    <div>
                      <InputField
                        control={control}
                        name="primaryGuest.lastName"
                        label="Last name"
                        error={errors.primaryGuest?.lastName}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <InputField
                          control={control}
                          name="primaryGuest.email"
                          label="Email Address"
                          error={errors.primaryGuest?.email}
                        />
                      </div>
                      <div>
                        <InputField
                          control={control}
                          name="primaryGuest.mobile"
                          label="Mobile Number"
                          error={errors.primaryGuest?.mobile}
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {bookingFor === "someone_else" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-1">
                            <DatePickerField
                              control={control}
                              name="primaryGuest.dateOfBirth"
                              label="Date of Birth"
                              error={errors.primaryGuest?.dateOfBirth}
                              dob={true}
                              disableFuture={true}
                              inputFormat={"dd-MM-yyyy"}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SectionCard>

                <SectionCard index={3} icon={FileText} title="">
                  <div className="space-y-0">
                    <Controller
                      name="addGST"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              size="small"
                              sx={{
                                color: "#166534",
                                "&.Mui-checked": { color: "#166534" },
                                p: "4px",
                              }}
                            />
                          }
                          label={
                            <span className="text-xs sm:text-sm font-bold text-gray-900">
                              Add GST Details for Business Travel
                            </span>
                          }
                          sx={{ m: 0 }}
                        />
                      )}
                    />

                    <AnimatePresence>
                      {addGST && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 sm:pt-4 mt-3 border-t border-emerald-900/10 space-y-2 sm:space-y-3 mb-3">
                            <p className="text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-emerald-900/60">
                              GST Information
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                              <div>
                                <InputField
                                  control={control}
                                  name="gstDetails.gstNumber"
                                  label="GST Number (15 characters)"
                                  error={errors.gstDetails?.gstNumber}
                                />
                              </div>
                              <div>
                                <InputField
                                  control={control}
                                  name="gstDetails.companyName"
                                  label="GST Company Name"
                                  error={errors.gstDetails?.companyName}
                                />
                              </div>
                            </div>
                            <div>
                              <InputField
                                control={control}
                                name="gstDetails.gstAddress"
                                label="GST Address"
                                error={errors.gstDetails?.gstAddress}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SectionCard>

                <SectionCard
                  index={4}
                  icon={UserPlus}
                  title="Add Guests"
                  subtitle="Name as per official ID. Minors cannot travel alone."
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    <AnimatePresence>
                      {fields.map((f, idx) => (
                        <motion.div
                          key={f.id}
                          variants={guestVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="bg-gradient-to-br from-emerald-900/5 to-lime-900/5 border border-emerald-900/15 rounded-lg sm:rounded-xl p-3 sm:p-4"
                        >
                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-emerald-900 to-lime-900 flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-lime-300 flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span className="text-xs sm:text-sm font-bold text-emerald-900">
                                Guest {idx + 1}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(idx)}
                              className="transition-colors duration-150"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] md:grid-cols-[95px_1fr] gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div>
                              <DropdownField
                                control={control}
                                name={`guests.${idx}.title`}
                                placeholder="Prefix"
                                error={errors.guests?.[idx]?.title}
                                dataArray={TITLES}
                              />
                            </div>
                            <div>
                              <InputField
                                control={control}
                                name={`guests.${idx}.name`}
                                label="Full Name"
                                error={errors.guests?.[idx]?.name}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Controller
                              name={`guests.${idx}.below12`}
                              control={control}
                              render={({ field: fi }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={fi.value}
                                      onChange={(e) =>
                                        fi.onChange(e.target.checked)
                                      }
                                      size="small"
                                      sx={{
                                        color: "#166534",
                                        "&.Mui-checked": { color: "#166534" },
                                        p: "3px",
                                      }}
                                    />
                                  }
                                  label={
                                    <span className="text-xs font-medium text-gray-700">
                                      Below 12 years
                                    </span>
                                  }
                                  sx={{ m: 0 }}
                                />
                              )}
                            />
                            <Controller
                              name={`guests.${idx}.saveGuest`}
                              control={control}
                              render={({ field: fi }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={fi.value}
                                      onChange={(e) =>
                                        fi.onChange(e.target.checked)
                                      }
                                      size="small"
                                      sx={{
                                        color: "#166534",
                                        "&.Mui-checked": { color: "#166534" },
                                        p: "3px",
                                      }}
                                    />
                                  }
                                  label={
                                    <span className="text-xs font-medium text-gray-700">
                                      Save Guest
                                    </span>
                                  }
                                  sx={{ m: 0 }}
                                />
                              )}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <motion.button
                      type="button"
                      whileHover={canAddGuest ? { scale: 1.01 } : {}}
                      whileTap={canAddGuest ? { scale: 0.99 } : {}}
                      onClick={() =>
                        canAddGuest &&
                        append({
                          title: "",
                          name: "",
                          below12: false,
                          saveGuest: false,
                        })
                      }
                      disabled={!canAddGuest}
                      className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-dashed text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        canAddGuest
                          ? "border-emerald-700/40 text-emerald-800 hover:bg-emerald-900/5 hover:border-emerald-700/70"
                          : "border-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <UserPlus size={14} className="sm:size-4" />
                      {canAddGuest
                        ? `Add Guest (${fields.length} / ${MAX_GUESTS})`
                        : `Max ${MAX_GUESTS} Guests`}
                    </motion.button>
                  </div>
                </SectionCard>

                <SectionCard
                  index={5}
                  icon={CreditCard}
                  title="Payment Options"
                  subtitle="Choose your preferred method"
                >
                  <Controller
                    name="paymentOption"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <PaymentCard
                          selected={field.value === "pay_now"}
                          onClick={() => field.onChange("pay_now")}
                          title="Pay Full Amount Now"
                          badge="Save ₹110"
                          subtitle="Cancel free any time before 20 Mar"
                          amount={price}
                        >
                          <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-900/8 rounded-lg whitespace-nowrap">
                            <Shield
                              size={10}
                              className="sm:size-[11px] text-emerald-800"
                            />
                            <span className="text-[9px] sm:text-[11px] font-bold text-emerald-800">
                              Free cancellation
                            </span>
                          </div>
                        </PaymentCard>

                        <PaymentCard
                          selected={field.value === "pay_later"}
                          onClick={() => field.onChange("pay_later")}
                          title="Pay Later"
                          subtitle="Pay by 18 Mar 2026 11:59 PM"
                          amount={origPrice}
                        >
                          <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-amber-800/8 rounded-lg whitespace-nowrap">
                            <Wallet
                              size={10}
                              className="sm:size-[11px] text-amber-800"
                            />
                            <span className="text-[9px] sm:text-[11px] font-bold text-amber-800">
                              Book @₹0 now
                            </span>
                          </div>
                        </PaymentCard>
                      </div>
                    )}
                  />
                  {errors.paymentOption && (
                    <FieldError message={errors.paymentOption.message} />
                  )}
                </SectionCard>

                <SectionCard index={6} icon={CalendarDays} title="Stay Summary">
                  <div className="grid md:grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
                    {[
                      { label: "Check-in", value: service?.checkIn ?? "—" },
                      { label: "Check-out", value: service?.checkOut ?? "—" },
                      { label: "Stay Type", value: service?.person ?? "—" },
                      {
                        label: "Total",
                        value: `₹${(paymentOption === "pay_later" ? origPrice : price).toLocaleString()}`,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-gradient-to-br from-emerald-900/8 to-lime-900/5 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-emerald-900/10"
                      >
                        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-900/60 mb-0.5 sm:mb-1">
                          {item.label}
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <motion.div
                  custom={7}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-0.5 sm:px-1 space-y-3 sm:space-y-4"
                >
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              size="small"
                              sx={{
                                color: "#166534",
                                "&.Mui-checked": { color: "#166534" },
                                p: "4px",
                                alignSelf: "flex-start",
                                mt: "1px",
                              }}
                            />
                          }
                          label={
                            <span className="text-xs text-gray-700 leading-tight">
                              By proceeding, you agree to the{" "}
                              <span className="font-bold text-emerald-800 underline underline-offset-2 cursor-pointer">
                                Swagrama terms
                              </span>{" "}
                              and booking policies.
                            </span>
                          }
                          sx={{ m: 0, alignItems: "flex-start" }}
                        />
                        {errors.terms && (
                          <FieldError message={errors.terms.message} />
                        )}
                      </div>
                    )}
                  />

                  <motion.button
                    type="submit"
                    form="booking-form"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.01, y: -1 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                    className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-emerald-900 via-emerald-800 to-lime-900 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm shadow-lg border border-lime-400/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-shadow duration-200 hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="sm:size-4 animate-spin" />
                        <span className="hidden sm:inline">
                          Confirming Booking…
                        </span>
                        <span className="sm:hidden">Confirming…</span>
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ChevronRight size={14} className="sm:size-4" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormModal;
