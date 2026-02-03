import { FormControl, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller } from "react-hook-form";
import { DatePickerCalenderIcon } from "../assets/CommonAssets";

function DatePickerField({
  name,
  label,
  control,
  defaultValue,
  disabled,
  disablePast,
  disableFuture,
  sx,
  variant,
  inputProps,
  type,
  inputRef,
  inputFormat,
  error,
  dontCapitalize,
  color,
  onChange,
  minDate,
  value,
  onError,
  tableDatePicker,
  ...rest
}) {
  console.log("error", error);

  return (
    <div className="w-full bg-white">
      <FormControl className="w-full" sx={sx}>
        <Controller
          sx={{ width: "100%" }}
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label={label}
                value={value}
                minDate={minDate}
                onChange={onChange}
                format={"dd-MM-yyyy"}
                onBlur={onBlur}
                disabled={disabled}
                disablePast={disablePast}
                disableFuture={disableFuture}
                sx={{
                  "& .MuiInputBase-root": {
                    height: tableDatePicker ? "28px" : "36px",
                    background: "white",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: tableDatePicker ? "11px" : "12px",
                    padding: "6px 14px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: tableDatePicker ? "11px" : "12px",
                    color: error ? "#DC2626" : "#263d21", 
                    transform: tableDatePicker
                      ? "translate(14px, 7px) scale(1)"
                      : "translate(10px, 10px) scale(1)",
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(12px, -6px) scale(0.75)",
                      fontSize: tableDatePicker ? "10px" : "12px",
                    },
                  },
                  "& .MuiPickersOutlinedInput-root": {
                    fontSize: tableDatePicker ? "10px" : "12px",
                    padding: "6.5px 14px",
                  },
                  "& fieldset": {
                    borderColor: error ? "#DC2626" : "", 
                  },
                  "&:hover fieldset": {
                    borderColor: error ? "#DC2626" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: error ? "#DC2626" : "",
                  },
                  "& .MuiIconButton-root": {
                    padding: "5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: tableDatePicker ? "16px" : "22px",
                    color: error ? "#DC2626" : disabled ? "#A9A9A9" : "#263d21",
                  },
                  "& .MuiPickersSectionList-root": {
                    padding: "0px 0px !important",
                    fontSize: tableDatePicker
                      ? "12px !important"
                      : "13px !important",
                  },
                }}
                slots={{
                  openPickerIcon: DatePickerCalenderIcon,
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: !!error,
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    onError={onError}
                    error={error}
                    {...params}
                    size="small"
                    fullWidth
                  />
                )}
                {...rest}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </div>
  );
}

export default DatePickerField;
