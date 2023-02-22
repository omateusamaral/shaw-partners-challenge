import { TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
export interface SearchInputProps {
  value: string | undefined;
  onChange: (
    value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  placeHolder: string;
  label?: React.ReactNode;
}
export function SearchInput({
  value,
  onChange,
  placeHolder,
  label,
}: SearchInputProps) {
  return (
    <TextField
      label={label ? label : "Search"}
      placeholder={placeHolder}
      sx={{
        width: 450,
      }}
      variant="standard"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: <GridSearchIcon color="disabled" />,
      }}
    />
  );
}
