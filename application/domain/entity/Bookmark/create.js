async ({ login, password, email }) => {
  return db.pg
    .insert('Bookmark', { login, password, email })
    .returning('*')
    .then(({ row: [data] }) => data);
};
