import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Planets = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/planets/")
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFavoriteClick = (planet) => {
    const planetIndex = favorites.findIndex(
      (favoritePlanet) => favoritePlanet.name === planet.name
    );

    if (planetIndex === -1) {
      setFavorites([...favorites, planet]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(planetIndex, 1);
      setFavorites(updatedFavorites);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        Favorite Planets ({favorites.length})
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {favorites.map((fav) => (
          <li key={fav.id}>
            <a
              className="dropdown-item"
              href={fav.url}
              onClick={() => handleClick(fav)}
            >
              {fav.name}
            </a>
          </li>
        ))}
      </ul>
      <h2 style={{ display: "flex", color: "green", fontWeight: "bold" }}>
        Planets
      </h2>
      <div style={{ overflowX: "scroll", display: "flex" }}>
        {data.map((item, index) => (
          <Card
            key={index}
            style={{ minWidth: "18rem", margin: "0 10px" }}
          >
            <Card.Img
              variant="top"
              src={`https://starwars-visualguide.com/assets/img/planets/${
                index + 1
              }.jpg`}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                <b>Climate:</b> {item.climate} <br />
                <b>Diameter:</b> {item.diameter} km <br />
                <b>Population:</b> {item.population} <br />
                <b>Terrain:</b> {item.terrain} <br />
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Link
                  to={`/single/planets/${index}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
                <Button
                  variant="outline-danger"
                  onClick={() => handleFavoriteClick(item)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    color={
                      favorites.some(
                        (favoritePlanet) => favoritePlanet.name === item.name
                      )
                        ? "red"
                        : "gray"
                    }
                  />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Planets;