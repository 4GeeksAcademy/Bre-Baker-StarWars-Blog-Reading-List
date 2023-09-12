import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Cards = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.magicthegathering.io/v1/cards")
      .then((response) => {
        setData(response.data.cards); // Update this line to match the API's card data structure
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFavoriteClick = (card) => {
    const cardIndex = favorites.findIndex(
      (favoriteCard) => favoriteCard.name === card.name
    );

    if (cardIndex === -1) {
      setFavorites([...favorites, card]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(cardIndex, 1);
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
        Favorite Cards ({favorites.length})
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {favorites.map((fav) => (
          <li key={fav.multiverseid}>
            <a className="dropdown-item" href={fav.imageUrl}>
              {fav.name}
            </a>
          </li>
        ))}
      </ul>
      <h2 style={{ display: "flex", color: "red", fontWeight: "bold" }}>
        Magic: The Gathering Cards
      </h2>
      <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2em' }}>
        {data.map((item) => (
          <Card key={item.multiverseid} className="grid-card">
            <Card.Img variant="top" src={item.imageUrl} style={{ maxWidth: '20em', maxHeight: '30em' }} />
            <Card.Body>
              <Link to={`/single/card/${item.multiverseid}`} className="btn btn-primary">
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
                      (favoriteCard) => favoriteCard.name === item.name
                    )
                      ? "red"
                      : "gray"
                  }
                />
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cards;