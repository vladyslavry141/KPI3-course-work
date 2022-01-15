async (conditions = {}, fields = ['*']) =>
  await db.pg.select('Folder', fields, conditions);
