Node.js and npm Versions
Node.js version: 18.17.0
npm version: 10.8.1

# Backend App Setup Guide

To set up the backend app locally, ensure you have MySQL installed. I've used MySQL version 9.0 for Windows.

## MySQL Setup

1. **Install MySQL:** Make sure MySQL is installed on your system. You can download it from [MySQL Downloads](https://dev.mysql.com/downloads/).

2. **MySQL Workbench (Optional):** I recommend installing MySQL Workbench to easily view local database information. It's available for download from [MySQL Workbench](https://www.mysql.com/products/workbench/).

## Setting Up the Backend

### Windows
If you're on Windows:

1. Open Command Prompt or PowerShell.
2. Navigate to your backend directory.

Run the following command:

```bash
setup.bat


This will create the necessary database schema and tables in MySQL, and insert initial data into them.

Linux or macOS
If you're on Linux or macOS:

Open Terminal.
Navigate to your backend directory.
Run the following command:
./setup.sh

This will create the necessary database schema and tables in MySQL, and insert initial data into them.

Running the Backend
After setting up the database, you can start the backend:
npm install    # Install dependencies
npm run dev    # Run the backend application

Testing the Backend
You can test the backend using tools like Postman. Here's an example API call:
GET http://localhost:3010/api/notes
If the MySQL setup was successful, you should receive data from this API call.