DROP DATABASE IF EXISTS users CASCADE;
CREATE USER IF NOT EXISTS leader;
CREATE DATABASE IF NOT EXISTS users;
GRANT ALL ON DATABASE users TO leader;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name STRING NOT NULL,
  age INT NOT NULL,
  profession STRING NOT NULL,
  friendly BOOLEAN NOT NULL
);

INSERT INTO users (name, age, profession, friendly) VALUES
  ('kevin', 35, 'waiter', true),
  ('angela', 21, 'concierge', true),
  ('alex', 26, 'zoo keeper', false),
  ('becky', 67, 'retired', false),
  ('kevin', 15, 'in school', true),
  ('frankie', 45, 'teller', true);