async (id, delta) => {
  return db.pg
    .update('Folder', { delta }, { id })
    .returning(['*'])
    .then(({ rows: [data] }) => data);
};
