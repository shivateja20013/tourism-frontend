import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import DisplayCard from "../DisplayCard";

const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const [activities, setActivities] = useState(null);
  const [hotels, setHotels] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  let { placeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (placeId) {
      axios({
        method: "get",
        url: backendUrl + "/places/" + placeId,
      })
        .then((response) => {
          if (response.status === 200) {
            setPlace(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      axios({
        method: "get",
        url: backendUrl + "/activities/place/" + placeId,
      })
        .then((response) => {
          if (response.status === 200) {
            setActivities(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      axios({
        method: "get",
        url: backendUrl + "/restaurants/place/" + placeId,
      })
        .then((response) => {
          if (response.status === 200) {
            setRestaurants(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      axios({
        method: "get",
        url: backendUrl + "/hotels/place/" + placeId,
      })
        .then((response) => {
          if (response.status === 200) {
            setHotels(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [placeId]);

  return (
    <div className="w-full h-full p-2 flex justify-content-center overflow-y-scroll">
      {place && (
        <div className="w-9">
          <h1>{place.placeName}</h1>
          <div className="text-xl">{place.description}</div>
          <h2>Address</h2>
          <div className="text-xl my-1">District: {place.district}</div>
          <div className="text-xl my-1">State: {place.state}</div>
          <div className="text-xl my-1">Pincode: {place.pincode}</div>
          <div className="text-xl my-1">
            Map Link:{" "}
            <a href={place.mapLink} target="_blank">
              {place.mapLink}
            </a>
          </div>
          <h2>Activities to do</h2>
          <div className="grid justify-content-center">
            {activities &&
              activities.map((activity) => (
                <DisplayCard
                  className="col"
                  title={activity.activityName}
                  description={activity.description}
                  onClick={() => {
                    navigate("/activity/" + activity.activityId);
                  }}
                />
              ))}
          </div>
          <h2>Restaurants</h2>
          <div className="grid justify-content-center">
            {restaurants &&
              restaurants.map((restaurant) => (
                <DisplayCard
                  className="col"
                  title={restaurant.restaurantName}
                  description={restaurant.description}
                  onClick={() => {
                    navigate("/restaurant/" + restaurant.restaurantId);
                  }}
                />
              ))}
          </div>
          <h2>Hotels</h2>
          <div className="grid justify-content-center">
            {hotels &&
              hotels.map((hotel) => (
                <DisplayCard
                  className="col"
                  title={hotel.hotelName}
                  description={hotel.description}
                  onClick={() => {
                    navigate("/hotel/" + hotel.hotelId);
                  }}
                />
              ))}
          </div>
          <div className="flex justify-content-center text-3xl h-5rem">...</div>
        </div>
      )}
    </div>
  );
};

export default PlacePage;
