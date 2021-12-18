async (journalId, delta) => db.pg.update('Journal', { delta }, { journalId });
