async (fields = ['*'], conditions) => {
  return db.pg.row('Folder', fields, conditions);
};
