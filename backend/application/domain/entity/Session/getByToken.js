async (token, fields = ['*']) => db.pg.row('Session', fields, { token });
