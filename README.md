## Fetch Frontend Take-Home Exercise

This project is a web application that allows users to search for shelter dogs and find a match based on their preferences.

## Repository

GitHub Repository: https://github.com/rich-sagar-singh/front-end-assessment.git

## Features

- User authentication with login and logout functionality
- Search for dogs based on filters such as breed, age, and location (ZIP code, city, state, geolocation)
- Sorting and pagination for search results
- Ability to favorite dogs and generate a match
- Optimized API calls with loading states
- Responsive UI using Tailwind CSS

## Tech Stack

- Next.js 15 (React 19)
- Zustand (State Management)
- Axios (API Requests)
- Tailwind CSS (Styling)
- React-Toastify (Notifications)
- Lodash (Debouncing API requests)
- TypeScript (Static Typing)

## Setup & Installation

Follow these steps to run the project locally.

1. Clone the Repository
   Git clone the repository and navigate into the project directory:

- git clone https://github.com/rich-sagar-singh/front-end-assessment.git

- cd front-end-assessment

2. Install Dependencies

   Run the following command to install the required dependencies:

- npm install

3. Configure Environment Variables
   Next.js environment variables are managed in next.config.js. Ensure the following configuration exists:

---

import type { NextConfig } from "next";

const nextConfig: NextConfig = {  
 env: {  
 API_BASE_URL: "https://frontend-take-home-service.fetch.com",  
 },  
};

export default nextConfig;

---

This ensures the application correctly communicates with the Fetch API.

4. Start the Development Server
   Run the following command to start the development server:

- npm run dev

The application will be available at http://localhost:3000.

## Available Scripts

- npm run dev - Starts the development server
- npm run build - Builds the application for production
- npm run start - Runs the production build
- npm run lint - Lints the code using ESLint
