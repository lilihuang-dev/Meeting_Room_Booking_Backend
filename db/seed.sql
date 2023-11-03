\c meeting_room_booking;

INSERT INTO meeting_room (room_name, floor, capacity) VALUES
('Meeting Room 1', 1, 10),
('Meeting Room 2', 2, 15),
('Conference Room A', 3, 30),
('Board Room', 4, 20),
('Small Meeting Room', 1, 5);

INSERT INTO booking (room_id, meeting_name, start_date, end_date) VALUES
(1, 'Daily Standup', '2023-11-29 09:00:00', '2023-11-29 10:00:00'),
(2, 'Budget Planning Session',  '2024-10-29 10:30:00', '2024-10-29 11:30:00'),
(3,'Training and Development Seminar', '2023-10-29 13:00:00', '2023-10-29 14:30:00'),
(4, 'Marketing Brainstorm', '2023-10-29 15:00:00', '2023-10-29 16:00:00'),
(5, 'Project Kickoff Meeting', '2024-03-29 09:30:00', '2024-03-29 10:30:00'),
(1, 'Product Demo', '2024-05-15 14:00:00', '2024-05-15 15:00:00'),
(1, 'Team Meeting', '2024-05-20 10:00:00', '2024-05-20 11:00:00'),
(1, 'Client Presentation', '2024-06-01 14:30:00', '2024-06-01 15:30:00'),
(2, 'Planning Workshop', '2024-04-10 09:00:00', '2024-04-10 10:30:00'),
(2, 'Monthly Review', '2024-05-05 15:00:00', '2024-05-05 16:00:00'),
(2, 'Team Training', '2024-06-15 11:30:00', '2024-06-15 13:00:00');

INSERT INTO attendee (booking_id, name, email) VALUES
(1, 'John Doe', 'john@example.com'),
(2, 'Jane Smith', 'jane@example.com'),
(3, 'Bob Johnson', 'bob@example.com'),
(4, 'Alice Brown', 'alice@example.com'),
(5, 'Ella Davis', 'ella@example.com');

