
const cors = require("cors");
const express = require("express");

const meetingRoomsController = require("./controllers/meetingRoomsController");
const bookingsController = require("./controllers/bookingsController");
const attendeesController = require("./controllers/attendeesController");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/meeting-rooms", meetingRoomsController);
app.use("/bookings", bookingsController);
app.use("/attendees", attendeesController);

app.get("/", (req, res) => {
  res.json({ message: "Server is running ..." });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

module.exports = app;