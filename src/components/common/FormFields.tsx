/**
 * Form field components for standardized form inputs
 * Last updated: 2025-03-09 18:35:42 UTC
 * @author OcularGG
 * @module components/common/FormFields
 */

import React from 'react';
import {
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
} from '@mui/material';
import type { TextFieldProps, SelectProps, CheckboxProps } from '@mui/material';

/**
 * Base props for all form fields
 */
interface BaseFieldProps {
  error?: string;
  touched?: boolean;
  label: string;
  required?: boolean;
}

/**
 * Text input field component
 * @component
 */
export const TextInput: React.FC<TextFieldProps & BaseFieldProps> = ({
  error,
  touched,
  label,
  required,
  ...props
}) => (
  <TextField
    label={label}
    required={required}
    error={touched && Boolean(error)}
    helperText={touched && error}
    fullWidth
    variant="outlined"
    {...props}
  />
);

/**
 * Interface for select field options
 */
interface SelectOption {
  value: string | number;
  label: string;
}

/**
 * Select field component
 * @component
 */
export const SelectField: React.FC<SelectProps & BaseFieldProps & {
  options: SelectOption[];
}> = ({
  error,
  touched,
  label,
  required,
  options,
  ...props
}) => (
  <FormControl
    fullWidth
    error={touched && Boolean(error)}
    required={required}
  >
    <InputLabel>{label}</InputLabel>
    <Select
      label={label}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {touched && error && (
      <FormHelperText>{error}</FormHelperText>
    )}
  </FormControl>
);

/**
 * Checkbox group component
 * @component
 */
export const CheckboxGroup: React.FC<{
  label: string;
  options: Array<{ value: string; label: string }>;
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  touched?: boolean;
}> = ({
  label,
  options,
  values,
  onChange,
  error,
  touched,
}) => (
  <FormControl
    component="fieldset"
    error={touched && Boolean(error)}
  >
    <FormGroup>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              checked={values.includes(option.value)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...values, option.value]);
                } else {
                  onChange(values.filter((v) => v !== option.value));
                }
              }}
            />
          }
          label={option.label}
        />
      ))}
    </FormGroup>
    {touched && error && (
      <FormHelperText>{error}</FormHelperText>
    )}
  </FormControl>
);

/**
 * File upload field component
 * @component
 */
export const FileUpload: React.FC<{
  label: string;
  accept?: string;
  multiple?: boolean;
  onChange: (files: FileList | null) => void;
  error?: string;
  touched?: boolean;
}> = ({
  label,
  accept,
  multiple,
  onChange,
  error,
  touched,
}) => (
  <Box>
    <input
      accept={accept}
      style={{ display: 'none' }}
      id="file-upload"
      multiple={multiple}
      type="file"
      onChange={(e) => onChange(e.target.files)}
    />
    <label htmlFor="file-upload">
      <Button
        variant="outlined"
        component="span"
        fullWidth
      >
        {label}
      </Button>
    </label>
    {touched && error && (
      <FormHelperText error>{error}</FormHelperText>
    )}
  </Box>
);

/**
 * Password input field component with visibility toggle
 * @component
 */
export const PasswordInput: React.FC<TextFieldProps & BaseFieldProps> = ({
  error,
  touched,
  label,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      required={required}
      error={touched && Boolean(error)}
      helperText={touched && error}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
      {...props}
    />
  );
};