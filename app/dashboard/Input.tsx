"use client";
import { useState } from "react";
import AllTasks from "./AllTasks";
import { useInputStore } from "./store/hookstore";

export default function Input() {
  const { inputValue, setInputValue }: any = useInputStore();
  const [showAdded, setShowAdded] = useState(false);
  const [inputError, setInputError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePostRequest();
      setInputValue("");

      setTimeout(() => {
        setShowAdded(false);
      }, 3000);
    }
  };
  const handlePostRequest = async () => {
    const tasks = { task: inputValue };
    const ServerUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
    try {
      const response = await fetch(`${ServerUrl}`, {
        method: "POST",
        body: JSON.stringify(tasks),
        headers: {
          "Content-type": "application/json",
        },
      });
      setInputError("");
      setShowAdded(true);

      const data = await response.json();
    } catch (error) {
      console.log(error);
      setInputError("An error occurred while adding ");
    }
  };
  return (
    <div className="input">
      <div className="input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          autoFocus
          placeholder="Add your Tasks...."
          className="w-full py-4 bg-white rounded-md
                     shadow-xl text-black pl-5 outline-none z-10"
        />
      </div>
      {showAdded && (
        <p
          className=" z-30 fixed bottom-10 left-10
             bg-gray-800 w-32 h-10 text-center pt-2
              text-blue-200 rounded-md transition-all"
        >
          {" "}
          1 task added
        </p>
      )}

      {inputError && (
        <p className="error z-30 text-red-300 pt-1">{inputError}</p>
      )}
      <AllTasks />
    </div>
  );
}
