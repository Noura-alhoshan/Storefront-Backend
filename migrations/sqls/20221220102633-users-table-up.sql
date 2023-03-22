CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);