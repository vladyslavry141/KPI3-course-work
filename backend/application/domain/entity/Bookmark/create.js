async ({ name, parentId, creatorId, info, url }) =>
  await db.pg
    .insert('Bookmark', { name, parentId, creatorId, info, url })
    .returning('bookmarkId')
    .then(({ rows: [{ bookmarkId }] }) => bookmarkId);
