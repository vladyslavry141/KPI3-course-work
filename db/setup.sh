cat install.sql | docker exec -i postgres_cw psql -U postgres
cat ../application/schemas/database.sql | docker exec -i postgres_cw psql -U postgres -d application
