import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./teachers/components/Navbar";
import Home from "./teachers/containers/Home";
import Prompt from "./teachers/components/Prompt";
import Student from "./teachers/containers/Students";
import Profile from "./teachers/containers/Profile";
import Question from "./teachers/containers/Questions";
import Template from "./teachers/containers/Template";
import Setting from "./teachers/containers/Settings";

import StudentHome from "./students/containers/Home";
import Temp from "./students/containers/Template";

import Start from "./Start";
import About from "./start/About";
import CreateAccount from "./start/CreateAccount";
import Login from "./start/Login";

import QuizStart from "./teachers/template/quiz/StartPage";
import Quiz from "./teachers/template/quiz/QuizTemplate";
import QuizComplete from "./teachers/template/quiz/CompletePage";

import MathStart from "./teachers/template/math/StartPage";
import ShipSelection from "./teachers/template/math/ShipSelection";
import Game from "./teachers/template/math/Game";

import Flash from "./teachers/template/flashcard/Home";
import RacingGame from "./teachers/template/flashcard/Racing";

import FillStart from "./teachers/template/fillup/StartPage";
import FinalFillUpTemplate from "./teachers/template/fillup/FinalFillUpTemplate";
import FillEndPage from "./teachers/template/fillup/CompletePage";

import QuizStartS from "./students/template/quiz/StartPage";
import QuizS from "./students/template/quiz/QuizTemplate";
import QuizCompleteS from "./students/template/quiz/CompletePage";

import MathStartS from "./students/template/math/StartPage";
import ShipSelectionS from "./students/template/math/ShipSelection";
import GameS from "./students/template/math/Game";

import FlashS from "./students/template/flashcard/Home";
import RacingGameS from "./students/template/flashcard/Racing";

import FillStartS from "./students/template/fillup/StartPage";
import FinalFillUpTemplateS from "./students/template/fillup/FinalFillUpTemplate";
import FillEndPageS from "./students/template/fillup/CompletePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Start Path */}
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/about-us" element={<About />} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<Navbar />}>
          <Route path="home" element={<Home />} />
          <Route path="prompt/:id" element={<Prompt />} />
          <Route path="students" element={<Student />} />
          <Route path="profile" element={<Profile />} />
          <Route path="questions" element={<Question />} />
          <Route path="templates" element={<Template />} />
          <Route path="settings" element={<Setting />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student">
          <Route path="home" element={<StudentHome />} />
          <Route path="temp" element={<Temp />} />

          <Route path="temp1" element={<QuizStartS />} />
          <Route path="temp1/quiz" element={<QuizS />} />
          <Route path="temp1/completed" element={<QuizCompleteS />} />

          <Route path="temp2" element={<FillStartS />} />
          <Route path="temp2/fill-up" element={<FinalFillUpTemplateS />} />
          <Route path="temp2/end" element={<FillEndPageS />} />

          <Route path="temp3" element={<MathStartS />} />
          <Route path="temp3/ship-selection" element={<ShipSelectionS />} />
          <Route path="temp3/game" element={<GameS />} />

          <Route path="temp4" element={<FlashS />} />
          <Route path="temp4/racing" element={<RacingGameS />} />
        </Route>

        <Route path="/temp1">
          <Route path="" element={<QuizStart />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="completed" element={<QuizComplete />} />
        </Route>

        <Route path="/temp2">
          <Route path="" element={<FillStart />} />
          <Route path="fill-up" element={<FinalFillUpTemplate />} />
          <Route path="end" element={<FillEndPage />} />
        </Route>

        <Route path="/temp3">
          <Route path="" element={<MathStart />} />
          <Route path="ship-selection" element={<ShipSelection />} />
          <Route path="game" element={<Game />} />
        </Route>

        <Route path="/temp4">
          <Route path="" element={<Flash />} />
          <Route path="racing" element={<RacingGame />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
