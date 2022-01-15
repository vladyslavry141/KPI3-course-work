async (bookmarkId, delta) =>
  await db.pg.update('Bookmark', delta, { bookmarkId });
