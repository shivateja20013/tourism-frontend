import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { useParams } from "react-router-dom";

const ActivityPage = () => {
  const [activity, setActivity] = useState(null);
  let { activityId } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: backendUrl + "/activities/" + activityId,
    })
      .then((response) => {
        if (response.status === 200) {
          setActivity(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activityId]);

  return (
    <div className="w-full h-full p-2 flex justify-content-center overflow-y-scroll">
      {activity && (
        <div className="w-9">
          <h1>{activity.activityName}</h1>
          <div className="text-xl">{activity.description}</div>
          <div className="text-xl flex mt-3">
            <div className="font-bold">Entry fee: </div> 
            <div className="ml-2">{activity.entryFee} Rs.</div>
          </div>
          <h2>Address</h2>
          <div className="text-xl my-1">Place: <a href={"/place/"+activity.place.placeId}>{activity.place.placeName}</a></div>
          <div className="text-xl my-1">District: {activity.place.district}</div>
          <div className="text-xl my-1">State: {activity.place.state}</div>
          <div className="text-xl my-1">Pincode: {activity.place.pincode}</div>
          <div className="flex justify-content-center text-3xl h-5rem">...</div>
        </div>
      )}
    </div>
  );
};

export default ActivityPage;
