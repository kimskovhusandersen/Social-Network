-- start the server:
-- "sudo service postgresql start"

-- To config the database:
-- "psql -d petition -f config.sql"

-- To select database:
-- \c testdb


-- DELETE TABLE
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_profiles;

-- CREATE TABLE
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL CHECK (firstname != ''),
    lastname VARCHAR(255) NOT NULL CHECK (lastname != ''),
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
    password VARCHAR(255) NOT NULL CHECK (password != ''),
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


-- ADD RELATIONS (FOREIGN KEYS)
-- ALTER TABLE signatures ADD CONSTRAINT signatures_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
-- ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- POPULATE DATABASES

INSERT INTO users (firstname, lastname, email, password) VALUES ('John', 'Due', 'johndue@gmail.com', 'bruh');
INSERT INTO users (firstname, lastname, email, password) VALUES ('Tommy', 'Toe', 'tommytoe@gmail.com', 'holymoly');
INSERT INTO users (firstname, lastname, email, password) VALUES ('Sammy', 'Soe', 'sammysoe@hotmail.com', 'asldkjölkjasdf');
-- INSERT INTO users (first, last, email, password) VALUES ('Sophia', 'Hutton', 'kkevo.tushe.58y@iwsi.ru', 'asdfasdf');
-- INSERT INTO users (first, last, email, password) VALUES ('Krishan', 'Kirk', 'oamam.haddo@ipmaximus.ru', 'wert');
-- INSERT INTO users (first, last, email, password) VALUES ('Darlene', 'Moss', '2d.m.x.4bfci@pendokngana.tk', '234tsf');
-- INSERT INTO users (first, last, email, password) VALUES ('Rhydian', 'Haas', 'jhamzato@mhdsl.gq', 'kljjKKK');
-- INSERT INTO users (first, last, email, password) VALUES ('Luciano', 'Combs', 'vraous.d@excel-guru.ru', 'aökljakjdkK');
-- INSERT INTO users (first, last, email, password) VALUES ('Hamaad', 'Fellows', 'Hamaad@Fellows.cf', '09ioilkhkjh');
-- INSERT INTO users (first, last, email, password) VALUES ('Paul', 'Cervantes', 'Paul@Cervantes.gq', 'kljjKKK');
-- INSERT INTO users (first, last, email, password) VALUES ('Cain', 'Jennings', 'Cain.d@Jennings-guru.ru', 'aökljakjdkK');
-- INSERT INTO users (first, last, email, password) VALUES ('Enid', 'Mcintosh', 'Enid@Mcintosh.cf', '09ioilkhkjh');



INSERT INTO user_profiles (birthday_day, birthday_month, birthday_year, sex, user_id) VALUES (18, 04, 1988, 1, 1);
INSERT INTO user_profiles (birthday_day, birthday_month, birthday_year, sex, user_id) VALUES (22, 12, 2001, 1, 2);
INSERT INTO user_profiles (birthday_day, birthday_month, birthday_year, sex, user_id) VALUES (1, 05, 1998, 2, 3);

SELECT * FROM users;
SELECT * FROM user_profiles;
