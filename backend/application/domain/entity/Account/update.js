async (accountId, delta) => {
  return db.pg
    .update('Account', { delta }, { accountId })
    .returning(['*'])
    .then(({ rows: [data] }) => data);
};
