import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VirtualKeyboard from "./VirtualKeyboard";
import { Button } from "antd";
import { FaKeyboard } from "react-icons/fa";
import { Mosaic } from "react-loading-indicators";
import "./FinalTemplate.css";

const FinalFillUpTemplate = () => {
  const { state } = useLocation();
  const { topic, difficulty, numQuestions } = state || {};

  const [fillUpData, setFillUpData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(true);

  const [questionBoxColor, setQuestionBoxColor] = useState("#ffffff");
  const [inputBoxColor, setInputBoxColor] = useState("#f0f0f0");
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("16px");
  const [buttonColor, setButtonColor] = useState("#007bff");
  const [buttonFontColor, setButtonFontColor] = useState("#ffffff");

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const fetchFillUps = async () => {
    try {
      const response = await fetch(
        "https://mcqdata.s3.eu-north-1.amazonaws.com/fillInTheBlanks.json",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setFillUpData(data.questions);
      } else {
        console.error("Failed to fetch fill-in-the-blanks questions:", data.error);
      }
    } catch (error) {
      console.error("Error fetching fill-in-the-blanks questions:", error);
    } 
  };

  const fetchStylingValues = async () => {
    try {
      const response = await fetch(
        `https://mcqdata.s3.eu-north-1.amazonaws.com/styling2.json`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );  
      if (!response.ok) {
        throw new Error("Failed to load styling values");
      }
      const data = await response.json();
      setQuestionBoxColor(data.questionBoxColor);
      setInputBoxColor(data.inputBoxColor || "#ffffff");
      setFontColor(data.fontColor);
      setFontSize(data.fontSize);
      setButtonColor(data.buttonColor || "#007bff");
      setButtonFontColor(data.buttonFontColor || "#ffffff");
    } catch (error) {
      console.error("Error fetching styling values:", error);
    }
  };

  useEffect(() => {
    fetchFillUps();
    fetchStylingValues();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex]);

  // useEffect(() => {
  //   const handleDoubleClick = () => {
  //     setShowKeyboard((prevShowKeyboard) => !prevShowKeyboard);
  //   };

  //   // Listen for double-click on the document
  //   document.addEventListener("dblclick", handleDoubleClick);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     document.removeEventListener("dblclick", handleDoubleClick);
  //   };
  // }, []);

  const handleAnswerSubmit = () => {
    const currentFillUp = fillUpData[currentQuestionIndex];
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentFillUp.answer.trim().toLowerCase();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect! The correct answer is: ${currentFillUp.answer}`);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 5000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < fillUpData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setFeedback("");
      setUserAnswer("");
    } else {
      navigate("/student/temp2/end");
    }
  };

  const handleKeyPress = (key) => {
    if (key === "BACKSPACE") {
      setUserAnswer((prevAnswer) => prevAnswer.slice(0, -1));
    } else if (key === "ENTER") {
      handleAnswerSubmit();
    } else {
      setUserAnswer((prevAnswer) => prevAnswer + key);
    }
  };

  if (!fillUpData || fillUpData.length === 0) {
    return (
      <div className="fullscreen-loaders">
        <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
      </div>
    );
  }

  const currentFillUp = fillUpData?.[currentQuestionIndex] || null;

  return (
    <div className="final-fillup-container">

      <Button
        className="keyboard-toggle-btn"
        icon={<FaKeyboard />}
        onClick={() => setShowKeyboard(!showKeyboard)}
        aria-label="Toggle Keyboard"
        size="large"
        shape="circle"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "50%",
          fontSize: "1.5rem",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      />

      <div
        className="final-fillup-question-box"
        style={{
          backgroundColor: questionBoxColor,
          color: fontColor,
          fontSize: fontSize,
          padding: "20px",
          boxSizing: "border-box",
          overflow: "hidden",
          marginBottom: showKeyboard ? "20px" : "20px",
        }}
      >
        <p className="final-fillup-question-text">{currentFillUp.question}</p>
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          className="final-fillup-answer-input"
          style={{
            backgroundColor: inputBoxColor,
            color: fontColor,
            fontSize: fontSize,
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleAnswerSubmit}
          className={`final-fillup-submit-button ${
            !userAnswer ? "disabled" : ""
          }`}
          disabled={!userAnswer}
          style={{
            backgroundColor: buttonColor,
            color: buttonFontColor,
            padding: "10px 20px",
            marginTop: "10px",
            boxSizing: "border-box",
          }}
        >
          Submit
        </button>
      </div>

      {feedback && (
        <div
          className="final-fillup-feedback-container"
          style={{ marginBottom: "50px" }}
        >
          <p
            className={`final-fillup-feedback-text ${
              feedback.includes("Correct")
                ? "final-fillup-feedback-correct"
                : "final-fillup-feedback-incorrect"
            }`}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: feedback.includes("Correct")
                ? "#28a745"
                : "#dc3545",
            }}
          >
            {feedback}
          </p>
          <button
            className="final-fillup-next-button"
            onClick={handleNextQuestion}
            style={{
              backgroundColor: buttonColor,
              color: buttonFontColor,
              padding: "10px 20px",
              width: "100%",
              boxSizing: "border-box",
              marginTop: "10px",
            }}
          >
            {currentQuestionIndex < fillUpData.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      )}

      {showKeyboard && (
        <div style={{ marginTop: "20px" }}>
          <VirtualKeyboard onKeyPress={handleKeyPress} />
        </div>
      )}
    </div>
  );
};

export default FinalFillUpTemplate;
