import { isEmail } from "validator";
import { useCallback, useState } from "react";

function useValidation() {
  const [isValid, setIsValid] = useState(true);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    console.log('start handleChange', e.target);
    const input = e.target;
    const { value, name } = input;
    console.log('input', input.value);
    console.log('isValid', isValid);

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
    console.log('values', values);
  };

  const clearForm = useCallback(
    (newIsValid = false, newValues = {}, newErrors = {}) => {
      setIsValid(newIsValid);
      setValues(newValues);
      setErrors(newErrors);
    },
    [setIsValid, setValues, setErrors]
  );

  return { isValid, setIsValid, values, setValues, clearForm, handleChange };
}

export default useValidation;
