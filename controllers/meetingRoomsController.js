const express = require("express");
const rooms = express.Router();

const {
    getAllMeetingRooms,
    createAMeetingRoom,
    getOneMeetingRoom,
    getAvailableMeetingRooms 
} = require("../queries/meetingRooms")

const { getAllBookingsByRoomId } = require("../queries/bookings");


// Define the GET endpoint to retrieve all meeting rooms ✔
rooms.get("/", async (req, res) => {
    try {
        const allRooms = await getAllMeetingRooms(); 
        if (allRooms[0]) {
            res.json({ success: true, result: allRooms });
        } else {
            res.status(404).json({ success: false, error: "No meeting-room found." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});

// Define the GET endpoint to retrieve all available meeting rooms
rooms.get("/available", async (req, res) => {
    try {
      const { start_date, end_date, floor, capacity } = req.query; // Use req.query to retrieve query parameters
  
      // Check if both start_date and end_date are provided, otherwise send an error
      if (!start_date || !end_date) {
        return res.status(400).json({ error: "start_date and end_date are required." });
      }
  
      // Retrieve available rooms by search criteria
      const availableMeetingRooms = await getAvailableMeetingRooms(start_date, end_date, floor, capacity);
      console.log("all available rooms: ", availableMeetingRooms)
      // Check if any available meeting rooms exist, and if they do, send the data back
      if (availableMeetingRooms.length > 0) {
        res.status(200).json(availableMeetingRooms);
      } else {
        res.status(404).json({ error: "No available meeting rooms match the criteria." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while retrieving available meeting rooms." });
    }
  });
  

// Define the POST endpoint to create a new room ✔
rooms.post("/", async (req, res) => {
    try {
        const newRoom = await createAMeetingRoom(req.body);
        let isRoomCreatedSuccess = false;

        if (newRoom.room_id) { 
            isRoomCreatedSuccess = true;
        }

        if (isRoomCreatedSuccess) { 
            res.status(201).json({ success: true, result: newRoom });
        } else {
            res.status(400).json({
                success: false, 
                error: "Unable to create a new room. Please ensure that 'floor' is a positive integer between 0 and 28, and 'capacity' is a non-negative integer up to 200."
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});

// Define the GET endpoint to retrieve a specific meeting room ✔
rooms.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleRoom = await getOneMeetingRoom(id);
        if (singleRoom.room_id) { 
            console.log(id)
            res.json({ success: true, result: singleRoom });
        } else {
            res.status(404).json({ success: false, error: "Meeting room not found." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});

// Define the GET endpoint to retrieve all future bookings by a specific meeting room ID ✔
rooms.get("/:id/bookings", async (req, res) => {
    const { id } = req.params;
    try {
        const allRoomBookings = await getAllBookingsByRoomId(id);
    
        if (allRoomBookings[0]) { 
            res.json({ success: true, result: allRoomBookings });
        } else {
            res.json({
                success: true,
                message: "No future bookings found for this room. You can book this room for your upcoming events."
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});
    
module.exports = rooms;