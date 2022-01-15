async (bookmarkId, fields = ['*']) =>
  await db.pg.row('Bookmark', fields, { bookmarkId });
