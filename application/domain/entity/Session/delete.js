async (token) => db.pg.delete('Session', { token });
