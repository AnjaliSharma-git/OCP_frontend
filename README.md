*Project: Online Counseling Platform*

This project is a full-stack web application designed to provide an online counseling platform for clients and counselors. The platform facilitates user registration, login, payment processing, and session scheduling. Below are the details to set up, run, and understand the project.

**Features**

User Roles: Separate functionalities for clients and counselors.

Authentication: Login and registration using email and password.

Counselor Features:

Set availability.

View scheduled appointments.

Client Features:

Book counseling sessions.

Make payments using Stripe.

Payment Integration: Secure payment processing with Stripe Checkout.

Responsive Design: Optimized for desktop and mobile using Tailwind CSS.

Technologies Used

Frontend

React.js with React Router for Single Page Application (SPA) navigation.

Tailwind CSS for UI design.

Backend

Node.js with Express.js for API development.

Stripe for payment processing.

Database

MongoDB (via Mongoose) for data storage.

Other Tools

JWT (JSON Web Tokens) for authentication.

dotenv for environment variable management.

Installation

Prerequisites

Node.js installed (v14+ recommended).

MongoDB server running locally or a MongoDB Atlas connection string.

A Stripe account for payment processing.

Steps

1. Clone the Repository

git clone <repository-url>
cd <repository-name>

2. Install Dependencies

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

