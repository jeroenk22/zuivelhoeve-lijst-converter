import React, { ChangeEventHandler } from 'react';

interface DateInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  return <input type='text' value={value} onChange={onChange} />;
};

export default DateInput;
