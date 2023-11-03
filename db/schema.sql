DROP DATABASE IF EXISTS meeting_room_booking;
CREATE DATABASE meeting_room_booking;

\c meeting_room_booking;

DROP TABLE IF EXISTS meeting_room;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS attendee;

CREATE TABLE meeting_room (
  room_id SERIAL PRIMARY KEY,
  room_name VARCHAR(100) NOT NULL,
  floor INTEGER CHECK (floor >= 0 AND floor <= 28),     
  capacity INTEGER CHECK (capacity >= 0 AND capacity <= 200)
);

CREATE TABLE booking (
  booking_id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES meeting_room(room_id),
  meeting_name VARCHAR(100) NOT NULL,
  start_date TIMESTAMP,
  end_date TIMESTAMP
);

CREATE TABLE attendee (
  attendee_id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES booking(booking_id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);
