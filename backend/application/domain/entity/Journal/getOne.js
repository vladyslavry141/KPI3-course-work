async (fields = ['*'], conditions) => db.pg.row('Journal', fields, conditions);
