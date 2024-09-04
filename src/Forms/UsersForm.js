import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { backendUrl } from "../config";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

const UsersForm = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      axios({
        method: "get",
        url: backendUrl + "/users/" + userId,
      }).then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
      });
    }
  }, [userId]);

  return <form
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
        options={["user", "manager", "admin"]}
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
</form>;
};

export default UsersForm;
