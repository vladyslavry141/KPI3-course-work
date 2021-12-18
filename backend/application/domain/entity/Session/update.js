async (token, delta) => {
  return db.pg.update('Session', { delta }, { token }).returning(['*']);
};
