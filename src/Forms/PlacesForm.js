import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import { backendUrl } from "../config";

const PlacesForm = ({placeId}) => {
  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [entryFee, setEntryFee] = useState(0);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [mapLink, setMapLink] = useState("");

  useEffect(()=>{
    if(placeId){
      axios({
        method: "get",
        url: backendUrl + "/places/"+placeId
      })
      .then((response)=>{
        if(response.status===200){
          let place = response.data;
          setPlaceName(place.placeName);
          setDescription(place.description);
          setEntryFee(place.entryFee);
          setState(place.state);
          setDistrict(place.district);
          setPincode(place.pincode);
          setMapLink(place.mapLink);  
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  },[placeId]);

  const createPlace = () => {
    axios({
      method: "post",
      url: backendUrl + "/places",
      data: {
        placeId,
        placeName,
        description,
        entryFee,
        state,
        district,
        pincode,
        mapLink,
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
    <form onSubmit={() => createPlace()}>
      <div className="w-full flex flex-column p-1">
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Name</div>
          <InputText
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
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
        <div className="flex flex-column md:flex-row">
          <div className="mt-2 mb-1 md:mr-1 flex w-full flex-column">
            <div className="mb-1">State</div>
            <InputText
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="mt-2 mb-1 md:ml-1 flex w-full flex-column">
            <div className="mb-1">District</div>
            <InputText
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-column md:flex-row">
          <div className="mt-2 mb-1 md:mr-1 flex w-full flex-column">
            <div className="mb-1">Pincode</div>
            <InputNumber
              value={pincode}
              onValueChange={(e) => setPincode(e.target.value)}
              required
              useGrouping={false}
            />
          </div>
          <div className="mt-2 mb-1 md:ml-1 flex w-full flex-column">
            <div className="mb-1">Entry fee</div>
            <InputNumber
              value={entryFee}
              onValueChange={(e) => setEntryFee(e.target.value)}
              required
              useGrouping={false}
            />
          </div>
        </div>
        <div className="mt-2 mb-1 flex w-full flex-column">
          <div className="mb-1">Map Link</div>
          <InputText
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            required
          />
        </div>
        <div className="mt-2 mb-1 flex w-full justify-content-center">
          <Button type="submit">
            {placeId!==null ? "Save" : "Add"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PlacesForm;
