INSERT INTO users (first_name, last_name, email, password, role) 
    VALUES ('Chamara', 'Chathuranga', 'chamara@gmail.com', crypt('password', gen_salt('bf', 10)), 3);
