import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";

const SignInForm = ({ setSignInFormHeader, setUser, setShowForm }) => {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");

  const createUser = () => {
    axios({
      method: "post",
      url: backendUrl + "/users",
      data: {
        username,
        password,
        email,
        phone,
        role,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setEmail("");
          setPhone("");
          setShowSignInForm(true);
          setSignInFormHeader("Sign In");
          console.log(response.status);
          setShowForm(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const authenticateUser = () => {
    axios({
      method: "post",
      url: backendUrl + "/users/authenticate",
      data: {
        username,
        password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUsername("");
          setPassword("");
          setUser(response.data);
          console.log(response.data);
          setShowForm(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {showSignInForm ? (
        <div className="w-full flex flex-column p-1">
          <i className="w-full flex justify-content-center text-2xl pi pi-sign-in" />
          <div className="mt-2 mb-1 flex w-full flex-column">
            <div className="mb-1">Username</div>
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-2 mb-1 flex w-full flex-column">
            <div className="mb-1">Password</div>
            <Password
              className="w-full flex"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
              required
              pt={{
                input: { className: "w-full" },
              }}
            />
          </div>
          <div className="mt-2 mb-1 flex w-full justify-content-center">
            <Button
              className="mx-1"
              label="Create Account"
              onClick={() => {
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setEmail("");
                setPhone("");
                setShowSignInForm(false);
                setSignInFormHeader("Create Account");
              }}
            />
            <Button
              className="mx-1"
              label="Next"
              onClick={() => {
                authenticateUser();
              }}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-column p-1">
          <i className="w-full flex justify-content-center text-2xl pi pi-user-plus" />
          <div className="mt-2 mb-1 flex w-full flex-column">
            <div className="mb-1">Username</div>
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-2 mb-1 flex w-full flex-column">
            <div className="mb-1">Password</div>
            <Password
              className="w-full flex"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              toggleMask
              required
              pt={{
                input: { className: "w-full" },
              }}
            />
          </div>
          <div className="mt-2 mb-1 flex w-full flex-column">
            <div className="mb-1">Confirm Password</div>
            <Password
              className="w-full flex"
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.target.value)}
              toggleMask
              feedback={false}
              required
              pt={{
                input: { className: "w-full" },
              }}
              invalid={password !== confirmPassword}
            />
          </div>
          <div className="mt-2 mb-1 flex w-full flex-column">
            <div className="mb-1">Email</div>
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-2 mb-1 flex w-full flex-column">
            <div className="mb-1">Phone</div>
            <InputText
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mt-2 mb-1 flex w-full justify-content-center">
            <Button
              className="mx-1"
              label="Sign In"
              onClick={() => {
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setEmail("");
                setPhone("");
                setShowSignInForm(true);
                setSignInFormHeader("Sign In");
              }}
            />
            <Button
              className="mx-1"
              label="Submit"
              onClick={() => {
                createUser();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
