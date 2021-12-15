async (parentId) => {
  const query = [
    'SELECT * FROM "Folder" f',
    'WHERE f."parentId" = $1',
    'ORDER BY "name"',
  ].join('\n');

  return db.pg.query(query, [parentId]).then(({ rows }) => rows);
};
