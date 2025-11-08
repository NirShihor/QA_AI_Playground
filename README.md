# QA AI Playground

A testing ground website for QA AI software, built with React and Node.js with Express.

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

## Installation

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
yarn install
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
yarn install
```

## Running the Application

### Backend Server

From the `server` directory:
```bash
yarn dev
```

The backend server will run on **port 3085**.

### Frontend Application

From the `client` directory:
```bash
yarn dev
```

The frontend application will run on **port 4085**.

Access the application at: `http://localhost:4085`

## Features

- **Page 1**: Form with fields for First Name, Last Name, Address, City, County, Country, Phone Number, and Email. Submit button closes popup and clears fields.

- **Page 2**: Drag and drop interface with two frames. Three colored blocks can be dragged between frames.

- **Page 3**: Shop with 10 products, shopping cart, and checkout functionality.

## Allowed Delivery Areas

Delivery is only available to the following UK cities (based on postcode outward code):

1. **London** - SW, SE, NW, N, E, W, EC, WC
2. **Manchester** - M
3. **Birmingham** - B
4. **Liverpool** - L
5. **Leeds** - LS
6. **Glasgow** - G
7. **Edinburgh** - EH
8. **Bristol** - BS
9. **Sheffield** - S
10. **Newcastle** - NE

The checkout page validates the first part of the UK postcode (outward code) against these areas.

## Project Structure

```
qa_ai_playground/
├── server/          # Backend Express server
│   └── server.ts    # Main server file
├── client/          # Frontend React application
│   └── src/
│       ├── pages/   # Page components
│       └── components/  # Reusable components
└── README.md
```

## MongoDB 
