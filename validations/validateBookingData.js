function validateBookingData(booking) {
    if (
        !booking.room_id ||
        !booking.start_date ||
        !booking.end_date ||
        !booking.meeting_name ||
        booking.start_date >= booking.end_date
    ) {
        return false;
    }
    return true;
}

module.exports = { validateBookingData };