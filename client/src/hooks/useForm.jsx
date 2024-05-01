import { useState } from "react";

const useForm = (initialState) => {
  // state init
  const [input, setInput] = useState(initialState);

  // input on change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // input reset
  const inputReset = () => {
    setInput(initialState);
  };

  return { input, setInput, handleInputChange, inputReset };
};

export default useForm;
