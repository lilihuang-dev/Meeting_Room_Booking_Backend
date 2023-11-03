const express = require('express');
const attendees = express.Router();

const {
  getAllAttendees,
  getOneAttendee,
  createAttendee,
//   deleteAttendee,
//   editAttendee,
} = require('../queries/attendees');

// Define the GET endpoint to get all attendees ✔
attendees.get('/', async (req, res) => {
  try {
    const allAttendees = await getAllAttendees();
    res.json({ success: true, result: allAttendees });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// Define the GET endpoint to get one attendee by attendee_id ✔
attendees.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const attendee = await getOneAttendee(id);
    if (attendee.attendee_id) {
      res.status(404).json({ success: false, error: 'Attendee not found.' });
    } else {
      res.json({ success: true, result: attendee });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// Define the POST endpoint to create a new attendee
attendees.post('/', async (req, res) => {
  const newAttendee = req.body;
  try {
    const createdAttendee = await createAttendee(newAttendee);
    if (createdAttendee.attendee_id) {
      res.status(400).json({ success: false, error: 'Unable to create a new attendee.' });
    } else {
      res.status(201).json({ success: true, result: createdAttendee });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// Define the DELETE endpoint to delete an attendee by attendee_id
// attendees.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedAttendee = await deleteAttendee(id);
//     if (deletedAttendee.attendee_id) {
//       res.status(400).json({ success: false, error: 'Unable to delete the attendee.' });
//     } else {
//       res.json({ success: true, result: deletedAttendee });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Server error.' });
//   }
// });

// Define the PUT endpoint to edit an attendee by attendee_id
// attendees.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const updatedAttendee = req.body;
//   try {
//     const editedAttendee = await editAttendee(id, updatedAttendee);
//     if (editedAttendee.attendee_id) {
//       res.status(400).json({ success: false, error: 'Unable to edit the attendee.' });
//     } else {
//       res.json({ success: true, result: editedAttendee });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Server error.' });
//   }
// });

module.exports = attendees;
