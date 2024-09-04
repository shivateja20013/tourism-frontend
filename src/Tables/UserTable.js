import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const UserTable = () => {
  const [showUsersForm, setShowUsersForm] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] =
    useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: backendUrl + "/users",
    })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onDeleteUser = (username) => {
    axios({
      method: "delete",
      url: backendUrl + "/users/" + username,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Activity deleted successfully.");
          setSelectedUsername(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full m-2">
      <div className="flex w-full justify-content-between align-items-center p-2">
        <h1 className="m-2">Users</h1>
        {/* <Button
          className="mx-1"
          label="Add new User"
          onClick={() => {
            setSelectedUsername(null);
            setShowUsersForm(true);
          }}
        /> */}
      </div>
      <div className="w-full h-full overflow-x-scroll overflow-y-scroll table-container">
        <table className="p-2">
          <tr>
            <th className="w-10rem">Username</th>
            <th className="w-10rem">Email</th>
            <th className="w-10rem">Phone</th>
            <th className="w-10rem">Role</th>
            {/* <th className="w-10rem">Actions</th> */}
          </tr>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.username}>
                  <td className="w-10rem">{user.username}</td>
                  <td className="w-10rem">{user.email}</td>
                  <td className="w-10rem">{user.phone}</td>
                  <td className="w-10rem">{user.role}</td>
                  {/* <td className="w-10rem flex">
                    <Button
                      className="m-1"
                      icon="pi pi-pen-to-square"
                      severity="info"
                      rounded
                      text
                      raised
                      onClick={() => {
                        setShowUsersForm(true);
                        setSelectedUsername(user.username);
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
                        setSelectedUsername(user.username);
                        setShowDeleteConfirmationPopup(true);
                      }}
                    />
                  </td> */}
                </tr>
              );
            })}
        </table>
      </div>
      <Dialog
        className="w-6"
        header={selectedUsername ? "Edit User" : "Add new User"}
        visible={showUsersForm}
        onHide={() => {
          setShowUsersForm(false);
        }}
      >
        {/* <UserForm username={selectedUsername} /> */}
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
                  setSelectedUsername(null);
                }}
              />
              <Button
                className="m-1"
                label="Yes"
                security="warning"
                onClick={() => {
                  onDeleteUser(selectedUsername);
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

export default UserTable;
