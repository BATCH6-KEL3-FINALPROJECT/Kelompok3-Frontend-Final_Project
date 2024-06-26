import React from "react";
import { useController } from "react-hook-form";

const CheckoutDropdown = ({
  label,
  placeholder,
  name,
  options,
  validation,
  isSaved,
}) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: { ...validation, required: true }, // Tambahkan required di sini untuk validasi
  });

  const formatOptionLabel = (label) => {
    return `${label}.`;
  };

  return (
    <div className="flex flex-col gap-1 px-4 py-2">
      <label htmlFor={name} className="text-purple-900 font-bold">
        {label}
      </label>
      <select
        {...inputProps}
        ref={ref}
        id={name}
        name={name}
        defaultValue=""
        disabled={isSaved}
        className={`py-2 px-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {formatOptionLabel(option.label)}
          </option>
        ))}
      </select>
      {invalid && (
        <p className="px-2 font-semibold text-red-500 text-xs">
          * Harap isi input ini!
        </p>
      )}
    </div>
  );
};

export default CheckoutDropdown;
