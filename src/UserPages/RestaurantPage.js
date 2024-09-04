import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { useParams } from "react-router-dom";

const RestaurantPage = () => {
    const [restaurant, setRestaurant] = useState(null);
    let { restaurantId } = useParams();

    useEffect(() => {
        axios({
          method: "get",
          url: backendUrl + "/restaurants/" + restaurantId,
        })
          .then((response) => {
            if (response.status === 200) {
              setRestaurant(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, [restaurantId]);

  return (
    <div className="w-full h-full p-2 flex justify-content-center overflow-y-scroll">
      {restaurant && (
        <div className="w-9">
          <h1>{restaurant.restaurantName}</h1>
          <div className="text-xl">{restaurant.description}</div>
          <div className="text-xl flex mt-3">
            <div className="font-bold">Cuisine: </div>
            <div className="ml-2">{restaurant.cuisine}</div>
          </div>
          <div className="text-xl flex mt-3">
            <div className="font-bold">Price range: </div>
            <div className="ml-2">{restaurant.minPrice} Rs. - {restaurant.maxPrice} Rs.</div>
          </div>
          <h2>Address</h2>
          <div className="text-xl my-1">Place: <a href={"/place/"+restaurant.place.placeId}>{restaurant.place.placeName}</a></div>
          <div className="text-xl my-1">District: {restaurant.place.district}</div>
          <div className="text-xl my-1">State: {restaurant.place.state}</div>
          <div className="text-xl my-1">Pincode: {restaurant.place.pincode}</div>
          <div className="flex justify-content-center text-3xl h-5rem">...</div>
        </div>
      )}
    </div>
  )
}

export default RestaurantPage