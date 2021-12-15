async (id, delta) => {
  return db.pg
    .update('Bookmark', { delta }, { id })
    .returning(['*'])
    .then(({ rows: [data] }) => data);
};
