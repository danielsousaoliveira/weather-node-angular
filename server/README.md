# Weather Data Server

This is the backend server for the weather data application. It provides the API for managing user authentication and weather data measurements. It uses Node.js and MongoDB.

## Installation

1. Clone the repository:

    ```
    git clone <repository-url>
    cd server
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Create a `.env` file:

    ```
    touch .env
    ```

    Add the following variables:

    ```
    MONGODB_URI=mongodb://localhost:27017/your_db
    JWT_SECRET=your_secret_key
    PORT=5000
    ENCRYPTION_SECRET_KEY=your_key

    ```

4. Start the server:

    ```
    npm run dev
    ```

5. Server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

-   **POST** `api/auth/register`: Register a new user.
-   **POST** `api/auth/login`: Login with username and password.

### Weather Data

-   **GET** `api/weather/data`: Retrieve weather data.
-   **POST** `api/weather/measurement`: Send a new measurement.
