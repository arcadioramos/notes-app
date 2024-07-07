@echo off

REM Create schema and table 
echo Creating schema and table...
mysql -u root -proot -e "CREATE SCHEMA IF NOT EXISTS notes; USE notes; CREATE TABLE IF NOT EXISTS notes ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(45) NOT NULL, content VARCHAR(255), archived BOOLEAN DEFAULT FALSE, categories JSON ); INSERT INTO notes (title, content, archived, categories) VALUES ('Note 1', 'Content 1', FALSE, '[\"PERSONAL\"]'), ('Note 2', 'Content 2', TRUE, '[\"PERSONAL\"]');"

REM Install dependencias and start app
echo Installing dependencies...
npm install && npm run dev


pause
