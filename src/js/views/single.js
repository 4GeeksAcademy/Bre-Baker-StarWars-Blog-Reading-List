import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export const Single = () => {
    const params = useParams();
    const [singleData, setSingleData] = useState(null);

    useEffect(() => {
        axios
          .get(`https://swapi.dev/api/${params.category}/${parseInt(params.id) + 1}`)
          .then((response) => {
            setSingleData(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }, [params.category, params.id]);

    return (
<div className="container">
    <div className="row">
        <div className="col-md-6 offset-md-3">
            {!!singleData ? (
                <>
                    <h1>{singleData.name}</h1>
                    <img 
                        src={`https://starwars-visualguide.com/assets/img/${params.category==="people" ? "characters":params.category}/${parseInt(params.id) + 1}.jpg`} 
                        alt={`Image of ${singleData.name}`} 
                        style={{ width: '100%', maxHeight: '500px' }} 
                    />
                    <ul className="list-group">
                        {Object.keys(singleData).map((key, i) => {
                            if (key !== "name" && key !== "created" && key !== "edited" && key !== "url" 
                                && key !== "homeworld" && key !=="species" && key !=="films" && key !=="starships"
                                &&key !=="vehicles" && key !=="residents") {
                                return (
                                    <li key={i} className="list-group-item">
                                        <strong>{key.replace(/_/g, " ")}</strong> {singleData[key]}
                                    </li>
                                );
                            }
                        })}
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