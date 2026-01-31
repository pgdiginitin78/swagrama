import * as yup from "yup";

// Step 1: Primary Guest Details Validation
const stepOneSchema = yup.object().shape({
  bookingFor: yup.string().required("Please select who this booking is for"),
  title: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name should only contain letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name should only contain letters"),
});

// Step 2: Booking Details (Check-in/out, Guests, Options, Pricing)
const stepTwoSchema = yup.object().shape({
  checkInDate: yup
    .string()
    .required("Check-in date is required")
    .test("is-valid-date", "Please select a valid check-in date", (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  checkInTime: yup.string().required("Check-in time is required"),
  checkOutDate: yup
    .string()
    .required("Check-out date is required")
    .test(
      "is-after-checkin",
      "Check-out date must be after check-in date",
      function (value) {
        const { checkInDate } = this.parent;
        if (!checkInDate || !value) return false;
        return new Date(value) > new Date(checkInDate);
      }
    ),
  checkOutTime: yup.string().required("Check-out time is required"),
  petType: yup
    .object()
    .nullable()
    .when("petAllowed", {
      is: true,
      then: () =>
        yup
          .object()
          .nullable()
          .shape({
            value: yup.string().required("Please select pet type"),
            label: yup.string().required("Please select pet type"),
          })
          .required("Please select pet type"),
      otherwise: () => yup.mixed().nullable().notRequired(),
    }),
});

// Step 3: Add Guests - No validation needed (handled in component state)
const stepThreeSchema = yup.object().shape({
  // Optional step - users can skip without adding guests
});

// Step 4: Contact Information Validation
const stepFourSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email address is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    ),
  countryCode: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .test(
      "no-leading-zero",
      "Mobile number should not start with 0",
      (value) => {
        if (!value) return true;
        return !value.startsWith("0");
      }
    ),
});

// Step 5: Review & Confirm - Additional Details Validation
const stepFiveSchema = yup.object().shape({
  gstDetails: yup
    .string()
    .nullable()
    .notRequired()
    .test("gst-format", "Please enter a valid GST number", function (value) {
      if (!value || value.trim() === "") return true;
      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      return gstRegex.test(value.toUpperCase());
    }),
  specialRequests: yup
    .string()
    .nullable()
    .notRequired()
    .max(500, "Special requests must not exceed 500 characters"),
});

// Combined schema for final submission
export const fullBookingSchema = yup.object().shape({
  ...stepOneSchema.fields,
  ...stepTwoSchema.fields,
  ...stepFourSchema.fields,
  ...stepFiveSchema.fields,
});

// Export individual step schemas
export const bookingValidationSchema = [
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
  stepFiveSchema,
];

export default bookingValidationSchema;
