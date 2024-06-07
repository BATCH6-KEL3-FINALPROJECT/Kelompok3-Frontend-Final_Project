import React from "react";
import { useFormContext } from "react-hook-form";
import { findInputError, isFormInvalid } from "../utils/form_validate";
import { AnimatePresence } from "framer-motion";
import CheckoutInputError from "./CheckoutInputError";

const CheckoutInput = ({
  label,
  placeholder,
  name,
  type,
  isSaved,
  validation,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);
  return (
    <div className="flex flex-col gap-1 px-4 py-2">
      <label htmlFor={name} className="text-purple-900 font-bold">
        {label}
      </label>
      <input
        className="bg-slate-100 py-2 px-3 rounded-md border border-slate-300"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={isSaved}
        {...register(name, validation)}
      />
      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <CheckoutInputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutInput;
