import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ActivityForm from "../Forms/ActivityForm";
import { Dropdown } from "primereact/dropdown";

const ActivitiesTable = () => {
  const [showActivitiesForm, setShowActivitiesForm] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] = useState(false);
  const [activities, setActivities] = useState(null);
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
    if (selectedPlaceId === null) finalUrl = backendUrl + "/activities/";
    else finalUrl = backendUrl + "/activities/place/" + selectedPlaceId;
    
    axios({
      method: "get",
      url: finalUrl,
    })
      .then((response) => {
        if (response.status === 200) {
          setActivities(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedPlaceId]);

  const onDeleteActivity = (activityId) => {
    axios({
      method: "delete",
      url: backendUrl + "/activities/" + activityId,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Activity deleted successfully.");
          setSelectedActivityId(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full m-2">
      <div className="flex w-full justify-content-between align-items-center p-2">
        <h1 className="m-2">Activities</h1>
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
            // virtualScrollerOptions={{itemSize: 5}}
            placeholder="Select a place"
          />
          <Button
            className="mx-1"
            label="Add new Activity"
            onClick={() => {
              setSelectedActivityId(null);
              setShowActivitiesForm(true);
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
            <th className="w-10rem">Entry fee</th>
            <th className="w-10rem">Actions</th>
          </tr>
          {activities &&
            activities.map((activity) => {
              return (
                <tr key={activity.activityId}>
                  <td className="w-10rem">{activity.activityName}</td>
                  <td className="w-10rem">Images</td>
                  <td className="w-10rem">{activity.place.placeName}</td>
                  <td className="w-25rem h-10rem">{activity.description}</td>
                  <td className="w-10rem">{activity.entryFee}</td>
                  <td className="w-10rem flex">
                    <Button
                      className="m-1"
                      icon="pi pi-pen-to-square"
                      severity="info"
                      rounded
                      text
                      raised
                      onClick={() => {
                        setShowActivitiesForm(true);
                        setSelectedActivityId(activity.activityId);
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
                        setSelectedActivityId(activity.activityId);
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
        header={selectedActivityId ? "Edit activity" : "Add new activity"}
        visible={showActivitiesForm}
        onHide={() => {
          setShowActivitiesForm(false);
        }}
      >
        <ActivityForm activityId={selectedActivityId} places={places} />
      </Dialog>
      <Dialog
        visible={showDeleteConfirmationPopup}
        onHide={() => {}}
        content={
          <div className="card p-5 bg-white border-rounded-xl flex flex-column justify-content-center align-items-center">
            <i className="pi pi-exclamation-triangle text-4xl m-2" />
            <div className="m-2">
              Are you sure you want to delete the activity?
            </div>
            <div className="m-2">
              <Button
                className="m-1"
                label="No"
                severity="info"
                onClick={() => {
                  setShowDeleteConfirmationPopup(false);
                  setSelectedActivityId(null);
                }}
              />
              <Button
                className="m-1"
                label="Yes"
                security="warning"
                onClick={() => {
                  onDeleteActivity(selectedActivityId);
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

export default ActivitiesTable;
