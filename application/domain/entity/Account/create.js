async ({ login, password, email }) => {
  return db.pg
    .insert('Account', { login, password, email })
    .returning('*')
    .then(({ rows: [data] }) => data);
};
