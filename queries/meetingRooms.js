const db = require("../db/dbConfig");
const { validateRoomAttributes } = require("../validations/validateRoomAttributes.js")

// Get all meeting rooms
const getAllMeetingRooms = async () => {
    try { const allRooms = await db.any('SELECT * FROM meeting_room');
        return allRooms;
    } catch (error) {
        return error;
    }
};

// Create a meeting room
const createAMeetingRoom = async (room) => {
    const isValid = validateRoomAttributes(room.floor, room.capacity);
    if (isValid) {
        try {
            const newMeetingRoom = await db.one(
                "INSERT INTO meeting_room(room_name, floor, capacity) VALUES($1, $2, $3) RETURNING *",
                [room.room_name, room.floor, room.capacity]
                );
            return newMeetingRoom;
        } catch (error) {
            return error;
        }
    } else {
        return new Error("Invalid floor/capacity value.");
    }
};

// Retrieve a meeting room from the database by meeting room ID
const getOneMeetingRoom = async (roomId) => {
    try {
        const oneRoom = await db.one('SELECT * FROM meeting_room WHERE room_id = $1', roomId);
        return oneRoom;
    } catch (error) {
        return error;
    }
};

// Retrieve a meeting room from the database by booking ID
const getRoomByBookingId = async (bookingId) => {
    try {
      const room = await db.one(
        'SELECT meeting_room.room_id, meeting_room.room_name, meeting_room.floor, meeting_room.capacity FROM booking JOIN meeting_room ON booking.room_id = meeting_room.room_id WHERE booking.booking_id = $1',
        [bookingId]
      );
      return room;
    } catch (error) {
      return error;
    }
  };
  
  const getAvailableMeetingRooms = async (startDate, endDate, floor, capacity) => {
    try {
        const availableRooms = await db.any(
            `
            SELECT *
            FROM meeting_room r
            LEFT JOIN booking b ON r.room_id = b.room_id
            WHERE r.available = 0
            ${
                startDate && endDate ? 'AND (b.booking_id IS NULL OR NOT (b.start_date < $1 AND b.end_date > $2))' : ''
            }
            ${capacity ? 'AND r.capacity >= $3' : ''}
            ${floor ? 'AND r.floor = $4' : ''}
            `,
            [startDate, endDate, capacity, floor]
        );
        
        return availableRooms;
    } catch (error) {
        return error;
    }
};


module.exports = {
    getAllMeetingRooms,
    createAMeetingRoom,
    getOneMeetingRoom,
    getRoomByBookingId,
    getAvailableMeetingRooms
};