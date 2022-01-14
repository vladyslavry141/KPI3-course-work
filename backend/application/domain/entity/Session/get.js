async (sessionId, fields = ['*']) =>
  db.pg.row('Session', fields, { sessionId });
