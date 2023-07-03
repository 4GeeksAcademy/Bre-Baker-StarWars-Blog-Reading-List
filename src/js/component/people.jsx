import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "../component/navbar";

const People = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/")
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFavoriteClick = (person) => {
    const personIndex = favorites.findIndex(
      (favoritePerson) => favoritePerson.name === person.name
    );

    if (personIndex === -1) {
      setFavorites([...favorites, person]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(personIndex, 1);
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
            Favorite People ({favorites.length})
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
    <h2 style={{ display: "flex", color: "red", fontWeight: "bold" }}>
      People
    </h2>
    <div style={{ overflowX: "scroll", display: "flex" }}>
      {data.map((item, index) => (
        <Card key={index} style={{ minWidth: "18rem", margin: "0 10px" }}>
          <Card.Img
            variant="top"
            src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              <b>Height:</b> {item.height} cm <br />
              <b>Mass:</b> {item.mass} kg <br />
              <b>Birth Year:</b> {item.birth_year} <br />
              <b>Gender:</b> {item.gender} <br />
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Link
                to={`/single/people/${index}`}
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
        (favoritePerson) => favoritePerson.name === item.name
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
export default People;