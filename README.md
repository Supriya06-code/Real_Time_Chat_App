# TalkCircle App

## Overview  
TalkCircle is a real-time chat application designed for seamless communication. It focuses on user engagement, performance optimization, and provides a modern interface with robust features.

---

## Features  
- **Authentication:** Secure user login/logout using JWT.  
- **Real-Time Messaging:** Instant communication via Socket.io.  
- **Online User Status:** See who’s online in real-time.  
- **Search Functionality:** Quickly locate users or messages.  
- **Notifications:** Real-time alerts for new messages.  
- **Error Handling:** Comprehensive error handling for both client and server.  
- **Global State Management:** Efficient state handling with Zustand.  

---

## Technologies Used  
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express, Socket.io, JWT  
- **Database:** MongoDB  
- **State Management:** Zustand  

---

## Setup and Installation  

### Prerequisites  
Before starting, make sure you have the following installed:  
- **Node.js**  
- **MongoDB**  

### Installation Steps  

1. **Clone the repository and install dependencies**  
   First, clone the repository to your local machine and install the necessary dependencies:
   ```bash
   git clone https://github.com/your-username/talkcircle.git
   cd talkcircle
   npm install  
   cd client  
   npm install  
   cd ..

### Configure Environment Variables

1. **Create a `.env` file**  
   In the root directory of your project, create a `.env` file and add the following environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SOCKET_PORT=your_socket_io_port

- ## API Endpoints  

- **POST** `/api/auth/login`: Log in a user.  
- **POST** `/api/auth/signup`: Register a new user.  
- **GET** `/api/messages`: Fetch messages for a user.  
- **GET** `/api/notifications`: Get real-time notifications.  
---
  ### Usage

1. **Register or log in to your account**  
   - Create a new account or log in with your existing credentials.

2. **View online users and start chatting**  
   - Once logged in, you can view which users are online and start chatting with them in real-time.

3. **Receive notifications for new messages in real-time**  
   - You will receive notifications for any new incoming messages from users you are chatting with.



