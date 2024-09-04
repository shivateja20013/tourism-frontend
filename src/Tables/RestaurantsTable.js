import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import RestaurantsForm from "../Forms/RestaurantsForm";

const RestaurantsTable = () => {
  const [showRestaurantsForm, setShowRestaurantsForm] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: backendUrl + "/places",
    })
      .then((response) => {
        if (response.status === 200) {
          setPlaces(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let finalUrl = backendUrl;
    if (selectedPlaceId === null) finalUrl = backendUrl + "/restaurants/";
    else finalUrl = backendUrl + "/restaurants/place/" + selectedPlaceId;

    axios({
      method: "get",
      url: finalUrl,
    })
      .then((response) => {
        if (response.status === 200) {
          setRestaurants(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedPlaceId]);

  const onDeleteRestaurant = (restaurantId) => {
    axios({
      method: "delete",
      url: backendUrl + "/restaurants/" + restaurantId,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Restaurant deleted successfully.");
          setSelectedRestaurantId(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full m-2">
      <div className="flex w-full justify-content-between align-items-center p-2">
        <h1 className="m-2">Restaurants</h1>
        <div>
          <Dropdown
            className="mx-1 w-20rem"
            value={selectedPlace}
            options={places}
            optionLabel="placeName"
            onChange={(e) => {
              setSelectedPlace(e.value);
              setSelectedPlaceId(e.value.placeId);
            }}
            placeholder="Select a place"
          />
          <Button
            className="mx-1"
            label="Add new Restaurant"
            onClick={() => {
              setSelectedRestaurantId(null);
              setShowRestaurantsForm(true);
            }}
          />
        </div>
      </div>
      <div className="w-full h-full overflow-x-scroll overflow-y-scroll table-container">
        <table className="p-2">
          <tr>
            <th className="w-10rem">Name</th>
            <th className="w-10rem">Images</th>
            <th className="w-10rem">Place</th>
            <th className="w-25rem">Description</th>
            <th className="w-10rem">Cuisine</th>
            <th className="w-8rem">Price Range</th>
            {/* <th className="w-5rem">Max Price</th> */}
            <th className="w-5rem">Rating</th>
            <th className="w-10rem">Actions</th>
          </tr>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr key={restaurant.restaurantId}>
                  <td className="w-10rem">{restaurant.restaurantName}</td>
                  <td className="w-10rem">Images</td>
                  <td className="w-10rem">{restaurant.place.placeName}</td>
                  <td className="w-25rem">{restaurant.description}</td>
                  <td className="w-10rem">{restaurant.cuisine}</td>
                  <td className="w-8rem">{restaurant.minPrice + " - " + restaurant.maxPrice}</td>
                  {/* <td className="w-5rem">{restaurant.maxPrice}</td> */}
                  <td className="w-5rem">{restaurant.rating}</td>
                  <td className="w-10rem flex">
                    <Button
                      className="m-1"
                      icon="pi pi-pen-to-square"
                      severity="info"
                      rounded
                      text
                      raised
                      onClick={() => {
                        setShowRestaurantsForm(true);
                        setSelectedRestaurantId(restaurant.restaurantId);
                      }}
                    />
                    <Button
                      className="m-1"
                      icon="pi pi-trash"
                      security="warning"
                      rounded
                      text
                      raised
                      onClick={() => {
                        setSelectedRestaurantId(restaurant.restaurantId);
                        setShowDeleteConfirmationPopup(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      <Dialog
        className="w-6"
        header={selectedRestaurantId ? "Edit restaurant" : "Add new restaurant"}
        visible={showRestaurantsForm}
        onHide={() => {
          setShowRestaurantsForm(false);
        }}
      >
        <RestaurantsForm restaurantId={selectedRestaurantId} places={places} />
      </Dialog>
      <Dialog
        visible={showDeleteConfirmationPopup}
        onHide={() => {}}
        content={
          <div className="card p-5 bg-white border-rounded-xl flex flex-column justify-content-center align-items-center">
            <i className="pi pi-exclamation-triangle text-4xl m-2" />
            <div className="m-2">
              Are you sure you want to delete the restaurant?
            </div>
            <div className="m-2">
              <Button
                className="m-1"
                label="No"
                severity="info"
                onClick={() => {
                  setShowDeleteConfirmationPopup(false);
                  setSelectedRestaurantId(null);
                }}
              />
              <Button
                className="m-1"
                label="Yes"
                security="warning"
                onClick={() => {
                  onDeleteRestaurant(selectedRestaurantId);
                  setShowDeleteConfirmationPopup(false);
                }}
              />
            </div>
          </div>
        }
      ></Dialog>
    </div>
  );
};

export default RestaurantsTable;
