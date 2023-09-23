-- Clear existing data
DELETE FROM orders;
DELETE FROM cart;
DELETE FROM products;
DELETE FROM users;

-- Reset primary key sequences (Important)
-- Replace 'your_sequence_name' with the actual sequence name for your tables.
-- Typically it's in the format <tablename>_<columnname>_seq
SELECT setval('users_id_seq', 1, false);
SELECT setval('products_id_seq', 1, false);

-- Insert sample users
INSERT INTO users (username, password) VALUES
('alice', 'password123'),
('bob', 'password123');

-- Insert sample products
INSERT INTO products (name, price, description) VALUES
('Laptop', 1000, 'High performance laptop'),
('Phone', 500, 'Latest smartphone'),
('TV', 1500, '4K OLED TV');

-- Insert sample cart items
INSERT INTO cart (userId, productId, quantity) VALUES
(1, 1, 2),  -- User Alice has 2 Laptops in cart
(1, 2, 1),  -- User Alice has 1 Phone in cart
(2, 3, 1);  -- User Bob has 1 TV in cart

-- Insert sample orders
-- Now using JSON array to represent products
INSERT INTO orders (userId, products) VALUES
(1, '["Laptop", "Phone"]'),  -- User Alice ordered a Laptop and a Phone
(2, '["TV"]');  -- User Bob ordered a TV

-- run the seed.sql file with the following command:
-- psql -U your_db_username -d your_db_name -a -f path/to/seed.sql

