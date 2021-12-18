async ({ identifierId, accountId, action }) =>
  db.pg.insert('Journal', { identifierId, accountId, action });
