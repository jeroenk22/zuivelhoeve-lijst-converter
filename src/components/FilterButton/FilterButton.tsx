import React, { MouseEventHandler } from 'react';

interface FilterButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Upload Excelbestand</button>;
};

export default FilterButton;
