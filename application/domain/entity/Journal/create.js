async ({ login, password, email }) =>
  db.pg.insert('Journal', { login, password, email });
