const express = require("express");
const bookings = express.Router();
const {
getAllBookings,
getBookingById,
createABookingForAMeetingRoom,
deleteABookingById } = require("../queries/bookings")

const { getAttendeeByBookingId } = require("../queries/attendees")

const { getRoomByBookingId } = require("../queries/meetingRooms")

// Define the GET endpoint to retrieve all future bookings ✔
bookings.get("/", async (req, res) => {
    try {
        const allBookings = await getAllBookings();
        if (allBookings[0]) {
            res.json({ success: true, result: allBookings });
        } else {
            res.status(404).json({ success: false, error: "No future bookings found." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});

// Define the GET endpoint to retrieve one booking by booking id ✔
bookings.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleBooking = await getBookingById(id);
        
        if (singleBooking.booking_id) {
            res.json({ success: true, result: singleBooking });
        } else {
            res.status(404).json({ success: false, error: "Booking not found." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});   

// Define the GET endpoint to retrieve attendee by booking id  ✔
bookings.get("/:id/attendee", async (req, res) => {
    const { id } = req.params;
    try {
        const oneAttendee = await getAttendeeByBookingId(id);
        console.log("oneAttendee: ", oneAttendee)
        if (oneAttendee.name || oneAttendee.email) {
            res.json({ success: true, result: oneAttendee });
        } else {
            console.log(error)
            res.status(404).json({ success: false, error: "attendee not found." });
        }
    } catch (error) {
        console.error('Error fetching attendee information:', error);
        res.status(500).json({ success: false, error: "Server error." });
    }
});  

// Define the GET endpoint to retrieve room by booking id  ✔
bookings.get("/:id/room", async (req, res) => {
    const { id } = req.params;
    try {
      const roomInfo = await getRoomByBookingId(id);
      console.log(roomInfo)
      if (roomInfo.room_id) {
        res.json({ success: true, result: roomInfo });
      } else {
        console.log(error)
        res.status(404).json({ success: false, error: "Room information not found." });
      }
    } catch (error) {
      console.error('Error fetching room information:', error);
      res.status(500).json({ success: false, error: "Server error." });
    }
  });
  

// Define the POST endpoint to create a booking for a specific room XXXX ?
bookings.post("/", async (req, res) => {
    try {
        const roomId = req.body.room_id; 
        const booking = req.body;
        if (!roomId || !booking.start_date || !booking.end_date || !booking.meeting_name) {
            res.status(400).json({ success: false, error: "All required fields must be provided." });
            return;
        }
        const newBookingId = await createABookingForAMeetingRoom(roomId, booking);
    
        if (newBookingId) { 
            res.status(201).json({ success: true, result: newBookingId });
        } else {
            res.status(400).json({ success: false, error: "Unable to create a new booking." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});    

// Define the DELETE endpoint delete/cancel a booking ( not tested yet )
bookings.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const canceledBooking = await deleteABookingById(id);
    
        if (canceledBooking.booking_id) {
            res.json({ success: true, result: canceledBooking });
        } else {
            res.status(400).json({ success: false, error: "Unable to delete the booking." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error." });
    }
});  
    
module.exports = bookings;