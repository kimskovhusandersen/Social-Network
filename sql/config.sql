-- start the server:
-- 'sudo service postgresql start'

-- To config the database:
-- 'psql -d socialnetwork -f sql/config.sql'

-- To select database:
-- \c testdb


-- DELETE TABLES, IF EXIST
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS participants;


-- CREATE TABLE
CREATE TABLE profiles(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
    hashed_password VARCHAR(255) NOT NULL CHECK (hashed_password != ''),
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    birthday_day INT,
    birthday_month INT,
    birthday_year INT,
    gender VARCHAR (10),
    current_city VARCHAR (255),
    hometown VARCHAR (255),
    relationship_status VARCHAR(50),
    interested_in VARCHAR(20),
    about_me TEXT,
    favorite_quotes TEXT,
    created_at TIMESTAMP DEFAULT now()
 );

 CREATE TABLE photos(
     id SERIAL PRIMARY KEY,
     caption VARCHAR(255),
     url VARCHAR(300) NOT NULL CHECK (url != ''),
     album VARCHAR(255) NOT NULL CHECK (album != ''),
     profile_id INT NOT NULL REFERENCES profiles(id),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE friends (
     id SERIAL PRIMARY KEY,
     sender_id INT NOT NULL REFERENCES profiles(id),
     receiver_id INT NOT NULL REFERENCES profiles(id),
     accepted BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE threads(
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     owner_id INT NOT NULL UNIQUE REFERENCES profiles(id),
     is_still_participant BOOLEAN,
     thread_type VARCHAR(255) NOT NULL,
     thread_path VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT now()
 );

 CREATE TABLE messages(
     id SERIAL PRIMARY KEY,
     content VARCHAR(255) NOT NULL,
     sender_id INT NOT NULL REFERENCES profiles(id),
     thread_id INT NOT NULL REFERENCES threads(id),
     created_at TIMESTAMP DEFAULT now()
  );

 CREATE TABLE participants(
     id SERIAL PRIMARY KEY,
     thread_id INT NOT NULL REFERENCES threads(id),
     profile_id INT NOT NULL REFERENCES profiles(id),
     title VARCHAR(255) NOT NULL,
     is_still_participant BOOLEAN,
     thread_type VARCHAR(255) NOT NULL,
     thread_path VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT now()
 )
