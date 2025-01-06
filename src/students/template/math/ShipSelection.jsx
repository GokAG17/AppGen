import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import "./ShipSelection.css";

const ships = [
  { display: "Stellar Voyager", name: "ship-1", image: "/images/ship-1.png" },
  { display: "Nebula Runner", name: "ship-2", image: "/images/ship-2.png" },
  { display: "Galactic Falcon", name: "ship-3", image: "/images/ship-3.png" },
];

const ShipSelection = () => {
  const navigate = useNavigate();
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);

  const cycleShip = () => {
    setCurrentShipIndex((prevIndex) => (prevIndex + 1) % ships.length);
  };

  const selectShip = (shipName) => {
    if (isSelecting) return;
    setIsSelecting(true);
    localStorage.setItem("selectedShip", shipName);
    console.log("Selected Ship: ", shipName);
    setTimeout(() => {
      navigate("/student/temp3/game");
    }, 3000);
  };

  const handleGlobalClick = () => {
    selectShip(ships[currentShipIndex].name);
  };

  useEffect(() => {
    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [currentShipIndex]);

  useEffect(() => {
    const intervalId = setInterval(cycleShip, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <h2 className="cont-title">Select Your Ship</h2>
      <Row gutter={[16, 16]} justify="center">
        {ships.map((ship, index) => (
          <Col key={index} span={8}>
            <div
              className={`ship-card ${
                index === currentShipIndex ? "active" : ""
              }`}
              onClick={() => selectShip(ship.name)}
            >
              <img src={ship.image} alt={ship.name} className="ship-image" />
              <h3>{ship.display}</h3>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShipSelection;
