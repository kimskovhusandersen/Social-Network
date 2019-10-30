-- start the server:
-- 'sudo service postgresql start'

-- To config the database:
-- 'psql -d socialnetwork -f sql/config.sql'

-- To select database:
-- \c testdb


-- DELETE TABLE
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS photos;


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



-- POPULATE DATABASES

INSERT INTO profiles (first_name, last_name, email, hashed_password, birthday_day, birthday_month, birthday_year, gender)
VALUES ('John', 'Due', 'johndue@gmail.com', 'bruh', 1, 05, 1998, 'male');
INSERT INTO profiles (first_name, last_name, email, hashed_password, birthday_day, birthday_month, birthday_year, gender)
VALUES ('Tommy', 'Toe', 'tommytoe@gmail.com', 'holymoly', 22, 12, 2001, 'male');
INSERT INTO profiles (first_name, last_name, email, hashed_password, birthday_day, birthday_month, birthday_year, gender)
VALUES ('Sammy', 'Soe', 'sammysoe@hotmail.com', 'asldkjölkjasdf', 18, 04, 1988, 'female');


INSERT INTO photos (caption, url, album, profile_id) VALUES (
    'This photo brings back so many great memories.',
    'https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    'profile_photos',
    1
);

INSERT INTO photos (caption, url, album, profile_id) VALUES (
    'This photo brings back so many great memories.',
    'https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    'profile_photos',
    2
);

INSERT INTO photos (caption, url, album, profile_id) VALUES (
    'This photo brings back so many great memories.',
    'https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    'profile_photos',
    3
);


SELECT * FROM profiles;
SELECT * FROM photos;
