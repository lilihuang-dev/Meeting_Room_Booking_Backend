const db = require("../db/dbConfig");
const { validateBookingData } = require("../validations/validateBookingData.js")

// Retrieve all future bookings of a meeting room from the database
const getAllBookingsByRoomId = async (roomId) => {
    try {
        const currentDate = new Date().toISOString(); 
        const allBookings = await db.any('SELECT * FROM booking WHERE room_id = $1 AND "start_date" > $2', [roomId, currentDate]);
        return allBookings;
    } catch (error) {
        return error;
    }
};

// Retrieve all future bookings from the database
const getAllBookings = async () => {
    try {
        const currentDate = new Date().toISOString();
        const allBookings = await db.any(
            `SELECT b.booking_id, 
                    b.meeting_name,
                    b.start_date, 
                    b.end_date, 
                    r.room_name AS booking_room_name, 
                    r.floor AS booking_room_floor 
            FROM booking AS b 
            JOIN meeting_room AS r 
            ON b.room_id = r.room_id  
            WHERE b.start_date > $1
            `,
            [currentDate]
            );
      return allBookings;
        // const allBookings = await db.any('SELECT * FROM booking WHERE "start_date" > $1', [currentDate]);
        // return allBookings;
    } catch (error) {
        return error;
    }
};
    
const getBookingById = async (bookingId) => {
    try {
        const singleBooking = await db.one('SELECT * FROM booking WHERE booking_id = $1', [bookingId]);
        return singleBooking;
    } catch (error) {
        return error;
    }
};
   
const createABookingForAMeetingRoom = async (roomId, booking) => {
    try {
        const isBookingDataValidated = validateBookingData(booking);
        if (!isBookingDataValidated) {
            throw new Error("Invalid booking data. Please check the provided data.");
        }

        // Check for conflicting bookings
        const conflictingBooking = await db.oneOrNone(
            "SELECT * FROM booking WHERE room_id = $1 AND (start_date, end_date) OVERLAPS ($2, $3)",
            [roomId, booking.start_date, booking.end_date]
        );

        if (conflictingBooking) {
            throw new Error("The room is not available during the specified time.");
        }

        const newBooking = await db.one(
            "INSERT INTO booking(room_id, meeting_name, start_date, end_date) VALUES($1, $2, $3, $4) RETURNING *",
            [roomId, booking.meeting_name, booking.start_date, booking.end_date]
        );

        return newBooking;
    } catch (error) {
        return error;
    }
};


const deleteABookingById = async (bookingId) => {
    try {
        const canceledBooking = await db.one(
        "DELETE FROM booking WHERE booking_id = $1 RETURNING *",
        [bookingId]
        );
        return canceledBooking;
    } catch (error) {
        return error;
    }
};
            
module.exports = {
    getAllBookingsByRoomId,
    getAllBookings,
    getBookingById,
    createABookingForAMeetingRoom,
    deleteABookingById 
};             