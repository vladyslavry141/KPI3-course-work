async (conditions = {}, fields = ['*']) =>
  await db.pg.select('Account', fields, conditions);
