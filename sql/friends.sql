DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES profiles(id),
    receiver_id INT NOT NULL REFERENCES profiles(id),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
