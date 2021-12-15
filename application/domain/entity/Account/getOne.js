async (fields = ['*'], conditions) => {
  return db.pg.row('Account', fields, conditions);
};
