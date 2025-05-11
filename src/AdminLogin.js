import React, { useState } from "react";
import axios from "axios";
import { HeaderNav } from "./HeaderNav";
import { useLocation } from "react-router-dom";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctSolution, setCorrectSolution] = useState("");
  const [technology, setTechnology] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const username = location.state?.username;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      questionText: question,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      correctOption: parseInt(correctSolution),
      technology,
    };

    try {
      await axios.post("http://localhost:9192/api/questions/addquestion", newQuestion);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setTechnology("");
      setCorrectSolution("");
      setError("");
      setSuccess("Question added successfully!");
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      setError("Failed to add question");
      setSuccess("");
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div>
      <HeaderNav username={username} />
      <div className="container mt-4">
        <div className="card p-4 shadow-sm">
          <h2 className="mb-3 text-center">Add Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Question:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <label className="form-label">Options:</label>
            {options.map((opt, index) => (
              <input
                key={index}
                type="text"
                className="form-control mb-2"
                placeholder={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}

            <div className="mb-3">
              <label className="form-label">Correct Solution:</label>
              <select
                className="form-select"
                value={correctSolution}
                onChange={(e) => setCorrectSolution(e.target.value)}
              >
                <option value="">Select Correct Solution</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Domain:</label>
              <input
                type="text"
                className="form-control"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Add Question
            </button>
            {success && <div className="text-success mt-2">{success}</div>}
            {error && <div className="text-danger mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;