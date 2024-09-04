import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appName } from "./config";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SignInForm from "./Forms/SignInForm";
import Logo from "./Logo";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [signInFormHeader, setSignInFormHeader] = useState("Sign In");

  return (
    <div className="w-full h-1 flex align-items-center justify-content-between bg-primary z-5">
      {/* <div
        className="m-2 text-3xl font-bold cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        {appName}
      </div> */}
      <Logo/>
      <div className="m-2 flex align-items-center">
        {user && user.role !== "user" && (
          <Button
            className="mx-2 cursor-pointer"
            label="Settings"
            onClick={() => {
              navigate("/settings");
            }}
          />
        )}
        {user === null && (
          <Button
            label="Sign In"
            onClick={() => {
              setShowSignInForm(true);
            }}
          />
        )}
        {user !== null && (
          <Button
            label="TravelGenie"
            onClick={() => {
              navigate("/travel-genie");
            }}
          />
        )}
        {user !== null && (
          <Button
            label="Sign Out"
            onClick={() => {
              setUser(null);
              localStorage.removeItem("user");
              navigate("/");
            }}
          />
        )}
      </div>
      <Dialog
        className="w-6"
        header={signInFormHeader}
        onHide={() => {
          setShowSignInForm(false);
        }}
        visible={showSignInForm}
      >
        <SignInForm
          setSignInFormHeader={setSignInFormHeader}
          setUser={setUser}
          setShowForm={setShowSignInForm}
        />
      </Dialog>
    </div>
  );
};

export default Navbar;
