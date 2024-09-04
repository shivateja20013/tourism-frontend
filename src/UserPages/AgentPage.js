import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { agentUrl, backendUrl } from "../config";

const AgentPage = ({ username }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [userMessageOne, setUserMessageOne] = useState("");
  const [systemMessageOne, setSystemMessageOne] = useState("");
  const [userMessageTwo, setUserMessageTwo] = useState("");
  const [systemMessageTwo, setSystemMessageTwo] = useState("");
  const [data, setData] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [loadChats, setLoadChats] = useState(false);
  const [chats, setChats] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: backendUrl + "/chats/user/" + username,
    })
      .then((response) => {
        if (response.status === 200) {
          setChats(response.data);
          let chats = response.data;
          if (chats.length >= 2) {
            setSystemMessageTwo(chats[chats.length - 1].message);
            setUserMessageTwo(chats[chats.length - 2].message);
          }
          if (chats.length >= 4) {
            setSystemMessageOne(chats[chats.length - 3].message);
            setUserMessageOne(chats[chats.length - 4].message);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loadChats]);

  const saveMessage = (userMessage, systemMessage) => {
    axios({
      method: "post",
      url: backendUrl + "/chats/",
      data: {
        username,
        userMessage,
        systemMessage,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          setLoadChats(!loadChats);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessage = () => {
    setDisableButton(true);
    if (currentMessage !== "") {
      axios({
        method: "post",
        url: agentUrl + "/tourism-gpt/",
        data: {
          currentMessage,
          userMessageOne,
          systemMessageOne,
          userMessageTwo,
          systemMessageTwo,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setData(response.data);
            saveMessage(currentMessage, response.data);
            setDisableButton(false);
            setCurrentMessage("");
          }
        })
        .catch((error) => {
          setCurrentMessage("");
          setDisableButton(false);
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full flex flex-column p-2 justify-content-center align-items-center">
      <div className="w-9 chat-container flex flex-column overflow-y-scroll">
        {/* {data && <div className="chat-display ml-8 p-3 border-round-xl bg-cyan-200 m-2">{data}</div>} */}
        {chats &&
          chats.map((chat) => {
            return (
              <div
                className={
                  chat.isSystemMessage
                    ? "chat-display mr-8 p-3 border-round-right-xl m-2"
                    : "chat-display ml-8 p-3 border-round-left-xl bg-primary m-2"
                }
              >
                {chat.message}
              </div>
            );
          })}
      </div>
      <div className="w-9 flex align-items-center">
        <InputText
          className="w-full"
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <Button
          label="Send"
          className="ml-2 mr-4"
          icon="pi pi-send"
          rounded
          text
          onClick={() => {
            sendMessage();
          }}
          disabled={disableButton}
        />
      </div>
    </div>
  );
};

export default AgentPage;
