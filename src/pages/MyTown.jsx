import React from "react";
import WeatherCard from "../components/WeatherCard";
import skylineImg from "../assets/halifax_skyline.jpg";


export default function MyTown() {
  return (
    <section className="card center-card">
      <div className="card-inner">
        <img
          src={skylineImg}
          alt="Halifax skyline"
          className="city-image"
        />
        <h2>I live in Halifax, NS</h2>
        <p className="muted">
          Halifax is a city situated on the East Coast of Canada in the Maritime province of Nova Scotia.
        </p>

        
        <WeatherCard city="Halifax,CA" />
      </div>
    </section>
  );
}
