# Listener for DJ Web Application

This web application allows users to discover and listen to curated playlists from DJs based on their preferences. Users can select their preferences from a list, which filters out DJs that match those preferences. The application is built using HTML, CSS, JavaScript, Express.js, Node.js, and MongoDB, with EJS for templating.

## Features

- **User Preferences:** Users can choose their preferences from a list, helping the system to filter out DJs that meet those preferences.
  
- **Playlist Listening:** Users can listen to playlists curated by DJs based on their preferences.

- **Persistent DJ Playback:** The application keeps track of the currently playing DJ for each user. Even after signing out, users can resume listening to the same DJ when they sign back in.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  
- **Backend:**
  - Node.js
  - Express.js
  
- **Database:**
  - MongoDB

- **Templating:**
  - EJS (Embedded JavaScript)

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/Zxadeel/Listener-Page-for-DJ-Web-App.git
    cd Listener-Page-for-DJ-Web-App
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up MongoDB:
   
    - Create a MongoDB database and obtain the connection URL.
    - Update the connection URL in `server.js`.

4. Start the application:

    ```bash
    npm start
    ```

5. Open your web browser and visit `http://localhost:8080` to access the application.

## Configuration

- **Database Configuration:**
  - Update `server.js` with your MongoDB connection URL.

