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
        const allBookings = await db.any('SELECT * FROM booking WHERE "start_date" > $1', [currentDate]);
        return allBookings;
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
    // XXXXXX ?
const createABookingForAMeetingRoom = async (roomId, booking) => {

    try {
    const isBookingDataValidated = validateBookingData(booking);
    const isRoomUnAvailable = await db.oneOrNone(
        "SELECT * FROM booking WHERE room_id = $1 AND (($3 < end_date AND start_date < $3) OR ($2 < end_date AND start_date < $2)) ",
        [roomId, booking.end_date, booking.start_date]
        );
    if (!isBookingDataValidated) {
        return new Error("Invalid booking data. Please check the provided data.");
    }

    if (isRoomUnAvailable) {
        return new Error("The room is not available during the specified time.");
    }

// If room is available, proceed to create the booking
if (isRoomUnAvailable) {
    throw new Error("The room is not available during the specified time.");
  }

  // Start a transaction
  return await db.tx(async (t) => {
    // Insert the booking record and retrieve the booking_id
    const newBooking = await t.one(
      "INSERT INTO booking(room_id, meeting_name, start_date, end_date) VALUES($1, $2, $3, $4) RETURNING booking_id",
      [roomId, booking.meeting_name, booking.start_date, booking.end_date]
    );
    const bookingId = newBooking.booking_id;

    // Insert each attendee record associated with the booking
    if (attendees) {
      await t.oneOrNone(
        "INSERT INTO attendee(booking_id, email) VALUES($1, $2)",
        [bookingId, attendees]
      );
    }

    // Commit the transaction
    return bookingId;
  });
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