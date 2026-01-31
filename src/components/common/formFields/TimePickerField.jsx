import { FormControl, TextField } from "@mui/material";
import { DesktopTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { Controller } from "react-hook-form";

function TimePickerField({
  name,
  label,
  control,
  defaultValue,
  disabled,
  sx,
  variant,
  inputProps,
  type,
  inputRef,
  format24hr,
  onChange,
  value,
  error,
  onError,
  tableTimePicker,
  ...rest
}) {
  return (
    <div className="w-full">
      <FormControl className="w-full" sx={sx} size="small">
        <Controller
          sx={{ width: "100%", height: "40px" }}
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopTimePicker
                label={label}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                renderInput={(params) => (
                  <TextField
                    onError={onError}
                    error={error}
                    {...params}
                    size="small"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      shrink: true,
                    }}
                  />
                )}
                ampm={!format24hr}
                sx={{
                  "& .MuiInputBase-root": {
                    height: tableTimePicker ? "28px" : "36px",
                    background: "white",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: tableTimePicker ? "11px" : "12px",
                    padding: "5px 12px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: tableTimePicker ? "11px" : "12px",
                    color:
                      error?.type === "required" || error?.type === "nullable"
                        ? "#DC2626"
                        : "#263d21",
                    transform: tableTimePicker
                      ? "translate(14px, 7px) scale(1)"
                      : "translate(14px, 9px) scale(1)",
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(12px, -6px) scale(0.75)",
                    },
                  },
                  "& fieldset": {
                    borderColor:
                      error?.type === "required" || error?.type === "nullable"
                        ? "#DC2626"
                        : "",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      error?.type === "required" || error?.type === "nullable"
                        ? "#DC2626"
                        : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      error?.type === "required" || error?.type === "nullable"
                        ? "#DC2626"
                        : "",
                  },
                  "& .MuiIconButton-root": {
                    padding: "5px",
                    marginTop: tableTimePicker ? "0" : "0",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: tableTimePicker ? "16px" : "22px",
                    color:
                      error?.type === "required" || error?.type === "nullable"
                        ? "#DC2626"
                        : disabled
                        ? "#A9A9A9"
                        : "#263d21",
                  },
                }}
                {...rest}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </div>
  );
}

export default TimePickerField;
{
  /* <TimePickerField
name="time24hr"
label="Select Time"
control={control}
defaultValue={new Date()}
format24hr={true} // Use 24-hour format

/>


<TimePickerField
name="time12hr"
label="Select Time"
control={control}
defaultValue={new Date()}
format24hr={false} // Use 12-hour format

/> */
}
