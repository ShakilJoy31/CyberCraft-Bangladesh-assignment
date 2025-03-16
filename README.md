
# Cybercraft Bangladesh - Contact Management System

## Live Demo

- **Client:** [https://cybercraft-bangladesh-assignment-1.onrender.com](https://cybercraft-bangladesh-assignment-1.onrender.com)
- **Server:** [https://cybercraft-bangladesh-assignment-server-1.onrender.com/](https://cybercraft-bangladesh-assignment-server-1.onrender.com/)

## GitHub Repositories

- **Client:** [https://github.com/ShakilJoy31/CyberCraft-Bangladesh-assignment](https://github.com/ShakilJoy31/CyberCraft-Bangladesh-assignment)
- **Server:** [https://github.com/ShakilJoy31/CyberCraft-Bangladesh-assignment-server](https://github.com/ShakilJoy31/CyberCraft-Bangladesh-assignment-server)

## Features

### User Features
- **Contact Form Submission:**
  - Users can submit their contact information (Name, Email, Message).
  - Form submission is triggered by clicking the "Enter" button.

### Admin Features
- **Admin Dashboard:**
  - Accessible only after login.
  - Displays user-submitted contact information in a table format.
- **Data Management:**
  - **Download Data:** Admins can download individual or multiple contact entries.
  - **Delete Data:** Admins can delete single or multiple contact entries.
- **Pagination:**
  - Contact data is fetched and displayed using pagination.
- **Search Functionality:**
  - Admins can search contact entries by name.
- **Logout Confirmation:**
  - A modal confirms logout action, redirecting to a thank you page after logout.

## Technologies Used

### Frontend
- **Framework:** Next.js with TypeScript
- **Styling:** Tailwind CSS
- **Component Library:** ShadCN

### Backend
- **Framework:** Node.js, Express.js with TypeScript
- **Database:** Mongoose (MongoDB)

### Deployment
- **Platform:** Render


### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas or local MongoDB instance

### Installation

1. **Clone the Repositories:**
   ```bash
   git clone https://github.com/ShakilJoy31/CyberCraft-Bangladesh-assignment.git
   git clone https://github.com/ShakilJoy31/CyberCraft-Bangladesh-assignment-server.git
   ```

2. **Install Dependencies:**
   - Navigate to the client and server directories and run:
     ```bash
     npm install
     ```
     or
     ```bash
     yarn install
     ```

3. **Environment Variables:**
   - Create a `.env` file in both client and server directories.
   - Add necessary environment variables (e.g., MongoDB URI, JWT Secret).

4. **Run the Application:**
   - Start the server:
     ```bash
     npm run dev
     ```
   - Start the client:
     ```bash
     npm run dev
     ```

5. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000` for the client.
   - The server will be running on `http://localhost:5000`.

