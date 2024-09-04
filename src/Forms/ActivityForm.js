import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { backendUrl } from "../config";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

const ActivityForm = ({ activityId, places }) => {
  const [placeId, setPlaceId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [entryFee, setEntryFee] = useState(0);

  useEffect(() => {
    if (activityId) {
      axios({
        method: "get",
        url: backendUrl + "/activities/" + activityId,
      }).then((response) => {
        if (response.status === 200) {
          let activity = response.data;
          setSelectedPlace(activity.place); 
          setPlaceId(activity.place.placeId);
          setActivityName(activity.activityName);
          setDescription(activity.description);
          setEntryFee(activity.entryFee);
        }
      });
    }
  }, [activityId]);

  const createActivity = () => {
    axios({
      method: "post",
      url: backendUrl + "/activities",
      data: {
        activityId,
        placeId,
        activityName,
        description,
        entryFee,
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
        createActivity();
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
          />
        </div>
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Name</div>
          <InputText
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
        </div>
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Description</div>
          <InputTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Entry Fee</div>
          <InputNumber
            value={entryFee}
            onValueChange={(e) => setEntryFee(e.target.value)}
          />
        </div>
        <div className="mt-2 mb-1 flex w-full justify-content-center">
          <Button type="submit">{activityId !== null ? "Save" : "Add"}</Button>
        </div>
      </div>
    </form>
  );
};

export default ActivityForm;
