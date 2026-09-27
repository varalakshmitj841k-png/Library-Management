-- Library Management System database schema for Supabase

CREATE TABLE IF NOT EXISTS books (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT,
  available BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS members (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS borrowings (
  id BIGSERIAL PRIMARY KEY,
  book_id BIGINT REFERENCES books(id) ON DELETE CASCADE,
  member_id BIGINT REFERENCES members(id) ON DELETE CASCADE,
  borrow_date DATE,
  return_date DATE
);

INSERT INTO books (title, author, category, available)
VALUES
  ('The Alchemist', 'Paulo Coelho', 'Fiction', TRUE),
  ('Wings of Fire', 'A. P. J. Abdul Kalam', 'Biography', TRUE),
  ('Harry Potter', 'J. K. Rowling', 'Fantasy', FALSE),
  ('Atomic Habits', 'James Clear', 'Self Help', TRUE),
  ('Introduction to Algorithms', 'Thomas H. Cormen', 'Computer Science', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO members (name, email, phone)
VALUES
  ('Rahul Sharma', 'rahul@example.com', '9876543210'),
  ('Priya Kumar', 'priya@example.com', '9876543211'),
  ('Ananya Rao', 'ananya@example.com', '9876543212')
ON CONFLICT DO NOTHING;

-- Optional sample borrowing record
-- INSERT INTO borrowings (book_id, member_id, borrow_date, return_date)
-- VALUES (3, 1, '2026-09-01', '2026-09-15');
