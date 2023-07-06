import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateSelectorProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, onDateChange }) => {
  const handleDateChange = (selectedDate: Date | null) => {
    onDateChange(selectedDate);
  };

  return (
    <div data-testid='date-selector-container'>
      <label htmlFor='date'>Datum:</label>
      <DatePicker
        id='date'
        selected={date}
        onChange={handleDateChange}
        dateFormat='dd-MM-yyyy'
      />
    </div>
  );
};

export default DateSelector;
