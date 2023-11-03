const db = require("../db/dbConfig");

// Get all attendees
const getAllAttendees = async () => {
  try {
    const allAttendees = await db.any('SELECT * FROM attendee');
    return allAttendees;
  } catch (error) {
    return error;
  }
};

// Get one attendee by attendee_id
const getOneAttendee = async (attendeeId) => {
  try {
    const attendee = await db.one('SELECT * FROM attendee WHERE attendee_id = $1', attendeeId);
    return attendee;
  } catch (error) {
    return error;
  }
};

// get one or get all ==> now get one
const getAttendeeByBookingId = async (bookingId) => {
  try {
    const attendee = await db.one('SELECT booking.meeting_name, attendee.name, attendee.email FROM booking JOIN attendee ON booking.booking_id = attendee.booking_id WHERE booking.booking_id = $1', 
      [bookingId]);
    return attendee;
  } catch (error) {
    return error;
  }
};


// Create a new attendee
const createAttendee = async (attendee) => {
  try {
    const newAttendee = await db.one(
      'INSERT INTO attendee(booking_id, name, email) VALUES($1, $2, $3) RETURNING *',
      [attendee.booking_id, attendee.name, attendee.email]
    );
    return newAttendee;
  } catch (error) {
    return error;
  }
};

// Delete an attendee by attendee_id
// const deleteAttendee = async (attendeeId) => {
//   try {
//     const deletedAttendee = await db.one('DELETE FROM attendee WHERE attendee_id = $1 RETURNING *', attendeeId);
//     return deletedAttendee;
//   } catch (error) {
//     return error;
//   }
// };

// Edit an attendee by attendee_id
// const editAttendee = async (attendeeId, updatedAttendee) => {
//   try {
//     const editedAttendee = await db.one(
//       'UPDATE attendee SET name = $1, email = $2 WHERE attendee_id = $3 RETURNING *',
//       [updatedAttendee.name, updatedAttendee.email, attendeeId]
//     );
//     return editedAttendee;
//   } catch (error) {
//     return error;
//   }
// };

module.exports = {
  getAllAttendees,
  getOneAttendee,
  getAttendeeByBookingId,
  createAttendee,
//   deleteAttendee,
//   editAttendee,
};
