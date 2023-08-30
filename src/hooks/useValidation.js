import { isEmail } from "validator";
import { useCallback, useState } from "react";

function useValidation() {
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const input = e.target;
    const { value, name } = input;

    if (input.validity.patternMismatch && name === "name") {
      input.setCustomValidity(
        "Используйте только латиницу, кириллицу, пробел или дефис."
      );
    } else {
      input.setCustomValidity("");
    }

    if (name === "email") {
      if (!isEmail(value)) {
        input.setCustomValidity("Используйте корректный адрес почты.");
      } else {
        input.setCustomValidity("");
      }
    }

    setIsValid(input.closest("form").checkValidity());
    setErrors({ ...errors, [name]: input.validationMessage });
    setValues({ ...values, [name]: value });
  };

  const clearForm = useCallback(
    (newIsValid = false, newValues = {}, newErrors = {}) => {
      setIsValid(newIsValid);
      setValues(newValues);
      setErrors(newErrors);
    },
    [setIsValid, setValues, setErrors]
  );

  return { isValid, setIsValid, values, setValues, clearForm, handleChange, errors };
}

export default useValidation;
