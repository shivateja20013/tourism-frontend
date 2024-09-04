import React from "react";
import { Button } from "primereact/button";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SettingsPage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-column w-2 h-full surface-50">
        <Button
          className="m-2"
          label="Places"
          onClick={() => navigate("/settings/places")}
        />
        <Button
          className="m-2"
          label="Activities"
          onClick={() => navigate("/settings/activities")}
        />
        <Button
          className="m-2"
          label="Hotels"
          onClick={() => navigate("/settings/hotels")}
        />
        <Button
          className="m-2"
          label="Restaurants"
          onClick={() => navigate("/settings/restaurants")}
        />
        {user && user.role === "admin" && (
          <Button
            className="m-2"
            label="Users"
            onClick={() => navigate("/settings/users")}
          />
        )}
      </div>
      <div className="w-10 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
