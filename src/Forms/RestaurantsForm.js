import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { backendUrl } from "../config";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

const RestaurantsForm = ({ restaurantId, places }) => {
  const [placeId, setPlaceId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if (restaurantId) {
      axios({
        method: "get",
        url: backendUrl + "/restaurants/" + restaurantId,
      }).then((response) => {
        if (response.status === 200) {
          let restaurant = response.data;
          setSelectedPlace(restaurant.place);
          setPlaceId(restaurant.place.placeId);
          setRestaurantName(restaurant.restaurantName);
          setDescription(restaurant.description);
          setCuisine(restaurant.cuisine);
          setMinPrice(restaurant.minPrice);
          setMaxPrice(restaurant.maxPrice);
        }
      });
    }
  }, [restaurantId]);

  const createRestaurant = () => {
    axios({
      method: "post",
      url: backendUrl + "/restaurants",
      data: {
        restaurantId,
        placeId,
        restaurantName,
        description,
        cuisine,
        minPrice,
        maxPrice,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createRestaurant();
      }}
    >
      <div className="w-full flex flex-column p-1">
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Place</div>
          <Dropdown
            value={selectedPlace}
            options={places}
            optionLabel="placeName"
            onChange={(e) => {
              setSelectedPlace(e.value);
              setPlaceId(e.value.placeId);
            }}
            // virtualScrollerOptions={{itemSize: 5}}
            placeholder="Select a place"
            required
          />
        </div>
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Name</div>
          <InputText
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Description</div>
          <InputTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Cuisine</div>
          <InputText
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-column md:flex-row">
          <div className="mt-2 mb-1 md:mr-1 flex w-full flex-column">
            <div className="mb-1">Minimum Price</div>
            <InputNumber
              value={minPrice}
              onValueChange={(e) => setMinPrice(e.target.value)}
              required
              useGrouping={false}
            />
          </div>
          <div className="mt-2 mb-1 md:ml-1 flex w-full flex-column">
            <div className="mb-1">Maximum Price</div>
            <InputNumber
              value={maxPrice}
              onValueChange={(e) => setMaxPrice(e.target.value)}
              required
              useGrouping={false}
            />
          </div>
        </div>
        <div className="mt-2 mb-1 flex w-full justify-content-center">
          <Button type="submit">{restaurantId !== null ? "Save" : "Add"}</Button>
        </div>
      </div>
    </form>
  );
};

export default RestaurantsForm;
