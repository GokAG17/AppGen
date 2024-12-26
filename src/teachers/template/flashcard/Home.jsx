
import React from 'react';
import { Link } from 'react-router-dom';
// import './Home.css';

const Home = () => {
  return (
    <div className="homes-container">
      <div className="homes-content">
        <h1>Welcome to the Car Racing Game with Learning!</h1>
        <Link to="/temp4/racing">
          <button className="starts-button">Start Game</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
