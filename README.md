# Reddit Blog Posts App

This is a React application that fetches and displays blog posts from the Reddit API. The app includes features like loading state management, error handling, dark mode toggling, and dynamic content rendering.

## Features

### Data Fetching
- Fetches data from the Reddit API (https://www.reddit.com/r/reactjs.json).
- Displays a list of blog posts with their title, content, URL, and score.

### Loading and Error Handling
- Displays a spinner while data is being fetched.
- Shows error messages if data fetching fails.

### Dark Mode
- Allows users to toggle between light and dark modes.
- Persists the theme preference across page reloads using localStorage.

### Dynamic Content
- Displays blog posts with dynamic, random colors for the score.

## Installation

1. Clone the repository:
   bash
   git clone <repository-url>
   cd <repository-directory>
   

2. Install the dependencies:
   bash
   npm install
   

3. Start the development server:
   bash
   npm start
   

## Components

### App Component
This is the main component of the application. It handles state management, data fetching, theme toggling, and rendering.

### BlogPost Component
This component displays individual blog post details including the title, content, URL, and score. It also features dynamic character coloring for the score.

## Styles (CSS)
The application defines styles for both light and dark modes, and ensures that the app is responsive.