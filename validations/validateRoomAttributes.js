function validateRoomAttributes(floor, capacity) {

    if ((floor < 0 || floor >= 29) || capacity < 0 || capacity > 200) {
        return false;
    }
    
    return true;
}

module.exports = {
    validateRoomAttributes
}