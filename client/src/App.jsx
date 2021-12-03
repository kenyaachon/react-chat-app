import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import {
  ChannelListContainer,
  ChannelContainer,
  Authentication,
} from "./components";

import "./App.css";
const apiKey = "b2te8jkgjz5f";
const client = StreamChat.getInstance(apiKey);

const cookies = new Cookies();

const authenticationToken = cookies.get("token");

if (authenticationToken) {
  //get data for current session
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authenticationToken
  );
}

const App = () => {
  if (!authenticationToken) return <Authentication />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
