import React from "react";
import People from '/workspaces/Bre-Baker-StarWars-Blog-Reading-List/src/js/component/people.jsx';
import Planets from '/workspaces/Bre-Baker-StarWars-Blog-Reading-List/src/js/component/planets.jsx';
import "../../styles/home.css";

export const Home = () => (
	<div className="text-center mt-5">
		< People />
		< Planets />
	</div>
);