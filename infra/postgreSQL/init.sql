-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL,
    deletedAt TIMESTAMP WITH TIME ZONE
);

-- Create students table with RA as the primary key
CREATE TABLE IF NOT EXISTS students (
    ra VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    deletedAt TIMESTAMP WITH TIME ZONE
);


-- Insert mock data into users table
INSERT INTO users (username, password, user_type) VALUES
('ademir', '$2a$12$xwvSn7PLtd2gHMEAY6pY8ecqnNlu6Rkhlmud0Nj/AgZQmY73fSc2m', 'administrator'),
('estudancio', '$2a$12$79StfjvsarE.LvMB0sTQLO9UYPQOngIqNB/VX.W6lgMZXcSkBaxc2', 'student');

-- Insert mock data into students table
INSERT INTO students (name, email, ra, cpf) VALUES
('John Doe', 'john@example.com', '123456', '123.456.789-00'),
('Jane Smith', 'jane@example.com', '789012', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '654321', '654.321.987-00'),
('Emily Brown', 'emily@example.com', '987654', '987.654.123-00');
