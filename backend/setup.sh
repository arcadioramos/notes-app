#!/bin/bash

# Create schema and table in MySQL
echo "Creating schema and table in MySQL..."
mysql -u root -proot -e "CREATE SCHEMA IF NOT EXISTS notes; \
USE notes; \
CREATE TABLE IF NOT EXISTS notes ( \
    id INT AUTO_INCREMENT PRIMARY KEY, \
    title VARCHAR(45) NOT NULL, \
    content VARCHAR(255), \
    archived BOOLEAN DEFAULT FALSE, \
    categories JSON \
); \
INSERT INTO notes (title, content, archived, categories) VALUES \
('Note 1', 'Content 1', FALSE, '[\"PERSONAL\"]'), \
('Note 2', 'Content 2', TRUE, '[\"PERSONAL\"]');"

# Install application dependencies and run the application
echo "Installing application dependencies and running the application..."
npm install && npm run dev

read -p "Press Enter to continue..."

