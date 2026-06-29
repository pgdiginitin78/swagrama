import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";

import { Controller } from "react-hook-form";
// space-x-2

const RadioField = ({ dataArray, name, label, control, error }) => {
  return (
    <FormControl error={!!error}>
      <div className="flex flex-row lg:flex-row flex-wrap">
        <FormLabel
          sx={{ color: "#000000", fontSize: "10px" }}
          id={`radio-label-${name}`}
        >
          {label}
        </FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RadioGroup
              row
              {...field}
              aria-labelledby={`radio-label-${name}`}
              sx={{
                marginTop: "-0.3rem",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
              }}
            >
              {dataArray.map((p) => (
                <FormControlLabel
                  key={p.id || p.value}
                  value={p.id || p.value}
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 12 }}
                    >
                      {p.label}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          )}
        />
      </div>
      {error && (
        <Typography sx={{ color: "#d32f2f", fontSize: "10px", mt: 0.5 }}>
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
};

export default RadioField;
