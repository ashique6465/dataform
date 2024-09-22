import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function Form() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the Vercel-deployed backend link with the correct endpoint
      const response = await axios.post(
        "https://dataform-sigma.vercel.app/api/bfhl", // Updated endpoint
        JSON.parse(jsonInput)
      );
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or server error");
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 max-w-sm w-full text-black rounded-lg shadow-lg space-y-4 flex flex-col justify-center items-center text-center bg-[#F3F4F6]">
        <h1 className="text-4xl font-semibold">Data Form</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            className="border p-2 w-full text-black rounded-xl hover:border-blue-300 hover:shadow-blue-300 hover:shadow-sm transition bg-white"
            rows="5"
            placeholder='Enter JSON (e.g., { "data": ["A", "1", "b"] })'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 bg-[#6B7280] px-4 py-2 rounded text-white hover:bg-[#596170]"
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}

        {responseData && (
          <div className="space-y-4 w-full">
            <h3>Response:</h3>
            <Select
              isMulti
              name="filters"
              options={options}
              className="basic-multi-select w-full bg-[#D8D9D8] rounded-xl"
              classNamePrefix="select"
              onChange={handleSelectChange}
            />

            {selectedOptions.map((option) => (
              <div key={option.value}>
                <h4>{option.label}:</h4>
                <p className="mt-2">
                  {JSON.stringify(responseData[option.value], null, 2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
