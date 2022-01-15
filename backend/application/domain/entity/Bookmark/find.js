async (conditions = {}, fields = ['*']) =>
  await db.pg.select('Bookmark', fields, conditions);
