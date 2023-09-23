-- Drop tables if they exist
DROP TABLE IF EXISTS orders, cart, products, users CASCADE;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  description TEXT
);

-- Create cart table
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(id) ON DELETE CASCADE,
  productId INT REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL
);

-- Create orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(id) ON DELETE CASCADE,
  products JSON NOT NULL
);

-- run the schema.sql file with the following command:
-- psql -U voss -d voss -a -f schema.sql