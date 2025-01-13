import React, { useState } from "react";
import { Button, Alert, Checkbox } from "antd";
import "./Questions.css";

const Questions = ({ handleSubmitAll }) => {
  const [settings, setSettings] = useState({
    numberOfQuestions: 1,
    enableOptions: false,
  });
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    hasOptions: false,
    numberOfOptions: 2,
    options: [],
    correct_answer: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === "numberOfQuestions" ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleStart = () => {
    setStep(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleCheckboxChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      hasOptions: e.target.checked,
      options: e.target.checked ? Array(2).fill("") : [],
      correct_answer: e.target.checked ? "" : "",
    }));
  };

  const handleOptionChange = (index, value) => {
    setCurrentQuestion((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  const validateCurrentQuestion = () => {
    if (!currentQuestion.question.trim()) {
      setErrorMessage("Question text is required.");
      return false;
    }
    if (settings.enableOptions && currentQuestion.hasOptions) {
      if (currentQuestion.options.length < 2) {
        setErrorMessage("At least two options are required.");
        return false;
      }
      if (currentQuestion.options.some((opt) => !opt.trim())) {
        setErrorMessage("All options must be filled.");
        return false;
      }
      if (!currentQuestion.correct_answer.trim()) {
        setErrorMessage("Correct answer must be selected.");
        return false;
      }
    } else if (!settings.enableOptions && !currentQuestion.correct_answer.trim()) {
      setErrorMessage("Correct answer is required for open-ended questions.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      setQuestions((prev) => [...prev, currentQuestion]);
      if (step < settings.numberOfQuestions - 1) {
        setStep((prev) => prev + 1);
        setCurrentQuestion({
          question: "",
          hasOptions: settings.enableOptions,
          numberOfOptions: 2,
          options: settings.enableOptions ? Array(2).fill("") : [],
          correct_answer: "",
        });
      } else {
        handleSubmitAll([...questions, currentQuestion]);
      }
    }
  };

  const handleBack = () => {
    setQuestions((prev) => prev.slice(0, -1));
    setStep((prev) => prev - 1);
    setCurrentQuestion(questions[step - 1]);
  };

  return (
    <div className="questions-container">
      {step === -1 ? (
        <div className="cards">
          <h2 className="questions-title">Setup Questionnaire</h2>
          <label className="inputs-label">Number of Questions:</label>
          <input
            type="number"
            name="numberOfQuestions"
            value={settings.numberOfQuestions}
            onChange={handleSettingsChange}
            className="input-field"
            min={1}
          />
          <Checkbox
            checked={settings.enableOptions}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                enableOptions: e.target.checked,
              }))
            }
            className="checkbox"
          >
            Enable Options for Questions
          </Checkbox>
          <Button onClick={handleStart} type="primary" className="start-button">
            Start
          </Button>
        </div>
      ) : (
        <div className="cards">
          <h2 className="questions-title">Question {step + 1}</h2>
          <label className="inputs-label">Question : </label>
          <input
            type="text"
            name="question"
            value={currentQuestion.question}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter question text"
            required
          />

          {settings.enableOptions ? (
            <>
              <Checkbox
                checked={currentQuestion.hasOptions}
                onChange={handleCheckboxChange}
                className="checkbox"
              >
                Add Options
              </Checkbox>
              {currentQuestion.hasOptions && (
                <div>
                  <label className="input-label">Number of Options:</label>
                  <input
                    type="number"
                    name="numberOfOptions"
                    value={currentQuestion.numberOfOptions}
                    min={2}
                    onChange={(e) => {
                      const num = Math.max(2, Number(e.target.value));
                      setCurrentQuestion((prev) => ({
                        ...prev,
                        numberOfOptions: num,
                        options: Array(num).fill(""),
                      }));
                    }}
                    className="input-field"
                  />
                  <div className="options-container">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="option-input">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          className="inputs-field"
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <label className="inputs-label">Correct Answer:</label>
                  <select
                    name="correct_answer"
                    value={currentQuestion.correct_answer}
                    onChange={handleChange}
                    className="input-select"
                    required
                  >
                    <option value="" disabled>
                      Select correct answer
                    </option>
                    {currentQuestion.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          ) : (
            <>
              <label className="inputs-label">Correct Answer:</label>
              <input
                type="text"
                name="correct_answer"
                value={currentQuestion.correct_answer}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter the correct answer"
                required
              />
            </>
          )}

          {errorMessage && (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              className="error-alert"
            />
          )}

          <div className="buttons-group">
            {step > 0 && (
              <Button onClick={handleBack} className="backs-button">
                Back
              </Button>
            )}
            <Button onClick={handleNext} type="primary" className="nexts-button">
              {step < settings.numberOfQuestions - 1 ? "Next" : "Finish"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
