async ({ login, password, email }) => {
  return db.pg
    .insert('Folder', { login, password, email })
    .returning('*')
    .then(({ row: [data] }) => data);
};
