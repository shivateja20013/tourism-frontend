import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "./config";
import DisplayCard from "./DisplayCard";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const LandingPage = ({ user }) => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(backendUrl + "/places");
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="w-full h-full p-2 flex flex-column justify-content-center align-items-center overflow-y-scroll">
      {user && (
        <div className="w-9 bg-yellow-50 p-4 border-round-3xl mt-8 m-2 flex flex-column justify-content-center align-items-center">
          <div className="m-3 font-semibold text-xl">
            Discover, Plan, Explore: Your AI Travel Companion for Personalized
            Adventures!
          </div>
          <Button
            className="m-3 text-3xl"
            label="TravelGenie"
            severity="danger"
            text
            onClick={() => {
              navigate("/travel-genie");
            }}
          />
        </div>
      )}
      <div className="grid m-5 justify-content-center">
        {places &&
          places.map((place) => (
            <DisplayCard
              className="col"
              title={place.placeName}
              description={place.description}
              onClick={() => {
                navigate("/place/" + place.placeId);
              }}
            />
          ))}
      </div>
      <div className="flex justify-content-center text-3xl h-5rem">...</div>
    </div>
  );
};

export default LandingPage;
