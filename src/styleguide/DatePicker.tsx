import { useField, useFormikContext } from 'formik'

import { DatePicker as DatePickerMui, DatePickerProps } from '@mui/lab'
import { TextField } from '@mui/material'

export const DatePicker: React.FC<DatePickerProps<string | null | Date>> = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props as any);

  return (
    <DatePickerMui
      {...field}
      {...props}
      onChange={(val: Date | null | string) => {
        setFieldValue(field.name, typeof val === 'string' ? val : val?.toISOString() || '');
      }}
      renderInput={(params: any) => <TextField {...params} />}
    />
  );
};
