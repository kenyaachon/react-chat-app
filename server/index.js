const express = require("express");

const cors = require("cors");

const app = express();

const authenticationRoutes = require("./routes/authentication.js");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "Bro what is happening to me",
//     messagingServiceSid: messagingServiceSid,
//     to: "+14252691572",
//   })
//   .then((message) => console.log(message.sid))
//   .done();
var colors = require("colors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (request, response) => {
  response.send("Hello bitches");
});

//send sms notifications to users
app.post("/", (request, response) => {
  const { message, user: sender, type, members } = request.body;

  console.log("anybody there");

  if (type === "message.new") {
    console.log("anybody there");
    members
      .filter((member) => member.user_id !== sender.id)
      .forEach(({ user }) => {
        // if (!user.online) {
        client.messages
          .create({
            body: `You have a new message from ${message.user.fullName} - ${message.text}`,
            messagingServiceSid: messagingServiceSid,
            to: "+14252691572",
          })
          .then(() => console.log("Message sent!"))
          .catch((err) => console.log(err));
        // }
      });
    return response.status(200).send("Message sent!");
  }

  return response.status(200).send("Not a new message request");
});

app.use("/auth", authenticationRoutes);

app.listen(PORT, () =>
  console.log(colors.yellow(`Server running on port ${PORT}`))
);
