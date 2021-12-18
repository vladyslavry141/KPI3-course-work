async (parentId) => {
  const query = [
    'SELECT * FROM "Bookmark" b',
    'WHERE b."parentId" = $1',
    'ORDER BY "name"',
  ].join('\n');

  return db.pg.query(query, [parentId]).then(({ rows }) => rows);
};
