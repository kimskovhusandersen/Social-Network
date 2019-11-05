
-- To config the database:
-- 'psql -d socialnetwork -f sql/chat.sql'


-- DELETE TABLE
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS messages;


-- CREATE TABLES
CREATE TABLE threads(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    profile_id INT NOT NULL UNIQUE REFERENCES profiles(id),
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



-- Kim: 243
-- Katharina: 259

-- I create a new thread
INSERT INTO threads (title, profile_id, is_still_participant, thread_type, thread_path) VALUES ('Title of the thread', 243, 'true', 'Regular', 'messages/259')
-- I'm sending Katharina an invitation to the thread
INSERT INTO participants (threads_id, profiles_id) VALUES (1, 259, 'Kim', 'null', 'Regular', 'messages/243')
-- I'm posting a message in the thread
INSERT INTO messages (content, sender_id, thread_id) VALUES ('Hi Katharina!', 243, 1);
-- Katharina accepts my invitation to the thread
UPDATE threads SET is_still_participant = 'true' WHERE threads.id = 1;
-- Katharina posts a message in the thread
INSERT INTO messages (content, sender_id, thread_id) VALUES ('Hi Kim! Hvad saa brormand', 259, 1);
-- etc, etc.
INSERT INTO messages (content, sender_id, thread_id) VALUES ('Hvad oensker du dig i julegave?', 243, 1);
INSERT INTO messages (content, sender_id, thread_id) VALUES ('Det ved jeg ikke endnu, men jeg sender dig lige en oenskeliste, naar jeg ved besked', 259, 1);
INSERT INTO messages (content, sender_id, thread_id) VALUES ('Tak, det lyder godt! Ses snart! :)', 243, 1);
