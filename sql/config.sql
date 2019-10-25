-- start the server:
-- "sudo service postgresql start"

-- To config the database:
-- "psql -d socialnetwork -f sql/config.sql"

-- To select database:
-- \c testdb


-- DELETE TABLE
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS user_profile_image;


-- CREATE TABLE
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL CHECK (firstname != ''),
    lastname VARCHAR(255) NOT NULL CHECK (lastname != ''),
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
    hashed_password VARCHAR(255) NOT NULL CHECK (hashed_password != ''),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE user_profiles(
    id SERIAL PRIMARY KEY,
    birthday_day INT NOT NULL,
    birthday_month INT NOT NULL,
    birthday_year INT NOT NULL,
    sex INT NOT NULL,
    user_id INT UNIQUE NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now()
 );

 CREATE TABLE images(
     id SERIAL PRIMARY KEY,
     caption TEXT,
     image_url VARCHAR(300) NOT NULL CHECK (image_url != ''),
     user_id INT NOT NULL REFERENCES users(id),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE user_profile_image (
   user_id INT UNIQUE NOT NULL,
   image_id INT NOT NULL,
   PRIMARY KEY (user_id,image_id)
 );


-- POPULATE DATABASES

INSERT INTO users (firstname, lastname, email, hashed_password) VALUES ('John', 'Due', 'johndue@gmail.com', 'bruh');
INSERT INTO users (firstname, lastname, email, hashed_password) VALUES ('Tommy', 'Toe', 'tommytoe@gmail.com', 'holymoly');
INSERT INTO users (firstname, lastname, email, hashed_password) VALUES ('Sammy', 'Soe', 'sammysoe@hotmail.com', 'asldkjölkjasdf');


INSERT INTO user_profiles (birthday_day, birthday_month, birthday_year, sex, user_id) VALUES (18, 04, 1988, 1, 1);
INSERT INTO user_profiles (birthday_day, birthday_month, birthday_year, sex, user_id) VALUES (22, 12, 2001, 1, 2);
INSERT INTO user_profiles (birthday_day, birthday_month, birthday_year, sex, user_id) VALUES (1, 05, 1998, 2, 3);

INSERT INTO images (caption, image_url, user_id) VALUES (
    'This photo brings back so many great memories.',
    'https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    1
);

INSERT INTO images (caption, image_url, user_id) VALUES (
    'This photo brings back so many great memories.',
    'https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    2
);

INSERT INTO images (caption, image_url, user_id) VALUES (
    'This photo brings back so many great memories.',
    'https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    3
);

INSERT INTO user_profile_image (user_id, image_id) VALUES (1,1);
INSERT INTO user_profile_image (user_id, image_id) VALUES (2,2);
INSERT INTO user_profile_image (user_id, image_id) VALUES (3,3);

SELECT * FROM users;
SELECT * FROM user_profiles;
SELECT * FROM images;
SELECT * FROM user_profile_image;
