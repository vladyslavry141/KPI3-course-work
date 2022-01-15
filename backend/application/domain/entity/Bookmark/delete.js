async (bookmarkId) => await db.pg.delete('Bookmark', { bookmarkId });
