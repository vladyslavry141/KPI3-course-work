async ({ name, creatorId, parentId }) => {
  return db.pg
    .insert('Folder', { login, password, email })
    .returning('*')
    .then(({ rows: [data] }) => data);
};
