CREATE DATABASE getpartydb;
USE getpartydb;

-- Create Users_Details table
CREATE TABLE Users_Details (
    user_id VARCHAR(255),		  -- Unique identifier for the user with auto-increment
    is_producer BOOLEAN NOT NULL,            -- Indicates if the user is a producer (true/false)
    full_name VARCHAR(255) NOT NULL,         -- Full name of the user
    birth_date DATE NOT NULL,                -- Birth date of the user
    phone_number VARCHAR(15) NOT NULL,       -- Phone number of the user
    address TEXT,                            -- Address of the user
    email VARCHAR(255) NOT NULL UNIQUE,      -- Email address of the user, must be unique
    photo LONGBLOB,                          -- Photo of the user (Binary Large Object)
    favorite_music_types TEXT,               -- Favorite music types, can be a comma-separated list
    favorite_locations TEXT                  -- Favorite locations, can be a comma-separated list
) ENGINE=InnoDB;

-- Create Events_Details table
CREATE TABLE Events_Details (
    event_id INT AUTO_INCREMENT PRIMARY KEY,     -- Unique identifier for the event with auto-increment
    user_id INT NOT NULL,                        -- ID of the user (foreign key to Users_Details)
    production_name VARCHAR(255) NOT NULL,       -- Name of the production
    event_name VARCHAR(255) NOT NULL,            -- Name of the event
    address TEXT NOT NULL,                       -- Address of the event
    location VARCHAR(255) NOT NULL,              -- Location of the event
    start_time DATETIME NOT NULL,                -- Start time of the event
    end_time DATETIME NOT NULL,                  -- End time of the event
    short_description VARCHAR(255),              -- Short description of the event
    long_description TEXT,                       -- Long description of the event
    min_price DECIMAL(10, 2),                    -- Minimum price of the event
    max_price DECIMAL(10, 2),                    -- Maximum price of the event
    min_age INT,                                 -- Minimum age for the event
    music_type VARCHAR(255),                     -- Type of music for the event
    place_type VARCHAR(255),                     -- Type of place for the event
    photos LONGBLOB,                             -- Photos of the event (Binary Large Object)
    FOREIGN KEY (user_id) REFERENCES Users_Details(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create Production_Details table
CREATE TABLE Production_Details (
    production_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for the production with auto-increment
    user_id INT NOT NULL,                          -- ID of the user (foreign key to Users_Details)
    number_of_followers INT,                       -- Number of followers for the production
    number_of_people_rated INT,                    -- Number of people who rated the production
    production_rank DECIMAL(3, 2),                 -- Rank of the production (e.g., 4.5)
    FOREIGN KEY (user_id) REFERENCES Users_Details(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create Users_Preferences table
CREATE TABLE Users_Preferences (
    preference_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for the preference with auto-increment
    user_id INT NOT NULL,                          -- ID of the user (foreign key to Users_Details)
    favorite_music_types TEXT,                     -- Favorite music types, can be a comma-separated list
    favorite_locations TEXT,                       -- Favorite locations, can be a comma-separated list
    favorite_events TEXT,                          -- Favorite events, can be a comma-separated list
    followed_productions TEXT,                     -- Followed productions, can be a comma-separated list
    productions_rated TEXT,                        -- Productions rated by the user, can be a comma-separated list
    FOREIGN KEY (user_id) REFERENCES Users_Details(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create Live_Mode table
CREATE TABLE Live_Mode (
    live_mode_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for the live mode with auto-increment
    event_id INT NOT NULL,                        -- ID of the event (foreign key to Events_Details)
    user_id INT NOT NULL,                         -- ID of the user (foreign key to Users_Details)
    full_name VARCHAR(255) NOT NULL,              -- Full name of the user
    avatar LONGBLOB,                              -- Avatar of the user (Binary Large Object)
    content TEXT,                                 -- Content posted by the user
    photo LONGBLOB,                               -- Photo posted by the user (Binary Large Object)
    votes INT,                                    -- Number of votes received
    post_time DATETIME NOT NULL,                  -- Time the content was posted
    FOREIGN KEY (event_id) REFERENCES Events_Details(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users_Details(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;
