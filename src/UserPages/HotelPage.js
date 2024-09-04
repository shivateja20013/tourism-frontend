import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { useParams } from "react-router-dom";

const HotelPage = () => {
  const [hotel, setHotel] = useState(null);
  let { hotelId } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: backendUrl + "/hotels/" + hotelId,
    })
      .then((response) => {
        if (response.status === 200) {
          setHotel(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hotelId]);

  return (
    <div className="w-full h-full p-2 flex justify-content-center overflow-y-scroll">
      {hotel && (
        <div className="w-9">
          <h1>{hotel.hotelName}</h1>
          <div className="text-xl">{hotel.description}</div>
          <div className="text-xl flex mt-3">
            <div className="font-bold">Price range: </div>
            <div className="ml-2">{hotel.minPrice} Rs. - {hotel.maxPrice} Rs.</div>
          </div>
          <h2>Address</h2>
          <div className="text-xl my-1">Place: <a href={"/place/"+hotel.place.placeId}>{hotel.place.placeName}</a></div>
          <div className="text-xl my-1">District: {hotel.place.district}</div>
          <div className="text-xl my-1">State: {hotel.place.state}</div>
          <div className="text-xl my-1">Pincode: {hotel.place.pincode}</div>
          <div className="flex justify-content-center text-3xl h-5rem">...</div>
        </div>
      )}
    </div>
  );
};

export default HotelPage;
