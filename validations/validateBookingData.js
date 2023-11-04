function validateBookingData(booking) {
    const startDate = new Date(booking.start_date).getTime();
    const endDate = new Date(booking.end_date).getTime();

    if (
        !booking.room_id ||
        !booking.start_date ||
        !booking.end_date ||
        !booking.meeting_name ||
        startDate >= endDate
    ) {
        return false;
    }
    return true;
}

module.exports = { validateBookingData };