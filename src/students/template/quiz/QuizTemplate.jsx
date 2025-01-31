import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";
import "./QuizTemplate.css";

const FinalTemplate = () => {
  const navigate = useNavigate();

  const [mcqData, setMcqData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [highlightedOption, setHighlightedOption] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);

  const [questionBoxColor, setQuestionBoxColor] = useState("#ffffff");
  const [optionBoxColor, setOptionBoxColor] = useState("#f0f0f0");
  const [optionBoxSize, setOptionBoxSize] = useState("");
  const [questionBoxSize, setquestionBoxSize] = useState("");
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("20px");

  const fetchMCQs = async () => {
    try {
      const response = await fetch(
        `https://mcqdata.s3.eu-north-1.amazonaws.com/mcqData.json`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to load MCQs data");
      }
      const data = await response.json();
      setMcqData(data.questions);
      if (data.questions.length > 0) {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setFeedback("");
      }
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  };

  const fetchStylingValues = async () => {
    try {
      const response = await fetch(
        `https://mcqdata.s3.eu-north-1.amazonaws.com/styling1.json?v=${Date.now()}`,
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
      console.log(data);
      setQuestionBoxColor(data.questionBoxColor);
      setOptionBoxColor(data.optionBoxColor);
      setFontColor(data.fontColor);
      setFontSize(data.fontSize);
      setOptionBoxSize(data.optionBoxSize);
      setquestionBoxSize(data.questionBoxSize);
    } catch (error) {
      console.error("Error fetching styling values:", error);
    }
  };

  useEffect(() => {
    fetchMCQs();
    fetchStylingValues();
  }, []);

  useEffect(() => {
    fetchMCQs();
  }, []);

  useEffect(() => {
    if (mcqData.length > 0 && quizStarted) {
      startJuggling();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentQuestionIndex, mcqData, quizStarted]);

  const startJuggling = () => {
    setHighlightedOption(0);

    if (intervalId) {
      clearInterval(intervalId);
    }

    const juggleInterval = setInterval(() => {
      setHighlightedOption((prevIndex) => {
        const newIndex =
          (prevIndex + 1) % mcqData[currentQuestionIndex].options.length;

        // Speak the highlighted option
        const speech = new SpeechSynthesisUtterance(
          mcqData[currentQuestionIndex].options[newIndex]
        );
        window.speechSynthesis.speak(speech);
        return newIndex;
      });
    }, 3000);

    setIntervalId(juggleInterval);
  };

  const handleOptionClick = (option) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(option);
    speech.lang = "en-IN";
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);

    clearInterval(intervalId);

    let isCorrect = false;
    if (option === mcqData[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
      isCorrect = true;
    } else {
      setFeedback(
        `Incorrect! The correct answer is: ${mcqData[currentQuestionIndex].correct_answer}`
      );
    }

    if (currentQuestionIndex === mcqData.length - 1) {
      setTimeout(() => {
        navigate("/student/temp1/completed", {
          state: {
            score: isCorrect ? score + 1 : score,
            totalQuestions: mcqData.length,
          },
        });
      }, 5000);
    } else {
      setTimeout(() => {
        handleNextQuestion();
      }, 5000);
    }
  };

  const handleNextQuestion = () => {
    setFeedback("");
    if (currentQuestionIndex < mcqData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      startJuggling();
    }
  };

  const handleLeftClick = () => {
    const selectedOption =
      mcqData[currentQuestionIndex].options[highlightedOption];
    handleOptionClick(selectedOption);
  };

  useEffect(() => {
    document.addEventListener("click", handleLeftClick);
    return () => {
      document.removeEventListener("click", handleLeftClick);
    };
  }, [highlightedOption, mcqData, currentQuestionIndex]);

  if (!mcqData || mcqData.length === 0) {
    return (
      <div className="fullscreen-loaders">
        <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
      </div>
    );
  }

  const currentMCQ = mcqData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div
        className="question-box"
        style={{
          backgroundColor: questionBoxColor,
          color: fontColor,
          fontSize: fontSize,
          padding: optionBoxSize,
        }}
      >
        <p>{currentMCQ.question}</p>
      </div>
      <div className="options-container">
        {currentMCQ.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(option)}
            className={`option-button ${
              highlightedOption === i ? "highlighted" : ""
            }`}
            style={{
              backgroundColor:
                highlightedOption === i ? "#d1e7dd" : optionBoxColor,
              color: fontColor,
              fontSize: fontSize,
              padding: optionBoxSize,
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div
          className={`feedback-message ${
            feedback.includes("Correct") ? "correct" : ""
          }`}
        >
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FinalTemplate;
