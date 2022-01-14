async (sessionId, delta) => db.pg.update('Session', delta, { sessionId });
