async (token, delta) => db.pg.update('Session', delta, { token });
