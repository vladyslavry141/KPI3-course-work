async (fields = ['*'], conditions) => {
  return db.pg.row('Bookmark', fields, conditions);
};
