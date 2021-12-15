async (fields = ['*'], conditions) => {
  return db.pg.row('Session', fields, conditions);
};
