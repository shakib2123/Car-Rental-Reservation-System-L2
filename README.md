# Car Rental Reservation System

## 🤖 Introduction

The Car Rental Reservation System is a comprehensive backend solution for
managing car rental services. It provides robust features for user
authentication, car management, and booking management with role-based access
control for administrators and regular users. This project is built using
TypeScript, Express.js, Mongoose and MongoDB etc. Ensuring a scalable and
maintainable architecture.

## 🔗 Live URL

[Car Rental Reservation System](https://car-rental-reservation-system.netlify.app/)

## ⚙️ Technology Stack

- 🔧 **Backend:**

  - [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [JWT (JSON Web Token)](https://www.npmjs.com/package/jsonwebtoken)
  - [dotenv](https://www.npmjs.com/package/dotenv)

- 🔨 **Development Tools:**

  - [VS Code](https://code.visualstudio.com/)
  - [Postman (API testing)](https://www.postman.com/)
  - [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

- 🔒 **Validation & Security:**

  - [Zod](https://zod.dev/)
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  - [cookie-parser](https://www.npmjs.com/package/cookie-parser)
  - [cors](https://www.npmjs.com/package/cors)

## 🔋 Features

- 🔐 **User Authentication & Authorization**

  - 👉 Secure registration and login using JWT.
  - 👉 Role-based access control for admin and user functionalities.

- 🚗 **Car Management (Admin Only)**

  - 👉 Add, update, and delete cars.
  - 👉 View all cars in the inventory.

- 📅 **Booking Management**
  - 👉 Users can book cars specifying date and time.
  - 👉 Admins can view all bookings and manage car returns.
  - 👉 Calculation of rental costs based on duration.

* **🔎 Error Handling**

  - 👉 Global error handling middleware.
  - 👉 Validation of inputs using Zod.

* **📦 Transaction Management**
  - 👉 Transaction management using Mongoose.
  - 👉 Rollback on error.

## 🚀 API Endpoints

### 🔐 Authentication

- 🔑 **Sign Up**

  - Endpoint: `/api/auth/signup`
  - Method: `POST`

- 🔑 **Sign In**

  - Endpoint: `/api/auth/signin`
  - Method: `POST`

### 🚗 Car Management

- **Create a Car (Only accessible to the Admin)**

  - Endpoint: `/api/cars`
  - Method: `POST`

- **Get All Cars**

  - Endpoint: `/api/cars`
  - Method: `GET`

- **Get A Car**

  - Endpoint: `/api/cars/:id`
  - Method: `GET`

- **Update A Car (Only Accessible to the Admin)**

  - Endpoint: `/api/cars/:id`
  - Method: `PUT`

- **Delete A Car (Only Accessible to the Admin)**
  - Endpoint: `/api/cars/:id`
  - Method: `DELETE` [SOFT DELETE]

### 📅 Booking Management

- **Get All Bookings (Accessible to the Admin)**

  - Endpoint: `/api/bookings`
  - Method: `GET`
  - **Query Parameters:**

    - `carId`: ID of the car for which availability needs to be checked.
    - `date`: The specific date for which availability needs to be checked
      (format: YYYY-MM-DD).

- **Book a Car (Only Accessible to the User)**
  - Endpoint: `/api/bookings`
  - Method: `POST`
- **Get User's Bookings (Only Accessible To the User)**

  - Endpoint: `/api/bookings/my-bookings`
  - Method: `GET`

- **Return The Car (Only Accessible To Admin)**
  - Endpoint: `/api/cars/return`
  - Method: `PUT`

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### 📚 Prerequisites

Make sure you have the following installed on your machine:

- 🖥️ [**Node.js**](https://nodejs.org/en) installed on your machine (v18 or
  higher recommended)
- 🍃 [**MongoDB**](https://www.mongodb.com/) installed and running on your local
  machine or accessible through a cloud service
- ✏️ A code editor like [**VSCode**](https://code.visualstudio.com/)
- ✅ [**TypeScript**](https://www.typescriptlang.org/) installed
- ✅ [**npm**](https://www.npmjs.com/) installed

### 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shakib2123/Car-Rental-Reservation-System-L2
   cd Car-Rental-Reservation-System-L2
   ```

2. **Install the project dependencies using npm:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a new file named .env in the root of your project and add the
   following content:

   ```bash
   PORT=5000
   DB_URL=your_mongodb_uri
   BCRYPT_SALT_ROUND=6
   JWT_ACCESS_SECRET=your_secret
   JWT_ACCESS_SECRET_EXPIRES_IN=1d
   ```

4. **Start the development server:**

   ```bash
   npm run start:dev
   ```

## 📝 Contact

- **Author:** Md. Shakib Al Hasan
- **Email:** [mshakibalhasan21@gmail.com](mailto:mshakibalhasan21@gmail.com)

## Closing Remarks

Thank you for taking the time to explore the Car Rental Reservation System. This
project is a testament to the potential of modern web technologies in addressing
real-world challenges. I welcome any feedback, suggestions, or contributions to
help improve this system further. Happy coding!
