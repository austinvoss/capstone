-- Update foreign key constraints for cart and orders tables
-- Note: Run these lines only if you haven't set up these constraints yet
ALTER TABLE cart DROP CONSTRAINT IF EXISTS cart_userid_fkey;
ALTER TABLE cart ADD CONSTRAINT cart_userid_fkey FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_userid_fkey;
ALTER TABLE orders ADD CONSTRAINT orders_userid_fkey FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE;

-- Reset primary key sequences (Important)
-- Replace 'your_sequence_name' with the actual sequence name for your tables.
-- Typically it's in the format <tablename>_<columnname>_seq
SELECT setval('users_id_seq', 1, false);
SELECT setval('products_id_seq', 1, false);

-- Clear existing data
DELETE FROM orders;
DELETE FROM cart;
DELETE FROM products;
DELETE FROM users;

-- Insert sample users
INSERT INTO users (username, password) VALUES
('alice', 'password123'),
('bob', 'password123');

-- Insert sample products
INSERT INTO products (name, price) VALUES
('Laptop', 1000),
('Phone', 500),
('TV', 1500);

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
