# Meeting-rooms-booking App Deployment

## Deployed Backend

- **[Deployed Backend](https://meeingroombookingbackend.adaptable.app/)**: This is the link to the deployed backend of the Meeting-rooms-booking App.

## Deployed Frontend

- **[Deployed Frontend](https://meeting-rooms-booking.netlify.app/)**: This is the link to the deployed frontend of the Meeting-rooms-booking App.


---

## Local Development Setup

If you want to run the project locally, follow these steps:

1. **Backend Setup:**

   - Clone the Backend Repository:
     ```
     git clone git@github.com:lilihuang-dev/Meeting_Room_Booking_Backend.git
     ```

   - Navigate to the Backend Directory:
     ```
     cd backend
     ```

   - Install Backend Dependencies:
     ```
     npm install
     npm install pg-promise dotenv express
     ```

   - Run these commands to create the database, tables, and insert data:
     ```
     npm run db_init
     npm run db_seed
     ```

   - Create a `.env` file with the following content:
     ```
     PORT=8888
     PG_HOST=localhost
     PG_PORT=5432
     PG_DATABASE=meeting_room_booking
     PG_USER=postgres
     ```

   - Running the Backend:
     ```
     npm start
     ```
     or
     ```
     npm run dev
     ```

2. **Frontend Setup:**

   - Clone the Frontend Repository:
     ```
     git clone git@github.com:lilihuang-dev/Meeting_Room_Booking_Frontend.git
     ```

   - Navigate to the Frontend Directory:
     ```
     cd room_booking_frontend
     ```

   - Create a `.env` file with the following content:
     ```
     REACT_APP_API_URL=http://localhost:8888
     ```

   - Install Frontend Dependencies:
     ```
     npm install
     ```

   - Start the React App:
     ```
     npm start
     ```

This will set up both the backend and frontend for local development.



























