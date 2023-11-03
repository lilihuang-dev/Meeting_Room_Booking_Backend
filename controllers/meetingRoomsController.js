const express = require("express");
const rooms = express.Router();

const {
    getAllMeetingRooms,
    createAMeetingRoom,
    getOneMeetingRoom 
} = require("../queries/meetingRooms")

const { getAllBookingsByRoomId } = require("../queries/bookings")

// Define the GET endpoint  ✔
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

// Define the POST endpoint  ✔
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

// Define the GET endpoint  ✔
rooms.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleRoom = await getOneMeetingRoom(id);
    
        if (singleRoom.room_id) { 
            res.json({ success: true, result: singleRoom });
        } else {
            res.status(404).json({ success: false, error: "Meeting room not found." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});

// Define the GET endpoint ✔
rooms.get("/:id/bookings", async (req, res) => {
    const { id } = req.params;
    try {
        const allRoomBookings = await getAllBookingsByRoomId(id);
    
        if (allRoomBookings[0]) { 
            res.json({ success: true, result: allRoomBookings });
        } else {
            res.status(404).json({
                success: false,
                error: "No future bookings found for this room. Please consider booking this room for your upcoming events."
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});
    
module.exports = rooms;