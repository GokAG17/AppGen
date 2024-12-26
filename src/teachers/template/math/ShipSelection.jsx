import React from "react";
import { Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import "./ShipSelection.css";

const ships = [
  { name: "ship 1", image: "/ship 1.png" },
  { name: "ship 2", image: "/ship 2.png" },
  { name: "ship 3", image: "/ship 3.png" },
];

const ShipSelection = () => {
  const navigate = useNavigate();

  const selectShip = (ship) => {
    localStorage.setItem("selectedShip", ship);
    navigate("/temp3/game");
  };

  return (
    <div className="container">
      <h2>Select Your Ship</h2>
      <Row gutter={[16, 16]} justify="center">
        {ships.map((ship, index) => (
          <Col key={index} span={8}>
            <div className="ship-card" onClick={() => selectShip(ship.name)}>
              <img src={ship.image} alt={ship.name} className="ship-image" />
              <h3>{ship.name}</h3>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShipSelection;
