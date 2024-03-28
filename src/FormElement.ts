import { useState } from "react";

// Import the necessary libraries

// Component for the form
const Form = () => {
  // State to store the value of the textarea
  const [textareaValue, setTextareaValue] = useState("");

  // Event handler to submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(textareaValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
