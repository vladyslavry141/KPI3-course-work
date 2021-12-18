async ({ name, parentId, accountId, info, url }) => {
  return db.pg
    .insert('Bookmark', { name, parentId, accountId, info, url })
    .returning('*')
    .then(({ rows: [data] }) => data);
};
