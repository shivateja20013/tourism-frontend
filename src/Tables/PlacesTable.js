import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PlacesForm from "../Forms/PlacesForm";

const PlacesTable = () => {
  const [places, setPlaces] = useState([]);
  const [showPlacesForm, setShowPlacesForm] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] =
    useState(false);

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
  }, [places]);

  const onDeletePlace = (placeId) => {
    console.log(backendUrl + "/places/" + placeId);
    axios({
      method: "delete",
      url: backendUrl + "/places/" + placeId,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Place deleted successfully.");
          setSelectedPlaceId(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full p-2">
      <div className="flex w-full justify-content-between align-items-center p-2">
        <h1 className="m-2">Places</h1>
        <Button
          label="Add new Place"
          onClick={() => {
            setSelectedPlaceId(null);
            setShowPlacesForm(true);
          }}
        />
      </div>
      <div className="w-full h-full overflow-x-scroll overflow-y-scroll table-container">
        <table className="p-2">
          <tr>
            <th className="w-10rem">Name</th>
            <th className="w-10rem">Images</th>
            <th className="w-25rem">Description</th>
            <th className="w-10rem">Entry fee</th>
            <th className="w-10rem">District</th>
            <th className="w-10rem">State</th>
            <th className="w-10rem">Pincode</th>
            <th className="w-10rem">Location</th>
            <th className="w-10rem">Actions</th>
          </tr>
          {places &&
            places.map((place) => {
              return (
                <tr>
                  <td className="w-10rem">{place.placeName}</td>
                  <td className="w-10rem">Images</td>
                  <td className="w-25rem h-10rem">{place.description}</td>
                  <td className="w-10rem">{place.entryFee}</td>
                  <td className="w-10rem">{place.district}</td>
                  <td className="w-10rem">{place.state}</td>
                  <td className="w-10rem">{place.pincode}</td>
                  <td className="w-10rem justify-content-start"><a href={place.mapLink} target="_blank">{place.mapLink}</a></td>
                  <td className="w-10rem flex">
                    <Button
                      className="m-1"
                      icon="pi pi-pen-to-square"
                      severity="info"
                      rounded
                      text
                      raised
                      onClick={() => {
                        setSelectedPlaceId(place.placeId);
                        setShowPlacesForm(true);
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
                        setSelectedPlaceId(place.placeId);
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
        header={selectedPlaceId ? "Edit place" : "Add new place"}
        visible={showPlacesForm}
        onHide={() => {
          setShowPlacesForm(false);
        }}
      >
        <PlacesForm placeId={selectedPlaceId} />
      </Dialog>
      <Dialog
        visible={showDeleteConfirmationPopup}
        onHide={() => {}}
        content={
          <div className="card p-5 bg-white border-rounded-xl flex flex-column justify-content-center align-items-center">
            <i className="pi pi-exclamation-triangle text-4xl m-2" />
            <div className="m-2">
              Are you sure you want to delete the place?
            </div>
            <div className="m-2">
              <Button
                className="m-1"
                label="No"
                severity="info"
                onClick={() => {
                  setShowDeleteConfirmationPopup(false);
                  setSelectedPlaceId(null);
                }}
              />
              <Button
                className="m-1"
                label="Yes"
                security="warning"
                onClick={() => {
                  onDeletePlace(selectedPlaceId);
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

export default PlacesTable;
