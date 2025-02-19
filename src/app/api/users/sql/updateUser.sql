update users
set first_name = $2, last_name = $3, phone_number = $4, address = $5, bio = $6, image = $7
where id = $1
