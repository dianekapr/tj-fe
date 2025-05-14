import React from "react";

const FilterDropdown = ({ label, options, onSelect }) => {
  const handleChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    onSelect(selectedValues);
  };

  return (
    <div className="filter-dropdown">
      <label>{label}</label>
      <select multiple onChange={handleChange}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
