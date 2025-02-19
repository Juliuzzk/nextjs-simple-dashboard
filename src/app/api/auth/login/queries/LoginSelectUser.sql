SELECT id, email, password, first_name, last_name, "emailVerified" FROM users WHERE email = $1;
