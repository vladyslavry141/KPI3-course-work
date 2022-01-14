async (sessionId) => db.pg.delete('Session', { sessionId });
