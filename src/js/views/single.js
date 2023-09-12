import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export const Single = () => {
    const params = useParams();
    const [singleData, setSingleData] = useState(null);

    useEffect(() => {
        const cardId = parseInt(params.id); // Use the provided card ID
        axios
          .get(`https://api.magicthegathering.io/v1/cards/${cardId}`)
          .then((response) => {
            setSingleData(response.data.card);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [params.id]);

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  {!!singleData ? (
                      <>
                          <h1>{singleData.name}</h1>
                          <img 
                              src={singleData.imageUrl} 
                              alt={`Image of ${singleData.name}`} 
                              style={{ width: '100%', maxHeight: '100%' }} 
                          />
                          <ul className="list-group">
                              <li className="list-group-item">
                                  <strong>Type:</strong> {singleData.type}
                              </li>
                              <li className="list-group-item">
                                  <strong>Mana Cost:</strong> {singleData.manaCost}
                              </li>
                              <li className="list-group-item">
                                  <strong>Rarity:</strong> {singleData.rarity}
                              </li>
                              <li className="list-group-item">
                                    <strong>Number:</strong> {singleData.number}
                              </li>
                              <li className="list-group-item">
                                    <strong>Set Name:</strong> {singleData.setName}
                              </li>
                              <li className="list-group-item">
                                    <strong>Legality:</strong>
                                    {singleData.legalities.map((legality, index) => (
                                        <div key={index}>
                                            <strong>{legality.format}:</strong> {legality.legality === 'Legal' ? 'Yes' : 'No' }
                                        </div>
                                    ))}
                              </li>
                              {/* Add more card details here */}
                          </ul>
                      </>
                  ) : (
                      <p>Loading...</p>
                  )}
              </div>
          </div>
      </div>
    );
};